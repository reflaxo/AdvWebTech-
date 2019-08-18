import React, { Component } from "react";
import NewRecipe from "./NewRecipe";
import DeleteAll from "./DeleteAll";
import RecipeImage from "./RecipeImage";
import axios from "axios";
import { Page, Button } from "tabler-react";
import { Row, Col, Container } from "reactstrap";
//Small JSX Component exporting a button that changes looks when it's clicked

//Small JSX Component exporting a button that changes looks when it's clicked
class Recipe extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.toggle = this.toggle.bind(this);

    //This is were our start settings are defined:
    this.state = {
      addRecipe: false,
      recipes: "",
      country: "",
      loggedIn: false
    };
  }

  componentDidMount() {
    //gets recipe data // match it to the country
    const { Country } = this.props.match.params;
    axios
      .get(`/getRecipes/${Country}`)
      .then(res => {
        const recipesdata = res.data;
        this.setState({
          recipes: recipesdata,
          country: Country
        });
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //checks if user is logged in, shows add recipe button or doesn't
    if (
      (axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      ))
    ) {
      this.setState({ loggedIn: true });
    }
    
  }

  toggle() {
    this.setState(prevState => ({
      addRecipe: !prevState.addRecipe
    }));
  }

  //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    if (this.state.recipes && this.state.recipes.length > 0) {
      return (
        <Container>
          <Page.Content>
            <Page.Header
              title={this.state.country}
              subTitle={"Showing " + this.state.recipes.length + " Recipes"}
            />
            <Row>
              {this.state.loggedIn && (
                <Button color="info" onClick={this.toggle}>
                  Add Recipe
                </Button>
              )}
            </Row>
            <Row>
              {" "}
              <NewRecipe
                addRecipe={this.state.addRecipe}
                toggle={this.toggle}
              />
            </Row>
            <br />

            <Row>

              {this.state.recipes.map(recipe => (
                <Col sm="4">
                  <RecipeImage
                    id={recipe._id}
                    key={recipe._id}
                    image={recipe.image}
                    name={recipe.name}
                    recipe={recipe.recipe}
                    ingridients={recipe.ingridients}
                  />
                </Col>
              ))}
            </Row>
  
   
          </Page.Content>
        </Container>
      );
    }
    return (
      <div>
        {" "}
        <Row>
          {" "}
          {this.state.loggedIn && (
            <Button color="info" onClick={this.toggle}>
              Add Recipe
            </Button>
          )}
          <DeleteAll />
        </Row>
        Waiting for recipe information...
      </div>
    );
  }
}

export default Recipe;

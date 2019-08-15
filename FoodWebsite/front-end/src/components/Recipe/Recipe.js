import React, { Component } from "react";
import NewRecipe from "./NewRecipe";
import DeleteAll from "./DeleteAll";
import RecipeImage from "./RecipeImage";
import axios from "axios";
import { Page, Button } from "tabler-react";
import { Row, Col, Container } from "reactstrap";
//Small JSX Component exporting a button that changes looks when it's clicked
class Recipe extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.toggle = this.toggle.bind(this);

    //This is were our start settings are defined:
    //We want our Edit button to show "off"/false
    this.state = {
      addRecipe: false,
      recipes: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/getRecipes")
      .then(res => {
        const recipesdata = res.data;
        this.setState({
          recipes: recipesdata
        });
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggle() {
    this.setState(prevState => ({
      addRecipe: !prevState.addRecipe
    }));
  }

  //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    //The value of isEditing is called from the state
    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.

    if (this.state.recipes && this.state.recipes.length > 0) {
      return (
        <Container>
          <Page.Content>
            <Page.Header
              title="Germany"
              subTitle={"Showing " + this.state.recipes.length + " Recipes"}
            />
            <Row>
              <Button color="info" onClick={this.toggle}>
                Add Recipe
              </Button>{" "}
              <DeleteAll />
            </Row>
            <br/>

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
            <NewRecipe addRecipe={this.state.addRecipe} toggle={this.toggle} />
          </Page.Content>
          </Container>
      );
    }
    return (
      <div>
        {" "}
        <Row>
              <Button color="info" onClick={this.toggle}>
                Add Recipe
              </Button>{" "}
              <DeleteAll />
            </Row>

       Waiting for recipe information...
      </div>
    );
  }
}

export default Recipe;

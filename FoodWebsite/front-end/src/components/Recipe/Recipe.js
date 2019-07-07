import React, { Component } from "react";
import NewRecipe from "./NewRecipe";
import DeleteAll from "./DeleteAll";
import RecipeImage from "./ImageRecipe";
import axios from "axios";
import { Page, Grid, Button} from "tabler-react";
import {Row} from "reactstrap";
//Small JSX Component exporting a button that changes looks when it's clicked
class Recipe extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.addRecipe = this.addRecipe.bind(this);

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

  addRecipe(ev) {
    //New State is set
    this.setState(() => ({ addRecipe: !this.state.addRecipe }));
  }
  //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    //The value of isEditing is called from the state
    const { addRecipe } = this.state;
    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.

    if (this.state.recipes && this.state.recipes.length > 0) {
      return (
        <div>
          <Page.Content>
            <Page.Header
              title="Germany"
              subTitle={"Showing " + this.state.recipes.length + "Recipes"}
            />
            <Row><Button color="info" onClick={this.addRecipe}>
              Add Recipe
            </Button> <DeleteAll /> </Row>
           
            <Grid.Row className="row-cards">
              {this.state.recipes.map(recipe => (
                <div>
              
                  <RecipeImage
                  key={recipe.id}
                    image={recipe.image}
                    name={recipe.name}
                    recipe={recipe.recipe}
                    ingridients={recipe.ingridients}
                  />
                </div>
              ))}
            </Grid.Row>
            <NewRecipe addRecipe={addRecipe} />
          </Page.Content>
        </div>
      );
    }
    return (
      <div>
        {" "}
        <Button color="info" onClick={this.addRecipe}>
          Add Recipe
        </Button>{" "}
        <DeleteAll />
        <NewRecipe addRecipe={addRecipe} />
      </div>
    );
  }
}

export default Recipe;

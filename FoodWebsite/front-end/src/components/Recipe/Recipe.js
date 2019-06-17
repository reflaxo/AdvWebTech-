import React, { Component } from "react";
import { Button } from "reactstrap";
import NewRecipe from "./NewRecipe";
import axios from 'axios';
import { Link } from 'react-router-dom';
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
      food:""
    };
  }
  
    componentDidMount() {
      axios.get('http://localhost:9000/getRecipes/')
          .then(data=> {
              this.setState({ food: data}) ;  
           
           console.log(this.state.food) ;  
          })
          .catch(function (error){
              console.log(error);
          })
  }
  

  addRecipe(ev){
    //New State is set
    this.setState( () => ({ addRecipe: !this.state.addRecipe}));
  }
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render(){
    //The value of isEditing is called from the state
    const { addRecipe} = this.state;
    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.
  
      
     
        if (this.state.food && this.state.food.length > 0) {
        return (
            <div>
            <p>Recipe</p>
        <Button color="info" onClick={this.addRecipe}>+
        </Button>
        <NewRecipe addRecipe={addRecipe}/>
     
                {
                  this.state.food.map((items =>
                    <th key="">
                        {items.food}
                    </th>
                    ))
                }
            </div>
        );
    }
      return (<div>   <Button color="info" onClick={this.addRecipe}>+
      </Button>
      <NewRecipe addRecipe={addRecipe}/></div>)
      
 
    
  }
}

export default Recipe;
import React, { Component } from "react";
import {
  Button,

  Alert,

} from "reactstrap";
import axios from "axios";
import AlertNote from "../UsedForAll/AlertNote.js";

import { withRouter } from "react-router-dom";
//Small JSX Component exporting a button that changes looks when it's clicked
class DetailRecipe extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.state = {
    success:false};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(ev) {
     const {recipeId} = this.props.ID;
     console.log(this.props.ID)

    axios
    .post(`/deleteRecipe/${this.props.ID}`,{
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    params: { id: this.props.ID}
})
    .then(res => {
      this.setState({success: true})
      setTimeout(function(){
           this.setState({success:false});
           this.props.history.push(`/Recipe/${this.props.country}`);
      }.bind(this),3000);  // wait 3 seconds, then reset to false

     
  
  }) 
    .catch(error => {
      console.log(error.response);
    });
  }
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {

    return (
      <div>
              <AlertNote success={this.state.success} type="success" text= "Deleting worked!"/>
          <AlertNote success={this.state.error} type="warning" text= "Something didn't work :("/>

        <Button color="danger" onClick={this.onDelete}>
         Delete
        </Button>
      </div>
    );
  }
}

export default withRouter(DetailRecipe);
import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { withRouter } from 'react-router-dom';
//Small JSX Component exporting a button that changes looks when it's clicked
class DetailRecipe extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
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
    .then(res => console.log(res))
    .catch(error => {
      console.log(error.response);
    });
  }
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {

    return (
      <div>
        <Button color="danger" onClick={this.onDelete}>
         Delete
        </Button>
      </div>
    );
  }
}

export default DetailRecipe;
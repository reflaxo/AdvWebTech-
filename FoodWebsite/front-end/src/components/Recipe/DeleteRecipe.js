import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
//Small JSX Component exporting a button that changes looks when it's clicked
class About extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.onDelete = this.onDelete.bind(this);


  }

  onDelete(ev) {
    //New State is set
    this.setState( () => ({ isEditing: !this.state.isEditing }));

    axios
    .post("http://localhost:9000/deleteRecipe")
    .then(res => console.log(res.food))
    .catch(error => {
      console.log(error.response);
    });
  }
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {

    return (
      <div>
        <Button color="info" onClick={this.onDelete}>
         Delete
        </Button>
        <p>About</p>
      </div>
    );
  }
}

export default About;
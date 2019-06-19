import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
//Small JSX Component exporting a button that changes looks when it's clicked
class DeleteAll extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.onDelete = this.onDelete.bind(this);

    //This is were our start settings are defined:
    //We want our Edit button to show "off"/false
    this.state = {
      isEditing: false
    };
  }

  onDelete(ev) {
    //New State is set
    this.setState( () => ({ isEditing: !this.state.isEditing }));

    axios
    .post("http://localhost:9000/deleteAll")
    .then(res => console.log(res))
    .catch(error => {
      console.log(error.res);
    });
  }
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    //The value of isEditing is called from the state
    const { isEditing } = this.state;
    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.
    return (
      <div>
        <Button color="info" onClick={this.onDelete}>
          Delete Button
        </Button>
      </div>
    );
  }
}

export default DeleteAll;
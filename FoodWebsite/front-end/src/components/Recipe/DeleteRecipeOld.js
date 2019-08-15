import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
//Small JSX Component exporting a button that changes looks when it's clicked
class DeleteRecipe extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    super(props);
    this.state = {
      ok:"",
      id:this.props.id
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(ev) {

    const id = {
      id: this.state.id
    };

    axios
      .post("http://localhost:9000/deleteOneRecipe", id)
        .then(res => {
          const answer = res.data.message;
          this.setState({
            ok: answer
          });
          console.log(res);
        })
      .catch(error => {
        console.log(error.response);
      });
  }
  //Here is where our HTML-Markup is designed, in this case just our Delete
  render() {
    return (
      <div>
        <Button color="danger" onClick={this.onDelete}>
          Delete
        </Button>
        <p>{this.state.ok}</p>
      </div>
    );
  }
}

export default DeleteRecipe;

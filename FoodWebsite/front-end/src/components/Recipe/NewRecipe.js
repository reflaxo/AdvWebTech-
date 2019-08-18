import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import AlertNote from "../UsedForAll/AlertNote.js";
import axios from "axios";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objToArr: [],
      answers: ["false", "false", "false"],
      recipe: "",
      name: "",
      file: null,
      recipes: "",
      ingridients: "",
      foodType: "",
      country: "",
      success: false,
      error:false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    if (e.target.id !== "file") {
      this.setState({ [e.target.id]: e.target.value });
    } else {
      this.setState({ file: e.target.files[0] });
    }
    console.log(this.state);
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.toggle();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("ingridients", this.state.ingridients);
    formData.append("recipe", this.state.recipe);
    formData.append("country", this.state.country);
    formData.append("foodType", this.state.foodType);
    formData.append("myImage", this.state.file);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/addRecipe", formData, config)
      .then(res => {
        this.setState({ success: true });
        setTimeout(
          function() {
            this.setState({ success: false });
          }.bind(this),
          3000
        ); // wait 3 seconds, then reset to false
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
        setTimeout(
          function() {
            this.setState({ error: false });
          }.bind(this),
          3000
        ); // wait 3 seconds, then reset to false

      });
  }

  render() {
    return (
      <div>
  
            <AlertNote success={this.state.success} type="success" text= "Your recipe has been successfully uploaded!"/>
            <AlertNote success={this.state.error} type="warning" text= "Something didn't work :("/>
    
     

        <Modal isOpen={this.props.addRecipe} toggle={this.props.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Recipe</ModalHeader>
          <ModalBody>
            <div>
              <Form onSubmit={this.onSubmit}>
                <Col sm={10}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      value={this.state.name}
                      onChange={this.onChange}
                      type="text"
                      name="name"
                      id="name"
                    />
                  </FormGroup>

                  <FormGroup tag="fieldset">
                 
                
                      <FormGroup>
                        <Label for="country">Country</Label>
                        <Input
                          type="select"
                          onChange={this.onChange}
                          name="select"
                          id="country"
                        >
                          <option value="Iran">Iran</option>
                          <option value="Korea">Korea</option>
                          <option value="Germany">Germany</option>
                        </Input>
                      </FormGroup>
                 

                    <FormGroup>
                      <Label for="foodType">FoodType</Label>
                      <Input
                        type="select"
                        onChange={this.onChange}
                        name="select"
                        id="foodType"
                      >
                        <option value="Main">Main</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Appetizer">Appetizer</option>
                      </Input>
                    </FormGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for="ingridients">Ingridients</Label>
                    <Input
                      value={this.state.ingridients}
                      onChange={this.onChange}
                      type="textarea"
                      name="ingr"
                      id="ingridients"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleText">Recipe</Label>
                    <Input
                      value={this.state.recipe}
                      onChange={this.onChange}
                      type="textarea"
                      name="text"
                      id="recipe"
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleFile" sm={2}>
                      Image
                    </Label>
                    <Col sm={10}>
                      <Input
                        value={this.state.image}
                        onChange={this.onChange}
                        type="file"
                        name="file"
                        id="file"
                      />
                      <FormText color="muted">
                        Please upload a picture which shows the food you want to
                        add to our database
                      </FormText>
                    </Col>
                  </FormGroup>
                </Col>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NewRecipe;

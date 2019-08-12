import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row, Modal, ModalHeader, ModalBody, ModalFooter 
} from "reactstrap";
import axios from "axios";
import M from "materialize-css";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.M = window.M;

    this.state = {
      objToArr: [],
      answers: ["false", "false", "false"],
      recipe: "",
      name: "",
      file: null,
      recipes:"",
      ingridients:"",
      foodType:"",
      country:""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleFoodTypeChange = this.handleFoodTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleRecipeChange = this.handleRecipeChange.bind(this);
    this.handleIngridientsChange = this.handleIngridientsChange.bind(this);
  }


  handleFoodTypeChange(e) {
    this.setState({
      foodType: e.target.value
    });
  }

  handleCountryChange(e) {
    this.setState({
      country: e.target.value
    });
  }

  handleImageChange(e) {
    this.setState({file:e.target.files[0]});
  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleRecipeChange(e) {
    this.setState({
      recipe: e.target.value
    });
  }
  handleIngridientsChange(e) {
    this.setState({
      ingridients: e.target.value
    });
  }

  



    onSubmit(e){
      e.preventDefault();
      this.props.toggle();
      const formData = new FormData();
      formData.append('name',this.state.name);
      formData.append('ingridients',this.state.ingridients);
      formData.append('recipe',this.state.recipe);
      formData.append('country',this.state.country);
      formData.append('foodType',this.state.foodType);
      formData.append('myImage',this.state.file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("/addRecipe",formData,config)
          .then((response) => {
            M.toast({html: 'Your recipe was successfully uploaded!', classes:'black'})
          }).catch((error) => {
      });

  }

  //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    //The value of isEditing is called from the state
    const { addRecipe } = this.props;
//Cara: Idea! Replace Answers field with which country - then i change in quiz that if country was chosen, its the correct answer :)
// Add dropdown for foodType: "Desert/Main/etc... what you want"
    return (
      <div>
     
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
                    onChange={this.handleNameChange}
                    type="text"
                    name="name"
                    id="name"
                  />
                </FormGroup>
               
                <FormGroup tag="fieldset">
          <legend>Country</legend>
          <FormGroup check>
                  
          <legend>Country</legend>
    
<p>
<label>

        <input  id="country" onChange={this.onCountryChange} name="country" type="radio"/>
        <span>Iran</span>
      </label>
    </p>
    <p>
      <label>
        <input  id="country" onChange={this.onCountryChange} name="country" type="radio" />
        <span>Korea</span>
      </label>
    </p>
    <p>
      <label>
        <input id="country" onChange={this.onCountryChange} name="country" type="radio"  />
        <span>Germany</span>
      </label>
    </p>
           
          </FormGroup>

          <FormGroup>
          <Label for="foodType">FoodType</Label>
          <Input type="select" onChange={this.handleFoodTypeChange} value={this.state.foodType} name="select" id="foodType">
            <option>Main</option>
            <option>Dessert</option>
            <option>Appetizer</option>
          </Input>
        </FormGroup>
        </FormGroup>
        <FormGroup>
                  <Label for="ingridients">Ingridients</Label>
                  <Input
                    value={this.state.ingridients}
                    onChange={this.handleIngridientsChange}
                    type="textarea"
                    name="ingr"
                    id="ingridients"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Recipe</Label>
                  <Input
                    value={this.state.recipe}
                    onChange={this.handleRecipeChange}
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
                      onChange={this.handleImageChange}
                      type="file"
                      name="file"
                      id="image"
                    />
                    <FormText color="muted">
                      Please upload a picture which shows the food you want to
                      add to our database
                    </FormText>
                  </Col>
                </FormGroup></Col>
            </Form>
          </div>
          </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
              </Modal>
      </div>
    );
  }
}

export default NewRecipe;

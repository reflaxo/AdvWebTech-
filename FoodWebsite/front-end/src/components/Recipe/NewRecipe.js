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
      country: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleFoodTypeChange = this.handleFoodTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleRecipeChange = this.handleRecipeChange.bind(this);
    this.handleIngridientsChange = this.handleIngridientsChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/getRecipes")
      .then(res => {
        const recipeData = res.data.recipes;
        this.setState({
          recipes: recipeData
        });
      })
      .catch(error => {
        console.log(error);
      });
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
    this.setState({ file: e.target.files[0] });
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

  onSubmit(e) {
    e.preventDefault();
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
      .post("http://localhost:9000/addRecipe", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  }

  //Here is where our HTML-Markup is designed, in this case our popup for adding recipes
  render() {
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
                      <Label check>
                        <Input
                          type="radio"
                          onChange={this.handleCountryChange}
                          name="radio1"
                          value="Iran"
                          checked={this.state.country === "Iran"}
                        />
                        {"Iran"}
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          onChange={this.handleCountryChange}
                          value="Korea"
                          name="radio1"
                          checked={this.state.country === "Korea"}
                        />
                        {"Korea"}
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          onChange={this.handleCountryChange}
                          value="Germany"
                          checked={this.state.country === "Germany"}
                        />
                        {"Germany "}
                      </Label>
                    </FormGroup>

                    <FormGroup>
                      <Label for="foodType">FoodType</Label>
                      <Input
                        type="select"
                        onChange={this.handleFoodTypeChange}
                        value={this.state.foodType}
                        name="select"
                        id="foodType"
                      >
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

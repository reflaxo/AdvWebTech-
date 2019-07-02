import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  FormText,
  Col
} from "reactstrap";
import axios from "axios";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: [],
      objToArr: [],
      answers: ["false", "false", "false"],
      recipe: "",
      name: "",
      file: null,
      recipes:"",
      foodType:"",
      country:""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleFoodTypeChange = this.handleFoodTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleRecipeChange = this.handleRecipeChange.bind(this);
  }

  componentDidMount() {
    axios
    .get('http://localhost:9000/getRecipes')
    .then(res => {
      const recipeData = res.data.recipes;
      this.setState({
        recipes: recipeData,
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
    /*return e => {
      const value = e.target.value;
      this.setState(prevState => {
        const newAnswers = [...prevState.answers];
        newAnswers[answer] = value;
        console.log('stelle', answer, 'val', newAnswers);
        return ({
          answers: newAnswers
        });
      });
    };*/
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

  



    onSubmit(e){
      e.preventDefault();
      const formData = new FormData();
      formData.append('name',this.state.name);
      formData.append('recipe',this.state.recipe);
      formData.append('country',this.state.country);
      formData.append('foodType',this.state.foodType);
      formData.append('myImage',this.state.file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("http://localhost:9000/addRecipe",formData,config)
          .then((response) => {
              alert("The file is successfully uploaded");
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
        {addRecipe ? (
          <div>
            <p className="App-intro">;{this.state.apiResponse}</p>
            <p>Recipe</p>

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
              <Input type="radio" onChange={this.handleCountryChange} name="radio1" value={this.state.country}/>{'Iran'}
              Iran
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />{'Korea'}
              Korea
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="radio1" />{'Germany '}
              Germany
            </Label>
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
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
              </Col>
            </Form>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default NewRecipe;

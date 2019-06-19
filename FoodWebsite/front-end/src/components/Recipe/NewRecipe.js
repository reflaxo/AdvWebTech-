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
      image: "",
      recipes:"",
      foodType:"",
      country:""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAnswersChange = this.handleAnswersChange.bind(this);
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


  handleAnswersChange(answer) {
    return e => {
      const value = e.target.value;
      this.setState(prevState => {
        const newAnswers = [...prevState.answers];
        newAnswers[answer] = value;
        console.log('stelle', answer, 'val', newAnswers);
        return ({
          answers: newAnswers
        });
      });
    };
  }

  handleImageChange(e) {
    this.setState({
      image: e.target.value
    });
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

  onSubmit(e) {
    e.preventDefault();

    var answers = this.state.answers;
    var recipe = this.state.recipe;
    var image = this.state.image;
    var name = this.state.name;
    var food = { name, answers, recipe, image };

    axios
      .post("http://localhost:9000/addRecipe", food)
      .then(res => console.log(res.food))
      .catch(error => {
        console.log(error.response);
      });

    this.setState({
      question: "",
      answers: ["false", "false", "false"],
      recipe: "",
      image: "",
      foodType:""
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
                <h4>Answers</h4>
                <FormGroup>
                  <Label for="Korea" value="Korea">
                    Korea
                  </Label>
                  <Input
                    value={this.state.answers[0]}
                    onChange={this.handleAnswersChange(0)}
                    type="select"
                    name="Korea"
                    id="Korea"
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </Input>

                  <Label for="Iran">Iran</Label>
                  <Input
                    value={this.state.answers[1]}
                    onChange={this.handleAnswersChange(1)}
                    type="select"
                    name="Iran"
                    id="Iran"
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </Input>
                  <Label for="Germany">Germany</Label>
                  <Input
                    value={this.state.answers[2]}
                    onChange={this.handleAnswersChange(2)}
                    type="select"
                    name="Germany"
                    id="Germany"
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </Input>
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

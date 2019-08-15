import React from "react";
import axios from "axios";
import DeleteRecipe from "./DeleteRecipeOld";
import UpdateRecipe from "./UpdateRecipe";
import {
  Container,
  Card,
  CardHeader,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Button,
  Row
} from "reactstrap";

class DetailRecipe extends React.Component {
  constructor(props) {
    super(props);
        this.toggle = this.toggle.bind(this);


    this.state = {
      recipe: {},
      image: "",
      error: "",
      updateRecipe: false,
      id:""
    };
  }

  componentDidMount() {
    const {recipeId} = this.props.match.params;
     this.setState({
          id: this.props.match.params,
        });

    axios
      .get(`/detailRecipe/${recipeId}`, {
      })
      .then(res => {
        const recipedata = res.data;
        this.setState({
          recipe: recipedata,
          id: recipeId,
          image: recipedata.image.data
        });
        console.log(res);
        console.log(JSON.stringify(res.data));
      })
      .catch(error => {
        this.setState({
          error: error
        });
        console.log(error);
      });
  }

   toggle() {
    this.setState(prevState => ({
       updateRecipe: !prevState.updateRecipe
    }));
  }

  render() {
    const { recipe } = this.state;
    return (
      <div>
        {recipe ? (
          <Container>

            <Row>
              {" "}
              <Col sm="12">
                <h1>{recipe.name}</h1>

              </Col>    
              <DeleteRecipe ID={this.state.id} />
                  <Button color="info" onClick={this.toggle}>
                Update
              </Button>
            </Row>
            <Row><DeleteRecipe id={recipe._id}/> </Row>

            <Row>
              <UpdateRecipe oldRecipe={this.state.recipedata} updateRecipe={this.state.updateRecipe} toggle={this.toggle} />
              <Col sm="4">
                <Card>
                  <CardHeader>Details</CardHeader>
                  <CardImg
                    top
                    width="100%"
                    src={`data:image/png;base64,${this.state.image}`}
                    alt={`Picture of ${recipe.name}`}
                  />
                  <CardBody>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardSubtitle>{recipe.country}</CardSubtitle>
                    <CardText>{recipe.ingridients}</CardText>
                  </CardBody>
                </Card>
              </Col>

              <Col sm="8">
                <Card>
                  <CardBody>
                    <CardTitle>{recipe.title}</CardTitle>
                    <CardText>{recipe.recipe}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          <div>
         {this.state.error}
          </div>
        )}
      </div>
    );
  }
}

export default DetailRecipe;

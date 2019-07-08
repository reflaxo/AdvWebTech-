import React from "react";
import axios from "axios";
import { Container, Error404Page } from "tabler-react";
import {
  Card,
  CardHeader,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row
} from "reactstrap";

class DetailRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      id: "",
      image: "",
      error: ""
    };
  }

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    console.log("launched detail" + recipeId + this.props.match.params);

    axios
      .get("http://localhost:9000/getOneRecipe", {
        params: {
          id: recipeId
        }
      })
      .then(res => {
        const recipedata = res.data;
        this.setState({
          recipe: recipedata,
          image: recipedata.image.data
        });
        console.log(JSON.stringify(this.state.image));
      })
      .catch(error => {
        this.setState({
          error: error
        });
        console.log(error);
      });
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
            </Row>

            <Row>
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
            <Error404Page /> {this.state.error}
          </div>
        )}
      </div>
    );
  }
}

export default DetailRecipe;

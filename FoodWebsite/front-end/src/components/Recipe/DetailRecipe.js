import React from "react";
import axios from "axios";
import DeleteRecipe from "./DeleteRecipe";
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
      id: "",
      image: "",
      error: "",
      updateRecipe: false,
      id:"",
      loggedIn:false
    };
  }

  componentDidMount() {
    const {recipeId} = this.props.match.params;
     this.setState({
          id: this.props.match.params,
        });

        //checks if user is logged in
        if( localStorage.getItem('jwtToken')){
          this.setState({loggedIn:true});
        }

        //sends jwtToken to check validity
        const config = {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
          }
        };
//gets recipe data
      axios.get(`/detailRecipe/${recipeId}`, config)
      .then(res => {
        const recipedata = res.data;
        this.setState({
          recipe: recipedata,
          id: recipeId,
          image: recipedata.image.data
        });
        console.log(this.state.recipe);
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
              {this.state.loggedIn&& 
              <div>   <Row><DeleteRecipe ID={this.state.id} country={recipe.country} />
                  <Button color="info" onClick={this.toggle}>
                Update
              </Button>  </Row></div>}
            </Row>

            <Row>
              <UpdateRecipe recipe={recipe} name={recipe.name} updateRecipe={this.state.updateRecipe} toggle={this.toggle} />
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

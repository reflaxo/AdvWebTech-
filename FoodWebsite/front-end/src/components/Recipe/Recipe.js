import React, { Component } from "react";
import NewRecipe from "./NewRecipe";
import DeleteAll from "./DeleteAll";
import RecipeImage from "./RecipeImage";
import axios from "axios";
import { Row, Col } from "reactstrap";
import M from "materialize-css";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
//Small JSX Component exporting a button that changes looks when it's clicked
class Recipe extends Component {
  //Constructor for defining start settings in this.state and binding functions
 
  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.toggle = this.toggle.bind(this);

    //This is were our start settings are defined:
    //We want our Edit button to show "off"/false
    this.state = {
      addRecipe: false,
      recipes: "",
      country:""
    };
  }

  componentDidMount() {
    const {Country} = this.props.match.params;
    axios
      .get(`/getRecipes/${Country}`)
      .then(res => {
        const recipesdata = res.data;
        this.setState({
          recipes: recipesdata,
          country: Country
        });
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  
  }


  toggle() {
    this.setState(prevState => ({
      addRecipe: !prevState.addRecipe
    }));
  }


  //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {

    //Here starts our HTML, Javascript is marked with "{}" brackets.

    if (this.state.recipes && this.state.recipes.length > 0) {
      return (
        <div>

    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon />
          <Typography variant="h6" color="inherit" noWrap>
              title={this.state.country}
              subTitle={"Showing " + this.state.recipes.length + " Recipes"}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      
        <Container maxWidth="md">
        
          <Grid container spacing={4}>
                 {this.state.recipes.map(recipe => (
        
                <RecipeImage
                  id={recipe._id}
                  key={recipe._id}
                  image={recipe.image}
                  name={recipe.name}
                  recipe={recipe.recipe}
                  ingridients={recipe.ingridients}
                />
                
              ))} 
            
         
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
            
        
            
            <NewRecipe addRecipe={this.state.addRecipe} toggle={this.toggle} />
      
        </div>
      );
    }
    return (
      <div>
        {" "}
        <Row>
              <Button color="info" onClick={this.toggle}>
                Add Recipe
              </Button>{" "}
            </Row>

       Waiting for recipe information...
      </div>
    );
  }
}

export default Recipe;

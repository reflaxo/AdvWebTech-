import React, { Component } from "react";
import defaultPic from "../Images/defaultPic.png";
import DetailRecipe from "./DetailRecipe";
import "tabler-react/dist/Tabler.css";
import { Grid, GalleryCard } from "tabler-react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class RecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      imageString: ""
    };


  }
  componentDidMount() {
    //If there is an image it will transform the image to a picture
    if (this.props.image) {
      this.setState({ imageString: this.props.image.data });
    }
  }


  //Imports the correct picture if available, else renders the defaultPicture
  render() {
    return (
      <div>
        {this.props.image ? (
          <div>
            
            <Grid xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                  
                    src={`data:image/png;base64,${this.state.imageString}`}
                    title={this.props.name}
                   
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                        <Link to={{
                      pathname: `/detailRecipe/${this.props.id}`,
                      state:{
                        fromNotifications: true}
                      }}>Link</Link>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={this.onClick}>
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              
   
            <div />
          </div>
        ) : (
          <div>
            <img className="quizImage" src={defaultPic} alt="img" />
          </div>
        )}
      </div>
    );
  }
}

export default RecipeImage;

import React, { Component } from "react";
import defaultPic from "../Images/defaultPic.png";
import DetailRecipe from "./DetailRecipe";
import "tabler-react/dist/Tabler.css";
import { Grid, GalleryCard } from "tabler-react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

class RecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      imageString: ""
    };

    this.toggleHover = this.toggleHover.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    //If there is an image it will transform the image to a picture
    if (this.props.image) {
      console.log(this.props.image.data);
      this.setState({ imageString: this.props.image.data });
    }
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  onClick() {}

  //Imports the correct picture if available, else renders the defaultPicture
  render() {
    return (
      <div>
        {this.props.image ? (
          <div>
            <Grid.Col sm={6} lg={4}>
              <GalleryCard>
                <GalleryCard.Image
                  src={`data:image/png;base64,${this.state.imageString}`}
                  alt={"tag"}
                />
                <GalleryCard.Footer>
                  <GalleryCard.Details fullName={this.props.name} />
                  <GalleryCard.IconGroup onClick={this.onClick}>
                    <GalleryCard.IconItem name="eye" label={this.props.name} />
                    <GalleryCard.IconItem name="heart" right />
                    <Link to={{
                      pathname: `/detailRecipe/${this.props.id}`,
                      state:{
                        fromNotifications: true}
                      }}>{this.props.name}
                  

                  
                    </Link>
                  </GalleryCard.IconGroup>
                </GalleryCard.Footer>
              </GalleryCard>
            </Grid.Col>
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

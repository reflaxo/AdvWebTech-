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
              <GalleryCard>
                <GalleryCard.Image
                  src={`data:image/png;base64,${this.state.imageString}`}
                  alt={"tag"}
                />
                <GalleryCard.Footer>
                 
                  <Link style={{color:"black"}} to={{
                      pathname: `/detailRecipe/${this.props.id}`,
                     }}>{this.props.name}
                    </Link>
                  <GalleryCard.IconGroup>
                    <GalleryCard.IconItem name="eye" label="Seen" />
  
                    <GalleryCard.IconItem onClick={this.countHearts} name="heart" right />
                    {this.state.heartCount}
                  </GalleryCard.IconGroup>
                </GalleryCard.Footer>
              </GalleryCard>
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

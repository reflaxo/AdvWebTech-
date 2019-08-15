import React, { Component } from "react";
import defaultPic from "../Images/defaultPic.png";
import "tabler-react/dist/Tabler.css";
import { GalleryCard } from "tabler-react";
import { Link } from "react-router-dom";

class RecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      imageString: "",
      heartCount:0
    };

    this.countHearts = this.countHearts.bind(this);
  }
  componentDidMount() {
    //If there is an image it will transform the image to a picture
    if (this.props.image) {
      this.setState({ imageString: this.props.image.data });
    }
  }
  countHearts() {
    this.setState({ heartCount: this.state.heartCount + 1});
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

import React, { Component } from 'react';
import defaultPic from '../Images/defaultPic.png';
import "tabler-react/dist/Tabler.css";
import { Page, Grid, GalleryCard, Form } from "tabler-react";


class RecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  hover: false,
	  imageString:''
	}
	
	this.toggleHover = this.toggleHover.bind(this);
	this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
  }
  componentDidMount() {
    //If there is an image it will transform the image to a picture
    if (this.props.image) {
        console.log(this.props.image.data)
      //const imageTemp=this.arrayBufferToBase64(this.props.image.data);
      //this.setState({ imageString: imageTemp });
      this.setState({ imageString: this.props.image.data });
    }
  }
//Transforms the Buffer to string
  arrayBufferToBase64(buffer){
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
    };


  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }
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
                  alt={'tag'}
                />
                <GalleryCard.Footer>
                  <GalleryCard.Details
                
                    fullName= {this.props.name}
             
                  />
                  <GalleryCard.IconGroup>
                    <GalleryCard.IconItem name="eye" label={this.props.name} />
                    <GalleryCard.IconItem
                      name="heart"
                      right
                    />
                  </GalleryCard.IconGroup>
                </GalleryCard.Footer>
              </GalleryCard>
            </Grid.Col>
            <div>

            </div>
            {this.state.hover && <div>{this.props.ingridients}{this.props.recipe}</div>}
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

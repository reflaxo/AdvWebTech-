import React, { Component } from "react";
import defaultPic from "../Images/defaultPic.png";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class QuizImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      imageString: ""
    };

    this.toggleHover = this.toggleHover.bind(this);
    //this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
  }
  componentDidMount() {
    //If there is an image it will transform the image to a picture
    if (this.props.image) {
      this.setState({ imageString: this.props.image.data });
    }
  }

 /* //Transforms the Buffer to string not necessary right now
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }*/

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }
  //Imports the correct picture if available, else renders the defaultPicture
  render() {
    return (
      <div>
        {this.props.image ? (
          <div>
           
              <img
                className="quizImage"
                src={`data:${this.props.image.contentType};base64,${this.state.imageString}`}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                alt="img"
              />
        
            {this.state.hover && (
              <div>
                {this.props.ingridients}
                {this.props.recipe}
                {this.props.name}
              </div>
            )}
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

export default QuizImage;

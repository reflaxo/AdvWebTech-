import React, { Component } from 'react';
import defaultPic from '../Images/defaultPic.png';




class QuizImage extends Component {
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
      const imageTemp=this.arrayBufferToBase64(this.props.image.data.data);
      this.setState({ imageString: imageTemp });

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
            <div>
              <img
                className="quizImage"
				    src={`data:image/png;base64,${this.state.imageString}`}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                alt="img"
              />
            </div>
            {this.state.hover && <div>{this.props.recipe}</div>}
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

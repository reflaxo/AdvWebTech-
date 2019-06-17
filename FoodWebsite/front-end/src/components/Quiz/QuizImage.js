
import React, { Component } from "react";
import PropTypes from 'prop-types';
import defaultPic from '../Images/defaultPic.png';
import './quiz.css';


  class QuizImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hover: false
		};
		this.toggleHover= this.toggleHover.bind(this);
	}
	
	toggleHover() {
		this.setState({hover: !this.state.hover});
	}
//Imports the correct picture if available, else renders the defaultPicture
render(){

  
      
	return (
		<div>
		{this.props.image? 

			<div>
		
			
			<div><img  className="quizImage" src={this.props.image} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} alt="img" /></div>
			{this.state.hover && <div>{this.props.recipe}</div>}
	
			</div>: 
			<div><img className="quizImage" src={defaultPic}  alt="img" /></div>
			
		
		}
		</div>
		);
} 
  }
 
export default QuizImage;


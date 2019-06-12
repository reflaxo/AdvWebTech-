
import React from 'react';
import PropTypes from 'prop-types';

var quizImage = {
	maxWidth: '300px',
	maxHeight: '300px',
  };
  
 
function Question(props) {

	return (
		<div>
		{props.image? 

			<div>
			<img style={quizImage} className="quizImage" src={props.image}  alt="img" /><h2 className="question">{props.content}</h2></div>: 
			<div><img className="quizImage" src={props.default}  alt="img" />
				<h2 className="question">{props.content}</h2></div>
		
		}
		</div>
		);
}
 
Question.propTypes = {
	content: PropTypes.string.isRequired
};
 
export default Question;
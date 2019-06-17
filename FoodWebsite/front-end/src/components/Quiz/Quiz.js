
import React from 'react';
import PropTypes from 'prop-types';
 
import QuizImage from './QuizImage';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
 
function Quiz(props) {
 
	function renderAnswerOptions(key) {
		return (
			<AnswerOption
				key={key.content}
				answerContent={key.content}
				answerType={key.type}
				answer={props.answer}
				questionId={props.questionId}
				onAnswerSelected={props.onAnswerSelected}
			/>
		);
	}
 
 
	return (
		<ReactCSSTransitionGroup
			className="container"
			component="div"
			transitionName="fade"
			transitionEnterTimoeout={800}
			transitionLeaveTimeout={500}
			transitionAppear
			transitionAppearTimeout={500}
		>
			<div key={props.questionId}>
			 	<QuestionCount
			 		counter={props.questionId}
			 		total={props.questionTotal}
			  	/>
			  	<QuizImage  image={props.image} recipe={props.recipe} />
				  <h3>Where is this dish from?</h3>
			  	<ul className="answerOptions">
			  		{props.answerOptions.map(renderAnswerOptions)}
			  	</ul>
			 </div>
 
		</ReactCSSTransitionGroup>
 
 
 
	);
 
}
 
Quiz.propTypes = {
	answer: PropTypes.string.isRequired,
	answerOptions: PropTypes.array.isRequired,
	counter: PropTypes.number.isRequired,
	question: PropTypes.string.isRequired,
	questionId: PropTypes.number.isRequired,
	questionTotal: PropTypes.number.isRequired,
	onAnswerSelected: PropTypes.func.isRequired
 
 
 
};
 
export default Quiz;
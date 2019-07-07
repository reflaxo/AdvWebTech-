
import React from 'react';
import PropTypes from 'prop-types';
 
 

function AnswerOption(props) {



	return (
		<li className="answerOption" style={{background: props.bgColor}} >
			<input
				type="radio"
				className="radioCustomButton"
				name="radioGroup"
				checked={props.answerName === props.answer}
				id={props.answerName}
				value={props.answerName}
				onChange={props.onAnswerSelected}
			/>
 
			<label className="radioCustomLabel" htmlFor={props.answerName}>
				{props.answerName}
			</label>
 
		</li>
	);
}
 
AnswerOption.propTypes = {
	answerType: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
	OnAnswerSelected: PropTypes.string.isRequired,
 
};
 
export default AnswerOption;
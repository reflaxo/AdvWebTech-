import React from "react";
import PropTypes from "prop-types";

import QuizImage from "./QuizImage";
import QuestionCount from "./QuestionCount";
import AnswerOption from "./AnswerOption";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

//Creates the Render of each question
function CompleteQuestion(props) {
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
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <QuizImage image={props.question.image} recipe={props.question.recipe} />
        <h3>Where is this dish from?</h3>
        <ul className="answerOptions">
          <AnswerOption 
          answerName="Korea"   rightAnswer={props.question.country}  onAnswerSelected={props.onAnswerSelected}/>
            <AnswerOption 
          answerName="Iran"       rightAnswer={props.question.country} onAnswerSelected={props.onAnswerSelected}/>
             <AnswerOption 
          answerName="Germany"     rightAnswer={props.question.country}   onAnswerSelected={props.onAnswerSelected} />
        </ul>
      </div>
    </ReactCSSTransitionGroup>
  );
}

export default CompleteQuestion;

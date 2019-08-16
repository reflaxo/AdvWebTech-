import React from "react";

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
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppearTimeout={500}
    >

      <div key={props.questionId}>


        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <QuizImage image={props.question.image} recipe={props.question.recipe} />
        <h3>Where is this dish from?</h3>
        <ul className="answerOptions">
          <AnswerOption 
          answerName="Korea"   bgColor={props.bgColor}  onAnswerSelected={props.onAnswerSelected}/>
            <AnswerOption 
          answerName="Iran"     bgColor={props.bgColor}    onAnswerSelected={props.onAnswerSelected}/>
             <AnswerOption 
          answerName="Germany"    bgColor={props.bgColor}  onAnswerSelected={props.onAnswerSelected} />
        </ul>
      </div>
    </ReactCSSTransitionGroup>
  );
}

export default CompleteQuestion;

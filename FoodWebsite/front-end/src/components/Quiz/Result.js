import React from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import QuizImage from "./QuizImage";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";

function Result(props) {
  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        You had <strong>{props.quizResult} correct Answers</strong>! The
        following recipes appeared in your Quiz:
        <Row>
          {props.recipes.map(recipe => (
            <div>
              <QuizImage image={recipe.image} name={recipe.country} />
              <Link
                to={{
                  pathname: `/detailRecipe/${recipe._id}`
                }}
              >
                {recipe.name}
              </Link>
            </div>
          ))}
        </Row>
      </div>
    </ReactCSSTransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;

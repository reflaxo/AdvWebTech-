import React from "react";
import PropTypes from "prop-types";

function QuestionCount(props) {
  return (
    <div className="questionCount">
      <h3>
        {" "}
        Question <span><strong>{props.counter + 1}</strong></span> of <span><strong>{props.total}</strong></span>
      </h3>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;

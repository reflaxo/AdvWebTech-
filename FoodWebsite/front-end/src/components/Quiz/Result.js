import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import QuizImage from "./QuizImage";

function Result(props) {
	return (
		<ReactCSSTransitionGroup
			className="container result"
			component ="div"
			transitionName="fade"
			transitionEnterTimeout={800}
			transitionLeaveTimeout={500}
			transitionAppear
			transitionAppearTimeout={500}
		>
			<div>
				You had <strong>{props.quizResult} correct Answers</strong>!

				The following recipes appeared in your Quiz:
				<ul>
				{
                  props.recipes.map((recipe =>
                    <div>
							<li>  <QuizImage image={recipe.image} name={recipe.name}/>
							{recipe.name}</li>
			
                     </div>
                    ))
                }
			
				
				


				</ul>

			</div>
		</ReactCSSTransitionGroup>
	);
}
 
Result.propTypes = {
	quizResult: PropTypes.string.isRequired,
};
 
export default Result;	
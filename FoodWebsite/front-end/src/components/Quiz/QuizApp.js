import React, { Component } from 'react';
import update from 'react-addons-update';
//import quizQuestions from "./quizQuestions";
import Quiz from './Quiz';
import axios from 'axios';
import Result from './Result';
import './Quiz.css';

class QuizApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: 'white',
      quizQuestions: [],
      counter: 0,
      questionId: 1,
      answersCount: {
        Stark: 0,
        Lannister: 0,
        Targaryen: 0
      },
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/getRecipes')
      .then(res => {
        const recipes = res.data.recipes;
        const shuffledRecipes = this.shuffleArray(recipes);
        this.setState({
          quizQuestions: shuffledRecipes,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (
      this.state.quizQuestions[this.state.counter].question.rightwrong ===
      'false'
    ) {
      this.setState({
        backgroundColor: 'red'
      });
      if (this.state.questionId < this.state.quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
    } else {
      this.setState({
        backgroundColor: 'green'
      });
      if (this.state.questionId < this.state.quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: { $apply: currentValue => currentValue + 1 }
    });

    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
    this.setState(prevState => ({
      counter: prevState.counter +1,
      questionId: prevState.questionId +1 ,
      answer: ''
    }));
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    const quizQuestions = this.state.quizQuestions;
    if (quizQuestions.length === 0) return null;

    const counter = this.state.counter;
    const currentQuestion = quizQuestions[counter];

    return (
      <Quiz
        answer={currentQuestion.answer}
        backgroundColor={this.state.backgroundColor}
        answerOptions={currentQuestion.answers}
        questionId={this.state.questionId}
        question={currentQuestion.question}
        image={currentQuestion.image}
        recipe={currentQuestion.recipe}
        questionTotal={this.state.quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="App">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default QuizApp;

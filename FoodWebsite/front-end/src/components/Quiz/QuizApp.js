import React, { Component } from 'react';
import update from 'react-addons-update';
//import quizQuestions from "./quizQuestions";
import CompleteQuestion from './CompleteQuestion';
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
      answerOptions:["Iran", "Korea", "Germany"],
      correctAnswersCounter:0,
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  //Gets Data from Backend
  componentDidMount() {
    axios
      .get('/getAllRecipes')
      .then(res => {
        console.log(res);
        const recipes = res.data;
        const shuffledRecipes = this.shuffleArray(recipes);
        this.setState({
          quizQuestions: shuffledRecipes,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
//Shuffles the Questions
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
    //Handles what happens when you select an answer
    const givenAnswer = event.currentTarget.value;
    const quizLength = this.state.quizQuestions.length;
    const questionCount = this.state.counter+1; 

    this.setState({
      answersCount: this.state.answersCount + 1,
      answer: givenAnswer 
    });

    console.log("required answer"+ JSON.stringify(this.state.quizQuestions[this.state.counter]) + "given" + givenAnswer);
    if (
      this.state.quizQuestions[this.state.counter].country !==
      givenAnswer 
    ) {
      this.setState({
        backgroundColor: 'red'
      });
      if (questionCount < quizLength) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(), 500);
      }
    } else {
      this.setState({
        backgroundColor: 'green',
        correctAnswersCounter: this.state.correctAnswersCounter+1,
      });
      if (questionCount < quizLength) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(), 500);
      }
    }
  }

  setNextQuestion() {
    this.setState(prevState => ({
      counter: prevState.counter +1,
      questionId: prevState.questionId +1 ,
      backgroundColor: 'white',
      answer: ''
    }));
  }
  setResults() {
    console.log("got to results" +this.state.correctAnswersCounter );
    this.setState({ result: String(this.state.correctAnswersCounter)});
  }

  renderQuiz() {
    const quizQuestions = this.state.quizQuestions;
    if (quizQuestions.length === 0) return null;

    const counter = this.state.counter;
    const currentQuestion = quizQuestions[counter];

    return (
      <CompleteQuestion
      question={currentQuestion}
       
        bgColor={this.state.backgroundColor}
        questionId={counter}
   
        questionTotal={this.state.quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} recipes={this.state.quizQuestions} />;
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
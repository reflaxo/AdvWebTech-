import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';

import "./App.css";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from "reactstrap";
import QuizApp from './components/Quiz/QuizApp.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FoodNavbar from './components/UsedForAll/Navbar.js';



class App extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    super(props);
    this.state = { apiResponse:[] , objToArr:[]};
}


  render() {

    const { isEditing } = this.state;
  
    return (
      <div>
       <Router>
    <div className="App">
    <header>
     <FoodNavbar/>
      </header>

      <body>

      <div>
      </div>
      </body>
    </div>
    </Router>

      </div>
    );
  }
}


function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}





export default App;

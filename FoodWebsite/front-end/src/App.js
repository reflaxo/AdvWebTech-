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

import Quiz from './components/Quiz/Quiz.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FoodNavbar from './components/UsedForAll/Navbar.js';


function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}


function App() {
  return (
    <Router>
    <div className="App">
    <header>
     <FoodNavbar/>
      </header>

      <body>

      </body>
    </div>
    </Router>

   
  );
} 



export default App;

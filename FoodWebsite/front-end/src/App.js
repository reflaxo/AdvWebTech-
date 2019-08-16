import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import FoodNavbar from "./components/UsedForAll/Navbar.js";
import RT_Footer from "./components/Footer/Footer";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (

      <div>
       
          <div className="App">
            <header>
              <FoodNavbar />
            </header>
           
                        <RT_Footer/>
                      
            <div />
          </div>
       
      </div>
    );
  }
}

export default App;

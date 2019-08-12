import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import FoodNavbar from "./components/UsedForAll/Navbar.js";
import RT_Footer from "./components/Footer/Footer";

class App extends Component {

  render() {
    return (

      <div>
        <Router>
          <div className="App">
            <header>
              <FoodNavbar />
            </header>
            <body>
                        <RT_Footer/>
                        </body>
            <div />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import FoodNavbar from './components/UsedForAll/Navbar.js';
import RT_Footer from "./components/Footer/Footer";


class App extends Component {
    //Constructor for defining start settings in this.state and binding functions

    constructor(props) {
        super(props);
        this.state = {apiResponse: [], objToArr: []};
    }

    render() {

        const {isEditing} = this.state;

        return (
            <div>
                <Router>
                    <div className="App">
                        <header>
                            <FoodNavbar/>
                        </header>
                        <body>
                        <RT_Footer/>
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

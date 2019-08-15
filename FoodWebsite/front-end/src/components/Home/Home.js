import React from "react";
import elham from "./Home.css";
//import Footer from './components/Footer/Footer.js';
//import FoodNavbar from './components/UsedForAll/Navbar.js';
class Home extends React.Component {
  render() {
    return (
      <div className="homeText">
        <img
          src={require("../../components/Images/khiyaar.jpg")}
          className="elham2"
          alt="aligment"
        />
        <div>
          <h3 className="sizeBozorg">Food culture</h3>
          <h2 className="homeText">NEC Blog</h2>
        </div>
      </div>
    );
  }
}

export default Home;

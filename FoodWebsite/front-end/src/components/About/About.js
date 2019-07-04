import React from 'react';
import './About.css';
class About extends React.Component {

  render() {
    var divStyle = {
      color: 'black',
      textShadow :  '2px 2px 2px black',
      fontsize: '300%',

    };
    return (
        <div className="App29292">
          <div>
            <h1  style={divStyle}>About us</h1>
            <div className="textBlackShadow">People also connect to their cultural
              or ethnic group through similar food patterns.
              People from different cultural backgrounds eat different foods.
              The ingredients, methods of preparation, preservation techniques
              and types of food eaten at different meals vary among cultures.
              The main purpose of this web site is  providing information to
              improve people knowledge about different countries food , make
              a fun to them as some quiz also give an idea to prepare different
              main course,  appetizer and dessert. </div>
          </div>
          <body>
          <img src={ require('../../components/Images/Aboutus.jpg')}  className="elham" alt="aligment"/>
          </body>
        </div>

    );
  }
}


export default About;

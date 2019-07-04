import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import '../../resource/template.css'
import'./Footer.css';

class RT_Footer extends Component{
  render(){

/*      var style = {
          backgroundColor: "#F8F8F8",
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",
          padding: "20px",
          position: "fixed",
          left: "0",
          bottom: "0",
          height: "60px",
          width: "100%",
      };

      var phantom = {
          display: 'block',
          padding: '20px',
          height: '60px',
          width: '100%',
      };*/
    return (
        <div className="footer">
            <a href="https://github.com/reflaxo/AdvWebTech-/tree/master/node%20Handson"> GitHub </a>
            <p>
                Copyright © FoodCulture 2019
            </p>
           {/* <a href=" https://twitter.com/foodatuoc?lang=de"> "fa fa-twitter" </a>
            <a href=" https://www.facebook.com/groups/389740687884630/" className={"fa fa-facebook"}>  </a>*/}
        </div>
    );
  }
}
export default RT_Footer;
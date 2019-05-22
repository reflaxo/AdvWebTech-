import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Form,
  Modal,
  NavDropdown,
  Button

} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../images/soco-logo.png";
import person from "../images/person.png";
import ChartAP from "./chartAP.js";
import ChartRU from "./chartRU.js";



//Small JSX Component exporting a button that changes looks when it's clicked
class WebNavbar extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);

    //This is were our start settings are defined:
    //We want our Edit button to show "off"/false
    this.state = {
      name: "xxx",
      age: 100,
      gender: "d",
      studyGroup: "NEC",
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true});
  }


  handleChange = evt => {
    //Sets state depending on the targets name and value (flexible)
    this.setState({ [evt.target.name]: evt.target.value });

  }

 //Sends a callback to our navbar on save (updates the text there)
  handleSave = event => {
    event.preventDefault();
    this.setState({ show: false });

     /*
    console.log(this.state);
    var newUserInfo = this.state;
    this.props.onNewUserInfo(newUserInfo);*/
  }


  //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {

    return (
      <div>
        <div>
     

            <Navbar bg="light" expand="lg" className="navbar navbar-expand-md sticky-top navbar-light bg-light shadow-sm" id="mainNav">
              <Navbar.Brand href="#home" className="h4 text-muted ml-2 mt-1">
                <img
                  alt=""
                  src={logo}
                  height="35"
                  className="d-inline-block"
                />
                {'React-based User Dashboard'}
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/AssignmentProgress">Assignment Progress</Nav.Link>
                  <Nav.Link href="/ResourcesUsage">Resources Usage</Nav.Link>
                  <NavDropdown title="User" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/#">
                  
                   Name: {this.props.userInfo[0]}<br/>
                   Age:{this.props.userInfo[1]}<br/>
                   Gender:{this.props.userInfo[2]}<br/>
                   StudyGroup:{this.props.userInfo[3]}<br/>
                
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/UserModal">Change User</NavDropdown.Item>
                  </NavDropdown>
                  <Navbar.Brand href="User" className="h4 text-muted ml-2 mt-1">
                    <img className="rounded-circle" height="35" alt="personicon" src={person} />
                  </Navbar.Brand>
                </Nav>
              </Navbar.Collapse>
            </Navbar>


            <Route path="/#" exact component={ChartAP} />
            <Route path="/AssignmentProgress" component={ChartAP} />
            <Route path="/ResourcesUsage" component={ChartRU} />
        </div>
        
      </div>
    );
  }
}

export default WebNavbar;
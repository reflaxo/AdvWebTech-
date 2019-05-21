import React, { Component } from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button
  
  } from "react-bootstrap";
  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
  import logo from "../images/soco-logo.png";
  import person from "../images/person.png";
  import ChartAP from "./chartAP.js";
  import ChartRU from "./chartRU.js";
  import UserModal from "./userModal.js";


//Small JSX Component exporting a button that changes looks when it's clicked
class WebNavbar extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.handleChange = this.handleChange.bind(this);

    //This is were our start settings are defined:
    //We want our Edit button to show "off"/false
    this.state = {
      userInfo:"default value",
      show:true
    };
  }

  handleChange = (newUserInfo) => {
    this.setState({userInfo: newUserInfo});
}

//Sets that the user modal shall be shown when you click on the user drop down (doesnt work)
setShow = () => {
  this.setState({show: true});
}


 
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {

    return (
      <div>
          <Router>

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
        {//Here should our code be that show the data we receive from userModal}
        }
       
          </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/ChangeUser" onClick={this.setShow}>Change User</NavDropdown.Item>
      </NavDropdown>
      <Navbar.Brand href="User" className="h4 text-muted ml-2 mt-1">
      <img className="rounded-circle" height="35" alt="personicon" src={person}/>
    </Navbar.Brand>   
    </Nav>
  </Navbar.Collapse>
</Navbar>

<UserModal show={this.state.show} onNewUserInfo={this.handleChange}/>

       <Route path="/#" exact component={ChartAP} />
        <Route path="/AssignmentProgress" component={ChartAP} />
        <Route path="/ResourcesUsage" component={ChartRU} />
        <Route path="/ChangeUser" component={UserModal} />
	    </Router>
      </div>
    );
  }
}

export default WebNavbar;
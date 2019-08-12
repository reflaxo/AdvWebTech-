import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import { BrowserRouter as Router, Route } from "react-router-dom";
import QuizApp from "../Quiz/QuizApp.js";
import About from "../About/About.js";
import Recipe from "../Recipe/Recipe.js";
import DetailRecipe from "../Recipe/DetailRecipe.js";
import Contact from  "../Contact/Contact.js";
import Home from "../Home/Home";
import Register from "../Auth/Register";
import Login from "../Auth/Login";



export default class FoodNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
<Router>
        <Navbar location={this.props.location} style={{backgroundColor: "lightyellow"}} light expand="md">
          <NavbarBrand href="/">FoodCulture</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/Quiz/">Quiz</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Country
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/Recipe/Germany">
                    Germany
                  </DropdownItem>
                  <DropdownItem href="/Recipe/Iran">
                   Iran
                  </DropdownItem>
                  <DropdownItem href="/Recipe/Korea">
                   Korea
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <NavLink href="/Contact/">Contact</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/About/">About Us</NavLink>
              </NavItem>


        
            </Nav>
          </Collapse>
        </Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/contact/" component={Contact} />
        <Route path={`/Recipe/:Country`}  component={Recipe} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path={`/detailRecipe/:recipeId`} render={(props) => <DetailRecipe {...props} name={props.name} />} />
        <Route path="/quiz" render={() => <QuizApp totalQuestions={10} />}/>
        </Router>
      </div>
    );
  }
}


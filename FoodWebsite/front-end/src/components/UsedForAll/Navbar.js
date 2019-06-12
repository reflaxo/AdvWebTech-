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
  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import QuizApp from "../Quiz/QuizApp.js";
import About from "../About/About.js";
import Recipe from "../Recipe/Recipe.js";



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
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">FoodCulture</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/Quiz/">Quiz</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/About/">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Recipe/">Country</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>


        <Route path="/" exact component={Recipe} />
        <Route path="/about/" component={About} />
        <Route path="/recipe/" component={Recipe} />
        <Route path="/quiz" render={() => <QuizApp totalQuestions={10} />}/>
        </Router>
      </div>
    );
  }
}
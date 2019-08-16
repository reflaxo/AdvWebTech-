import React from 'react';
import {
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  import { Nav} from "tabler-react";
  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
      isOpen: false,
      loggedIn:false
    };

    this.logout = this.logout.bind(this);
  }
  componentDidMount(){
   if( localStorage.getItem('jwtToken')){
    this.setState({
      loggedIn:true
    });
   }
  
  }

  logout(){
    localStorage.removeItem('jwtToken');
    window.location.reload();
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

<Nav location={this.props.location} style={{backgroundColor: "lightyellow"}} light expand="md">
<LinkContainer to="/login">
  <Nav.Item
    hasSubNav
    value="Menu 1"
  
    subItems={
      <React.Fragment>
        <Nav.SubItem value="Sub Item 1" />
        <Nav.SubItem>Sub Item 2</Nav.SubItem>
        <Nav.SubItem icon="globe">Sub Item 3</Nav.SubItem>
      </React.Fragment>
    }
  />
    </LinkContainer>
    <Nav.Item
    hasSubNav
    value="Menu 1"
    subItems={
      <React.Fragment>
        <Nav.SubItem value="Sub Item 1" />
        <Nav.SubItem>Sub Item 2</Nav.SubItem>
        <Nav.SubItem icon="globe">Sub Item 3</Nav.SubItem>
      </React.Fragment>
    }
  />
</Nav>

       
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/contact/" component={Contact} />
        <Route path={`/Recipe/:Country`}  component={Recipe} />
           <Route path="/contact/" component={Contact} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Login" component={Login} />
        <Route path={`/detailRecipe/:recipeId`} render={(props) => <DetailRecipe {...props} name={props.name} />} />
        <Route path="/quiz" render={() => <QuizApp totalQuestions={10} />}/>
        </Router>
      </div>
    );
  }
}

/*
 <Navbar location={this.props.location} style={{backgroundColor: "lightyellow"}} light expand="md">
          <NavbarBrand href="/">FoodCulture</NavbarBrand>
      
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              {this.state.loggedIn?(<div>Your are logged in</div>):(
                 <div><NavLink href="/Login/">Login</NavLink></div>
              )}
              </NavItem>
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
              <Link to="/">Home</Link>
                <NavLink href="/About/">About Us</NavLink>
              </NavItem>
              <NavItem>
              {this.state.loggedIn?(<div><NavLink onClick={this.logout} href="/">Logout</NavLink></div>):(
                 <div>   <NavLink href="/Register/">Sign Up</NavLink></div>
              )}
             
              </NavItem>
    


        
            </Nav>
          </Collapse>*/ 
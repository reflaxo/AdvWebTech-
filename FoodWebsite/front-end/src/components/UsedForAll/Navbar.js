import React from 'react';
import {
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
NavbarBrand,
Navbar,
NavbarToggler,
NavItem,
 } from 'reactstrap';


  import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import QuizApp from "../Quiz/QuizApp.js";
import About from "../About/About.js";
import Recipe from "../Recipe/Recipe.js";
import DetailRecipe from "../Recipe/DetailRecipe.js";
import Contact from  "../Contact/Contact.js";
import Home from "../Home/Home";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import {authStatus, logout} from "./authStatus";



export default class FoodNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  componentDidUpdate(){
    console.log(authStatus);
   /*if(localStorage.getItem('jwtToken')){
     if(this.state.loggedIn=false){
    this.setState({
      loggedIn:true
    });
  }*/
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
          
          <NavbarBrand to="/">FoodCulture</NavbarBrand>
      
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavItem>
              {authStatus?(<div>Your are logged in</div>):(
                 <div><Link to="/Login/">Login</Link></div>
              )}
              </NavItem>
              <NavItem>
                <Link to="/">Home</Link>
              </NavItem>

              <NavItem>
                <Link to="/Quiz/">Quiz</Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Country
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <Link to="/Recipe/Germany">Germany</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to="/Recipe/Iran">Iran</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to="/Recipe/Korea">Korea</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <Link to="/Contact/">Contact</Link>
              </NavItem>

              <NavItem>
                <Link to="/About/">About Us</Link>
              </NavItem>
              <NavItem>
              {authStatus?(<div><Link onClick={logout} to="/">Logout</Link></div>):(
                 <div>   <Link to="/Register/">Sign Up</Link></div>
              )}
             
              </NavItem>
    

              </Collapse>
            </Navbar>
      


       
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


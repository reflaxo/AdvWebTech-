import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Card, Grid, Button} from "tabler-react";
import AlertNote from "../UsedForAll/AlertNote.js";


class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      password: "",
      passwordCheck: "",
      errors: "",
      error: false,
      success: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e){
    e.preventDefault();
 
    const data={name: this.state.name, 
      password: this.state.password, 
      password2: this.state.passwordCheck}

    axios.post("/auth/register",data)
        .then((res) => {
          //maybe instead of catching error we can get the message?
          if (res.status === 400 || res.status === 500) {
            this.setState({error: true, errors:res.message})
          }
          else{
            this.setState({success: true})
            setTimeout(function(){
                 this.setState({success:false});
            }.bind(this),3000);  // wait 3 seconds, then reset to false
          }
        }).catch((error) => {
        console.log(error);
          this.setState({error: true, errors:error.message})
          setTimeout(function(){
               this.setState({error:false});
          }.bind(this),10000); 
    });

}

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <AlertNote type="success" text="Registration was successful" success={this.state.success}/>
        <AlertNote type="danger" text={this.state.errors} success={this.state.error}/>
        <Grid.Row>
          <h4>
            <b>Welcome</b>
          </h4>
        </Grid.Row>
        <Grid.Row alignItems="center">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Grid.Row>
        <Grid.Col xl={4} lg={8} md={4} sm={10} xs={8}>
        <Card title="Register below">
          
        <Grid.Col alignItems="center" lg={8} md={10} sm={10} xs={10} >
        <Form  >
    
            <Form.Group label="Username" isRequired>
              <Form.Input
                icon="user"
                placeholder="Username"
                onChange={this.onChange}
                name="name"
                type="text"
              />
            </Form.Group>
       
    
            <Form.Group label="Password" isRequired>
              <Form.Input
                name="password"
                placeholder="Password..."
                onChange={this.onChange}
                type="password"
                
                id="password"
              />
            </Form.Group>
      
            <Form.Group label="Username" isRequired>
              <Form.Input
                name="passwordCheck"
                placeholder="Password..."
                type="password"
                onChange={this.onChange}
                id="passwordCheck"
              />
            </Form.Group>
            <Button color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
        </Form>
     
        </Grid.Col>
        </Card>
        </Grid.Col>
        
        <Link to="/">
          <Grid.Row>
        <i className="fa fa-chevron-left"></i><p>Back to home</p></Grid.Row>
        </Link>
      </div>
    );
  }
}
export default Register;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Card, Grid} from "tabler-react";


class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("recipe", this.state.password);
    formData.append("country", this.state.password2);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios.post("/auth/register", formData, config).then(result => {
      console.log(formData);
      this.props.history.push("/login");
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
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
          
        <Grid.Col alignItems="center" xl={4} lg={8} md={4} sm={10} xs={8}>
        <Form  >
    
            <Form.Group label="Username" isRequired>
              <Form.Input
                icon="user"
                placeholder="Username"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
              />
            </Form.Group>
       
    
            <Form.Group label="Password" isRequired>
              <Form.Input
                name="password"
                placeholder="Password..."
                type="password"
              />
            </Form.Group>
      
            <Form.Group label="Username" isRequired>
              <Form.Input
                name="passwordcheck"
                placeholder="Password..."
                type="passwordcheck"
              />
            </Form.Group>
      
        </Form>
        </Grid.Col>
        </Card>
        </Grid.Col>
        
        <Link to="/">
          <Grid.Row>
        <i className="fa fa-chevron-left"></i><p>    Back to home</p></Grid.Row>
        </Link>
      </div>
    );
  }
}
export default Register;

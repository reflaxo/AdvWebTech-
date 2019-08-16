import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import AlertNote from "../UsedForAll/AlertNote.js";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      password: "",
      name: "",
      errors: "",
      success: false,
      error: false
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      password: this.state.password
    };
    console.log(userData);

    axios
      .post("/auth/login", userData)
      .then(result => {
        console.log(result);
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ message: "" });
        this.setState({ success: true });

        this.props.updateUser({
          loggedIn: true,
          name: this.state.name
        })
        setTimeout(
          function() {
            this.setState({ success: false });
            this.props.history.push("/");
          }.bind(this),
          3000
        );
      
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true, errors: error.message });
        setTimeout(
          function() {
            this.setState({ error: false });
          }.bind(this),
          10000
        );
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <AlertNote
          type="success"
          text="Registration was successful"
          success={this.state.success}
        />
        <AlertNote
          type="danger"
          text={this.state.errors}
          success={this.state.error}
        />
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="username"
                  name="name"
                  type="username"
                />
                <label htmlFor="username">username</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  name="password"
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

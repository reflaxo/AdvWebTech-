import React, { Component } from "react";

//Small JSX Component exporting a button that changes looks when it's clicked
class WebFooter extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.onEdit = this.onEdit.bind(this);

    //This is were our start settings are defined:
    //We want our Edit button to show "off"/false
    this.state = {
      isEditing: false
    };
  }

  onEdit(ev) {
    //New State is set
    this.setState( () => ({ isEditing: !this.state.isEditing }));
  }
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    //The value of isEditing is called from the state
    const { isEditing } = this.state;
    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.
    return (
        <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 text-muted">
              Bootstrap documentation can be found <a href="https://getbootstrap.com/">here</a>.
            </div>
            
            <div className="col-6">
              <div className="row justify-content-end">
                <div className="col-auto">
                  <a href="#">Facebook</a>
                  <a className="mx-3" href="#">Twitter</a>
                  <a href="#">GitHub</a>
                </div>
              </div>
              <div className="row justify-content-end"> 
                <div className="col-auto">
                  <p className="copyright text-muted">Copyright &copy; SoCo 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>	
      
    );
  }
}

export default WebFooter;
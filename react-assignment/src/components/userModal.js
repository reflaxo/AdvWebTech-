import React, { Component } from "react";
import {
    Form,
    Button,
    Modal
   } from "react-bootstrap";
   
//Small JSX Component exporting a button that changes looks when it's clicked
class UserModal extends Component {
  //Constructor for defining start settings in this.state and binding functions
constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    
    this.state = {
      name: "xxx",
      age: 100,
      gender: "d",
      studyGroup: "NEC",
      show: true,
      path: ""
    };
  }

  //Send state data after mounting to parent
  componentDidMount(){ 
    this.setState({ path: this.props.path});
    console.log("UserModelMounted" + this.props.path);
    const { callbackFromParent} = this.props;
    var newUserInfo = this.state;
    if (callbackFromParent) {
      callbackFromParent(newUserInfo);
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  
  handleChange  = evt =>  {
//Sets state depending on the targets name and value (flexible)
      this.setState({ [evt.target.name]: evt.target.value });
     
  }
  
//Sends a callback to our navbar on save (updates the text there)
  handleSave = event => {
    event.preventDefault();

    console.log("save" + this.state);
    var newUserInfo = this.state;
    const { callbackFromParent} = this.props;

    if (callbackFromParent) {
      callbackFromParent(newUserInfo);
    }
   }
  
    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {

    return (
      <div>
      {this.state.path && this.state.path.includes('User') &&

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    <Form>
  <Form.Group controlId="NameID">
    <Form.Label>Name</Form.Label>
    <Form.Control name="name" value={this.state.value} type="name"  onChange={this.handleChange.bind(this)} placeholder="Enter name" />
  </Form.Group>

  <Form.Group controlId="AgeID">
    <Form.Label>Age</Form.Label>
    <Form.Control name="age"  value={this.state.value}  onChange={this.handleChange.bind(this)} type="age" placeholder="Age" />
  </Form.Group>

 

  <Form.Group controlId="GenderID">
      <Form.Label>Gender</Form.Label>
      <Form.Control name="gender" value={this.state.value}  onChange={this.handleChange.bind(this)} as="select">
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Diverse">Diverse</option>
      </Form.Control>
    </Form.Group>


  <Form.Group controlId="StudyGroupID">
    <Form.Label>Study Group</Form.Label>
    <Form.Control value={this.state.value} type="studyGroup"  onChange={this.handleChange.bind(this)} placeholder="Name of your study group" />
  </Form.Group>
</Form>
  </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>   
}
      </div>
    );
  }
}

export default UserModal;
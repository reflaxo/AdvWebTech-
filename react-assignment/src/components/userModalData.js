

  import React, { Component } from "react";
import UserModal from "./userModal.js";
/*
//Small JSX Component exporting a button that changes looks when it's clicked
class UserModalData extends Component {
  //Constructor for defining start settings in this.state and binding functions

  constructor(props) {
    //properties given to us by other components are connected with "props"
    super(props);
    //You need to bind a function in the constructor to call it throughout the class
    this.myCallback= this.myCallback.bind(this);

    //This is were our start settings are defined:
    //We want our Edit button to show "off"/false
    this.state = {
      isEditing: false,
      show: false,
      userInfo:["array","default","default","default"]
    };
  }

  myCallback(UserData) {
    console.log("myCallback works" +  UserData);
    var tempArray = Object.values(UserData);
    this.setState(
      prevState => ({
        ...prevState,
        cards: {
          ...prevState.cards,
          userInfo: tempArray
        }
      })
    );
  }


    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    //The value of isEditing is called from the state

    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.
    return (
      <div>
 <UserModal show={this.show} callbackFromParent={this.myCallback.bind(this)}/>
    <p>
Username:
  {this.state.userInfo[0]}
  Age:{this.state.userInfo[1]}
  Gender:{this.state.userInfo[2]}
  Study Group:{this.state.userInfo[3]}</p>
      </div>
    );
  }
}

export default UserModalData;*/
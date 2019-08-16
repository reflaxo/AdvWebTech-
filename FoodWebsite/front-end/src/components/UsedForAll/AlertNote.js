import React from "react";
import {
    Alert,
  } from "reactstrap";

const AlertNote = (props) => {

        return <div>
        {props.success === true &&
            <div>
        <Alert color={props.type}>
        <strong>{props.text}</strong> 
        </Alert></div>}
             </div>
      }

      export default AlertNote;
import React, { Component } from "react";
import {
   Card  
  } from "react-bootstrap";

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Small JSX Component exporting a button that changes looks when it's clicked
class OverviewCard extends Component {

  render() {

    return (

      <div className="col-xl-3 col-md-6 order-md-1 order-xl-1 mb-4">
      <Card bg="white" className={this.props.shape} style={{borderColor: this.props.leadColor}}>
    <Card.Body>
      <Card.Title style={{color:this.props.leadColor}}>{this.props.title}</Card.Title>
      <Card.Text>
        {this.props.text} <FontAwesomeIcon icon={this.props.icon} />
      </Card.Text>
    </Card.Body>
  </Card>
</div>




    );
  }
}

export default OverviewCard ;
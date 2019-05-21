import React, { Component } from "react";
import Chart from "chart.js";

 
//Small JSX Component exporting a button that changes looks when it's clicked
class ChartRU extends Component {
    chartRef = React.createRef();

    componentDidMount() {
    const RU = this.chartRef.current.getContext("2d");
   
    
    new Chart(RU, {
    type: 'doughnut',
    data: {
      labels: ["Google Search", "Moodle", "YouTube"],
      datasets: [{
        data: [55, 30, 15],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: true
      },
      cutoutPercentage: 80,
    },
  });
}
  

  render() {
    //The value of isEditing is called from the state
    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.
    return (
      <div>
		<div class="col mt-4 mt-md-0">
			  <div class="card shadow">
				<div class="card-header">
				  <h6 class="m-0 font-weight-bold text-primary">My Learning Resources Usage</h6>
				</div>
				<div class="card-body">
                <canvas
                id="myResourcesChart"
                ref={this.chartRef}
            />
				</div>
			  </div>
			</div>
		</div>


    );
  }
}


export default ChartRU;
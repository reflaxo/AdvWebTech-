import React, { Component } from "react";
import Chart from "chart.js";


//Small JSX Component exporting a button that changes looks when it's clicked
class ChartAP extends Component {
  //Constructor for defining start settings in this.state and binding functions
  chartRef = React.createRef();

  componentDidMount() {
  const AP = this.chartRef.current.getContext("2d");
 
  
  new Chart(AP, {
    type: 'line',
    data: {
      labels: ["Assignment 1", "Assignment 2", "Assignment 3", "Assignment 4", "Assignment 5"],
      datasets: [{
        label: "Points",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: [2.7, 1.0, 2.3, 2.0, 4.0],
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 5
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': ' + tooltipItem.yLabel;
          }
        }
      }
    }
});
}


    //Here is where our HTML-Markup is designed, in this case just our Edit Button
  render() {
    //The value of isEditing is called from the state
    //Our text is called with this.props;
    //const{text}= this.props.text;
    //Here starts our HTML, Javascript is marked with "{}" brackets.
    return (
      <div>
   	<div class="container-fluid">
		<div class="row">

			<div class="col">
			  <div class="card shadow">
				<div class="card-header">
				  <h6 class="m-0 font-weight-bold text-primary">My Assignments Progress</h6>
				</div>
				<div class="card-body">
        <canvas
                    id="Assignment Progress"
                    ref={this.chartRef}
                />
				</div>
			  </div>
			</div>
		</div>
	</div>
	
	<div class="container-fluid">
		<div class="row">
      </div>
      </div>
      </div>
    );
  }
}



export default ChartAP;
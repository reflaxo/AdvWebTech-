var mongoose = require('mongoose');


//Define a schema
//========= Task 2.1 Start ====================
var Schema = mongoose.Schema;

var TaskSchema = new Schema(
  {
    taskName: {type: String, required: true, max: 100},
    workEffort: {type: Number, required: true, max: 1000},
    deadline: {type: Date, required: false},
  }
);
//========= Task 2.2 End ======================

// Virtual for displaying all the Data
TaskSchema
.virtual('allData')
.get(function () {
  //Enter the correct return here (should display the Vars you defined above)
  return '  Name:  ' + this.taskName + '  Work Effort:  ' + this.workEffort + 'min' + '  Deadline:  '+ this.deadline.toDateString();
});


//Look at this example for inspiration
/*
TaskSchemaExample
.virtual('allData')
.get(function () {
  //Enter the correct return here (should display the Vars you defined above)
  return '  Patient:  ' + this.patientName + 
  '  Sickness:  ' + this.sickness + 
  '  Release Date:  '+ this.releaseDate.toDateString();
});*/


// Virtual for author's URL
TaskSchema
.virtual('url')
.get(function () {
  return '/task/' + this._id;
});

//Export model
//========= Task 1.3 Start ====================
module.exports = mongoose.model('Task', TaskSchema);
//========= Task 1.3 End ======================

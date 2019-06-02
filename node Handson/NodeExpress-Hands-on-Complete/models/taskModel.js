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
//========= Task 2.1 End ======================

//========= Task 3.4 Define a virtual for allData ======================
TaskSchema
.virtual('allData')
.get(function () {
  //Enter the correct return here (should display the Vars you defined above)
  return '  Name:  ' + this.taskName +
   '  Work Effort:  ' + this.workEffort + 'min' +
    '  Deadline:  '+ this.deadline.toDateString();
});


//Look at this example for inspiration for 3.4
/*
TaskSchemaExample
.virtual('allData')
.get(function () {
  //Enter the correct return here (should display the Vars you defined above)
  return '  Patient:  ' + this.patientName + 
  '  Sickness:  ' + this.sickness + 
  '  Release Date:  '+ this.releaseDate.toDateString();
});*/

var Schema = mongoose.Schema;

var MarvelSchema = new Schema(
  {
    superheroName: {type: String, required: true, max: 100},
    strengthAsNumber: {type: Number, required: true, max: 1000},
    birthDate: {type: Date, required: false},
  }
);

//========= Task 3.1 - Export model====================
module.exports = mongoose.model('Marvel', MarvelSchema);


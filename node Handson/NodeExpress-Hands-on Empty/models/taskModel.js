var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define a schema
//========= Task 2.1 Start ====================


//========= Task 2.1 End ======================

//========= Task 3.4 Define a virtual for allData ======================


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


// Virtual for author's URL
TaskSchema
.virtual('url')
.get(function () {
  return '/task/' + this._id;
});

//Export model
//========= Task 3.1 - Export model====================


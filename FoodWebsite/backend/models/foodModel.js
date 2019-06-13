var mongoose = require('mongoose');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var photoSchema = new Schema({

  path:  { type: String },
  caption: { type: String },
  question: {type: String, required: false, max: 1000},
    image: 
      { data: Buffer, contentType: String },
    answers: [{
      rightwrong: String,
      content: String
   },{
    rightwrong: String,
    content: String
 },
 {
  rightwrong: String,
  content: String
}
  ],
    recipe: {type: String, required: false, max: 100000},
  }
  );

module.exports = mongoose.model('Photos', photoSchema);



/*
var foodSchema = new Schema(
  {
    question: {type: String, required: false, max: 1000},
    image: 
      { data: Buffer, contentType: String },
    answers: [{
      type: String,
      content: String
   },{
    type: String,
    content: String
 },
 {
  type: String,
  content: String
}
  ],
    recipe: {type: String, required: false, max: 100000},
  }
);*/
//========= Task 2.1 End ======================




//Export model
//========= Task 3.1 - Export model====================
//module.exports = mongoose.model('Food', foodSchema);


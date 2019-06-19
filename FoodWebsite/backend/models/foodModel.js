var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//Creates the Schema for our Database storage of the recipes data
//For long term plan: Change answers to country! We don't need both
var foodSchema = new Schema({
  name:{type: String,  max: 1000},
  question: {type: String,  max: 10000},
  image:  { data: Buffer, contentType: String },
  foodType:{type: String,  max: 100},
  Country: {type: String,  max: 100},
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

module.exports = mongoose.model('Food', foodSchema);


//========= Task 2.1 End ======================




//Export model
//========= Task 3.1 - Export model====================
//module.exports = mongoose.model('Food', foodSchema);


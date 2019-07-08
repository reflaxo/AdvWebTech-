var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//Creates the Schema for our Database storage of the recipes data
//For long term plan: Change answers to country! We don't need both
var foodSchema = new Schema({
  name:{type: String,  max: 1000},
  question: {type: String,  max: 10000},
  image:  { data: Buffer, contentType: String },
  foodType:{type: String,  max: 100},
  country: {type: String,  max: 100},
  ingridients: {type: String,  max: 1000},
  recipe: {type: String, required: false, max: 100000},
  }
  );

  

module.exports = mongoose.model('Food', foodSchema);




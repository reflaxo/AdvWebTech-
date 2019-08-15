var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//Creates the Schema for our Database storage of the recipes data
//For long term plan: Change answers to country! We don't need both
var contactSchema = new Schema({
  firstName:{type: String,  max: 1000},
  lastName:{type: String,  max: 1000},
  eMail:{type: String,  max: 1000},
  subject:{type: String,  max: 1000},
  }
  );

module.exports = mongoose.model('Contact', contactSchema);
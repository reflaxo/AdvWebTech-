//Connect to Mongo database
const mongoose = require("mongoose");

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Connect to MongoDb Online
const MongoClient = require('mongodb').MongoClient;
const db = require("../config/keys").mongoURI;
const client = new MongoClient(db);


module.exports = client;

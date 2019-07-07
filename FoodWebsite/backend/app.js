var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose');
var FoodRouter = require('./routes/foodData');

require("./models/foodModel");
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adWebTechSS19:webTechSS19@cluster0-2i0wj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  if (err) console.log('failed to connect');
  else {
    console.log('connected');
    database = client.db("Web");
    foodCollection = database.collection("Food");
    console.log("Connected to `" + "Web" + "`!");
  }
});

//Get the default connection
//var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://reflaxo:lionthe12DB#@cluster0-shard-00-00-2i0wj.mongodb.net:27017,cluster0-shard-00-01-2i0wj.mongodb.net:27017,cluster0-shard-00-02-2i0wj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("Web").collection("Food");
  // perform actions on the collection object
  client.close();
});*/


var app = express();
app.use(cors());
app.use('/', FoodRouter);
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

module.exports = app;

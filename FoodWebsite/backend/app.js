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

//Connect to MongoDb Online
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adWebTechSS19:webTechSS19@cluster0-2i0wj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  if (err) console.log('failed to connect');
  else {
    console.log('connected');
    database = client.db("Web");
    foodCollection = database.collection("Food");
    contactCollection = database.collection("Contact");
    console.log("Connected to `" + "Web" + "`!");
  }
});



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

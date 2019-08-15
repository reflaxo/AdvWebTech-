var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose');
var FoodRouter = require('./routes/foodData');
const UsersRouter = require("./routes/users");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./models/foodModel");
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Connect to MongoDb Online
const MongoClient = require('mongodb').MongoClient;
const db = require("./config/keys").mongoURI;
const client = new MongoClient(db);


client.connect()
  .then(() => {
    console.log('connected');
    database = client.db("Web");
    foodCollection = database.collection("Food");
    contactCollection = database.collection("Contact");
    userCollection = database.collection("Users");
    console.log("Connected to `" + "MongoDB Web Client" + "`!");})
  .catch(err => console.log(err));
;



var app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', FoodRouter);
app.use('/auth', UsersRouter);


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

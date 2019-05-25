var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Task 1.2: Put link to new File here:
var tasksRouter = require('./routes/tasks');

//Task 2.1: Set Up the Database
const mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost:27017/hands-on';
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Students = require('./models/students.model');

app.get('/', (req, res) => res.sendFile('resources/Dashboard.html', {root: __dirname}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//Tasks 1.2. : Put new Path here:
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

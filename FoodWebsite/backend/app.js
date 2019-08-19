var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var FoodRouter = require("./routes/foodData");
const UsersRouter = require("./routes/users");
const ContactRouter = require("./routes/contact");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./models/foodModel");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const clientInstance = require("./models/mongo");

var app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// parse application/json
app.use(bodyParser.json());

clientInstance
  .connect()
  .then(() => {
    console.log("connected");
    database = clientInstance.db("Web");
    foodCollection = database.collection("Food");
    contactCollection = database.collection("Contact");
    userCollection = database.collection("Users");
   app.emit('dbready'); 
    console.log("Connected to `" + "MongoDB Web Client" + "`!");
  })
  .catch(err => {
    /** handle initial connection error */

    console.log("error connecting to Mongo: ");
    console.log(err);
  });

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser
//require("./config/passport")(passport);
//const passport = require('../config/passport');


app.on('dbready', function() {

app.use(
  session({
    secret: "party-gandalf", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ client: clientInstance}),
    resave: false, //required
    saveUninitialized: false //required
  }));
});

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", FoodRouter);
app.use("/contact", ContactRouter);
app.use("/auth", UsersRouter);

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

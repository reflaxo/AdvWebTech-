
const LocalStrategy = require("passport-local").Strategy;
const Validator = require("validator");
const isEmpty = require("is-empty");
let message= "";
// Convert empty fields to an empty string so we can use validator functions


const strategy = new LocalStrategy(
  {
    usernameField: "name",
    passReqToCallback: true
  },
  function(req, name, password, done) {
    name = !isEmpty(name) ? name : "";
    password = !isEmpty(password) ? password : "";

    userCollection.findOne({ name: name }, (err, user) => {
      if (err) {
        console.log("local strategy error");
        return done(err);
      }
      if (!user) {
        console.log("local strategy incorrect username");
        return done(null, false, { message: "Incorrect username" });
      }
      if (!user.isActive) {
        console.log("local strategy user not active");
        return done(null, false, { message: "User is not active" });
      }
      
        if (Validator.isEmpty(password)) {
          message= "Password field is required";
        }
        if (Validator.isEmpty(name)) {
          message = "Password field is required";
        }
        if (Validator.isEmpty(password)) {
          message = "Password field is required";
        }
      return done(null, user);
    });
  }
);

module.exports = strategy;

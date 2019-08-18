const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User= require("../models/userModel");
const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
console.log("passport" + JSON.stringify(opts));
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      userCollection.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return console.log("user was found" + user)
            done(null, user);
          }
          return console.log("user was not found" + jwt_payload)
          done(null, false);
        })
        .catch(err => console.log("an error occured" + err));
    })
  );
};


//doesn'T work but why -> always assumes error
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User= require("../models/userModel");



router.post("/register", (req, res) => {
console.log("Came to register")
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);


// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
userCollection.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json("Name already exists - please choose another one");
    } else {
      const newUser = new User({
        name: req.body.name,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
         
            userCollection.insert(newUser, (error, result) => {
              if(error) {
                  return  response.status(500).send(error);
              }
              console.log(result);
              res.send(result.result);
          });
        });
      });
    }
  });
});



router.post("/login", (req, res) => {
  // Form validation
  console.log(req.body);

  
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password = req.body.password;
// Find user by email
  userCollection.findOne({ name: req.body.name }).then(user => {
    // Check if user exists
    if (!user) {
      return   res.status(404).json({ usernotfound: "User not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          (err, token) => {
            res.json({
              success: true,
              token: "JWT " + token
            });
          }
        );
      } else {
        return  console.log("wrong PW");
        res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
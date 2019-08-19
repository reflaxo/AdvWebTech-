const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
// Load User model
const User = require("../models/userModel");


//registerUser
exports.addUser = function(req, res) {
  const { message, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(message);
  }
  userCollection.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res
        .status(400)
        .json("Name already exists - please choose another one");
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
            if (error) {
              return response.status(500).send(error);
            }
            res.send(result.result);
          });

        });
      });
    }
  });
};

//Login
exports.login = function(req, res) {

  const password = req.body.password;
  // Find user by email
  userCollection.findOne({ name: req.body.name }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
        jwt.sign(payload, keys.secretOrKey, (err, token) => {
          res.json({
            success: true,
            token: "JWT " + token,
    
          });
        });
      } else {
        res.status(400).json({ message: "Password incorrect" });
      }


    });

 
  });
};

exports.findAll=function(req, res) {
    userCollection.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

  exports.findOne=function(req, res) {
    userCollection.findOne({}, (err, user) => {
      if (err) {
        console.log("findOne error:", err);
      } else {
        res.json(user.username);
      }
    });
  }
  exports.findById=function(req, res) {
    userCollection.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

  exports.update = function(req, res) {
    console.log(
      "attempting to update the following user information:",
      req.body,
      req.params.id
    );
    // Four cases:
    /* Case 1: Both username and email are provided in the PUT request
    --Find a db entry that has either the username OR the email, but the id does not match.
    --Check which match was found.
    --If username matches, send message that the username is already taken.
    --If email matches, send message that the email is already taken.
    --If no matches found, update the user data. */
    if (req.body.username && req.body.email) {
      userCollection.findOne(
        {
          $or: [
            { username: req.body.username, _id: { $ne: req.params.id } },
            { email: req.body.email, _id: { $ne: req.params.id } }
          ]
        },
        (err, user) => {
          if (err) {
            console.log("User.js post error: ", err);
          } else if (user) {
            if (
              user.username === req.body.username &&
              user.email === req.body.email
            ) {
              res.json({
                error: `Sorry, already a user with the username: ${
                  req.body.username
                } and email: ${req.body.email}`
              });
            } else if (user.username === req.body.username) {
              res.json({
                error: `Sorry, already a user with the username: ${
                  req.body.username
                }`
              });
            } else if (user.email === req.body.email) {
              res.json({
                error: `Sorry, already a user with the email: ${req.body.email}`
              });
            }
          } else {
            // Password resets will be handled in a different function altogether.
            // Hashes password before updating db
            // req.body.password = bcrypt.hashSync(req.body.password, 10);
            db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
              .then(dbModel => res.json(dbModel))
              .catch(err => res.status(422).json(err));
          }
        }
      );
    }

    /* Case 2: Only the username is provided in the PUT request.
    --Find db entry that has the same username, but the id does not match.
    --If a match is found, send message that the username is taken, otherwise update the user data. */
    if (req.body.username && !req.body.email) {
      userCollection.findOne(
        { username: req.body.username, _id: { $ne: req.params.id } },
        (err, user) => {
          if (err) {
            console.log("User.js post error: ", err);
          } else if (user) {
            res.json({
              error: `Sorry, already a user with the username: ${
                req.body.username
              }`
            });
          } else {
            // Password resets will be handled in a different function altogether.
            // Hashes password before updating db
            // req.body.password = bcrypt.hashSync(req.body.password, 10);
            userCollection.findOneAndUpdate({ _id: req.params.id }, req.body)
              .then(dbModel => res.json(dbModel))
              .catch(err => res.status(422).json(err));
          }
        }
      );
    }

    /* Case 3: Only the email is provided in the PUT request
    --Find db entry with matching email
    --If a match is found, send message that the email is taken, otherwise update the user data. */
    if (req.body.email && !req.body.username) {
      userCollection.findOne(
        { email: req.body.email, _id: { $ne: req.params.id } },
        (err, user) => {
          if (err) {
            console.log("User.js post error: ", err);
          } else if (user) {
            res.json({
              error: `Sorry, already a user with the email: ${req.body.email}`
            });
          } else {
            // Password resets will be handled in a different function altogether.
            // Hashes password before updating db
            // req.body.password = bcrypt.hashSync(req.body.password, 10);
            userCollection.findOneAndUpdate({ _id: req.params.id }, req.body)
              .then(dbModel => res.json(dbModel))
              .catch(err => res.status(422).json(err));
          }
        }
      );
    }

    /* Case 4: Neither username nor email are provided, but data needs to be updated
    --No duplicate checking needed, just findone and update.*/
    if (!req.body.email && !req.body.username) {
      userCollection.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  }

  exports.updatePassword= function(req, res) {
    console.log(
      "attempting to update the following Password information:",
      req.body,
      req.params.id
    );
    // Find the user by id provided in PUT request
    userCollection.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        console.log("User.js post error: ", err);
      } else if (user) {
        // Decrypt the current password in the database and confirm the current password provided is the correct match. If no match, return an error.
        const passMatch = bcrypt.compareSync(req.body.current, user.password);
        console.log("comparing password match: " + passMatch);
        if (!passMatch) {
          res.json({
            error: `Incorrect Password.`
          });
        } else if (passMatch) {
          // Hashes password before updating db
          console.log("req.body.new before encryption: " + req.body.new);
          req.body.new = bcrypt.hashSync(req.body.new, 10);
          console.log("req.body.new after encryption: " + req.body.new);
          userCollection.findOneAndUpdate(
            { _id: req.params.id },
            { password: req.body.new }
          )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
      }
    });
  }
  exports.remove = function(req, res) {
    userCollection.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }



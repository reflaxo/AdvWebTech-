const express = require("express");
const router = express.Router();
var usersController = require("../controllers/usersController");
//const passport = require('../config/passport');
const jwt = require("jsonwebtoken");
const jwtVerify = require('../config/jwt');

const passport = require('../config/passport');

router.post("/register",  usersController.addUser);

// Matches with "/api/users"
router
  .route("/")
  .get(jwtVerify.confirmToken, jwtVerify.verifyToken, usersController.findAll);

// Matches with "/api/users/check"
router.route("/check").get(usersController.findOne);

// Matches with "/users/current"
router
  .route("/current")
  .get(jwtVerify.confirmToken, jwtVerify.verifyToken, (req, res, next) => {
    if (req.user) {
      console.log("req.user", req.user);
      res.json({ user: req.user, authenticated: req.isAuthenticated() });
    } else {
      res.json({ user: null });
    }
  });

//User login on /users/login
router.route("/login").post(passport.authenticate("local"), usersController.login);

//User logout on /users/logout
router.route("/logout").post((req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

// Matches with "/users/:id"
router
  .route("/:id")
  .get(usersController.findById)
  .put(jwtVerify.confirmToken, jwtVerify.verifyToken, usersController.update)
  .delete(usersController.remove);

// Matches with "/users/password/:id"
router
  .route("/password/:id")
  .get(usersController.findById)
  .put(
    jwtVerify.confirmToken,
    jwtVerify.verifyToken,
    usersController.updatePassword
  )
  .delete(usersController.remove);

module.exports = router;




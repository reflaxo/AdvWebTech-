const Validator = require("validator");
const isEmpty = require("is-empty");
var express = require('express');
var router = express.Router();

module.exports = function validateLoginInput(data) {
  let message= "";
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

// Password checks
  if (Validator.isEmpty(data.password)) {
    message= "Password field is required";
  }
  if (Validator.isEmpty(data.name)) {
    message = "Password field is required";
  }
  if (Validator.isEmpty(data.password)) {
    message = "Password field is required";
  }

return {
    message,
    isValid: isEmpty(message)
  };

  }
const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let message= "";
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    message= "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    message = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    message = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    message = "Passwords must match";
  }
return {
   message,
    isValid: isEmpty(message)
  };
};

const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function isLoginValid(data) {
  const errors = {};
  const { email = "", password = "" } = data;

  if (!Validator.isEmpty(name)) {
    errors.name = "name is required";
  }

  if (email && !Validator.isEmail(email)) {
    errors.email = "email must be valid email address";
  }

  if (password && !Validator.isLength(password, { min: 5 })) {
    errors.password = "password must be at least 5 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

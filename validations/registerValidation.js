const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function isRegistrationValid(data) {
  const errors = {};
  const { name, email, password } = data;

  if (name && !Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 and 30 characters";
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

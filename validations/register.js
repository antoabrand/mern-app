const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function isValid(data) {
  const errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

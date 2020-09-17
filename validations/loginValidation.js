const Validator = require('validator');

module.exports = function loginValidation(data) {
  const errors = {};

  const {name} = data; 
  

  if(!Validator.isLength(name, {min: 2, max: 20})){
    erros.name = "name must be between 2 and 20 characters"
  }

  return ({
    errors,
    isValid: isEmpty(errors)
  });
}
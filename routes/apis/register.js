const bcryptjs = require("bcryptjs");
const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const secret = require("../../configs/keys").secret;
const User = require("../../models/User");

const validateRegistration = require("../../validations/registerValidation");

// allow user to register - public api
router.post("/", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    res.status(400).json({ errors });
  }

  const { email, name, password } = req.body;

  //check if user is already registered
  User.findOne({ email }).then((user) => {
    //check db if user exists then don't try to create a new user
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists and registered" });
    else {
      //check if user has a gravatar email - otherwise use a default img
      const avatar = gravatar.url(email, {
        s: 100, // Size
        r: "pg", // Rating
        d: "mm", // Default
      });

      //create user since we dont have them in db already
      const newUser = new User({
        name,
        email,
        avatar,
        password,
        date: Date.now,
      });

      //encrypt their pw before sending to db
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;

          newUser.password = hash;
          newUser.save((user) => {
            try {
              res.json(user);
            } catch (err) {}
          });
        });
      });
    }
  });
});

module.exports = router;

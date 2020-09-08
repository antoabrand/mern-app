const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");

const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth works!",
  });
});

router.post("/register", (req, res) => {
  //check is user is already registered
  User.findOne({ email: req.body.email }).then((user) => {
    if (user)
      return res.status(400).json({ message: "User already registered" });
    else {
      //check if user has a gravatar email - otherwise use a default img
      const avatar = gravatar.url(req.body.email, {
        s: 100, // Size
        r: "pg", // Rating
        d: "mm", // Default
      });

      //create user since we dont have them in db already
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        date: Date.now,
      });

      //encrypt their pw before sending to db
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => res.json(user)).catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;

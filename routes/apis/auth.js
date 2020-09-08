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
      const avatar = gravatar(req.body.email, {
        s: 100, // Size
        r: "pg", // Rating
        d: "mm", // Default
      });
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        date: Date.now,
      });

      const salt = bcryptjs.genSalt(10);
      bcryptjs.hash(user.password, salt, (err, hash) => {
        user.password = hash;
      });

      User.save(user);
    }
  });
});

module.exports = router;

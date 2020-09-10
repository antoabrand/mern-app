const bcryptjs = require("bcryptjs");
const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const secret = require("../../configs/keys").secret;
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth works!",
  });
});

// allow user to register - public api
router.post("/register", (req, res) => {
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

// validate that user is registered and return a token for use in other routes
router.post("/token", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).json({ message: "user does not exist" });
    }

    const { id, name, avatar } = user;

    bcryptjs.compare(password, user.password, (err, isValid) => {
      if (isValid) {
        // token payload - used to sign token
        const payload = {
          id,
          name,
          avatar,
        };
        //sign token
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            sucess: true,
            token: "Bearer " + token,
          });
        });
      } else {
        res.status(400).json("incorrect password");
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "success" });
  }
);

module.exports = router;

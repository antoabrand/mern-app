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

module.exports = router;

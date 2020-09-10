const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const User = mongoose.model("users");

router.get("/test", (req, res) => {
  res.json({ msg: "Success" });
});

//accepts query param id and gets a specific user
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.query;
    User.findOne({ _id: id }, ["name", "email", "avatar"])
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

//retreive a list of all users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({msg: "Success inside get all users"})
    User.find({}, ["name", "email", "avatar"]).then((users) => {
      res.json(users);
    });
  }
);

module.exports = router;

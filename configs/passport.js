const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const secret = require("../configs/keys.js").secret;
const User = mongoose.model("users");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (!user) return done(null, false);
          else {
            return done(null, user);
          }
        })
        .catch((err) => console.log(err));
    })
  );
};

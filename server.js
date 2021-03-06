//dependencies
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

//resources
const auth = require("./routes/apis/auth");
const profile = require("./routes/apis/profile");
const posts = require("./routes/apis/social-posts");
const user = require("./routes/apis/user");
const register = require("./routes/apis/register");

//db configs
const db = require("./configs/keys").mongoURI;

//Connection to db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Succesfully connected to db!"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//initialize passport middleware
app.use(passport.initialize());
require("./configs/passport")(passport);

//use routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/users", user);
app.use("/api/register", register);

//server start listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

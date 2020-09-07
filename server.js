//dependencies
const express = require("express");
const mongoose = require("mongoose");

//db configs
const db = require("./configs/keys").mongoURI;

//Connection to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Succesfully connected to db!"))
  .catch((err) => console.log(err));
//vars
const app = express();
const port = process.env.PORT || 5000;

//initial route
app.get("/", (req, res) => {
  res.send("You made it!");
});

//server start listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

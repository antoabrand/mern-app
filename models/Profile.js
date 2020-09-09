const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profile = new Schema({
  profileName: {
    type: String,
    required: true,
  },
});

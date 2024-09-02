const mongoose = require("mongoose");

const admin_Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Need a username"],
  },
  password: {
    type: String,
    required: [true, "Need a username"],
  },
});

const Model_admin = mongoose.model("admin", admin_Schema);
module.exports = Model_admin;

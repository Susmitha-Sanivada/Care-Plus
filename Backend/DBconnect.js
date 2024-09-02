const mongoose = require("mongoose");

const employee = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  occupation: String,
});

const model = mongoose.model("employee", employee);

module.exports = model;

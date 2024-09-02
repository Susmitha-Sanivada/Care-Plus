// Name
// Mobile
// Email
// Gender
// Registered date
// Tests-(test1, amount, duration, report status)
// Total amount
// Duration (in days)
// Report status
// Payment status
// Result pdf
// Collection sms (true or false)
// Collection status

const mongoose = require("mongoose");

const { _, testsSchema } = require("../Model/tests");

const recordsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Name of the patient must be added"],
  },
  Mobile: {
    type: Number,
    required: [true, "Mobile Number of the patient must be added"],
  },
  Email: String,
  Gender: {
    type: String,
    required: [true, "Gender of the patient must be added"],
  },
  Registered_Date: {
    type: Date,
    default: () => new Date(),
  },
  Tests: {
    type: [testsSchema],
    required: [true, "Atleast one test should be provided"],
  },
  Amount: {
    type: Number,
    required: [true, " Total amount must be added"],
  },
  Duration: {
    type: String,
  },

  Report_Status: {
    type: Boolean,
    default: false,
  },
  Payment_Status: {
    type: Boolean,
    default: false,
  },
  Collection_Status: {
    type: Boolean,
    default: false,
  },
});

const Model_records = mongoose.model("Records", recordsSchema);

module.exports = Model_records;

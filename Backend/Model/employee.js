// Employee name
// Mobile
// Email
// Gender
// Joined date
// Records created
// Department (sample collector,lab tester, accountant)

// creation of username and password still there

const mongoose = require("mongoose");

const employee_Schema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Name should be added"],
  },
  Mobile: {
    type: Number,
    required: [true, "Number should be added"],
  },
  Email: {
    type: String,
    required: [true, "Email should be added"],
  },
  Gender: {
    type: String,
    required: [true, "Gender should be added"],
  },
  Username: {
    type: String,
    required: [true, "Need a username"],
  },
  Password: {
    type: String,
    required: [true, "Need a username"],
  },
  Joined_Data: {
    type: Date,
    default: new Date(),
    unique: true,
  },
  Department: {
    type: String,
    enum: ["sample collector", "lab tester", "accountant"],
    required: [true, "dept should be added"],
  },
});

const Model_employeeData = mongoose.model("EmployeesData", employee_Schema);
module.exports = Model_employeeData;

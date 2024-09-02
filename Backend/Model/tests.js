const mongoose = require("mongoose");

testDataSchema = new mongoose.Schema({
  TestName: {
    type: String,
    require: [true, "Should contain a test name"],
  },
  Cost: {
    type: Number,
    require: [true, "Should contain the cost of the test"],
  },
  Duration: {
    type: Number,
    require: [true, "Should contain duration"],
  },
});

const Model_testdata = mongoose.model("Testsdata", testDataSchema);

module.exports = { Model_testdata, testDataSchema };

//
//

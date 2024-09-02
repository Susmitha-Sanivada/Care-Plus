const express = require("express");
const records_controller = require("../Controllers/records_controllers");
const records_Router = express.Router();

records_Router
  .route("/records")
  .post(
    records_controller.computeDuration,
    records_controller.computeAmount,
    records_controller.createRecord
  )
  .get(records_controller.getAllRecords);

records_Router.route("/records/:name").get(records_controller.getRecords);
// later should be replaced by id
records_Router
  .route("/records/:id")
  .patch(records_controller.updateRecord)
  .delete(records_controller.deleteRecord);

// for generating data
// records_Router
//   .route("/records")
//   .post(records_controller.insertAll)
//   .delete(records_controller.deleteAll);

records_Router
  .route("/tests")
  // .post(records_controller.postTests)   posting all tests at once(insertmany) for initaial tests
  .get(records_controller.getAllTests);
records_Router.route("/tests/:name").get(records_controller.getTest);

module.exports = records_Router;

const express = require("express");
const employee_controller = require("../Controllers/employees_controller");
const employee_router = express.Router();

employee_router
  .route("/employees")
  .post(employee_controller.createEmployee)
  .get(employee_controller.getAllEmployees);

//
employee_router.route("/employees/:name").get(employee_controller.getEmployee);
employee_router
  .route("/employees/:id")
  .patch(employee_controller.updateEmployee)
  .delete(employee_controller.deleteEmployee);

module.exports = employee_router;

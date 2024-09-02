const express = require("express");
const app = express();
const admin_controller = require("../Controllers/admin_controller");

const admin_router = express.Router();

admin_router
  .route("/admin")
  .get(admin_controller.getAllAdmin)
  .post(admin_controller.createAdmin);

admin_router.route("/admin/:name").get(admin_controller.getAdmin);
admin_router
  .route("/admin/:id")
  .patch(admin_controller.updateAdmin)
  .delete(admin_controller.deleteAdmin);

module.exports = admin_router;

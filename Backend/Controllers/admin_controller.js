const Model_admin = require("../Model/admin");
const shared = require("../Controllers/shared");

module.exports.createAdmin = (req, res, next) => {
  shared.create(req, res, Model_admin, next);
};
module.exports.getAllAdmin = async (req, res, next) => {
  const getData = await Model_admin.find(req.query);

  shared.readAll(res, getData, next);
};

module.exports.getAdmin = async (req, res, next) => {
  const name = req.params.name.replace(/%20/g, " ");
  const getData = await Model_admin.find({ username: name });
  shared.readByName(res, getData, next);
};

module.exports.updateAdmin = (req, res, next) => {
  shared.updateById(req, res, Model_admin, next);
};

module.exports.deleteAdmin = (req, res, next) => {
  shared.deleteById(req, res, Model_admin, next);
};

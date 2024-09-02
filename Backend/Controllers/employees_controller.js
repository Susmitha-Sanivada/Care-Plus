const Model_employee = require("../Model/employee");
const shared = require("../Controllers/shared");
const AppError = require("../errors");
const features_class = require("../Controllers/features");
module.exports.createEmployee = (req, res, next) => {
  shared.create(req, res, Model_employee, next);
};
module.exports.getAllEmployees = async (req, res, next) => {
  try {
    const features = new features_class(
      req,
      Model_employee.find().select("-__v")
    );
    features.filter().sort().paginate();

    const getData = await features.query.find();
    const totalCount = await Model_employee.countDocuments({}); // <--- Add this line
    shared.readAll(res, getData, totalCount, next);
  } catch (error) {
    next(new AppError(404, error.message));
  }
};
module.exports.getEmployee = async (req, res, next) => {
  const name = req.params.name.replace(/%20/g, " ");
  const getData = await Model_employee.find({ Name: name });
  shared.readByName(res, getData, next);
};
module.exports.updateEmployee = (req, res, next) => {
  shared.updateById(req, res, Model_employee, next);
};
module.exports.deleteEmployee = (req, res, next) => {
  shared.deleteById(req, res, Model_employee, next);
};

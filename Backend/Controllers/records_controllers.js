const Model_records = require("../Model/records");
const { Model_testdata, _ } = require("../Model/tests");
const features_class = require("../Controllers/features");
const shared = require("../Controllers/shared");
const fs = require("fs");
const path = require("path");
const AppError = require("../errors");

// handle the name in frontend from to trom all the white spaces front and back
module.exports.createRecord = (req, res, next) => {
  shared.create(req, res, Model_records, next);
};

module.exports.getAllRecords = async (req, res, next) => {
  try {
    const features = new features_class(req, Model_records.find());
    features.filter().sort().paginate();
    const getData = await features.query.find().select("-__v");
    const totalCount = await Model_records.countDocuments({});

    shared.readAll(res, getData, totalCount, next);
  } catch (error) {
    next(new AppError(404, error.message));
  }
};

module.exports.getRecords = async (req, res, next) => {
  try {
    const name = req.params.name.replace(/%20/g, " ");
    const getData = await Model_records.find({
      Name: { $regex: name, $options: "i" },
    });
    shared.readByName(res, getData, next);
  } catch (error) {
    next(new AppError(404, error.message));
  }
};
module.exports.updateRecord = (req, res, next) => {
  shared.updateById(req, res, Model_records, next);
};

module.exports.deleteRecord = (req, res, next) => {
  shared.deleteById(req, res, Model_records, next);
};

module.exports.deleteAll = async (req, res) => {
  const data = await Model_records.deleteMany();
  res.json({
    message: "deleted",
  });
};
module.exports.insertAll = async (req, res) => {
  const data = await JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "..", "generate_Data", "records_data.json")
    )
  );
  console.log("data successfully loaded");
  await Model_records.insertMany(data);
  res.end();
};

//

//

//
// use middleware and compute the duration between the req and the response
// diration should be computed and updated
module.exports.computeDuration = (req, res, next) => {
  const maxDuration = () => {
    return req.body.Tests.reduce((acc, val, index) => {
      return val.Duration > acc ? val.Duration : acc;
    }, req.body.Tests[0].Duration);
  };
  const duration =
    req.body.Tests.length === 1 ? req.body.Tests[0].Duration : maxDuration();

  req.body.Duration = duration;
  next();
};

module.exports.computeAmount = (req, res, next) => {
  const sumAmount = () => {
    return req.body.Tests.reduce((acc, val, index) => {
      return acc + val.Cost;
    }, 0);
  };
  const amount = sumAmount();

  req.body.Amount = amount;
  next();
};

//

//

//
module.exports.postTests = async (req, res) => {
  const sendData = await Model_testdata.insertMany(req.body);
  res.status(201).json({
    status: "success",
    result: req.body,
  });
};

module.exports.getTest = async (req, res, next) => {
  try {
    const name = req.params.name.replace(/%20/g, " ");
    console.log(name);
    const getData = await Model_testdata.find({
      TestName: { $regex: name, $options: "i" },
    });
    shared.readByName(res, getData, next);
  } catch (error) {
    next(new AppError(404, error.message));
  }
};

module.exports.getAllTests = async (req, res, next) => {
  const getData = await Model_testdata.find();
  shared.readAll(res, getData, next);
};

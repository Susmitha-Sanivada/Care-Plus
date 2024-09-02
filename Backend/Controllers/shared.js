errorResponse = (res, err) => {
  // throw
  res.status(400).json({
    status: "fail",
    statusCode: 400,
    message: err.message,
  });
};
const AppError = require("../errors");

module.exports.create = async (req, res, model, next) => {
  try {
    const sendData = await model.create(req.body);
    res.status(201).json({
      status: "success",
      result: sendData,
    });
  } catch (err) {
    next(new AppError(400, err.message));
  }
  // 400
  // 500
};
module.exports.readAll = async (res, data, count, next) => {
  try {
    res.status(200).json({
      status: "success",
      result: {
        results: data.length,
        data: data,
      },
      total: count,
    });
  } catch (error) {
    next(new AppError(404, "Not found"));
  }
  // 404
  // 500
};

module.exports.readByName = async (res, data, next) => {
  try {
    res.status(200).json({
      status: "success",
      result: {
        results: data.length,
        data: data,
      },
    });
  } catch (error) {
    next(new AppError(404, "Not found"));
  }
  // 404
  // 500
};

module.exports.updateById = async (req, res, model, next) => {
  try {
    const updatedData = await model.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: "success",
      result: updatedData,
    });
  } catch (error) {
    next(new AppError(404, "Not found"));
  }

  // 400
  // 404
  // 500
};
module.exports.deleteById = async (req, res, model, next) => {
  try {
    await model.deleteOne({
      _id: req.params.id,
    });
    res.status(204).json();
  } catch (error) {
    next(new AppError(404, "Not found"));
  }

  // 404
  // 500
};

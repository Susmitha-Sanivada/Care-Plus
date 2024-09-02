const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = 3000;
const app = express();

const records_Router = require("./Routes/record_routes");
const admin_Router = require("./Routes/admin_routes");
const employee_Router = require("./Routes/employee_routes");

// load env variables
dotenv.config();

// db connection function
connection = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECT);
    console.log("DB conected");
  } catch (error) {
    console.log(error);
    // need to throw an error which i scateched the error handling global middleware
    const db_error = new Error("DB connection failed");

    process.exit(1);
    throw db_error;
    // res.status(500);
  }
};

connection();

// access the model
const AppError = require("./errors");

//Middleware (Between req and res)

// cors
app.use(cors());

//converts into an object
app.use(express.json());

//
//
//

app.use("/v1", records_Router);
app.use("/v1", admin_Router);
app.use("/v1", employee_Router);
app.use("*", (req, res, next) => {
  next(new AppError(500, "Route not yet defined"));
});

//
// global error handling
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: "fail",
    statusCode: err.statusCode,
    message: err.message,
  });

  // mongo validation
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

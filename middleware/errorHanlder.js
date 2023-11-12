const { constants } = require("../constants.js");
// const { dotenv } = require("dotenv").config();

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Error!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.UNAUTHORIZED_ERROR:
      res.status(statusCode).json({
        title: "Un-Authorized!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.FORBIDDEN_ERROR:
      res.status(statusCode).json({
        title: "Forbidden!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.NOT_FOUND_ERROR:
      res.status(statusCode).json({
        title: "Not found!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    default:
      console.log("All good!");
  }
};

module.exports = errorHandler;

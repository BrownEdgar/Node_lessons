const config = require('../config');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

/**
 * Convert error to ApiError
 */
const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

/**
 * Handle errors
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // В production не показываем детали operational errors
  if (config.env === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = message;

  const response = {
    success: false,
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  // Логируем ошибку
  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).json(response);
};

/**
 * 404 handler - должен быть последним в цепочке routes
 */
const notFoundHandler = (req, res, next) => {
  const error = ApiError.notFound(`Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * Mongoose validation error handler
 */
const handleMongooseValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return ApiError.badRequest(message);
};

/**
 * Mongoose duplicate key error handler
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const message = `${field} already exists`;
  return ApiError.conflict(message);
};

/**
 * Mongoose CastError handler (invalid ObjectId)
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return ApiError.badRequest(message);
};

/**
 * JWT Error handlers
 */
const handleJWTError = () => ApiError.unauthorized('Invalid token. Please log in again');

const handleJWTExpiredError = () =>
  ApiError.unauthorized('Your token has expired. Please log in again');

module.exports = {
  errorConverter,
  errorHandler,
  notFoundHandler,
  handleMongooseValidationError,
  handleDuplicateKeyError,
  handleCastError,
  handleJWTError,
  handleJWTExpiredError,
};

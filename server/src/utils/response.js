/**
 * Standardized API Response Utilities
 *
 * Provides consistent response formatting across all API endpoints
 */

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {*} data - Data to send in response
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Optional success message
 */
const sendSuccess = (res, data = null, statusCode = 200, message = null) => {
  const response = {
    success: true,
  };

  if (data !== null) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} code - Optional error code
 */
const sendError = (res, message, statusCode = 500, code = null) => {
  const response = {
    success: false,
    error: {
      message: message || 'An error occurred',
      statusCode,
    },
  };

  if (code) {
    response.error.code = code;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a validation error response
 * @param {Object} res - Express response object
 * @param {Array} errors - Array of validation errors
 */
const sendValidationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    error: {
      message: 'Validation failed',
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      details: errors,
    },
  });
};

/**
 * Send a not found response
 * @param {Object} res - Express response object
 * @param {string} message - Custom not found message
 */
const sendNotFound = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    error: {
      message,
      statusCode: 404,
      code: 'NOT_FOUND',
    },
  });
};

/**
 * Send an unauthorized response
 * @param {Object} res - Express response object
 * @param {string} message - Custom unauthorized message
 */
const sendUnauthorized = (res, message = 'Unauthorized') => {
  return res.status(401).json({
    success: false,
    error: {
      message,
      statusCode: 401,
      code: 'UNAUTHORIZED',
    },
  });
};

/**
 * Send a forbidden response
 * @param {Object} res - Express response object
 * @param {string} message - Custom forbidden message
 */
const sendForbidden = (res, message = 'Forbidden') => {
  return res.status(403).json({
    success: false,
    error: {
      message,
      statusCode: 403,
      code: 'FORBIDDEN',
    },
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
  sendUnauthorized,
  sendForbidden,
};

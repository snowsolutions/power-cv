/**
 * Application Constants
 *
 * Centralized constants for HTTP status codes, error messages, and other application-wide values
 */

// HTTP Status Codes
const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// Error Messages
const ERROR_MESSAGES = {
  // General
  INTERNAL_SERVER_ERROR: 'An internal server error occurred',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',

  // Validation
  VALIDATION_FAILED: 'Validation failed',
  REQUIRED_FIELD_MISSING: 'Required field is missing',
  INVALID_FORMAT: 'Invalid format',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PHONE: 'Invalid phone number format',
  INVALID_DATE: 'Invalid date format',

  // Database
  DATABASE_ERROR: 'Database operation failed',
  DATABASE_CONNECTION_ERROR: 'Failed to connect to database',
  DUPLICATE_ENTRY: 'Duplicate entry found',

  // CV Operations
  CV_NOT_FOUND: 'CV not found',
  CV_CREATE_FAILED: 'Failed to create CV',
  CV_UPDATE_FAILED: 'Failed to update CV',
  CV_DELETE_FAILED: 'Failed to delete CV',

  // Import/Export
  IMPORT_FAILED: 'Failed to import CV data',
  EXPORT_FAILED: 'Failed to export CV data',
  INVALID_JSON: 'Invalid JSON format',
  INVALID_CV_DATA: 'Invalid CV data structure',

  // File Operations
  FILE_UPLOAD_FAILED: 'File upload failed',
  FILE_TOO_LARGE: 'File size exceeds maximum limit',
  INVALID_FILE_TYPE: 'Invalid file type',
};

// Success Messages
const SUCCESS_MESSAGES = {
  // General
  OPERATION_SUCCESSFUL: 'Operation completed successfully',

  // CV Operations
  CV_CREATED: 'CV created successfully',
  CV_UPDATED: 'CV updated successfully',
  CV_DELETED: 'CV deleted successfully',
  CV_RETRIEVED: 'CV retrieved successfully',

  // Import/Export
  CV_IMPORTED: 'CV imported successfully',
  CV_EXPORTED: 'CV exported successfully',

  // File Operations
  FILE_UPLOADED: 'File uploaded successfully',
};

// Error Codes
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  INVALID_INPUT: 'INVALID_INPUT',
};

// Default Values
const DEFAULTS = {
  PORT: 5001,
  NODE_ENV: 'development',
  PAGE_LIMIT: 10,
  MAX_PAGE_LIMIT: 100,
  TEMPLATE_DEFAULT: 'modern',
};

// Validation Constants
const VALIDATION = {
  MAX_CV_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
  DATE_FORMAT: 'YYYY-MM-DD',
};

// Template Types
const TEMPLATES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  CREATIVE: 'creative',
  MINIMAL: 'minimal',
};

// Proficiency Levels
const PROFICIENCY_LEVELS = {
  BASIC: 'Basic',
  INTERMEDIATE: 'Intermediate',
  PROFESSIONAL: 'Professional',
  FLUENT: 'Fluent',
  NATIVE: 'Native',
  EXPERT: 'Expert',
};

module.exports = {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ERROR_CODES,
  DEFAULTS,
  VALIDATION,
  TEMPLATES,
  PROFICIENCY_LEVELS,
};

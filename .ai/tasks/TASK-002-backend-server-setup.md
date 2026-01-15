# TASK-002: Backend Server Setup

**Status**: PENDING
**Priority**: HIGH
**Phase**: 1 - Core Functionality
**Estimated Time**: 45-60 minutes

---

## 📋 Description

Set up the Express.js server with basic configuration, middleware, and a health check endpoint. Create the foundation for the backend API including error handling, CORS, and environment configuration.

---

## 🎯 Objectives

1. Create Express server entry point
2. Configure middleware (CORS, JSON parsing, Morgan logging)
3. Set up environment variables
4. Create health check endpoint
5. Implement basic error handling middleware
6. Configure nodemon for development
7. Test server startup and basic endpoint

---

## 📝 Acceptance Criteria

- [ ] Express server starts without errors
- [ ] Server listens on port specified in .env (default 5000)
- [ ] CORS is configured to allow frontend requests
- [ ] Health check endpoint returns proper response
- [ ] Environment variables are loaded from .env file
- [ ] Morgan logger shows request logs in console
- [ ] Error handling middleware catches and formats errors
- [ ] Server auto-restarts on file changes (nodemon)
- [ ] No console errors or warnings

---

## 🛠️ Implementation Steps

### 1. Create Environment Configuration

**File**: `server/.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/power-cv
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**File**: `server/.env.example`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/power-cv
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 2. Create Server Entry Point

**File**: `server/src/server.js`
- Import required packages (express, cors, dotenv, morgan)
- Load environment variables
- Initialize Express app
- Configure middleware
- Set up routes
- Add error handling middleware
- Start server on specified port

### 3. Create Utility Files

**File**: `server/src/utils/response.js`
- Success response helper function
- Error response helper function
- Standard response format

**File**: `server/src/utils/constants.js`
- HTTP status codes
- Error messages
- Success messages

### 4. Create Error Handler Middleware

**File**: `server/src/middleware/errorHandler.js`
- Catch all errors
- Format error responses
- Log errors in development
- Return user-friendly messages

### 5. Create Routes

**File**: `server/src/routes/index.js`
- Health check route: GET /api/health
- Route placeholder for CV routes
- Export router

### 6. Update package.json Scripts

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

---

## 🧪 Testing Instructions

### For User to Test:

1. **Setup Environment Variables**
   - Navigate to `server/` directory
   - Copy `.env.example` to `.env`
   - Verify the file contains PORT, MONGODB_URI, NODE_ENV, CORS_ORIGIN

2. **Start the Server**
   - Run `npm run dev`
   - Server should start without errors
   - Console should show message like: "Server running on port 5000"
   - Morgan should log requests

3. **Test Health Check Endpoint**
   - Open browser or use Postman/curl
   - Visit: `http://localhost:5000/api/health`
   - Should return JSON response:
     ```json
     {
       "success": true,
       "message": "Server is running",
       "timestamp": "2024-01-01T00:00:00.000Z"
     }
     ```

4. **Test CORS**
   - Verify CORS headers are present in response
   - Check Access-Control-Allow-Origin header

5. **Test Auto-Restart**
   - With server running, edit server.js (add a comment)
   - Save the file
   - Server should automatically restart
   - Console should show "[nodemon] restarting..."

6. **Test Error Handling**
   - Visit non-existent route: `http://localhost:5000/api/nonexistent`
   - Should return formatted error response (404)

7. **Check Console Logs**
   - Morgan should log each request
   - Format: `GET /api/health 200 - - ms`
   - No error messages in console

---

## 📦 Deliverables

- [x] server/src/server.js - Main server file
- [x] server/src/routes/index.js - Route configuration
- [x] server/src/middleware/errorHandler.js - Error handling
- [x] server/src/utils/response.js - Response helpers
- [x] server/src/utils/constants.js - Constants
- [x] server/.env - Environment variables (not committed)
- [x] server/.env.example - Environment template
- [x] Updated package.json scripts

---

## 🔗 Dependencies

**Before**: TASK-001 (Project Setup)
**After**: TASK-003 (Database Configuration)

---

## 📌 Notes

- Do NOT connect to MongoDB yet (that's TASK-003)
- Keep server.js clean and modular
- Use environment variables for all configuration
- CORS_ORIGIN should match the Vite dev server URL
- Morgan format: 'dev' for development, 'combined' for production
- Error handler should be the last middleware

---

## 🔍 Code Structure

### Response Format Standard
All API responses should follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

---

## ⚠️ Potential Issues

1. **Port in use**: If port 5000 is occupied, change PORT in .env
2. **Module type**: Ensure using CommonJS (require) not ES6 (import) unless configured
3. **CORS errors**: Double-check CORS_ORIGIN matches frontend URL exactly
4. **nodemon not found**: Install nodemon globally or use npx nodemon

---

## 🎨 Code Quality Checklist

- [ ] Code is properly formatted and readable
- [ ] All environment variables are documented in .env.example
- [ ] Error messages are user-friendly
- [ ] Console logs are helpful for debugging
- [ ] No hardcoded values (use constants or env vars)
- [ ] Comments explain complex logic

---

## ✅ Definition of Done

- User has started the server with `npm run dev`
- Health check endpoint returns correct JSON response
- Server auto-restarts on file changes
- CORS is working (no browser CORS errors)
- Error handling catches unknown routes
- User confirms: "Server is running correctly, ready for next task"
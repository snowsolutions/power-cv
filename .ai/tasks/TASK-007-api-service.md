# TASK-007: API Service Layer

**Status**: PENDING
**Priority**: HIGH
**Phase**: 1 - Core Functionality
**Estimated Time**: 30-45 minutes

---

## 📋 Description

Create the API service layer for the frontend to communicate with the backend. Set up Axios instance with configuration, create service functions for CV operations, and implement error handling.

---

## 🎯 Objectives

1. Configure Axios with base URL and interceptors
2. Create API service utilities
3. Implement CV service functions (CRUD operations)
4. Add request/response interceptors
5. Implement error handling
6. Create helper functions for API calls
7. Test API connectivity

---

## 📝 Acceptance Criteria

- [ ] Axios is configured with base URL from .env
- [ ] Request interceptors add necessary headers
- [ ] Response interceptors handle errors
- [ ] CV service functions are implemented
- [ ] Error responses are formatted consistently
- [ ] API calls return promises
- [ ] No console errors
- [ ] Can successfully call backend health check

---

## 🛠️ Implementation Steps

### 1. Create Base API Configuration

**File**: `client/src/services/api.js`

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization token here when auth is implemented
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      console.error('Response Error:', error.response.status, error.response.data);
      
      const errorMessage = error.response.data?.error?.message 
        || error.response.data?.message 
        || 'An error occurred';
      
      return Promise.reject({
        status: error.response.status,
        message: errorMessage,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
      });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
);

export default api;
```

### 2. Create CV Service

**File**: `client/src/services/cvService.js`

```javascript
import api from './api';

const cvService = {
  // Get all CVs
  getAllCVs: async () => {
    try {
      const response = await api.get('/cvs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get CV by ID
  getCVById: async (id) => {
    try {
      const response = await api.get(`/cvs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new CV
  createCV: async (cvData) => {
    try {
      const response = await api.post('/cvs', cvData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update CV
  updateCV: async (id, cvData) => {
    try {
      const response = await api.put(`/cvs/${id}`, cvData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete CV
  deleteCV: async (id) => {
    try {
      const response = await api.delete(`/cvs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Import CV from JSON
  importCV: async (jsonData) => {
    try {
      const response = await api.post('/cvs/import', jsonData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Export CV as JSON
  exportCV: async (id) => {
    try {
      const response = await api.get(`/cvs/${id}/export`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cvService;
```

### 3. Create API Utilities

**File**: `client/src/utils/apiHelpers.js`

```javascript
/**
 * Handle API errors consistently
 * @param {Error} error - The error object from API call
 * @returns {string} - User-friendly error message
 */
export const handleAPIError = (error) => {
  if (error.message) {
    return error.message;
  }
  
  switch (error.status) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Unauthorized. Please log in.';
    case 403:
      return 'Access denied.';
    case 404:
      return 'Resource not found.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return 'An unexpected error occurred.';
  }
};

/**
 * Check if backend is reachable
 * @returns {Promise<boolean>}
 */
export const checkBackendConnection = async () => {
  try {
    const cvService = (await import('../services/cvService')).default;
    await cvService.healthCheck();
    return true;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};

/**
 * Format CV data for API
 * @param {Object} cv - CV object from store
 * @returns {Object} - Formatted CV for API
 */
export const formatCVForAPI = (cv) => {
  return {
    name: cv.name,
    template: cv.template,
    data: cv.data,
  };
};

/**
 * Parse CV response from API
 * @param {Object} apiResponse - Response from API
 * @returns {Object} - Formatted CV for store
 */
export const parseCVFromAPI = (apiResponse) => {
  return {
    id: apiResponse.data.id || apiResponse.data._id,
    name: apiResponse.data.name,
    template: apiResponse.data.template,
    data: apiResponse.data.data,
    createdAt: apiResponse.data.createdAt,
    updatedAt: apiResponse.data.updatedAt,
  };
};
```

### 4. Add Environment Variable Check

Update `client/.env` to ensure:
```
VITE_API_URL=http://localhost:5000/api
```

### 5. Create Test Component

Update `client/src/pages/Home.jsx` to test API:

```jsx
import { useState, useEffect } from 'react';
import cvService from '../services/cvService';
import { handleAPIError } from '../utils/apiHelpers';

function Home() {
  const [apiStatus, setApiStatus] = useState('checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAPI();
  }, []);

  const checkAPI = async () => {
    try {
      const response = await cvService.healthCheck();
      setApiStatus('Connected ✅');
      console.log('Health check response:', response);
    } catch (err) {
      setApiStatus('Disconnected ❌');
      setError(handleAPIError(err));
      console.error('Health check failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          Power CV
        </h1>
        <p className="text-gray-600 mb-6">
          Create professional CVs with ease
        </p>
        
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-2">Backend Status</h2>
          <p className="text-lg">{apiStatus}</p>
          {error && (
            <p className="text-red-600 mt-2">Error: {error}</p>
          )}
          <button 
            onClick={checkAPI}
            className="btn-primary mt-4"
          >
            Retry Connection
          </button>
        </div>

        <button className="btn-primary">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
```

---

## 🧪 Testing Instructions

### For User to Test:

1. **Verify Environment Variable**
   - Check `client/.env` has `VITE_API_URL=http://localhost:5000/api`
   - No trailing slash on the URL

2. **Verify Files Created**
   - `client/src/services/api.js` exists
   - `client/src/services/cvService.js` exists
   - `client/src/utils/apiHelpers.js` exists

3. **Start Backend Server**
   - Navigate to `server/` directory
   - Run `npm run dev`
   - Should see "Server running on port 5000"
   - Health endpoint should be available

4. **Start Frontend Server**
   - Navigate to `client/` directory
   - Run `npm run dev`
   - Should start without errors

5. **Test API Connection**
   - Open browser to http://localhost:5173
   - Should see Home page
   - "Backend Status" should show "Connected ✅"
   - If backend is not running, should show "Disconnected ❌"

6. **Check Browser Console**
   - Open DevTools (F12) → Console tab
   - Should see logs:
     - "API Request: GET /health"
     - "API Response: 200 /health"
     - "Health check response: {success: true, ...}"
   - No error messages

7. **Test Error Handling**
   - Stop the backend server (Ctrl+C in server terminal)
   - Click "Retry Connection" button on Home page
   - Should show "Disconnected ❌"
   - Should show error message: "Network error..."
   - Console should show network error

8. **Restart Backend and Retry**
   - Start backend server again
   - Click "Retry Connection" button
   - Should change to "Connected ✅"

9. **Test with Network Tab**
   - Open DevTools → Network tab
   - Refresh page
   - Should see request to `/health` endpoint
   - Status should be 200
   - Response should have JSON data

---

## 📦 Deliverables

- [x] client/src/services/api.js - Axios configuration
- [x] client/src/services/cvService.js - CV API functions
- [x] client/src/utils/apiHelpers.js - Helper functions
- [x] Updated Home.jsx with API test
- [x] Environment variable configured
- [x] Request/response interceptors working
- [x] Error handling implemented

---

## 🔗 Dependencies

**Before**: TASK-006 (CV Context & State Management)
**After**: TASK-008 (Common UI Components)

**Required**: TASK-002 (Backend Server Setup) must be complete

---

## 📌 Notes

- VITE_API_URL must start with `VITE_` prefix
- Access env vars with `import.meta.env.VITE_API_URL`
- Axios baseURL should not have trailing slash
- Timeout is set to 10 seconds
- Interceptors log all requests/responses for debugging
- Error handling provides user-friendly messages
- Authorization will be added later when auth is implemented

---

## 🔍 API Response Format

All API responses should follow this format (from backend):

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

---

## ⚠️ Potential Issues

1. **CORS errors**: Ensure backend has CORS configured for http://localhost:5173
2. **Port mismatch**: Check backend runs on port 5000, frontend on 5173
3. **Network errors**: Backend must be running for tests to pass
4. **Env var not loading**: Restart dev server after changing .env
5. **Timeout errors**: Increase timeout if backend is slow

---

## 🔧 Troubleshooting

**API not connecting:**
- Check both servers are running
- Verify VITE_API_URL in .env
- Check browser console for CORS errors
- Verify backend health endpoint works (visit http://localhost:5000/api/health)

**CORS errors:**
- Check backend CORS_ORIGIN in server/.env
- Should be `http://localhost:5173`
- Restart backend server after changing

**Environment variable not found:**
- Must start with `VITE_`
- Restart Vite dev server
- Clear cache: delete node_modules/.vite

---

## 📚 Reference

- Axios docs: https://axios-http.com/docs/intro
- Axios interceptors: https://axios-http.com/docs/interceptors
- Vite env variables: https://vitejs.dev/guide/env-and-mode.html

---

## ✅ Definition of Done

- API service files created
- Axios configured with interceptors
- CV service functions implemented
- Error handling works correctly
- Backend health check succeeds
- Console shows API request/response logs
- User confirms: "API connection working, ready for next task"
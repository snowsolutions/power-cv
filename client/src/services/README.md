# Services

This directory contains service modules for API communication and external integrations.

## Purpose

Services handle all communication with the backend API and external services. They abstract away the details of HTTP requests and provide a clean interface for components to interact with data.

## Examples of services to be added:

- `api.js` - Axios instance with base configuration
- `cvService.js` - CV CRUD operations (create, read, update, delete)
- `exportService.js` - Export functionality (PDF, JSON)
- `importService.js` - Import functionality (JSON)
- `storageService.js` - Local storage utilities for draft saving

## Structure

Each service should export functions that:
- Make HTTP requests to specific endpoints
- Handle request/response transformation
- Manage error handling
- Return promises or async/await patterns

## Example Service Structure

```javascript
// cvService.js
import api from './api';

export const cvService = {
  // Get all CVs
  getAllCVs: async () => {
    const response = await api.get('/cvs');
    return response.data;
  },

  // Get CV by ID
  getCVById: async (id) => {
    const response = await api.get(`/cvs/${id}`);
    return response.data;
  },

  // Create new CV
  createCV: async (cvData) => {
    const response = await api.post('/cvs', cvData);
    return response.data;
  },

  // Update CV
  updateCV: async (id, cvData) => {
    const response = await api.put(`/cvs/${id}`, cvData);
    return response.data;
  },

  // Delete CV
  deleteCV: async (id) => {
    const response = await api.delete(`/cvs/${id}`);
    return response.data;
  }
};
```

## Guidelines

- Use axios for HTTP requests
- Centralize API base URL configuration
- Implement request/response interceptors for auth and error handling
- Use environment variables for API endpoints
- Handle loading states and errors gracefully
- Implement retry logic for failed requests where appropriate
- Keep services focused on data operations only (no UI logic)
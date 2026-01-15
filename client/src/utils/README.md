# Utilities

This directory contains utility functions and helper modules used throughout the application.

## Purpose

Utilities are pure functions that provide common functionality like formatting, validation, data transformation, and other helper operations.

## Examples of utilities to be added:

- `formatters.js` - Date, phone, address formatting functions
- `validators.js` - Custom validation functions for forms
- `constants.js` - Application-wide constants and enums
- `helpers.js` - General helper functions
- `dateUtils.js` - Date manipulation and formatting utilities
- `exportHelpers.js` - Helper functions for PDF/JSON export
- `importHelpers.js` - Helper functions for JSON import
- `stringUtils.js` - String manipulation utilities

## Example Utility Functions

```javascript
// formatters.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatPhone = (phone) => {
  // Format phone number to (XXX) XXX-XXXX
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// validators.js
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone);
};

// constants.js
export const CV_SECTIONS = {
  PERSONAL_INFO: 'personalInfo',
  INTRODUCTION: 'introduction',
  WORK_HISTORY: 'workHistory',
  CERTIFICATIONS: 'certifications',
  EDUCATIONS: 'educations',
  ACTIVITIES: 'activities',
  PROFESSIONAL_SKILLS: 'professionalSkills',
  LANGUAGE_COMPETENCIES: 'languageCompetencies'
};

export const TEMPLATES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMAL: 'minimal'
};
```

## Guidelines

- Keep functions pure (no side effects)
- Make functions small and focused on a single task
- Use descriptive function names
- Add JSDoc comments for complex functions
- Include input validation where appropriate
- Export named functions (not default exports)
- Write unit tests for utility functions
- Avoid dependencies on React or other UI libraries
- Keep utilities framework-agnostic where possible
// Default section titles for CV
export const DEFAULT_SECTION_TITLES = {
    personalInfo: "Personal Information",
    introduction: "Introduction",
    workHistory: "Work History",
    certifications: "Certifications",
    educations: "Education",
    activities: "Activities",
    professionalSkills: "Professional Skills",
    languageCompetencies: "Language Competencies",
};

// CV Templates
export const TEMPLATES = {
    CLASSIC: "classic",
};

// Skill levels for professional skills
export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

// Language proficiency levels
export const LANGUAGE_PROFICIENCY = [
    "Basic",
    "Intermediate",
    "Professional",
    "Fluent",
    "Native",
];

// API endpoints (will be used in API service layer)
export const API_ENDPOINTS = {
    CVS: "/cvs",
    CV_BY_ID: (id) => `/cvs/${id}`,
    EXPORT_PDF: (id) => `/cvs/${id}/export/pdf`,
    EXPORT_JSON: (id) => `/cvs/${id}/export/json`,
};

// Local storage keys
export const STORAGE_KEYS = {
    CV_STORE: "power-cv-storage",
    DRAFT_CV: "power-cv-draft",
    USER_PREFERENCES: "power-cv-preferences",
};

// Date formats
export const DATE_FORMATS = {
    DISPLAY: "MMM yyyy",
    INPUT: "yyyy-MM",
    FULL: "MMMM d, yyyy",
};

// Validation messages
export const VALIDATION_MESSAGES = {
    REQUIRED: "This field is required",
    EMAIL_INVALID: "Please enter a valid email address",
    PHONE_INVALID: "Please enter a valid phone number",
    URL_INVALID: "Please enter a valid URL",
    DATE_INVALID: "Please enter a valid date",
    DATE_RANGE_INVALID: "End date must be after start date",
};

// Export formats
export const EXPORT_FORMATS = {
    PDF: "pdf",
    JSON: "json",
};

// HTTP status codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

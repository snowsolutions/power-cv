# Power CV - CV Builder Application

## Project Overview
Power CV is a full-stack web application for creating, managing, and exporting professional CVs with multiple templates, real-time preview, and JSON import/export.

## Tech Stack
- **Frontend**: React, React Router, React Hook Form, Tailwind CSS, Zustand, jsPDF + html2canvas
- **Backend**: Node.js, Express, MongoDB, Mongoose

## CV Data Structure

### Core Sections
- **personalInfo**: name, email, phone, address, avatar (optional)
- **introduction**: rich text content
- **workHistory**: items with dateFrom, dateTo, companyName, position, description
- **certifications**: items with certName, organization, certLink, certExpiration
- **educations**: items with schoolName, studyFrom, studyTo, profession
- **activities**: items with title, description, date
- **professionalSkills**: items with skillName, level, description
- **languageCompetencies**: items with language, proficiency

Each section has a customizable `sectionTitle` field.

## API Endpoints
```
GET    /api/cvs              - List all CVs
GET    /api/cvs/:id          - Get CV by ID
POST   /api/cvs              - Create CV
PUT    /api/cvs/:id          - Update CV
DELETE /api/cvs/:id          - Delete CV
POST   /api/cvs/import       - Import from JSON
GET    /api/cvs/:id/export   - Export as JSON
GET    /api/health           - Health check
```

## Implementation Phases

### Phase 1: Core
- CV form with all sections
- Single template with real-time preview
- Backend CRUD APIs
- JSON import/export

### Phase 2: Enhanced
- Multiple templates (Modern, Classic, Creative, Minimal)
- PDF export

### Phase 3: Advanced
- Template customization (colors, fonts)
- CV management dashboard
- Form validation

### Phase 4: Polish
- Loading/error states, notifications
- Performance optimization
- Accessibility

## Future Enhancements
- User authentication
- CV sharing
- AI suggestions
- Multi-language support
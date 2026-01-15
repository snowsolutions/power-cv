# Power CV - CV Builder Application

## Project Overview
Power CV is a full-stack web application that allows users to create, manage, and export professional CVs using multiple templates. The application provides a form-based interface for data entry with real-time preview capabilities and supports importing/exporting CV data as JSON files.

## Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **React Hook Form** - Form management
- **html2pdf.js / jsPDF + html2canvas** - PDF generation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Context API / Zustand** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB / PostgreSQL** - Database (recommend MongoDB for JSON flexibility)
- **Mongoose / Prisma** - ORM
- **Multer** - File upload handling
- **dotenv** - Environment variables
- **cors** - CORS middleware
- **nodemon** - Development tool

## Architecture

### Frontend Architecture
```
Client (React SPA)
├── Components
│   ├── Form Components (Data Entry)
│   ├── Template Components (CV Previews)
│   ├── Layout Components
│   └── Common Components
├── Pages
│   ├── Home/Dashboard
│   ├── CV Editor
│   ├── Template Gallery
│   └── CV List
├── Services
│   ├── API Service
│   └── PDF Export Service
├── Utils
│   ├── JSON Import/Export
│   └── Validators
└── Context/Store
    └── CV Data Store
```

### Backend Architecture
```
Server (Express)
├── Routes
│   ├── CV Routes
│   └── Health Check
├── Controllers
│   ├── CV Controller
│   └── Template Controller
├── Models
│   └── CV Model
├── Middleware
│   ├── Error Handler
│   └── Validation
└── Utils
    └── Response Helpers
```

## Data Model

### CV JSON Structure
```json
{
  "id": "uuid",
  "name": "My Professional CV",
  "template": "modern",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "data": {
    "personalInfo": {
      "sectionTitle": "Personal Information",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "City, Country",
      "avatar": "base64_or_url (optional)"
    },
    "introduction": {
      "sectionTitle": "Introduction",
      "content": "Rich text content from text editor..."
    },
    "workHistory": {
      "sectionTitle": "Work History",
      "items": [
        {
          "id": "uuid",
          "dateFrom": "2020-01",
          "dateTo": "2023-12",
          "companyName": "Company Name",
          "position": "Job Title",
          "description": "Job description and achievements..."
        }
      ]
    },
    "certifications": {
      "sectionTitle": "Certifications",
      "items": [
        {
          "id": "uuid",
          "certName": "Certification Name",
          "organization": "Issuing Organization",
          "certLink": "https://credential-url.com",
          "certExpiration": "2025-12-31"
        }
      ]
    },
    "educations": {
      "sectionTitle": "Education",
      "items": [
        {
          "id": "uuid",
          "schoolName": "University Name",
          "studyFrom": "2016-09",
          "studyTo": "2020-06",
          "profession": "Computer Science"
        }
      ]
    },
    "activities": {
      "sectionTitle": "Activities",
      "items": [
        {
          "id": "uuid",
          "title": "Activity Title",
          "description": "Activity description...",
          "date": "2023-01"
        }
      ]
    },
    "professionalSkills": {
      "sectionTitle": "Professional Skills",
      "items": [
        {
          "id": "uuid",
          "skillName": "JavaScript",
          "level": "Expert",
          "description": "10+ years of experience..."
        }
      ]
    },
    "languageCompetencies": {
      "sectionTitle": "Language Competencies",
      "items": [
        {
          "id": "uuid",
          "language": "English",
          "proficiency": "Native/Fluent/Professional/Intermediate/Basic"
        }
      ]
    }
  }
}
```

### Section Title Customization
Each section includes a `sectionTitle` field that allows users to customize the display name:
- **Default Titles**: "Personal Information", "Introduction", "Work History", "Certifications", "Education", "Activities", "Professional Skills", "Language Competencies"
- **Custom Titles**: Users can override these with their own text (e.g., "About Me", "Career Journey", "My Achievements", etc.)
- Templates should always use the `sectionTitle` value when rendering sections

### Database Schema (MongoDB)
```javascript
CVSchema = {
  name: String (required),
  template: String (default: "modern"),
  data: Object (required),
  createdAt: Date,
  updatedAt: Date,
  userId: String (optional - for future auth)
}
```

## API Endpoints

### CV Management
```
GET    /api/cvs              - Get all CVs (list with basic info)
GET    /api/cvs/:id          - Get CV by ID (full details)
POST   /api/cvs              - Create new CV
PUT    /api/cvs/:id          - Update CV
DELETE /api/cvs/:id          - Delete CV
POST   /api/cvs/import       - Import CV from JSON
GET    /api/cvs/:id/export   - Export CV as JSON
```

### Health Check
```
GET    /api/health           - Server health check
```

### Request/Response Examples

#### POST /api/cvs
Request:
```json
{
  "name": "My CV",
  "template": "modern",
  "data": { /* CV data structure */ }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "generated-id",
    "name": "My CV",
    "template": "modern",
    "data": { /* CV data */ },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### GET /api/cvs
Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "cv-1",
      "name": "Software Engineer CV",
      "template": "modern",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-02T00:00:00Z"
    }
  ]
}
```

## Features Breakdown

### Phase 1: Core Functionality
1. **Basic CV Form**
   - Personal Information section (name, email, phone, address, avatar upload)
   - Introduction section (rich text editor)
   - Work History section (add/edit/remove multiple items)
   - Certifications section (add/edit/remove multiple items)
   - Education section (add/edit/remove multiple items)
   - Custom section titles functionality

2. **Single Template Preview**
   - Modern template implementation
   - Real-time preview as user types
   - Responsive preview

3. **Backend Setup**
   - Express server setup
   - MongoDB connection
   - CRUD API endpoints
   - Error handling middleware

4. **JSON Import/Export**
   - Download CV data as JSON file
   - Upload and parse JSON file
   - Validation for imported data

### Phase 2: Enhanced Features
1. **Additional CV Sections**
   - Activities section (add/edit/remove multiple items)
   - Professional Skills section (add/edit/remove multiple items)
   - Language Competencies section (add/edit/remove multiple items)

2. **Multiple Templates**
   - Classic template
   - Creative template
   - Minimal template
   - Template switching

3. **PDF Export**
   - Export preview to PDF
   - Maintain styling in PDF
   - Custom filename

### Phase 3: Advanced Features
1. **Template Customization**
   - Color schemes
   - Font selection
   - Layout options

2. **CV Management**
   - Dashboard with CV list
   - Duplicate CV
   - Delete CV
   - Search/filter CVs

3. **Data Validation**
   - Form validation
   - Required fields
   - Format validation (email, phone, dates)

### Phase 4: Polish & Optimization
1. **UI/UX Improvements**
   - Loading states
   - Error messages
   - Success notifications
   - Drag-and-drop reordering

2. **Performance**
   - Debounced preview updates
   - Lazy loading templates
   - Image optimization

3. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - ARIA labels

## Project Structure

```
power-cv/
├── client/                          # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Loader.jsx
│   │   │   ├── form/
│   │   │   │   ├── PersonalInfoForm.jsx
│   │   │   │   ├── IntroductionForm.jsx
│   │   │   │   ├── WorkHistoryForm.jsx
│   │   │   │   ├── CertificationsForm.jsx
│   │   │   │   ├── EducationsForm.jsx
│   │   │   │   ├── ActivitiesForm.jsx
│   │   │   │   ├── ProfessionalSkillsForm.jsx
│   │   │   │   ├── LanguageCompetenciesForm.jsx
│   │   │   │   ├── FormSection.jsx
│   │   │   │   └── SectionTitleEditor.jsx
│   │   │   ├── templates/
│   │   │   │   ├── ModernTemplate.jsx
│   │   │   │   ├── ClassicTemplate.jsx
│   │   │   │   ├── CreativeTemplate.jsx
│   │   │   │   └── MinimalTemplate.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── cv/
│   │   │       ├── CVPreview.jsx
│   │   │       ├── CVList.jsx
│   │   │       └── CVCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CVEditor.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── cvService.js
│   │   │   └── pdfService.js
│   │   ├── utils/
│   │   │   ├── jsonExport.js
│   │   │   ├── jsonImport.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   ├── context/
│   │   │   └── CVContext.jsx
│   │   ├── hooks/
│   │   │   ├── useCV.js
│   │   │   └── useDebounce.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   └── CV.js
│   │   ├── controllers/
│   │   │   └── cvController.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   └── cvRoutes.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validator.js
│   │   ├── utils/
│   │   │   ├── response.js
│   │   │   └── constants.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── README.md
└── .ai/
    └── plan.md
```

## Implementation Steps

### Step 1: Project Setup
1. Initialize project structure
2. Setup React app with Vite
3. Setup Express server
4. Configure MongoDB/database
5. Install dependencies
6. Setup environment variables

### Step 2: Backend Development
1. Create database schema/model
2. Implement CRUD endpoints
3. Add validation middleware
4. Add error handling
5. Test APIs with Postman/Thunder Client

### Step 3: Frontend Foundation
1. Setup routing
2. Create layout components
3. Setup Tailwind CSS
4. Create context for CV data
5. Setup API service layer

### Step 4: Form Implementation
1. Create form components for each section:
   - Personal Information (name, email, phone, address, avatar)
   - Introduction (rich text editor integration)
   - Work History (multiple items with date range)
   - Certifications (multiple items with expiration)
   - Educations (multiple items with study period)
   - Activities (multiple items)
   - Professional Skills (multiple items with level)
   - Language Competencies (multiple items)
2. Implement custom section title editing
3. Implement form validation
4. Connect forms to context/state
5. Add/edit/remove functionality for array fields
6. Avatar upload and preview functionality

### Step 5: Template & Preview
1. Design and implement first template
2. Create preview component
3. Connect preview to form data
4. Implement real-time updates

### Step 6: Import/Export Features
1. Implement JSON export (download)
2. Implement JSON import (upload)
3. Add validation for imported data
4. Implement PDF export functionality

### Step 7: Backend Integration
1. Connect frontend to backend APIs
2. Implement save/load CV functionality
3. Implement CV list view
4. Add loading and error states

### Step 8: Additional Templates
1. Design additional templates
2. Implement template components
3. Add template selector
4. Test template switching

### Step 9: Testing & Refinement
1. Test all features
2. Fix bugs
3. Improve UI/UX
4. Add loading indicators
5. Improve error messages

### Step 10: Documentation
1. Write README
2. Add code comments
3. Create user guide
4. API documentation

## Dependencies

### Frontend (client/package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "react-hook-form": "^7.48.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1",
    "lucide-react": "^0.294.0",
    "date-fns": "^2.30.0",
    "react-quill": "^2.0.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### Backend (server/package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/power-cv
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Key Considerations

### Security
- Input validation on both client and server
- Sanitize user input to prevent XSS
- Set appropriate CORS policies
- File upload size limits
- Rate limiting (future enhancement)

### Performance
- Debounce preview updates
- Lazy load templates
- Optimize images
- Minimize re-renders
- Database indexing

### User Experience
- Auto-save functionality (future)
- Undo/redo (future)
- Keyboard shortcuts
- Mobile responsive design
- Clear error messages
- Loading states

### Scalability
- Modular component architecture
- Separate concerns (MVC pattern)
- Environment-based configuration
- Ready for authentication (future)
- API versioning consideration

## Future Enhancements
1. User authentication and authorization
2. Multiple CVs per user
3. CV sharing functionality
4. Collaborative editing
5. AI-powered suggestions
6. Template marketplace
7. Cover letter builder
8. Analytics and insights
9. Cloud storage integration
10. Multi-language support

## Success Metrics
- User can create a CV in under 10 minutes
- PDF export maintains 100% visual fidelity
- Import/export JSON with zero data loss
- Preview updates in < 500ms
- Mobile-responsive on all screen sizes
- Zero critical bugs in production

---

**Last Updated:** 2024
**Version:** 1.0
**Status:** Planning Phase
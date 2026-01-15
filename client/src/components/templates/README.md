# Template Components

This directory contains CV template components for rendering the final CV output.

## Purpose

Template components are responsible for rendering the CV data in different visual styles. Each template provides a unique design while displaying the same CV data structure.

## Templates to be added:

- `ModernTemplate.jsx` - Modern, clean design with color accents
- `ClassicTemplate.jsx` - Traditional, professional layout (Phase 2)
- `MinimalTemplate.jsx` - Minimalist design with focus on content (Phase 2)

## Template Structure

Each template component should:
- Accept CV data as props
- Render all CV sections in the template's style
- Be print-friendly (for PDF export)
- Support customizable section titles
- Handle missing/optional data gracefully
- Be responsive (preview in different sizes)

## Example Template Structure

```javascript
// ModernTemplate.jsx
function ModernTemplate({ cvData, sectionTitles }) {
  return (
    <div className="cv-template modern-template">
      {/* Header - Personal Info */}
      <header className="cv-header">
        <h1>{cvData.personalInfo.name}</h1>
        <div className="contact-info">
          <span>{cvData.personalInfo.email}</span>
          <span>{cvData.personalInfo.phone}</span>
          <span>{cvData.personalInfo.location}</span>
        </div>
      </header>

      {/* Introduction */}
      {cvData.introduction && (
        <section className="cv-section">
          <h2>{sectionTitles.introduction || 'Introduction'}</h2>
          <div dangerouslySetInnerHTML={{ __html: cvData.introduction }} />
        </section>
      )}

      {/* Work History */}
      {cvData.workHistory?.length > 0 && (
        <section className="cv-section">
          <h2>{sectionTitles.workHistory || 'Work History'}</h2>
          {cvData.workHistory.map((job, index) => (
            <div key={index} className="work-entry">
              <h3>{job.position}</h3>
              <div className="company">{job.company}</div>
              <div className="date-range">{job.startDate} - {job.endDate}</div>
              <p>{job.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Other sections... */}
    </div>
  );
}

export default ModernTemplate;
```

## Template Requirements

### All Templates Must:
1. Display all 8 CV sections:
   - Personal Information
   - Introduction
   - Work History
   - Certifications
   - Education
   - Activities
   - Professional Skills
   - Language Competencies

2. Support customizable section titles
3. Handle empty/optional sections gracefully
4. Be print-ready (CSS for @media print)
5. Use semantic HTML
6. Follow accessibility guidelines
7. Be responsive for preview

### Styling Guidelines

- Use scoped CSS classes (template-specific)
- Support A4 page size for printing
- Use web-safe fonts or include font files
- Maintain consistent spacing and typography
- Use colors that print well (high contrast)
- Consider page breaks for PDF export

### Data Structure

Templates receive CV data in this format:

```javascript
{
  id: 'uuid',
  name: 'CV Name',
  personalInfo: {
    name: 'Full Name',
    email: 'email@example.com',
    phone: '+1234567890',
    location: 'City, Country',
    linkedin: 'linkedin.com/in/...',
    website: 'portfolio.com'
  },
  introduction: '<p>HTML content...</p>',
  workHistory: [
    {
      position: 'Job Title',
      company: 'Company Name',
      location: 'City, Country',
      startDate: '2020-01',
      endDate: '2023-12',
      description: 'Job description...'
    }
  ],
  certifications: [...],
  educations: [...],
  activities: [...],
  professionalSkills: [...],
  languageCompetencies: [...],
  sectionTitles: {
    introduction: 'About Me',
    workHistory: 'Experience',
    // ... custom titles
  }
}
```

## Template Selection

Templates are selected via a dropdown in the CV editor. The selected template name is stored with the CV data and used for rendering.

## Testing Templates

Each template should be tested with:
- Complete CV data (all sections filled)
- Partial CV data (some sections empty)
- Minimum viable data (only required fields)
- Long text content (overflow handling)
- Special characters and formatting
- Print preview
- PDF export quality

## Guidelines

- Keep templates focused on presentation only (no business logic)
- Use CSS for styling, avoid inline styles
- Make templates reusable and configurable
- Document any special requirements or limitations
- Consider internationalization (i18n) for future
- Optimize for performance (large CVs)
- Test across different browsers
- Ensure print styles work correctly
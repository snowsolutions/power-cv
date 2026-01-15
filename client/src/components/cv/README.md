# CV Components

This directory contains components specific to CV rendering and display.

## Purpose

CV components handle the visual representation of CV data. They are responsible for rendering the CV in different templates and formats.

## Examples of components to be added:

- `CVPreview.jsx` - Main CV preview container component
- `ModernTemplate.jsx` - Modern CV template design
- `ClassicTemplate.jsx` - Classic CV template design
- `MinimalTemplate.jsx` - Minimal CV template design
- `CVSection.jsx` - Generic section wrapper for CV parts
- `PersonalInfoSection.jsx` - Renders personal information section
- `IntroductionSection.jsx` - Renders introduction/summary section
- `WorkHistorySection.jsx` - Renders work experience section
- `CertificationSection.jsx` - Renders certifications section
- `EducationSection.jsx` - Renders education section
- `ActivitySection.jsx` - Renders activities/projects section
- `SkillsSection.jsx` - Renders professional skills section
- `LanguageSection.jsx` - Renders language competencies section
- `TemplateSelector.jsx` - Component for selecting CV template

## Template Structure

Each template component should:
- Accept CV data as props
- Render all CV sections in a specific layout
- Be print-friendly for PDF export
- Support custom section titles
- Handle missing or optional data gracefully

## Example Template Component

```javascript
// ModernTemplate.jsx
import PersonalInfoSection from './PersonalInfoSection';
import IntroductionSection from './IntroductionSection';
import WorkHistorySection from './WorkHistorySection';
// ... other sections

function ModernTemplate({ cvData, sectionTitles }) {
  return (
    <div className="cv-template modern">
      <PersonalInfoSection 
        data={cvData.personalInfo} 
      />
      
      {cvData.introduction && (
        <IntroductionSection 
          data={cvData.introduction}
          title={sectionTitles.introduction || 'Professional Summary'}
        />
      )}
      
      {cvData.workHistory?.length > 0 && (
        <WorkHistorySection 
          data={cvData.workHistory}
          title={sectionTitles.workHistory || 'Work Experience'}
        />
      )}
      
      {/* Other sections */}
    </div>
  );
}

export default ModernTemplate;
```

## Section Component Example

```javascript
// WorkHistorySection.jsx
function WorkHistorySection({ data, title }) {
  return (
    <section className="cv-section work-history">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">
        {data.map((job, index) => (
          <div key={index} className="work-entry">
            <div className="work-header">
              <h3 className="job-title">{job.title}</h3>
              <span className="company">{job.company}</span>
            </div>
            <div className="work-meta">
              <span className="duration">
                {job.startDate} - {job.endDate || 'Present'}
              </span>
              {job.location && (
                <span className="location">{job.location}</span>
              )}
            </div>
            {job.description && (
              <div className="work-description">
                {job.description}
              </div>
            )}
            {job.achievements?.length > 0 && (
              <ul className="achievements">
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkHistorySection;
```

## Guidelines

- Keep templates print-friendly (use appropriate CSS for print media)
- Use semantic HTML for better accessibility
- Handle missing or empty data gracefully (don't render empty sections)
- Make templates responsive (mobile, tablet, desktop)
- Use consistent spacing and typography
- Support custom section titles from props
- Optimize for PDF generation (avoid complex animations/transitions)
- Use relative units (rem, em) for better scaling
- Consider A4 paper dimensions for layout (210mm × 297mm)
- Test templates with various data lengths and combinations

## Print Styles

Remember to include print-specific CSS:

```css
@media print {
  .cv-template {
    width: 210mm;
    min-height: 297mm;
    padding: 20mm;
    margin: 0;
    box-shadow: none;
  }
  
  .no-print {
    display: none;
  }
  
  /* Prevent page breaks in the middle of sections */
  .cv-section {
    page-break-inside: avoid;
  }
}
```

## Data Props Structure

Each section component should expect data in this format:

```javascript
// Personal Info
{
  fullName: string,
  email: string,
  phone: string,
  address: string,
  linkedin: string,
  website: string
}

// Work History
[{
  title: string,
  company: string,
  startDate: string,
  endDate: string | null,
  location: string,
  description: string,
  achievements: string[]
}]

// And so on for other sections...
```

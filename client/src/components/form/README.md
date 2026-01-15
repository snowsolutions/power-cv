# Form Components

This directory contains form-specific components used for CV data input.

## Purpose

Form components are specialized components for collecting and managing CV data input. They handle form state, validation, and user interactions.

## Examples of components to be added:

- `PersonalInfoForm.jsx` - Form for personal information (name, contact, etc.)
- `IntroductionEditor.jsx` - Rich text editor for CV introduction
- `WorkHistoryForm.jsx` - Form for work experience entries
- `CertificationForm.jsx` - Form for certifications
- `EducationForm.jsx` - Form for education entries
- `ActivityForm.jsx` - Form for activities/projects
- `SkillsForm.jsx` - Form for professional skills
- `LanguageForm.jsx` - Form for language competencies
- `FormSection.jsx` - Wrapper component for form sections
- `FormField.jsx` - Individual form field component

## Guidelines

- Use React Hook Form for form state management
- Implement proper validation rules
- Provide clear error messages
- Support add/edit/delete operations for list items
- Ensure accessibility (ARIA labels, keyboard navigation)
- Handle loading and submission states
- Auto-save functionality where appropriate
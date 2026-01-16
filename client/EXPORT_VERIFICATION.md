# JSON Export Verification Guide

This document helps you verify that JSON exports capture all CV data correctly.

## What Should Be Exported

When you click the "Export" button, the JSON file should contain ALL of the following sections:

### 1. **Personal Information** (`personalInfo`)
```json
"personalInfo": {
  "sectionTitle": "Personal Information",
  "name": "Your Name",
  "email": "your.email@example.com",
  "phone": "+1234567890",
  "address": "Your Address",
  "avatar": "base64-encoded-image-or-url"
}
```

### 2. **Introduction/Professional Profile** (`introduction`)
```json
"introduction": {
  "sectionTitle": "Introduction",
  "content": "<p>Your professional summary with HTML formatting...</p>"
}
```
**Note:** This is the "Professional Profile" section. Content is stored as HTML from the rich text editor.

### 3. **Professional Skills** (`professionalSkills`)
```json
"professionalSkills": {
  "sectionTitle": "Professional Skills",
  "items": [
    {
      "id": "unique-id",
      "skillName": "JavaScript",
      "level": "Expert",
      "description": "10+ years experience"
    }
  ]
}
```
**Important:** Each skill has `level` (not `proficiency`). Values: Beginner, Intermediate, Advanced, Expert.

### 4. **Work History** (`workHistory`)
```json
"workHistory": {
  "sectionTitle": "Work History",
  "items": [
    {
      "id": "unique-id",
      "dateFrom": "2020-01",
      "dateTo": "2023-12",
      "companyName": "Company Name",
      "position": "Job Title",
      "description": "Job description..."
    }
  ]
}
```

### 5. **Certifications** (`certifications`)
```json
"certifications": {
  "sectionTitle": "Certifications",
  "items": [
    {
      "id": "unique-id",
      "certName": "Certification Name",
      "organization": "Issuing Organization",
      "certLink": "https://...",
      "certExpiration": "2025-12"
    }
  ]
}
```

### 6. **Education** (`educations`)
```json
"educations": {
  "sectionTitle": "Education",
  "items": [
    {
      "id": "unique-id",
      "schoolName": "University Name",
      "studyFrom": "2015-09",
      "studyTo": "2019-06",
      "profession": "Degree/Major"
    }
  ]
}
```

### 7. **Activities** (`activities`)
```json
"activities": {
  "sectionTitle": "Activities",
  "items": [
    {
      "id": "unique-id",
      "title": "Activity Title",
      "description": "Activity description",
      "date": "2023-05"
    }
  ]
}
```

### 8. **Language Competencies** (`languageCompetencies`)
```json
"languageCompetencies": {
  "sectionTitle": "Language Competencies",
  "items": [
    {
      "id": "unique-id",
      "language": "English",
      "proficiency": "Native"
    }
  ]
}
```
**Important:** Language name is stored in `language` field, proficiency level in `proficiency` field. Values: Basic, Intermediate, Professional, Fluent, Native.

## Complete Export Structure

```json
{
  "version": "1.0.0",
  "exportDate": "2024-01-15T10:30:00.000Z",
  "cv": {
    "id": "cv-id-or-null",
    "name": "My CV Name",
    "template": "classic",
    "data": {
      "personalInfo": { ... },
      "introduction": { ... },
      "professionalSkills": { ... },
      "workHistory": { ... },
      "certifications": { ... },
      "educations": { ... },
      "activities": { ... },
      "languageCompetencies": { ... }
    },
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## How to Verify Your Export

### Step 1: Fill in Test Data
1. Add your name, email, phone, and address in Personal Information
2. Write some text in the **Introduction** section (this is your Professional Profile!)
3. Add at least one Professional Skill with a level
4. Add at least one Work History entry
5. Add other sections as needed

### Step 2: Export to JSON
1. Click the "📥 Export" button in the CV Editor
2. A JSON file will download (e.g., `my_cv_20240115.json`)

### Step 3: Open and Inspect
1. Open the downloaded JSON file in a text editor
2. Verify all sections you filled are present under `cv.data`
3. Check that:
   - ✅ `introduction.content` contains your Professional Profile text
   - ✅ `professionalSkills.items` contains your skills with `level` field
   - ✅ All other sections have their data

### Step 4: Test Import
1. Create a new CV or reset current one
2. Click "📤 Import" button
3. Select the JSON file you just exported
4. Verify all data appears correctly in the forms

## Common Issues & Solutions

### Issue: Introduction/Professional Profile is Empty in Export
**Cause:** Content might not be saved yet  
**Solution:** 
- Type something in the Introduction section
- Wait 300ms for auto-save (debounce delay)
- Then export

### Issue: Professional Skills Missing Level
**Cause:** Fixed in latest version (was using wrong field name)  
**Solution:** 
- Make sure you're using the latest code
- Skills should show levels like "(Expert)" in the template

### Issue: Some Sections Missing
**Cause:** Sections with no items/content are still exported but appear empty  
**Solution:** 
- This is normal - empty sections are included but have empty arrays (`items: []`) or empty content (`content: ""`)
- Only sections with data will display in the template

## Data Flow Summary

```
User Input → Form Component → Store (useCVStore) → currentCV.data
                                                          ↓
User Clicks Export → exportCV() → exportCVAsJSON(currentCV)
                                                          ↓
                                   JSON.stringify(exportData)
                                                          ↓
                                   Download as .json file
```

## Notes for Developers

- Export is in `client/src/utils/jsonExport.js`
- Import/validation is in `client/src/utils/jsonImport.js`
- Data structure defined in `client/src/utils/initialCVData.js`
- Store manages state in `client/src/store/useCVStore.js`
- Template renders in `client/src/components/templates/ClassicTemplate.jsx`

---

**Last Updated:** 2024-01-15  
**Recent Fixes:** 
- Professional Skills now correctly display `level` field (was using wrong field name `proficiency`)
- Language Competencies now correctly display `language` field (was using wrong field name `languageName`)

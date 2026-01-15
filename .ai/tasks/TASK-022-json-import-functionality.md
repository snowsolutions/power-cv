# TASK-022: JSON Import Functionality

**Status**: PENDING
**Priority**: MEDIUM
**Phase**: 1 - Core Functionality
**Estimated Time**: 60-90 minutes

## 📋 Description
Implement JSON import to load CV data from uploaded JSON file.

## 🎯 Objectives
1. Create jsonImport utility
2. Add file upload button
3. Parse and validate JSON
4. Load data into store
5. Handle invalid JSON
6. Show success/error messages
7. Add confirmation dialog

## 📝 Acceptance Criteria
- [ ] Import button available
- [ ] Can select JSON file
- [ ] File is parsed correctly
- [ ] Data loads into CV
- [ ] Validation catches errors
- [ ] User sees success/error message
- [ ] Confirmation before overwriting

## 🧪 Testing Instructions
1. Export a CV as JSON (from TASK-021)
2. Create new blank CV
3. Click "Import JSON"
4. Select exported JSON file
5. Verify data loads correctly
6. Test with invalid JSON (show error)
7. Test with missing fields (handles gracefully)

**Definition of Done**: User can import CV from JSON file

---

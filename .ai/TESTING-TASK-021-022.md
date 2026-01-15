# Testing Instructions for TASK-021 & TASK-022

**Date**: 2026-01-15
**Tasks**: JSON Export Functionality + JSON Import Functionality
**Status**: Ready for Testing

---

## 🎯 What Was Implemented

### TASK-021: JSON Export Functionality
- ✅ Export CV data as downloadable JSON file
- ✅ Meaningful file naming (cv-name_timestamp.json)
- ✅ Export from CVEditor page
- ✅ Export from Dashboard (individual CVs)
- ✅ Success/error feedback messages
- ✅ Formatted JSON with metadata

### TASK-022: JSON Import Functionality
- ✅ Import CV from JSON file
- ✅ File picker interface
- ✅ JSON validation (structure, required fields)
- ✅ File type and size validation
- ✅ Confirmation dialog for unsaved changes
- ✅ Success/error messages
- ✅ Data sanitization

---

## 🧪 Testing Checklist

### Part 1: Export CV from Editor

1. **Create a Test CV**
   - Go to `http://localhost:5173/dashboard`
   - Click "Create New CV"
   - Fill in some data:
     - CV Name: "My Test CV"
     - Personal info (name, email, phone)
     - Introduction text
     - At least one work history entry
     - At least one certification
     - At least one education entry

2. **Export the CV**
   - In the CVEditor, look for the green "📥 Export" button (next to Save)
   - Click the "Export" button
   - A JSON file should download automatically
   - Check your Downloads folder

3. **Verify Downloaded File**
   - File name should be like: `my_test_cv_20260115.json`
   - Open the file in a text editor
   - Should see formatted JSON with:
     - `version` field
     - `exportDate` field
     - `cv` object with all your data
   - JSON should be readable and properly formatted

**Expected Result**: ✅ CV exports as JSON file with correct data

---

### Part 2: Export CV from Dashboard

1. **Go to Dashboard**
   - Navigate to `http://localhost:5173/dashboard`
   - Should see your saved CVs in cards

2. **Export Individual CV**
   - Look for the green "📥" button on each CV card
   - Click the export button on any CV
   - File should download immediately
   - Success message should appear: "CV exported successfully!"

3. **Verify Export**
   - Check Downloads folder
   - File should have correct CV name in filename
   - Open file and verify data is complete

**Expected Result**: ✅ Can export CVs from dashboard

---

### Part 3: Import CV (Basic)

1. **Create New Blank CV**
   - Click "Create New CV" from dashboard
   - Leave it blank or add minimal data
   - Don't save yet

2. **Import Previously Exported CV**
   - Look for the purple "📤 Import" button (next to Export)
   - Click "Import" button
   - File picker dialog should open
   - Select the JSON file you exported earlier
   - Wait for import to complete

3. **Verify Import Success**
   - Success message should appear: "CV imported successfully!"
   - All form fields should populate with imported data:
     - ✅ CV name matches
     - ✅ Personal info restored
     - ✅ Introduction text restored
     - ✅ Work history entries appear
     - ✅ Certifications appear
     - ✅ Education entries appear
   - Preview should show all imported data
   - "Unsaved changes" badge should appear (data is dirty)

**Expected Result**: ✅ Import loads all data correctly

---

### Part 4: Import with Unsaved Changes Warning

1. **Edit Current CV**
   - Fill in some data in the form
   - Don't save (keep it dirty)
   - "Unsaved changes" badge should be visible

2. **Try to Import**
   - Click "Import" button
   - **Confirmation modal should appear** with warning:
     - "You have unsaved changes. Importing a new CV will replace your current data. Do you want to continue?"

3. **Test Cancel**
   - Click "Cancel" button
   - Modal should close
   - Your current data should remain unchanged

4. **Test Import Anyway**
   - Click "Import" button again
   - Modal appears again
   - Click "Import Anyway" button
   - File picker should open
   - Select a JSON file
   - Data should import and replace current data

**Expected Result**: ✅ Warning modal works correctly

---

### Part 5: Error Handling - Invalid Files

1. **Test Non-JSON File**
   - Create a text file (not JSON) or use any image file
   - Try to import it
   - **Should see error**: "Please select a valid JSON file"

2. **Test Invalid JSON Format**
   - Create a file named `test.json` with content: `{this is not valid json}`
   - Try to import it
   - **Should see error**: "Invalid JSON format: ..."

3. **Test Missing Required Fields**
   - Create a JSON file with content:
   ```json
   {
     "cv": {
       "template": "modern"
     }
   }
   ```
   - Try to import it
   - **Should see error**: "Invalid CV data: Missing or invalid 'name' field, ..."

4. **Test Empty File**
   - Create an empty .json file
   - Try to import it
   - **Should see error message**

**Expected Result**: ✅ All error cases handled gracefully

---

### Part 6: Complete Import/Export Cycle

1. **Export CV A**
   - Edit CV "Professional CV"
   - Add comprehensive data (all sections)
   - Export it → saves as `professional_cv_date.json`

2. **Export CV B**
   - Create new CV "Technical CV"
   - Add different data
   - Export it → saves as `technical_cv_date.json`

3. **Create Blank CV**
   - Create new blank CV

4. **Import CV A**
   - Click Import
   - Select `professional_cv_date.json`
   - Verify all data from "Professional CV" loads

5. **Import CV B**
   - Click Import again
   - Select `technical_cv_date.json`
   - Verify data switches to "Technical CV"
   - All previous data should be replaced

**Expected Result**: ✅ Can switch between different CV imports

---

### Part 7: Import with Avatar

1. **Create CV with Photo**
   - Create a CV
   - Upload a profile photo
   - Save the CV
   - Export it

2. **Import in New CV**
   - Create new blank CV
   - Import the exported JSON
   - **Avatar should load immediately**
   - Photo should display without refresh

**Expected Result**: ✅ Avatar imports correctly

---

### Part 8: File Naming Validation

1. **Export CV with Special Characters**
   - Create CV named: "John's CV @ 2024!"
   - Export it
   - File name should be sanitized: `johns_cv___2024__20260115.json`
   - No special characters in filename

2. **Export CV with Long Name**
   - Create CV with very long name (100+ characters)
   - Export it
   - File should download successfully
   - Name should be sanitized

**Expected Result**: ✅ File names are safe and valid

---

### Part 9: Import After Save

1. **Import a CV**
   - Import any exported JSON
   - Click "Save CV" button
   - Wait for success message
   - Note the CV ID in URL (e.g., `/editor/abc-123`)

2. **Verify in Database**
   - Go to Dashboard
   - Imported CV should appear in the list
   - Can edit and save normally

**Expected Result**: ✅ Imported CVs can be saved to backend

---

### Part 10: Multiple Exports

1. **Export Same CV Multiple Times**
   - Edit any CV
   - Export it (file1.json)
   - Make a small change
   - Export again (file2.json)
   - Files should have different timestamps in names

2. **Verify Files Are Different**
   - Open both files
   - Check `exportDate` field - should be different
   - Check data - should reflect the changes

**Expected Result**: ✅ Multiple exports work correctly

---

## 🐛 Common Issues to Check

### Issue 1: Export Button Not Working
- Check browser console (F12) for errors
- Verify file actually downloaded (check Downloads folder)
- Try different browser if needed

### Issue 2: Import Not Loading Data
- Verify JSON file structure is correct
- Check console for validation errors
- Ensure file is valid JSON (use jsonlint.com)

### Issue 3: File Not Downloading
- Check browser's download settings
- Ensure pop-ups are not blocked
- Try clicking Export again

### Issue 4: Import Modal Not Appearing
- Make sure you have unsaved changes first
- Check if "Unsaved changes" badge is visible
- Try refreshing the page

---

## 📊 Success Criteria

✅ Export button available in CVEditor
✅ Export button available on Dashboard CV cards
✅ Clicking export downloads JSON file
✅ File name is meaningful and sanitized
✅ JSON contains all CV data
✅ JSON is properly formatted and valid
✅ Import button available in CVEditor
✅ Can select and upload JSON file
✅ File validation works (type, size, format)
✅ Data structure validation works
✅ Required fields validation works
✅ Import loads all data correctly
✅ Avatar imports correctly
✅ Confirmation modal shows for unsaved changes
✅ Success messages appear after import
✅ Error messages are clear and helpful
✅ Invalid files are rejected with error
✅ Can complete full export/import cycle
✅ Imported CVs can be saved to backend
✅ No console errors
✅ Production build succeeds

---

## 🔍 Advanced Testing (Optional)

### Test Large Files
1. Create CV with lots of work history (20+ entries)
2. Add very long introduction text (5000+ words)
3. Export and verify file size
4. Import back and verify all data intact

### Test Concurrent Operations
1. Open two browser tabs with CVEditor
2. Export from tab 1
3. Import in tab 2
4. Verify data consistency

### Test Browser Compatibility
- Test export/import in Chrome
- Test in Firefox
- Test in Edge/Safari if available

---

## 📝 Testing Notes

**Please test each section and note:**
1. What works correctly ✅
2. What doesn't work ❌
3. Any error messages you see
4. Any unexpected behavior
5. Browser console errors (if any)

**Special Attention:**
- Avatar loading on import
- File name sanitization
- Error message clarity
- Modal confirmation flow

---

## ✅ Sign-Off

Once you've tested all sections above, please reply with:

**"TASK-021 and TASK-022 tested and confirmed working"**

Or if there are issues:

**"Found issues: [describe the problems]"**

---

## 📋 Quick Test Summary

**Minimum tests to confirm everything works:**

1. ✅ Export CV from editor → file downloads
2. ✅ Export CV from dashboard → file downloads
3. ✅ Import exported JSON → data loads correctly
4. ✅ Import with unsaved changes → modal appears
5. ✅ Import invalid file → error message shows
6. ✅ Import with avatar → photo appears
7. ✅ Save imported CV → works normally

**If all 7 quick tests pass, the features are working!** 🎉

---

**Thank you for testing!**
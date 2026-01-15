# Quick Testing Guide: Tasks 026-029

This guide will help you quickly test all features implemented in tasks 026-029.

---

## 🚀 Getting Started

1. Make sure both server and client are running:
   - Client: `http://localhost:5173`
   - Server: `http://localhost:5001`

2. Navigate to the application in your browser

---

## ✅ TASK-026: PDF Export Functionality

### What to Test:
The ability to export your CV as a PDF file.

### Steps:
1. Go to Dashboard and create/open a CV
2. Add some content to your CV (name, work history, etc.)
3. Look at the **Preview panel** on the right side
4. Find the **green "PDF" button** (next to Print button)
5. Click the "PDF" button
6. Wait for the "Exporting..." spinner
7. PDF should download automatically

### Expected Results:
- ✅ PDF downloads with filename: `{YourName}_CV.pdf`
- ✅ All CV sections are visible in the PDF
- ✅ Formatting and styling are preserved
- ✅ If CV is long, it should span multiple pages correctly
- ✅ No content is cut off or missing

### Try Also:
- Export with different templates (see TASK-027)
- Export CVs with lots of content vs minimal content
- Check PDF on different PDF viewers

---

## ✅ TASK-027: Additional Templates

### What to Test:
Four different CV template designs you can choose from.

### Steps:
1. Open a CV with some data in the editor
2. Look at the **Preview panel** on the right
3. Find the **template selector button** (shows current template name, e.g., "Modern")
4. Click it to open the dropdown menu
5. Try each template:
   - **Modern** - Blue gradient header, two-column layout
   - **Classic** - Traditional centered header, single-column
   - **Creative** - Purple/pink gradient sidebar, colorful design
   - **Minimal** - Clean, light fonts, minimalist style

### Expected Results:
- ✅ Dropdown shows all 4 templates with descriptions
- ✅ Clicking a template changes the preview instantly
- ✅ All your CV data appears in every template
- ✅ Each template has a unique, distinct design
- ✅ PDF export works with each template
- ✅ Templates are responsive and print-friendly

### Try Also:
- Switch templates multiple times
- Export PDF with each template
- Add/remove data and see it update in all templates

---

## ✅ TASK-028: CV Dashboard Enhancements

### What to Test:
Search, filter, and duplicate functionality on the dashboard.

### Steps:

#### Test Duplicate:
1. Go to Dashboard (`/` or `/dashboard`)
2. Find the **📋 (clipboard) button** on a CV card
3. Click it
4. A new CV should appear with "(Copy)" added to the name

#### Test Search:
1. Make sure you have at least 2-3 CVs
2. Find the **search box** above the CV cards
3. Type a CV name (or part of it)
4. CV cards should filter to show only matching results

#### Test Filter:
1. Create CVs with different templates
2. Use the **"All Templates" dropdown**
3. Select a specific template (e.g., "Classic")
4. Only CVs using that template should show

#### Test Clear Filters:
1. Search for something that has no results
2. You should see "No CVs found" message
3. Click **"Clear Filters"** button
4. All CVs should appear again

### Expected Results:
- ✅ Duplicate creates exact copy with "(Copy)" suffix
- ✅ Search filters CVs by name (case-insensitive)
- ✅ Template filter works correctly
- ✅ Shows "X of Y CVs" when filters are active
- ✅ All existing buttons still work (Edit, Export, Delete)
- ✅ Empty states appear when appropriate

### Try Also:
- Duplicate a CV, then edit the copy
- Search while a template filter is active
- Export and delete duplicated CVs

---

## ✅ TASK-029: Form Validation

### What to Test:
Input validation with visual feedback and error messages.

### Steps:

#### Test Name Field:
1. Open Personal Info form
2. Clear the **Name** field completely
3. Click outside the field (blur/tab away)
4. Should show error: "Name is required"
5. Type only 1 character → Error: "Name must be at least 2 characters"
6. Type a valid name (2+ chars) → Green checkmark appears ✓

#### Test Email Field:
1. Type invalid email: `notanemail`
2. Click outside the field
3. Should show error about valid email format
4. Type valid email: `test@example.com`
5. Green checkmark appears ✓

#### Test Phone Field:
1. Type letters: `abcdef`
2. Should show error about valid phone format
3. Type valid phone: `+1-555-1234` or `555-1234`
4. Green checkmark appears ✓

#### Test Address Field:
1. Type a very long address (200+ characters)
2. Should show error about max length
3. Keep it under 200 chars → Valid

### Expected Results:
- ✅ Required fields marked with red asterisk (*)
- ✅ Errors appear when you leave a field (on blur)
- ✅ Error messages are clear and helpful
- ✅ Green checkmark (✓) appears when field is valid
- ✅ Red warning icon (⚠) appears when field has error
- ✅ Error clears when you fix the issue
- ✅ Field background turns light red when there's an error

### Try Also:
- Try to save CV with invalid data (future enhancement)
- Test different phone formats: `1234567`, `(555) 123-4567`
- Test international phone numbers: `+44 20 1234 5678`

---

## 🐛 What to Look For

### Bugs to Report:
- PDF export fails or shows errors
- PDF content is cut off or misaligned
- Template switching doesn't update preview
- Template selector doesn't show all templates
- Duplicate button doesn't work or creates errors
- Search/filter doesn't find correct CVs
- Validation doesn't trigger or shows wrong messages
- Validation checkmarks don't appear
- Any console errors (press F12 to open browser console)

### Things to Check:
- All buttons are clickable and visible
- Loading states appear during operations
- Success/error messages display correctly
- UI is responsive on different screen sizes
- No broken layouts or styling issues

---

## ✅ Acceptance Criteria

### TASK-026 is DONE when:
- [ ] PDF export button works
- [ ] PDFs download with correct filename
- [ ] All content appears in PDF
- [ ] Formatting looks good in PDF

### TASK-027 is DONE when:
- [ ] All 4 templates are available
- [ ] Can switch between templates
- [ ] All data shows in all templates
- [ ] Each template looks distinct

### TASK-028 is DONE when:
- [ ] Can duplicate CVs
- [ ] Search filters CVs by name
- [ ] Template filter works
- [ ] Clear filters restores all CVs

### TASK-029 is DONE when:
- [ ] Invalid email shows error
- [ ] Invalid phone shows error
- [ ] Required fields show error when empty
- [ ] Valid fields show green checkmark
- [ ] Error messages are helpful

---

## 📝 How to Report Results

After testing, please respond with:

1. **Which features work correctly** ✅
2. **Which features have issues** ❌
3. **Any bugs or unexpected behavior** 🐛
4. **Suggestions for improvement** 💡

Example:
```
✅ TASK-026: PDF export works perfectly!
✅ TASK-027: All templates work, love the Creative template!
❌ TASK-028: Duplicate button created 2 copies instead of 1
✅ TASK-029: Validation works great, very helpful error messages

Bug: When I duplicate a CV, it seems to create it twice.
Suggestion: Could we add a "Rename" button on dashboard?
```

---

## 🎉 Thank You!

Your testing helps ensure everything works correctly before marking these tasks as DONE!
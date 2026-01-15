# Testing Instructions for TASK-019 & TASK-020

**Date**: 2026-01-15
**Tasks**: Backend CV CRUD APIs + Frontend-Backend Integration
**Status**: Ready for Testing

---

## 🎯 What Was Implemented

### TASK-019: Backend CV CRUD APIs
- ✅ Complete CRUD API endpoints for CV management
- ✅ Validation for required fields
- ✅ Error handling
- ✅ Database integration with PostgreSQL/Prisma

### TASK-020: Frontend-Backend Integration
- ✅ Save CV to backend (create/update)
- ✅ Load CV from backend
- ✅ Delete CV from backend
- ✅ List all CVs in dashboard
- ✅ Loading states and error messages
- ✅ Success notifications

---

## 🧪 Testing Checklist

### Part 1: Create New CV and Save

1. **Navigate to Dashboard**
   - Go to `http://localhost:5173/dashboard`
   - You should see "No CVs yet" message if database is empty

2. **Create New CV**
   - Click "Create New CV" button
   - You should be redirected to `/editor`
   - Page should show "Create New CV" title

3. **Fill in CV Data**
   - Change CV name from "Untitled CV" to something like "My Professional CV"
   - Fill in Personal Information (name, email, phone, address)
   - Add some introduction text
   - Add at least one Work History entry
   - Add at least one Certification
   - Add at least one Education entry

4. **Save CV**
   - Click the blue "Save CV" button
   - You should see a loading spinner
   - After save completes:
     - ✅ Green success message: "CV saved successfully!"
     - ✅ "Unsaved changes" badge should disappear
     - ✅ URL should change from `/editor` to `/editor/{some-uuid}`
   - Wait 1-2 seconds, the page might navigate to edit mode with the new ID

**Expected Result**: CV is saved to database with a unique ID

---

### Part 2: Verify CV in Dashboard

1. **Go Back to Dashboard**
   - Click "Back to Dashboard" or navigate to `http://localhost:5173/dashboard`

2. **Check CV List**
   - You should see your saved CV in a card
   - Card should show:
     - ✅ CV name ("My Professional CV")
     - ✅ Template type ("modern")
     - ✅ Updated date (today's date)
     - ✅ "Edit" button (blue)
     - ✅ "Delete" button (red)

**Expected Result**: Dashboard shows your saved CV

---

### Part 3: Load and Edit Existing CV

1. **Click Edit Button**
   - From dashboard, click "Edit" on your CV
   - You should be redirected to `/editor/{cv-id}`

2. **Verify Data Loaded**
   - ✅ CV name should be correct in the input field
   - ✅ All personal info should be populated
   - ✅ Introduction text should be there
   - ✅ All work history entries should appear
   - ✅ All certifications should appear
   - ✅ All education entries should appear
   - ✅ Preview should show all your data

3. **Make Changes**
   - Change the CV name to "Updated CV Name"
   - Modify some text in introduction
   - "Unsaved changes" badge should appear

4. **Save Changes**
   - Click "Save CV" button
   - Should see success message
   - "Unsaved changes" badge should disappear

5. **Verify Update**
   - Go back to dashboard
   - CV card should show "Updated CV Name"
   - Updated date should be recent

**Expected Result**: CV loads correctly and updates save properly

---

### Part 4: Create Multiple CVs

1. **Create Second CV**
   - From dashboard, click "Create New CV"
   - Fill in different data
   - Name it "Second CV"
   - Click "Save CV"

2. **Create Third CV**
   - Repeat process
   - Name it "Third CV"

3. **Check Dashboard**
   - Go to dashboard
   - Should see all 3 CVs in grid layout
   - All should have correct names and dates

**Expected Result**: Multiple CVs can be created and listed

---

### Part 5: Delete CV

1. **Delete a CV**
   - From dashboard, click "Delete" button on "Second CV"
   - Confirmation modal should appear
   - Modal should show CV name and warning message

2. **Confirm Delete**
   - Click "Delete" button in modal
   - Modal should close
   - Green success message should appear
   - CV card should disappear from list

3. **Verify Deletion**
   - Refresh the page
   - "Second CV" should still be gone
   - Other CVs should still be there

**Expected Result**: CV is permanently deleted from database

---

### Part 6: Loading States and Error Handling

1. **Test Loading State**
   - Go to dashboard and watch when page loads
   - Should see a spinning loader briefly
   - Then CV list appears

2. **Test with Network Issues** (Optional)
   - Open browser DevTools (F12)
   - Go to Network tab
   - Set throttling to "Offline"
   - Try to save a CV
   - Should see error message about network
   - Set back to "Online"

**Expected Result**: Loading states show properly, errors are user-friendly

---

### Part 7: Data Persistence

1. **Close Browser**
   - Close all browser tabs/windows

2. **Reopen and Check**
   - Go to `http://localhost:5173/dashboard`
   - All your CVs should still be there
   - Edit one and verify all data is intact

**Expected Result**: Data persists in database after browser restart

---

### Part 8: Real-time Preview Updates

1. **Edit Any CV**
   - Make sure preview is visible (right side)
   - Type in any form field
   - Watch the preview panel

2. **Verify Preview Updates**
   - ✅ Personal info changes should appear in preview
   - ✅ Introduction text should appear in preview
   - ✅ Work history changes should appear
   - ✅ Certifications should appear
   - ✅ Education should appear

**Expected Result**: Preview updates in real-time as you type

---

## 🐛 Common Issues to Check

### Issue 1: Save Button Not Working
- Check browser console (F12) for errors
- Verify server is running on port 5001
- Check network tab to see if API call is made

### Issue 2: CVs Not Loading in Dashboard
- Check if database is running (Docker container)
- Check browser console for errors
- Try refreshing the page

### Issue 3: Data Not Appearing After Load
- Check if CV ID in URL matches the one in database
- Verify API response in network tab
- Check for console errors

### Issue 4: Delete Not Working
- Ensure you're clicking "Delete" in the confirmation modal
- Check if CV still appears after page refresh
- Check console for errors

---

## 📊 Success Criteria

✅ Can create new CV and save to backend
✅ Can load CV from backend
✅ Can update existing CV
✅ Can delete CV
✅ Dashboard shows all saved CVs
✅ Loading indicators work
✅ Success messages appear
✅ Error messages are helpful
✅ Data persists after browser restart
✅ Multiple CVs can be managed
✅ Preview updates in real-time
✅ No console errors
✅ Production build succeeds

---

## 🔍 Backend Testing (Optional)

If you want to verify the backend directly:

### Using cURL:

1. **Get all CVs:**
```bash
curl http://localhost:5001/api/cvs
```

2. **Get single CV:**
```bash
curl http://localhost:5001/api/cvs/{cv-id}
```

3. **Create CV:**
```bash
curl -X POST http://localhost:5001/api/cvs \
  -H "Content-Type: application/json" \
  -d '{"name":"Test CV","template":"modern","data":{"personalInfo":{"name":"John"}}}'
```

4. **Update CV:**
```bash
curl -X PUT http://localhost:5001/api/cvs/{cv-id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

5. **Delete CV:**
```bash
curl -X DELETE http://localhost:5001/api/cvs/{cv-id}
```

---

## 📝 Testing Notes

**Please test each section and note:**
1. What works correctly ✅
2. What doesn't work ❌
3. Any error messages you see
4. Any unexpected behavior
5. Browser console errors (if any)

**After testing, please confirm:**
- Does everything work as expected?
- Are there any issues or bugs?
- Is the user experience smooth?

---

## ✅ Sign-Off

Once you've tested all sections above, please reply with:

**"TASK-019 and TASK-020 tested and confirmed working"**

Or if there are issues:

**"Found issues: [describe the problems]"**

This will allow me to mark these tasks as DONE or fix any remaining issues.

---

**Thank you for testing! 🎉**
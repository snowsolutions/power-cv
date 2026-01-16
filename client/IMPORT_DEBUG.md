# Import Debug Guide - Professional Profile Not Loading

## Problem Summary
When importing a CV JSON file, the Professional Profile (Introduction) text doesn't appear in the editor, even though it's present in the JSON.

## Fixes Applied

### Fix 1: Template Handling
**Issue:** Imported CV has `"template": "modern"` but we removed all templates except Classic.

**Solution:** Force all imports to use Classic template
```javascript
// In useCVStore.js line 538-539
template: TEMPLATES.CLASSIC,
selectedTemplate: TEMPLATES.CLASSIC,
```

### Fix 2: React Re-render Detection
**Issue:** React wasn't detecting that the deeply nested `introduction.content` changed when importing.

**Solution A:** Deep clone imported data to create new object references
```javascript
// In useCVStore.js line 517-519
const importedData = JSON.parse(
    JSON.stringify(result.cv.data),
);
```

**Solution B:** Force component remount with dynamic key
```javascript
// In CVEditor.jsx line 268
<IntroductionForm
    key={`${currentCV.id}-${currentCV.updatedAt}`}
    introduction={currentCV.data.introduction}
    onUpdate={updateIntroduction}
    onUpdateSectionTitle={updateSectionTitle}
/>
```

### Fix 3: IntroductionForm State Synchronization
**Issue:** Circular update loop and missed external updates in IntroductionForm

**Problem:** 
- Component has local state for ReactQuill
- When props change (import), local state wasn't always updating
- Debounced updates caused circular loops

**Solution:** Track last prop value to distinguish external vs internal updates
```javascript
// In IntroductionForm.jsx
const [localContent, setLocalContent] = useState(introduction.content);
const [lastPropContent, setLastPropContent] = useState(introduction.content);

// Only sync when external change detected
useEffect(() => {
    if (
        introduction.content !== lastPropContent &&
        introduction.content !== localContent
    ) {
        setLocalContent(introduction.content);
        setLastPropContent(introduction.content);
    }
}, [introduction.content, lastPropContent, localContent]);
```

## How to Test

### Test Case 1: Basic Import
1. Open browser console (F12)
2. Click "📤 Import" button
3. Select `mycv.json`
4. Check console logs:
   ```
   [Import] Result from importCVFromFile: { success: true, cv: {...} }
   [Import] Introduction content: <p><strong>Product Management...
   [Import] Full introduction object: { sectionTitle: "...", content: "..." }
   [Import] State updated with new currentCV
   [IntroductionForm] External update detected, syncing local state
   ```
5. Verify introduction text appears in editor

### Test Case 2: Import Different Content
1. Export current CV
2. Modify the introduction content in JSON file
3. Import the modified JSON
4. Verify new content appears (old content replaced)

### Test Case 3: Import Empty Introduction
1. Create JSON with empty introduction: `"content": ""`
2. Import
3. Editor should be empty

## Debugging Steps

### Step 1: Check Console Logs
After import, you should see:
```
[Import] Result from importCVFromFile: ...
[Import] Introduction content: (first 100 chars)
[Import] Full introduction object: ...
[Import] State updated with new currentCV
[IntroductionForm] External update detected, syncing local state
```

### Step 2: Inspect State in React DevTools
1. Install React DevTools
2. Select `CVEditor` component
3. Check `currentCV.data.introduction.content`
4. Should match JSON file content

### Step 3: Check ReactQuill Value
1. In React DevTools, find `IntroductionForm`
2. Check hooks: `localContent` should equal imported content
3. If not, the useEffect didn't trigger

### Step 4: Verify JSON Structure
Your JSON must have this structure:
```json
{
  "version": "1.0.0",
  "exportDate": "...",
  "cv": {
    "id": "...",
    "name": "...",
    "template": "modern",  // ← Will be changed to "classic"
    "data": {
      "introduction": {
        "sectionTitle": "Professional Profile",
        "content": "<p>Your HTML content here...</p>"  // ← This must be present
      },
      ...
    }
  }
}
```

## Common Issues

### Issue: Console shows "Invalid CV data: Missing section: introduction"
**Cause:** JSON structure is malformed
**Fix:** Ensure `cv.data.introduction` exists with both `sectionTitle` and `content`

### Issue: Import succeeds but editor is blank
**Cause:** ReactQuill not re-rendering
**Fix:** Check that:
1. Key prop changes (includes `updatedAt` timestamp)
2. Console shows "External update detected"
3. `localContent` state updates in React DevTools

### Issue: Content appears briefly then disappears
**Cause:** Debounce effect overwriting imported content
**Fix:** The `lastPropContent` tracking should prevent this
- Check console for "[IntroductionForm] Updating store with user changes"
- Should NOT appear immediately after import

### Issue: Template shows as "modern" instead of "classic"
**Cause:** Not using latest code
**Fix:** Ensure line 538 in `useCVStore.js` has:
```javascript
template: TEMPLATES.CLASSIC,
```

## Test JSON File
Use the provided `mycv.json` in `.ai/samples/` directory:
- Has valid structure
- Contains rich HTML introduction content
- Template is "modern" (will be converted to "classic")

## Success Criteria
✅ Import shows success message
✅ Console logs show introduction content
✅ Introduction text appears in editor
✅ Can edit imported text
✅ Template is "classic" in preview
✅ Re-exporting preserves the content

## Files Modified
1. `client/src/store/useCVStore.js` - Import logic + logging
2. `client/src/pages/CVEditor.jsx` - Key prop for remount
3. `client/src/components/form/IntroductionForm.jsx` - State sync logic

## If Still Not Working

### Nuclear Option: Force Remount on Import
Add this to CVEditor.jsx around the import success handler:
```javascript
// Force complete re-render by temporarily clearing data
setForceRefresh(Date.now());
```

Then use this as key:
```javascript
<IntroductionForm
    key={forceRefresh}
    ...
/>
```

### Check for Zustand Persist Issues
The persist middleware might cache old state. Clear it:
```javascript
// In browser console
localStorage.removeItem('power-cv-storage');
// Then refresh page
```

### Verify ReactQuill Version
Check `package.json`:
```json
"react-quill": "^2.0.0"  // Or compatible version
```

## Expected Behavior After All Fixes
1. Click Import
2. Select JSON file
3. See console logs confirming data loaded
4. Introduction editor populates with HTML content
5. Can edit and save changes
6. Export creates JSON with introduction content
7. Re-import works correctly

---

**Last Updated:** 2024-01-15
**Status:** All fixes applied, testing required
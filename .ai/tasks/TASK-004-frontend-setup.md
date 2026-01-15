# TASK-004: Frontend React App Setup

**Status**: PENDING
**Priority**: HIGH
**Phase**: 1 - Core Functionality
**Estimated Time**: 45-60 minutes

---

## 📋 Description

Configure the React frontend application with proper routing, folder structure, and basic configuration. Set up React Router for navigation and create the foundational page components.

---

## 🎯 Objectives

1. Clean up default Vite template
2. Set up React Router DOM
3. Create folder structure for components, pages, services, utils
4. Create basic page components (Home, Dashboard, CVEditor, NotFound)
5. Configure routing
6. Set up environment variables for API URL
7. Test navigation between pages

---

## 📝 Acceptance Criteria

- [ ] Default Vite boilerplate is cleaned up
- [ ] React Router is installed and configured
- [ ] All folders match the structure in plan.md
- [ ] Basic page components are created
- [ ] Navigation between pages works
- [ ] Environment variables are configured
- [ ] No console errors
- [ ] App runs on http://localhost:5173

---

## 🛠️ Implementation Steps

### 1. Install Dependencies

```bash
cd client
npm install react-router-dom axios zustand
```

### 2. Create Folder Structure

```
client/src/
├── components/
│   ├── common/
│   ├── form/
│   ├── templates/
│   ├── layout/
│   └── cv/
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── CVEditor.jsx
│   └── NotFound.jsx
├── services/
├── utils/
├── context/
├── hooks/
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

### 3. Create Environment Configuration

**File**: `client/.env`
```
VITE_API_URL=http://localhost:5000/api
```

**File**: `client/.env.example`
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Create Basic Pages

**File**: `client/src/pages/Home.jsx`
- Simple welcome page
- Link to CV Editor
- Brief description of Power CV

**File**: `client/src/pages/Dashboard.jsx`
- Placeholder for CV list
- "Dashboard" heading
- Message: "CV list will appear here"

**File**: `client/src/pages/CVEditor.jsx`
- Placeholder for CV editor
- "CV Editor" heading
- Message: "CV form and preview will appear here"

**File**: `client/src/pages/NotFound.jsx`
- 404 error page
- Link back to home

### 5. Set Up Routing

**File**: `client/src/App.jsx`
- Import BrowserRouter, Routes, Route
- Define routes:
  - `/` - Home
  - `/dashboard` - Dashboard
  - `/editor` - CVEditor
  - `/editor/:id` - CVEditor (edit mode)
  - `*` - NotFound
- Wrap in BrowserRouter

### 6. Update Main Entry Point

**File**: `client/src/main.jsx`
- Clean up default code
- Import App component
- Mount to DOM

### 7. Clean Up Styles

**File**: `client/src/styles/index.css`
- Remove default Vite styles
- Add basic reset/normalize
- Prepare for Tailwind (next task)

---

## 🧪 Testing Instructions

### For User to Test:

1. **Install Dependencies**
   - Navigate to `client/` directory
   - Run `npm install`
   - Should complete without errors
   - Verify react-router-dom, axios, zustand are in package.json

2. **Verify Environment Variables**
   - Check `client/.env` exists
   - Contains `VITE_API_URL=http://localhost:5000/api`
   - `.env.example` also exists

3. **Start Development Server**
   - Run `npm run dev`
   - Server should start on http://localhost:5173
   - No console errors in terminal

4. **Test Home Page**
   - Open browser to http://localhost:5173
   - Should see Home page with welcome message
   - No errors in browser console (F12)

5. **Test Navigation**
   - Manually navigate to: http://localhost:5173/dashboard
   - Should see Dashboard page
   - Navigate to: http://localhost:5173/editor
   - Should see CV Editor page
   - Navigate to: http://localhost:5173/invalid-route
   - Should see 404 Not Found page

6. **Check Folder Structure**
   - Open `client/src/` folder
   - Verify all folders exist:
     - components/ (with subfolders)
     - pages/ (with 4 page files)
     - services/
     - utils/
     - context/
     - hooks/
     - styles/

7. **Verify Hot Reload**
   - Edit any page component (add text)
   - Save file
   - Browser should auto-refresh with changes

---

## 📦 Deliverables

- [x] Updated package.json with new dependencies
- [x] Folder structure matching plan.md
- [x] client/src/pages/Home.jsx
- [x] client/src/pages/Dashboard.jsx
- [x] client/src/pages/CVEditor.jsx
- [x] client/src/pages/NotFound.jsx
- [x] client/src/App.jsx with routing
- [x] client/src/main.jsx
- [x] client/.env and client/.env.example
- [x] Empty folders for components, services, utils, etc.

---

## 🔗 Dependencies

**Before**: TASK-001 (Project Setup)
**After**: TASK-005 (Tailwind CSS Configuration)

---

## 📌 Notes

- Keep pages simple for now (just placeholders)
- Don't add styling yet (Tailwind comes in TASK-005)
- Use functional components with hooks
- Environment variables in Vite must start with `VITE_`
- Access env vars with `import.meta.env.VITE_API_URL`

---

## 🎨 Page Component Template

Each page should follow this basic structure:

```jsx
function PageName() {
  return (
    <div className="page-container">
      <h1>Page Title</h1>
      <p>Page content goes here</p>
    </div>
  );
}

export default PageName;
```

---

## 🔍 Routing Structure

```jsx
// App.jsx structure
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/editor" element={<CVEditor />} />
    <Route path="/editor/:id" element={<CVEditor />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

## ⚠️ Potential Issues

1. **Port conflict**: If 5173 is in use, Vite will try 5174
2. **Module resolution**: Ensure imports use correct paths
3. **React version**: Vite uses React 18, ensure hooks compatibility
4. **Hot reload not working**: Check firewall or use different browser

---

## 🎨 Code Quality Checklist

- [ ] All imports are organized (React, third-party, local)
- [ ] Components use consistent naming (PascalCase)
- [ ] No unused imports or variables
- [ ] File names match component names
- [ ] Clean, readable code structure

---

## 📚 Reference

- React Router v6 docs: https://reactrouter.com/
- Vite environment variables: https://vitejs.dev/guide/env-and-mode.html

---

## ✅ Definition of Done

- User can navigate to all routes without errors
- Dev server runs and hot reload works
- Folder structure is complete
- Environment variables are configured
- No console errors in browser or terminal
- User confirms: "All pages are accessible, ready for next task"
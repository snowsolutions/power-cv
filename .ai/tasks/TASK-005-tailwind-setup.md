# TASK-005: Tailwind CSS Configuration

**Status**: PENDING
**Priority**: HIGH
**Phase**: 1 - Core Functionality
**Estimated Time**: 30-45 minutes

---

## 📋 Description

Install and configure Tailwind CSS for the React frontend. Set up the build pipeline, create base styles, and verify Tailwind utility classes are working correctly.

---

## 🎯 Objectives

1. Install Tailwind CSS and dependencies
2. Configure Tailwind for Vite
3. Create tailwind.config.js with proper paths
4. Set up PostCSS configuration
5. Update CSS file with Tailwind directives
6. Create base styles and custom utilities
7. Test Tailwind classes in components

---

## 📝 Acceptance Criteria

- [ ] Tailwind CSS is installed
- [ ] tailwind.config.js is properly configured
- [ ] postcss.config.js exists
- [ ] Tailwind directives are in main CSS file
- [ ] Utility classes work in components
- [ ] Custom colors/theme configured
- [ ] No build errors or warnings
- [ ] Hot reload works with Tailwind changes

---

## 🛠️ Implementation Steps

### 1. Install Dependencies

```bash
cd client
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind

**File**: `client/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

### 3. Configure PostCSS

**File**: `client/postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. Update CSS File

**File**: `client/src/styles/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  body {
    @apply font-sans antialiased;
  }
  
  h1 {
    @apply text-3xl font-bold;
  }
  
  h2 {
    @apply text-2xl font-semibold;
  }
  
  h3 {
    @apply text-xl font-semibold;
  }
}

/* Custom components */
@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  .input-field {
    @apply border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 5. Update Main Entry to Import CSS

**File**: `client/src/main.jsx`

Ensure this line exists:
```javascript
import './styles/index.css'
```

### 6. Test in a Component

Update one of the page components to use Tailwind classes (e.g., Home.jsx):

```jsx
function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          Power CV
        </h1>
        <p className="text-gray-600 mb-6">
          Create professional CVs with ease
        </p>
        <button className="btn-primary">
          Get Started
        </button>
      </div>
    </div>
  );
}
```

---

## 🧪 Testing Instructions

### For User to Test:

1. **Install Dependencies**
   - Navigate to `client/` directory
   - Run `npm install`
   - Should complete without errors
   - Verify tailwindcss in package.json devDependencies

2. **Verify Configuration Files**
   - Check `tailwind.config.js` exists
   - Check `postcss.config.js` exists
   - Both should have proper configuration

3. **Check CSS File**
   - Open `client/src/styles/index.css`
   - Should start with @tailwind directives
   - Should have custom base, components, utilities

4. **Start Dev Server**
   - Run `npm run dev`
   - Server should start without errors
   - No Tailwind-related warnings in console

5. **Test Utility Classes**
   - Open browser to http://localhost:5173
   - Navigate to Home page
   - Should see styled content with:
     - Primary blue color (if using example)
     - Proper spacing and padding
     - Rounded corners on button
     - Responsive layout

6. **Test Hot Reload with Tailwind**
   - Edit Home.jsx
   - Change `bg-gray-50` to `bg-blue-50`
   - Save file
   - Browser should auto-update with new color
   - No full page reload needed

7. **Test Custom Classes**
   - Add a button with `className="btn-primary"`
   - Should have blue background and white text
   - Hover should darken the color

8. **Browser DevTools Check**
   - Inspect an element with Tailwind classes
   - Should see Tailwind CSS applied in styles
   - No missing class warnings in console

9. **Build Test**
   - Run `npm run build`
   - Should build successfully
   - Check dist folder has CSS file with Tailwind

---

## 📦 Deliverables

- [x] tailwindcss, postcss, autoprefixer installed
- [x] client/tailwind.config.js
- [x] client/postcss.config.js
- [x] Updated client/src/styles/index.css
- [x] Custom theme colors configured
- [x] Base styles defined
- [x] Custom component classes (.btn-primary, .card, etc.)
- [x] At least one page using Tailwind classes

---

## 🔗 Dependencies

**Before**: TASK-004 (Frontend React App Setup)
**After**: TASK-006 (CV Context & State Management)

---

## 📌 Notes

- Use mobile-first approach (Tailwind default)
- Content paths in config must include all component files
- @layer directives help organize custom CSS
- Custom colors extend default Tailwind palette
- Use @apply sparingly (prefer utility classes in JSX)
- PostCSS is required for Tailwind to work

---

## 🎨 Tailwind Best Practices

1. **Utility-First**: Use utility classes in JSX, not custom CSS
2. **Component Classes**: Only for frequently repeated patterns
3. **Responsive**: Use sm:, md:, lg:, xl: prefixes
4. **Dark Mode**: Can add later with dark: prefix
5. **Arbitrary Values**: Use [#123456] for one-off colors if needed

---

## 🎨 Color Palette Reference

Primary colors configured:
- primary-50 to primary-900 (blue scale)
- Use primary-600 for main brand color
- Use primary-700 for hover states
- Use primary-100 for backgrounds

---

## ⚠️ Potential Issues

1. **Build slow**: Tailwind scans files, ensure content paths are specific
2. **Classes not applying**: Check content paths in tailwind.config.js
3. **Purge removes classes**: Don't use dynamic class names
4. **PostCSS errors**: Ensure postcss.config.js is valid
5. **Import order**: CSS import must be before component imports

---

## 🔍 Troubleshooting

**Classes not working:**
- Verify content paths in tailwind.config.js
- Check @tailwind directives are in CSS
- Restart dev server

**Styles not updating:**
- Hard refresh browser (Ctrl+Shift+R)
- Clear Vite cache: delete node_modules/.vite
- Restart dev server

**Build errors:**
- Check PostCSS config syntax
- Verify Tailwind config exports correctly
- Check for typos in @tailwind directives

---

## 📚 Reference

- Tailwind CSS v3 docs: https://tailwindcss.com/docs
- Customizing colors: https://tailwindcss.com/docs/customizing-colors
- Using with Vite: https://tailwindcss.com/docs/guides/vite

---

## ✅ Definition of Done

- Tailwind CSS is installed and configured
- Utility classes work in all components
- Custom theme colors are applied
- Dev server runs without Tailwind errors
- Hot reload works with style changes
- Build process includes Tailwind successfully
- User confirms: "Tailwind is working, ready for next task"
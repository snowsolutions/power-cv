# TASK-006: CV Context & State Management

**Status**: PENDING
**Priority**: HIGH
**Phase**: 1 - Core Functionality
**Estimated Time**: 45-60 minutes

---

## 📋 Description

Set up global state management for CV data using Zustand. Create the CV store with actions for managing CV data, and implement the Context API wrapper for easy access throughout the application.

---

## 🎯 Objectives

1. Install Zustand for state management
2. Create CV data store with initial state
3. Implement actions for updating CV data
4. Create default CV data structure
5. Add utility functions for CV management
6. Set up localStorage persistence
7. Test state updates across components

---

## 📝 Acceptance Criteria

- [ ] Zustand store created for CV data
- [ ] Initial CV state matches data model in plan.md
- [ ] Actions for updating each CV section
- [ ] Default section titles are set
- [ ] State persists to localStorage
- [ ] State can be accessed from any component
- [ ] No console errors
- [ ] State updates trigger re-renders

---

## 🛠️ Implementation Steps

### 1. Verify Zustand Installation

Already installed in TASK-004, verify in package.json:
```json
"zustand": "^4.4.0"
```

### 2. Create Constants File

**File**: `client/src/utils/constants.js`

```javascript
export const DEFAULT_SECTION_TITLES = {
  personalInfo: 'Personal Information',
  introduction: 'Introduction',
  workHistory: 'Work History',
  certifications: 'Certifications',
  educations: 'Education',
  activities: 'Activities',
  professionalSkills: 'Professional Skills',
  languageCompetencies: 'Language Competencies',
};

export const TEMPLATES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  CREATIVE: 'creative',
  MINIMAL: 'minimal',
};

export const SKILL_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];

export const LANGUAGE_PROFICIENCY = [
  'Basic',
  'Intermediate',
  'Professional',
  'Fluent',
  'Native',
];
```

### 3. Create Initial CV Data Structure

**File**: `client/src/utils/initialCVData.js`

```javascript
import { DEFAULT_SECTION_TITLES } from './constants';

export const getInitialCVData = () => ({
  personalInfo: {
    sectionTitle: DEFAULT_SECTION_TITLES.personalInfo,
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
  },
  introduction: {
    sectionTitle: DEFAULT_SECTION_TITLES.introduction,
    content: '',
  },
  workHistory: {
    sectionTitle: DEFAULT_SECTION_TITLES.workHistory,
    items: [],
  },
  certifications: {
    sectionTitle: DEFAULT_SECTION_TITLES.certifications,
    items: [],
  },
  educations: {
    sectionTitle: DEFAULT_SECTION_TITLES.educations,
    items: [],
  },
  activities: {
    sectionTitle: DEFAULT_SECTION_TITLES.activities,
    items: [],
  },
  professionalSkills: {
    sectionTitle: DEFAULT_SECTION_TITLES.professionalSkills,
    items: [],
  },
  languageCompetencies: {
    sectionTitle: DEFAULT_SECTION_TITLES.languageCompetencies,
    items: [],
  },
});

export const getEmptyWorkHistoryItem = () => ({
  id: crypto.randomUUID(),
  dateFrom: '',
  dateTo: '',
  companyName: '',
  position: '',
  description: '',
});

export const getEmptyCertificationItem = () => ({
  id: crypto.randomUUID(),
  certName: '',
  organization: '',
  certLink: '',
  certExpiration: '',
});

export const getEmptyEducationItem = () => ({
  id: crypto.randomUUID(),
  schoolName: '',
  studyFrom: '',
  studyTo: '',
  profession: '',
});

export const getEmptyActivityItem = () => ({
  id: crypto.randomUUID(),
  title: '',
  description: '',
  date: '',
});

export const getEmptySkillItem = () => ({
  id: crypto.randomUUID(),
  skillName: '',
  level: '',
  description: '',
});

export const getEmptyLanguageItem = () => ({
  id: crypto.randomUUID(),
  language: '',
  proficiency: '',
});
```

### 4. Create Zustand Store

**File**: `client/src/store/useCVStore.js`

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getInitialCVData } from '../utils/initialCVData';
import { TEMPLATES } from '../utils/constants';

const useCVStore = create(
  persist(
    (set, get) => ({
      // Current CV state
      currentCV: {
        id: null,
        name: 'Untitled CV',
        template: TEMPLATES.MODERN,
        data: getInitialCVData(),
        createdAt: null,
        updatedAt: null,
      },

      // List of saved CVs
      savedCVs: [],

      // UI state
      isPreviewVisible: true,
      selectedTemplate: TEMPLATES.MODERN,

      // Actions
      updatePersonalInfo: (field, value) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            data: {
              ...state.currentCV.data,
              personalInfo: {
                ...state.currentCV.data.personalInfo,
                [field]: value,
              },
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateIntroduction: (content) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            data: {
              ...state.currentCV.data,
              introduction: {
                ...state.currentCV.data.introduction,
                content,
              },
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateSectionTitle: (section, title) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            data: {
              ...state.currentCV.data,
              [section]: {
                ...state.currentCV.data[section],
                sectionTitle: title,
              },
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      addItem: (section, item) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            data: {
              ...state.currentCV.data,
              [section]: {
                ...state.currentCV.data[section],
                items: [...state.currentCV.data[section].items, item],
              },
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateItem: (section, itemId, updatedItem) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            data: {
              ...state.currentCV.data,
              [section]: {
                ...state.currentCV.data[section],
                items: state.currentCV.data[section].items.map((item) =>
                  item.id === itemId ? { ...item, ...updatedItem } : item
                ),
              },
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      removeItem: (section, itemId) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            data: {
              ...state.currentCV.data,
              [section]: {
                ...state.currentCV.data[section],
                items: state.currentCV.data[section].items.filter(
                  (item) => item.id !== itemId
                ),
              },
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      setTemplate: (template) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            template,
          },
          selectedTemplate: template,
          updatedAt: new Date().toISOString(),
        })),

      setCVName: (name) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            name,
            updatedAt: new Date().toISOString(),
          },
        })),

      loadCV: (cv) =>
        set({
          currentCV: cv,
          selectedTemplate: cv.template,
        }),

      createNewCV: () =>
        set({
          currentCV: {
            id: null,
            name: 'Untitled CV',
            template: TEMPLATES.MODERN,
            data: getInitialCVData(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          selectedTemplate: TEMPLATES.MODERN,
        }),

      importCVData: (data) =>
        set({
          currentCV: data,
          selectedTemplate: data.template || TEMPLATES.MODERN,
        }),

      togglePreview: () =>
        set((state) => ({
          isPreviewVisible: !state.isPreviewVisible,
        })),

      resetCV: () =>
        set({
          currentCV: {
            id: null,
            name: 'Untitled CV',
            template: TEMPLATES.MODERN,
            data: getInitialCVData(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          selectedTemplate: TEMPLATES.MODERN,
        }),
    }),
    {
      name: 'power-cv-storage',
      partialize: (state) => ({
        currentCV: state.currentCV,
        savedCVs: state.savedCVs,
      }),
    }
  )
);

export default useCVStore;
```

### 5. Create Custom Hook

**File**: `client/src/hooks/useCV.js`

```javascript
import useCVStore from '../store/useCVStore';

export const useCV = () => {
  const currentCV = useCVStore((state) => state.currentCV);
  const savedCVs = useCVStore((state) => state.savedCVs);
  const isPreviewVisible = useCVStore((state) => state.isPreviewVisible);
  const selectedTemplate = useCVStore((state) => state.selectedTemplate);

  const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);
  const updateIntroduction = useCVStore((state) => state.updateIntroduction);
  const updateSectionTitle = useCVStore((state) => state.updateSectionTitle);
  const addItem = useCVStore((state) => state.addItem);
  const updateItem = useCVStore((state) => state.updateItem);
  const removeItem = useCVStore((state) => state.removeItem);
  const setTemplate = useCVStore((state) => state.setTemplate);
  const setCVName = useCVStore((state) => state.setCVName);
  const loadCV = useCVStore((state) => state.loadCV);
  const createNewCV = useCVStore((state) => state.createNewCV);
  const importCVData = useCVStore((state) => state.importCVData);
  const togglePreview = useCVStore((state) => state.togglePreview);
  const resetCV = useCVStore((state) => state.resetCV);

  return {
    currentCV,
    savedCVs,
    isPreviewVisible,
    selectedTemplate,
    updatePersonalInfo,
    updateIntroduction,
    updateSectionTitle,
    addItem,
    updateItem,
    removeItem,
    setTemplate,
    setCVName,
    loadCV,
    createNewCV,
    importCVData,
    togglePreview,
    resetCV,
  };
};
```

### 6. Test in a Component

Update `client/src/pages/CVEditor.jsx` to test:

```jsx
import { useCV } from '../hooks/useCV';

function CVEditor() {
  const { currentCV, updatePersonalInfo, setCVName } = useCV();

  return (
    <div className="p-8">
      <h1>CV Editor</h1>
      <div className="mt-4">
        <input
          type="text"
          value={currentCV.name}
          onChange={(e) => setCVName(e.target.value)}
          className="input-field"
          placeholder="CV Name"
        />
        <input
          type="text"
          value={currentCV.data.personalInfo.name}
          onChange={(e) => updatePersonalInfo('name', e.target.value)}
          className="input-field mt-2"
          placeholder="Your Name"
        />
        <p className="mt-4">Current CV: {currentCV.name}</p>
        <p>Name: {currentCV.data.personalInfo.name}</p>
      </div>
    </div>
  );
}

export default CVEditor;
```

---

## 🧪 Testing Instructions

### For User to Test:

1. **Verify File Structure**
   - Check `client/src/store/useCVStore.js` exists
   - Check `client/src/hooks/useCV.js` exists
   - Check `client/src/utils/constants.js` exists
   - Check `client/src/utils/initialCVData.js` exists

2. **Start Development Server**
   - Run `npm run dev` in client directory
   - Should start without errors
   - No console warnings about Zustand

3. **Test State Updates**
   - Navigate to http://localhost:5173/editor
   - Type in the CV Name input
   - Should see text appear as you type
   - Should see "Current CV: [your text]" update live

4. **Test Personal Info Update**
   - Type in the "Your Name" input
   - Should see "Name: [your text]" update below
   - No lag or errors

5. **Test localStorage Persistence**
   - Enter some text in both inputs
   - Refresh the page (F5)
   - Your entered text should still be there
   - Check browser DevTools → Application → Local Storage
   - Should see "power-cv-storage" key with your data

6. **Test Multiple Tabs**
   - Open http://localhost:5173/editor in a new tab
   - Enter different text
   - Switch back to first tab
   - State should be independent per tab until refresh

7. **Check Console**
   - Open browser console (F12)
   - Should be no errors
   - No warnings about state updates

8. **Test State Actions**
   - Open console
   - Type: `window.localStorage.getItem('power-cv-storage')`
   - Should see JSON with your CV data
   - Verify structure matches plan.md data model

---

## 📦 Deliverables

- [x] client/src/store/useCVStore.js - Zustand store
- [x] client/src/hooks/useCV.js - Custom hook
- [x] client/src/utils/constants.js - Constants
- [x] client/src/utils/initialCVData.js - Initial data structures
- [x] Updated CVEditor.jsx with test implementation
- [x] localStorage persistence working
- [x] State updates trigger re-renders

---

## 🔗 Dependencies

**Before**: TASK-005 (Tailwind CSS Configuration)
**After**: TASK-007 (API Service Layer)

---

## 📌 Notes

- Zustand is simpler than Redux, perfect for this project
- Persist middleware saves state to localStorage automatically
- partialize only saves necessary data (not UI state)
- crypto.randomUUID() generates unique IDs for items
- All update actions include updatedAt timestamp
- State is immutable - always create new objects

---

## 🔍 State Structure

The store maintains:
1. **currentCV**: The CV being edited
2. **savedCVs**: List of saved CVs (for future use)
3. **isPreviewVisible**: Toggle preview panel
4. **selectedTemplate**: Current template selection

---

## ⚠️ Potential Issues

1. **localStorage quota**: Limit is 5-10MB, should be fine
2. **Browser compatibility**: crypto.randomUUID() requires HTTPS (OK in dev)
3. **State not persisting**: Check browser settings allow localStorage
4. **Performance**: Zustand is fast, no issues expected
5. **Deep updates**: Use spread operators carefully to avoid mutations

---

## 🎨 Code Quality Checklist

- [ ] All actions are pure functions
- [ ] State updates are immutable
- [ ] No direct state mutations
- [ ] Default values are provided
- [ ] Section structure matches plan.md
- [ ] Helper functions for empty items

---

## 📚 Reference

- Zustand docs: https://github.com/pmndrs/zustand
- Persist middleware: https://github.com/pmndrs/zustand#persist-middleware
- React hooks: https://react.dev/reference/react

---

## ✅ Definition of Done

- Zustand store created and working
- State updates reflect in UI immediately
- localStorage persistence works
- Page refresh maintains state
- No console errors
- Helper functions for all item types created
- User confirms: "State management working, ready for next task"
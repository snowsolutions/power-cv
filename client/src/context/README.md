# Context

This directory contains React Context providers for global state management.

## Purpose

Context providers manage global application state that needs to be accessible across multiple components without prop drilling.

## Examples of contexts to be added:

- `CVContext.jsx` - Main CV data context and state management
- `ThemeContext.jsx` - Theme/appearance settings (if needed)
- `NotificationContext.jsx` - Global notifications/toasts

## CV Context Structure

The main CV context will manage:
- Current CV data being edited
- Form state and validation
- Auto-save functionality
- Undo/redo history (optional)

## Example Context Structure

```javascript
// CVContext.jsx
import { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export function CVProvider({ children }) {
  const [cv, setCV] = useState({
    id: null,
    name: '',
    personalInfo: {},
    introduction: '',
    workHistory: [],
    certifications: [],
    educations: [],
    activities: [],
    professionalSkills: [],
    languageCompetencies: [],
    sectionTitles: {}
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateCV = (field, value) => {
    setCV(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const saveCV = async () => {
    setIsSaving(true);
    try {
      // Save logic here
      setIsDirty(false);
    } catch (error) {
      console.error('Failed to save CV:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const value = {
    cv,
    setCV,
    updateCV,
    saveCV,
    isDirty,
    isSaving
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within CVProvider');
  }
  return context;
}
```

## Guidelines

- Use Context API for truly global state
- Consider Zustand for more complex state management
- Create custom hooks (like `useCV()`) for easy consumption
- Keep context providers focused and specific
- Don't overuse context - use props when appropriate
- Implement proper error boundaries
- Document the shape of the context value
- Provide sensible default values
- Consider performance with useMemo/useCallback

## Integration with Zustand

For this project, we'll primarily use **Zustand** for state management instead of Context API. Context will be used for:
- Theme settings
- Notification system
- Authentication (if needed)

Zustand will handle:
- CV data and form state
- UI state (modals, sidebars)
- Temporary data (drafts, caches)
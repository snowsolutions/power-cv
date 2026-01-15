# Custom Hooks

This directory contains custom React hooks that encapsulate reusable logic.

## Purpose

Custom hooks provide a way to extract component logic into reusable functions. They follow React's hooks rules and can use other hooks internally.

## Examples of hooks to be added:

- `useCV.js` - Hook for accessing CV store (Zustand)
- `useForm.js` - Custom form handling hook
- `useDebounce.js` - Debounce hook for delayed operations
- `useLocalStorage.js` - Hook for persisting data to localStorage
- `useAutoSave.js` - Auto-save functionality hook
- `useExport.js` - Hook for handling export operations
- `useImport.js` - Hook for handling import operations
- `useMediaQuery.js` - Responsive design hook
- `useClickOutside.js` - Detect clicks outside element

## Example Custom Hook

```javascript
// useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// useAutoSave.js
import { useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';

export function useAutoSave(data, onSave, delay = 2000) {
  const debouncedData = useDebounce(data, delay);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onSave(debouncedData);
  }, [debouncedData, onSave]);
}
```

## Guidelines

- Follow React hooks naming convention: `use` prefix
- Only call hooks at the top level
- Only call hooks from React functions
- Document parameters and return values
- Handle cleanup with useEffect return functions
- Use TypeScript or JSDoc for type safety
- Write tests for complex hooks
- Keep hooks focused on a single responsibility
- Consider performance implications
- Avoid recreating functions on every render (use useCallback)

## Best Practices

1. **Naming**: Always start with `use` prefix
2. **Dependencies**: Carefully manage useEffect dependencies
3. **Cleanup**: Return cleanup functions from useEffect when needed
4. **Memoization**: Use useMemo/useCallback to prevent unnecessary re-renders
5. **Error Handling**: Handle errors gracefully within hooks
6. **Documentation**: Document hook parameters, return values, and usage examples
7. **Testing**: Write unit tests for hooks using @testing-library/react-hooks
8. **Composition**: Compose complex hooks from simpler ones
9. **Performance**: Monitor performance and optimize as needed
10. **Reusability**: Make hooks generic and configurable
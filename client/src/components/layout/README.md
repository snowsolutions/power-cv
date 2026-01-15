# Layout Components

This directory contains layout components that define the overall structure and navigation of the application.

## Purpose

Layout components provide the structural framework for pages, including headers, footers, sidebars, and navigation elements.

## Examples of components to be added:

- `Header.jsx` - Main application header with navigation
- `Footer.jsx` - Application footer
- `Sidebar.jsx` - Side navigation or panel
- `MainLayout.jsx` - Main page layout wrapper
- `EditorLayout.jsx` - Specific layout for CV editor page
- `Navigation.jsx` - Navigation menu component
- `Breadcrumbs.jsx` - Breadcrumb navigation

## Example Layout Structure

```javascript
// MainLayout.jsx
import Header from './Header';
import Footer from './Footer';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;

// EditorLayout.jsx
import Header from './Header';

function EditorLayout({ children, sidebar, preview }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 overflow-y-auto">
          {sidebar}
        </aside>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <aside className="w-96 overflow-y-auto">
          {preview}
        </aside>
      </div>
    </div>
  );
}

export default EditorLayout;
```

## Guidelines

- Keep layouts flexible and reusable
- Use composition with `children` prop
- Implement responsive behavior
- Handle overflow and scrolling properly
- Ensure proper semantic HTML (header, main, footer, nav)
- Consider accessibility (ARIA landmarks)
- Support different layout configurations
- Use Tailwind CSS for styling
- Test on different screen sizes

## Layout Patterns

### Sticky Header
```javascript
<header className="sticky top-0 z-50 bg-white shadow">
  {/* Header content */}
</header>
```

### Fixed Sidebar
```javascript
<aside className="fixed h-screen w-64 overflow-y-auto">
  {/* Sidebar content */}
</aside>
```

### Responsive Grid
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>
```

## Responsive Breakpoints

- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

Ensure all layouts work seamlessly across these breakpoints.
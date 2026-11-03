# Full Sidebar Navigation (`sidebar-full`)

## What it is
The standard 260px wide enterprise sidebar. Features grouped section headings, multi-level accordion menus with smooth height transitions, badge indicators, and pinned favorites.

## When to use it
- Core administrative backends and ERP systems where users need immediate visibility into primary sections.
- Desktop environments with ample horizontal resolution.
- Workspaces with 10–50 discrete views organized into logical departments.

## Preset Settings
```typescript
{
  navigationMode: "sidebar-full",
  navigationPosition: "start",
  sidebarState: "expanded",
  headerSticky: true,
  showBreadcrumbs: true,
  contentWidth: "fluid",
  density: "comfortable",
  radius: "md"
}
```

## How to use in your project
```tsx
import { AppShell } from "@fw/shell";
import { navigation } from "./navigation";

export default function Layout({ children }) {
  return (
    <AppShell navigationItems={navigation}>
      {children}
    </AppShell>
  );
}
```

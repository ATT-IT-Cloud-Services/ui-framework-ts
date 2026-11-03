# Role-Based Permissions & Guarding (`permissions`)

## What it is
Declarative authorization utilities:
- `PermissionProvider`: Injects granted roles and permissions.
- `<Can permission="..." role="...">`: Conditionally renders child components or an optional fallback.
- `usePermission()`: Programmatic hook (`hasPermission`, `hasRole`, `can`).
- The framework maintains a strict boundary: no auth library is bundled in `src/`.

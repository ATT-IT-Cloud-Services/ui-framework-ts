# Configurable Enterprise UI Framework + Demo Gallery

> Modern, dense-but-airy, host-agnostic enterprise UI framework with a comprehensive demo gallery built on Next.js 15 (App Router), React 19, Tailwind CSS, and shadcn/ui.

---

## 1. Design Philosophy

- **Modernized Enterprise Aesthetics**: Calm, professional, dense-but-airy layout with subtle 1px borders instead of heavy drop shadows.
- **Micro-radii**: 4px (`sm`), 6px (`md`, default), and 8px (`lg`) corner radii for structured industrial ergonomics.
- **Semantic color system**: Success, warning, destructive/error, and info tokens with high-contrast accessibility.
- **Configurable brand palettes**: 5 built-in enterprise presets (Horizon Blue, Enterprise Teal, Modern Violet, Operations Green, Industrial Amber) plus custom hex overrides.
- **Logical CSS properties**: Native `start` and `end` alignment, `ms-*`, `me-*`, `ps-*`, and `pe-*` for automated bidirectional mirroring in RTL languages (Arabic).
- **Dense/Compact modes**: Switchable density tokens (`comfortable` vs `compact`) for control room operators and data analysts.
- **Zero-auth framework boundary**: `src/` contains **no** login, register, or backend assumptions. Consumes only generic adapters.

---

## 2. Repository Architecture (Strict Framework & Demo Separation)

```
├── src/                     # Reusable FRAMEWORK (host-agnostic, zero demo/auth pages)
│   ├── ui/                  # Tailored Radix / shadcn UI primitives (Fiori styled)
│   ├── shell/               # AppShell, Header, PageHeader, UserMenu, CommandPalette, AppProviders
│   ├── navigation/          # Headless tree hook + 7 presentation variants (sidebar-full, rail, hybrid, dual, inset, topnav, bottom-nav)
│   ├── layouts/             # 10 split-screen layout templates (SinglePane, MasterDetail, ThreePane, SplitWithInfoPanel, etc.)
│   ├── panels/              # InfoPanel, ActionBar, InfoCard, StatCard, StatusBadge, EmptyState, ErrorState, DataTable
│   ├── feedback/            # useConfirm promise hook, DestructiveConfirm, InlineConfirm, SideSheetForm, BottomDrawerConfirm
│   ├── overlays/            # OverlayProvider, toasts (6 positions), NotificationCenter, AnnouncementBanner, Floating UI
│   ├── i18n/                # I18nProvider, LanguageSwitcher, exact key parity catalogs (en, de, fr, es, ar)
│   ├── services/            # Permissions (<Can>), feature flags, shortcuts ("?"), error boundaries, url-state
│   ├── adapters/            # AuthAdapter, DataAdapter, TelemetryAdapter (types + no-op defaults)
│   ├── realtime/            # Cyber-physical operator primitives (LiveValue, LiveBadge, AlarmList, ConfirmHold, Sparkline)
│   ├── config/              # Allowed navigation matrix, z-index scale, types
│   └── index.ts             # Framework public barrel API
│
├── demo/                    # DEMO GALLERY (uses framework solely via @fw/* barrel imports)
│   ├── _shared/             # Mock data (orders, alarms, products, customers), DemoFrame, shared pages
│   │   └── auth/            # DEMO-ONLY auth flows (LoginPage, RegisterPage, ForgotPassword, MockAuthAdapter)
│   ├── index/               # Gallery landing page with interactive card directory & decision table
│   ├── navigation/          # 9 navigation variant demos
│   ├── layouts/             # 8 layout template demos
│   ├── feedback/            # 6 feedback & overlay demos
│   ├── services/            # 4 cross-cutting service demos (i18n-rtl, permissions, shortcuts, url-state)
│   ├── realtime/            # Operator console with simulated live 50 Hz telemetry stream
│   └── combined/            # Flagship enterprise operations showcase (starts at login, dual-rail, RBAC)
│
├── app/                     # NEXT.JS ROUTES (Thin wrappers rendering components from demo/)
│   ├── page.tsx             # Root route -> renders demo/index
│   ├── layout.tsx           # Server root layout with cookie-based SSR settings hydration
│   ├── globals.css          # Design tokens, CSS variables, dark mode, density, contrast
│   └── demo/                # Route wrappers for navigation, layouts, feedback, services, combined
│
└── tests/                   # VITEST TEST SUITE
    ├── catalogs.test.ts     # Validates 100% key parity across en, de, fr, es, ar message catalogs
    ├── no-auth-in-src.test.ts # Enforces the strict rule: NO auth files or packages in src/
    ├── registry.test.ts     # Guarantees every framework feature has a matching demo folder & README
    └── navigation-core.test.ts # Tests allowed-combinations matrix & z-index scale
```

---

## 3. Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Open http://localhost:3000 to view the interactive gallery
```

### Run Tests
```bash
npm test
```

### Type Checking & Linting
```bash
npm run typecheck
npm run lint
```

### Production Build
```bash
npm run build
```

---

## 4. How to Use `src/` in Another Project

### Option A: Direct Folder Copy
1. Copy the `src/` directory into your project.
2. In your `tsconfig.json`, configure the path alias:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@fw/*": ["./src/*"]
       }
     }
   }
   ```
3. Copy the design tokens and utilities from `app/globals.css` into your CSS entry point.
4. Import framework components via `@fw/*` or `@fw`:
   ```tsx
   import { AppShell } from "@fw/shell";
   import { SplitWithInfoPanel } from "@fw/layouts";
   import { DataTable } from "@fw/panels";
   import { toast } from "@fw/overlays";
   ```

### Option B: Monorepo / Package Extraction
`src/index.ts` is the single public entry point. You can extract `src/` into a standalone workspace package (e.g. `@company/enterprise-ui`) with zero changes to its internal code.

---

## 4a. Localising the header

`Header` and `AppShell` take their copy from the host, so an application keeps its own
language instead of the framework's English defaults. Controls the host draws itself can be
switched off.

```tsx
<AppShell
  searchLabel="Suchen"
  searchShortcut="Strg+K"
  themeLabel="Darstellung wechseln"
  languageLabel="Sprache wechseln"
  hideSearch
  hideLanguage
  /* slots as before: logoSlot, headerSlot, userMenuSlot, sidebarHeaderSlot … */
>
```

`LanguageSwitcher` accepts `showFlag={false}` and `label="…"`; the header renders the
switcher only when `hideLanguage` is false.


## 5. How to Rebrand

All design tokens are defined as CSS variables in `app/globals.css` and can be customized in one place:

```css
:root {
  --primary: 214 100% 43%;          /* Brand primary color */
  --primary-foreground: 210 40% 98%;
  --radius: 0.375rem;                /* Corner radius (4px, 6px, 8px) */
  --border: 214.3 31.8% 91.4%;      /* 1px subtle borders */
}
```

Or configure dynamically via `WhiteLabelThemeConfig`:
```tsx
import { DefaultThemeConfig } from "@fw/services";

const myTheme = {
  ...DefaultThemeConfig,
  appName: "Contoso Energy SCADA",
  brandColors: { primaryHex: "#0d9488" }, // Enterprise Teal
  baseRadius: "sm",
};
```

---

## 6. Framework Extension Guides

### Adding a Navigation Item
Edit your navigation config using the typed `NavigationItem` interface:
```tsx
import type { NavigationItem } from "@fw/navigation";
import { Gauge } from "lucide-react";

export const navigation: NavigationItem[] = [
  {
    id: "pressure-nodes",
    label: "Pressure Nodes",
    labelKey: "nav.pressureNodes", // optional i18n key
    icon: Gauge,
    href: "/operations/nodes",
    section: "Cyber-Physical",
    badge: 3,
    badgeVariant: "warning",
    requiredPermissions: ["telemetry:read"], // automatically filtered if user lacks permission
  },
];
```

### Adding a Layout Template
1. Create your component in `src/layouts/MyCustomLayout.tsx`.
2. Export it from `src/layouts/index.ts` and `src/index.ts`.
3. Add a demonstration folder under `demo/layouts/my-custom-layout/` with a `preset.ts`, `page.tsx`, and `README.md`.
4. Run `npm test` to verify registry coverage.

### Adding a New Locale
1. Add the ISO code to `SupportedLocale` in `src/i18n/types.ts` (e.g. `it`).
2. Add translation strings to `src/i18n/messages/it.json` (mirroring `en.json` keys).
3. Register the metadata in `LOCALES_METADATA` in `src/i18n/provider.tsx`.
4. Run `npm test` — `tests/catalogs.test.ts` validates 100% key parity automatically.

---

## 7. The Architectural NO-AUTH Rule

To ensure the framework remains 100% reusable across different enterprise identity providers (OIDC, SAML, Azure AD, Okta, Keycloak, Cognito):
- `src/` contains **no** login pages, registration forms, password resets, or authentication libraries.
- The framework exposes the `AuthAdapter` interface:
  ```typescript
  export interface AuthAdapter {
    status: "authenticated" | "unauthenticated" | "loading" | "anonymous";
    user: AuthUser | null;
    roles: string[];
    permissions: string[];
    signOut?: () => Promise<void> | void;
  }
  ```
- Your application implements this adapter and passes it to `<AppProviders authAdapter={adapter}>`.
- The presentation layer (`UserMenu`, `<Can>`, navigation tree) consumes user profile and permission strings strictly from this adapter.

---

## 8. License

MIT License. Crafted for resilient cyber-physical and enterprise web applications.

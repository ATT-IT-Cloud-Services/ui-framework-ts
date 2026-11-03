# @att-it-cloud-services/ui-framework-ts-pkg

> Production-ready, host-agnostic enterprise UI framework for cyber-physical operations, SCADA control rooms, and enterprise platforms.

## Installation

```bash
# From GitHub Packages
npm install @att-it-cloud-services/ui-framework-ts-pkg

# Or directly from GitHub
npm install github:ATT-IT-Cloud-Services/ui-framework-ts-pkg
```

## Quick Start in Next.js (App Router)

### 1. Import CSS Styles
In your `app/layout.tsx` or global CSS:
```tsx
import "@att-it-cloud-services/ui-framework-ts-pkg/styles.css";
```

### 2. Wrap your layout with Providers
```tsx
import { AppProviders, AppShell } from "@att-it-cloud-services/ui-framework-ts-pkg";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <AppShell
            navigationItems={[
              { id: "dash", label: "Dashboard", href: "/" },
              { id: "orders", label: "Orders", href: "/orders" }
            ]}
          >
            {children}
          </AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
```

### 3. Use Layouts & Components
```tsx
import {
  SplitWithInfoPanel,
  DataTable,
  InfoPanel,
  useConfirm,
  toast,
  LiveValue,
  AlarmList
} from "@att-it-cloud-services/ui-framework-ts-pkg";

export default function MyOperationsPage() {
  const confirm = useConfirm();
  
  return (
    <SplitWithInfoPanel
      infoPanel={<InfoPanel title="Properties" />}
      defaultRatio="2/3"
    >
      <DataTable columns={columns} data={orders} />
    </SplitWithInfoPanel>
  );
}
```

## Key Features
- **Navigation Modes**: Full Sidebar, Icon Rail, Hybrid (Cmd+B toggle), Dual Rail, Inset Card, Topnav, Bottom Nav.
- **Split Layouts**: Docked, Overlap (1/3 & 1/2) with left backdrop blur, and Maximized.
- **Realtime Primitives**: LiveValue with quality indicators, LiveBadge, AlarmList, AlarmBanner, ConfirmHold (safety breaker).
- **Internationalization**: 5 built-in locales (en, de, fr, es, ar) with instant RTL mirroring.
- **Zero-Auth Architecture**: Purely consumes generic `AuthAdapter` and permissions.

## License
MIT © ATT-IT-Cloud-Services

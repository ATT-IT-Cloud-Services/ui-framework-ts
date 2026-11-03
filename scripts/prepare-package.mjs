import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const pkgDir = path.resolve(rootDir, "packages/ui-framework-ts-pkg");

console.log("Preparing ui-framework-ts-pkg in:", pkgDir);

if (fs.existsSync(pkgDir)) {
  fs.rmSync(pkgDir, { recursive: true, force: true });
}
fs.mkdirSync(pkgDir, { recursive: true });

// 1. Copy src/ into packages/ui-framework-ts-pkg/src/
fs.cpSync(path.join(rootDir, "src"), path.join(pkgDir, "src"), { recursive: true });

// 2. Read root package.json to get dependency versions
const rootPkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));

// 3. Create package.json for ui-framework-ts-pkg
const pkgJson = {
  name: "@att-it-cloud-services/ui-framework-ts-pkg",
  version: "1.0.0",
  description: "Configurable enterprise UI framework for cyber-physical, operations, and control-room applications",
  license: "MIT",
  author: "ATT-IT-Cloud-Services",
  repository: {
    type: "git",
    url: "git+https://github.com/ATT-IT-Cloud-Services/ui-framework-ts-pkg.git"
  },
  homepage: "https://github.com/ATT-IT-Cloud-Services/ui-framework-ts#readme",
  main: "./dist/index.js",
  module: "./dist/index.mjs",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/index.mjs",
      require: "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  files: ["dist", "src", "README.md", "LICENSE"],
  scripts: {
    build: "tsup && cp src/styles.css dist/styles.css",
    typecheck: "tsc --noEmit",
    prepublishOnly: "npm run build"
  },
  publishConfig: {
    registry: "https://npm.pkg.github.com",
    access: "public"
  },
  peerDependencies: {
    next: ">=14.0.0 || >=15.0.0",
    react: ">=18.0.0 || >=19.0.0",
    "react-dom": ">=18.0.0 || >=19.0.0",
    tailwindcss: ">=3.4.0 || >=4.0.0"
  },
  dependencies: {
    "@hookform/resolvers": rootPkg.dependencies["@hookform/resolvers"],
    "@radix-ui/react-alert-dialog": rootPkg.dependencies["@radix-ui/react-alert-dialog"],
    "@radix-ui/react-avatar": rootPkg.dependencies["@radix-ui/react-avatar"],
    "@radix-ui/react-checkbox": rootPkg.dependencies["@radix-ui/react-checkbox"],
    "@radix-ui/react-collapsible": rootPkg.dependencies["@radix-ui/react-collapsible"],
    "@radix-ui/react-context-menu": rootPkg.dependencies["@radix-ui/react-context-menu"],
    "@radix-ui/react-dialog": rootPkg.dependencies["@radix-ui/react-dialog"],
    "@radix-ui/react-dropdown-menu": rootPkg.dependencies["@radix-ui/react-dropdown-menu"],
    "@radix-ui/react-hover-card": rootPkg.dependencies["@radix-ui/react-hover-card"],
    "@radix-ui/react-navigation-menu": rootPkg.dependencies["@radix-ui/react-navigation-menu"],
    "@radix-ui/react-popover": rootPkg.dependencies["@radix-ui/react-popover"],
    "@radix-ui/react-radio-group": rootPkg.dependencies["@radix-ui/react-radio-group"],
    "@radix-ui/react-scroll-area": rootPkg.dependencies["@radix-ui/react-scroll-area"],
    "@radix-ui/react-select": rootPkg.dependencies["@radix-ui/react-select"],
    "@radix-ui/react-separator": rootPkg.dependencies["@radix-ui/react-separator"],
    "@radix-ui/react-slider": rootPkg.dependencies["@radix-ui/react-slider"],
    "@radix-ui/react-slot": rootPkg.dependencies["@radix-ui/react-slot"],
    "@radix-ui/react-switch": rootPkg.dependencies["@radix-ui/react-switch"],
    "@radix-ui/react-tabs": rootPkg.dependencies["@radix-ui/react-tabs"],
    "@radix-ui/react-tooltip": rootPkg.dependencies["@radix-ui/react-tooltip"],
    "@tanstack/react-table": rootPkg.dependencies["@tanstack/react-table"],
    "class-variance-authority": rootPkg.dependencies["class-variance-authority"],
    "clsx": rootPkg.dependencies["clsx"],
    "cmdk": rootPkg.dependencies["cmdk"],
    "lucide-react": rootPkg.dependencies["lucide-react"],
    "next-themes": rootPkg.dependencies["next-themes"],
    "react-hook-form": rootPkg.dependencies["react-hook-form"],
    "react-resizable-panels": rootPkg.dependencies["react-resizable-panels"],
    "sonner": rootPkg.dependencies["sonner"],
    "tailwind-merge": rootPkg.dependencies["tailwind-merge"],
    "vaul": rootPkg.dependencies["vaul"],
    "zod": rootPkg.dependencies["zod"],
    "zustand": rootPkg.dependencies["zustand"]
  },
  devDependencies: {
    "@types/node": "^22.13.4",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "tsup": "^8.3.6",
    "typescript": "^5.7.3"
  }
};

fs.writeFileSync(path.join(pkgDir, "package.json"), JSON.stringify(pkgJson, null, 2));

// 4. Create tsup.config.ts
const tsupConfig = `import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom", "next"],
  banner: {
    js: "'use client';",
  },
});
`;
fs.writeFileSync(path.join(pkgDir, "tsup.config.ts"), tsupConfig);

// 5. Create tsconfig.json for the package
const tsconfig = {
  compilerOptions: {
    target: "ES2022",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "react-jsx"
  },
  include: ["src/**/*"]
};
fs.writeFileSync(path.join(pkgDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

// 6. Copy styles
const cssContent = fs.readFileSync(path.join(rootDir, "app/globals.css"), "utf8");
fs.writeFileSync(path.join(pkgDir, "src/styles.css"), cssContent);

// 7. Create README.md for the standalone package
const readmeContent = `# @att-it-cloud-services/ui-framework-ts-pkg

> Production-ready, host-agnostic enterprise UI framework for cyber-physical operations, SCADA control rooms, and enterprise platforms.

## Installation

\`\`\`bash
# From GitHub Packages
npm install @att-it-cloud-services/ui-framework-ts-pkg

# Or directly from GitHub
npm install github:ATT-IT-Cloud-Services/ui-framework-ts-pkg
\`\`\`

## Quick Start in Next.js (App Router)

### 1. Import CSS Styles
In your \`app/layout.tsx\` or global CSS:
\`\`\`tsx
import "@att-it-cloud-services/ui-framework-ts-pkg/styles.css";
\`\`\`

### 2. Wrap your layout with Providers
\`\`\`tsx
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
\`\`\`

### 3. Use Layouts & Components
\`\`\`tsx
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
\`\`\`

## Key Features
- **Navigation Modes**: Full Sidebar, Icon Rail, Hybrid (Cmd+B toggle), Dual Rail, Inset Card, Topnav, Bottom Nav.
- **Split Layouts**: Docked, Overlap (1/3 & 1/2) with left backdrop blur, and Maximized.
- **Realtime Primitives**: LiveValue with quality indicators, LiveBadge, AlarmList, AlarmBanner, ConfirmHold (safety breaker).
- **Internationalization**: 5 built-in locales (en, de, fr, es, ar) with instant RTL mirroring.
- **Zero-Auth Architecture**: Purely consumes generic \`AuthAdapter\` and permissions.

## License
MIT © ATT-IT-Cloud-Services
`;
fs.writeFileSync(path.join(pkgDir, "README.md"), readmeContent);

// 8. Create .gitignore for the package
fs.writeFileSync(path.join(pkgDir, ".gitignore"), "node_modules\ndist\n.DS_Store\n");

console.log("Package prepared successfully!");

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  Layout,
  MessageSquare,
  Cpu,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@fw/ui";
import { LanguageSwitcher } from "@fw/i18n";
import { CustomizerDrawer } from "@fw/settings";
import { useLayoutSettings } from "@fw/settings";

interface DemoCardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  tag?: string;
  tagVariant?: "default" | "secondary" | "destructive" | "outline";
}

const DEMO_GALLERY: DemoCardItem[] = [
  // Combined Flagship
  {
    id: "flagship",
    title: "Enterprise Operations Showcase",
    category: "Flagship Showcase",
    description: "End-to-end mission control: mock login, dual-rail nav, SplitWithInfoPanel, role switching (Admin/Editor/Viewer), and notification center.",
    href: "/demo/combined/enterprise-showcase",
    tag: "FLAGSHIP",
  },
  // Navigation
  {
    id: "nav-sidebar-full",
    title: "Full Sidebar Navigation",
    category: "Navigation Modes",
    description: "Classic 260px wide enterprise navigation with section headings, animated accordions, and badge indicators.",
    href: "/demo/navigation/sidebar-full",
  },
  {
    id: "nav-sidebar-rail",
    title: "Icon Rail Navigation",
    category: "Navigation Modes",
    description: "Ultra-compact 64px icon rail maximizing horizontal space with floating flyout popovers.",
    href: "/demo/navigation/sidebar-rail",
  },
  {
    id: "nav-sidebar-hybrid",
    title: "Hybrid Sidebar Navigation",
    category: "Navigation Modes",
    description: "Switchable between rail and full with Cmd/Ctrl+B shortcut and optional hover expand.",
    href: "/demo/navigation/sidebar-hybrid",
    tag: "POPULAR",
    tagVariant: "secondary",
  },
  {
    id: "nav-sidebar-dual",
    title: "Dual Rail Navigation",
    category: "Navigation Modes",
    description: "56px primary module rail + dedicated 200px secondary panel displaying module submenus.",
    href: "/demo/navigation/sidebar-dual",
  },
  {
    id: "nav-sidebar-inset",
    title: "Inset Floating Sidebar",
    category: "Navigation Modes",
    description: "Floating inset navigation with rounded corners and elevated content card container.",
    href: "/demo/navigation/sidebar-inset",
  },
  {
    id: "nav-topnav",
    title: "Top Navigation Bar",
    category: "Navigation Modes",
    description: "Horizontal top bar with mega-menu dropdowns and responsive overflow into 'More'.",
    href: "/demo/navigation/topnav",
  },
  {
    id: "nav-bottom-nav",
    title: "Bottom Tab Navigation",
    category: "Navigation Modes",
    description: "Touch-friendly bottom tab bar with 4 primary items + full-height Sheet drawer.",
    href: "/demo/navigation/bottom-nav",
  },
  {
    id: "nav-position-end",
    title: "End-Positioned Sidebar",
    category: "Navigation Modes",
    description: "Mirrored navigation on the trailing side (right in LTR, left in RTL) using logical CSS properties.",
    href: "/demo/navigation/position-end",
  },
  {
    id: "nav-position-bottom",
    title: "Bottom-Positioned Bar",
    category: "Navigation Modes",
    description: "Affixed bottom bar layout with compact density for kiosk and handheld terminals.",
    href: "/demo/navigation/position-bottom",
  },

  // Layouts
  {
    id: "layout-single-pane",
    title: "SinglePane Template",
    category: "Content Layouts",
    description: "Standard uncluttered full-width layout for dashboards and overview reports.",
    href: "/demo/layouts/single-pane",
  },
  {
    id: "layout-master-detail",
    title: "MasterDetail Template",
    category: "Content Layouts",
    description: "Searchable master list (300-400px) + detail pane with mobile list->detail back drilldown.",
    href: "/demo/layouts/master-detail",
    tag: "RECOMMENDED",
    tagVariant: "secondary",
  },
  {
    id: "layout-three-pane",
    title: "ThreePane Template",
    category: "Content Layouts",
    description: "Three resizable columns: [App Navigation] | [Sub-list] | [Detail Content].",
    href: "/demo/layouts/three-pane",
  },
  {
    id: "layout-split-info-panel",
    title: "SplitWithInfoPanel Template",
    category: "Content Layouts",
    description: "Main workspace + collapsible, pinnable right info panel with live 1/2, 2/3, 3/4 ratio switcher.",
    href: "/demo/layouts/split-info-panel",
    tag: "CORE PATTERN",
  },
  {
    id: "layout-full-split",
    title: "FullSplit Template",
    category: "Content Layouts",
    description: "4-column layout: Navigation | Submenu | Content | Info Panel, each column resizable.",
    href: "/demo/layouts/full-split",
  },
  {
    id: "layout-object-page",
    title: "Enterprise ObjectPage Template",
    category: "Content Layouts",
    description: "Entity overview header, status, key attributes bar, sticky anchor tabs, and sticky action bar.",
    href: "/demo/layouts/object-page",
    tag: "OBJECT PAGE",
  },
  {
    id: "layout-settings-layout",
    title: "SettingsLayout Template",
    category: "Content Layouts",
    description: "Vertical sub-navigation sidebar + form area for multi-category application preferences.",
    href: "/demo/layouts/settings-layout",
  },
  {
    id: "layout-focus-layout",
    title: "FocusLayout Template",
    category: "Content Layouts",
    description: "Distraction-free full-screen modal layout hiding navigation with top close button.",
    href: "/demo/layouts/focus-layout",
  },

  // Feedback & Overlays
  {
    id: "feedback-confirm-dialogs",
    title: "Confirmation Dialogs Gallery",
    category: "Feedback & Overlays",
    description: "Promise-based useConfirm(), typed destructive verification, inline confirm, and mobile drawers.",
    href: "/demo/feedback/confirm-dialogs",
  },
  {
    id: "feedback-action-bars",
    title: "ActionBar Patterns Gallery",
    category: "Feedback & Overlays",
    description: "Sticky footer action bar with unsaved changes indicator, and floating multi-row bulk action bar.",
    href: "/demo/feedback/action-bars",
  },
  {
    id: "feedback-states",
    title: "UI States & Placeholders",
    category: "Feedback & Overlays",
    description: "Empty states, error states with stack inspection, skeleton loaders, and InfoCards.",
    href: "/demo/feedback/states",
  },
  {
    id: "feedback-toasts",
    title: "Toast Notifications System",
    category: "Feedback & Overlays",
    description: "6 mirrored live positions switcher, status variants, promise toasts, undo actions, and stacking.",
    href: "/demo/feedback/toasts",
  },
  {
    id: "feedback-popovers",
    title: "Popovers & Floating UI",
    category: "Feedback & Overlays",
    description: "FilterPopover with counter, QuickActions FAB, step-by-step Tour coachmarks, and context menus.",
    href: "/demo/feedback/popovers",
  },
  {
    id: "feedback-notifications",
    title: "Notification Center & Banners",
    category: "Feedback & Overlays",
    description: "Unread tabs, persistent toasts, announcement banners, and progress panels.",
    href: "/demo/feedback/notifications",
  },

  // Cross-Cutting Services
  {
    id: "services-i18n-rtl",
    title: "Internationalization & RTL",
    category: "Cross-Cutting Services",
    description: "5 typed locales (en, de, fr, es, ar), automatic RTL mirroring, and localized ICU formatters.",
    href: "/demo/services/i18n-rtl",
  },
  {
    id: "services-permissions",
    title: "Role-Based Permissions & Guarding",
    category: "Cross-Cutting Services",
    description: "Declarative <Can> component with live Admin, Editor, Viewer switcher filtering actions and menus.",
    href: "/demo/services/permissions",
  },
  {
    id: "services-shortcuts",
    title: "Keyboard Shortcuts Registry",
    category: "Cross-Cutting Services",
    description: "Global keyboard registry, conflict detection, and press '?' interactive help catalog.",
    href: "/demo/services/shortcuts",
  },
  {
    id: "services-url-state",
    title: "URL-Synchronized State Engine",
    category: "Cross-Cutting Services",
    description: "useQueryState hook synchronizing tabs and filter parameters with bookmarkable URLs.",
    href: "/demo/services/url-state",
  },

  // Realtime Operator Console
  {
    id: "realtime-operator-console",
    title: "Operator SCADA Telemetry Console",
    category: "Cyber-Physical & Realtime",
    description: "Simulated 50Hz live telemetry stream, alarms, high-contrast shift modes, and press-and-hold breakers.",
    href: "/demo/realtime/operator-console",
    tag: "LIVE STREAM",
    tagVariant: "default",
  },
];

const LAYOUT_DECISION_TABLE = [
  {
    template: "SinglePane",
    bestFor: "Dashboards, high-level metrics, simple forms",
    density: "Airy to Medium",
    mobileStrategy: "Normal single column vertical flow",
  },
  {
    template: "MasterDetail",
    bestFor: "Orders, email/inbox, support tickets, log audits",
    density: "High",
    mobileStrategy: "Collapses to list -> detail drilldown with back button",
  },
  {
    template: "ThreePane",
    bestFor: "Deep hierarchies (Account -> Projects -> Task)",
    density: "Very High",
    mobileStrategy: "Stacks into 3 sequential scroll sections",
  },
  {
    template: "SplitWithInfoPanel",
    bestFor: "Data tables or CAD viewers requiring contextual metadata",
    density: "High",
    mobileStrategy: "Info panel slides up as bottom Sheet drawer",
  },
  {
    template: "FullSplit",
    bestFor: "4-column power consoles, command centers",
    density: "Ultra High",
    mobileStrategy: "Horizontal scrolling or drawer conversion",
  },
  {
    template: "ObjectPage",
    bestFor: "Complex entity detail views, ERP product sheets",
    density: "High",
    mobileStrategy: "Sticky anchor tabs remain fixed below top header",
  },
  {
    template: "SettingsLayout",
    bestFor: "Application configuration, user account profiles",
    density: "Medium",
    mobileStrategy: "Sub-navigation stacks above form sections",
  },
  {
    template: "FocusLayout",
    bestFor: "Checkout, multi-step wizards, emergency shutdown",
    density: "Distraction-free",
    mobileStrategy: "Full-screen viewport modal with minimal top header",
  },
];

export function GalleryLandingPage() {
  const { toggleCustomizer } = useLayoutSettings();

  const categories = Array.from(
    new Set(DEMO_GALLERY.map((d) => d.category))
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-header flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 sm:px-8 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
            E
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-foreground">EnterpriseUI</span>
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              Framework & Gallery v1.0
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="dropdown" showName={false} />
          <button
            type="button"
            onClick={toggleCustomizer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-input bg-background hover:bg-muted text-xs font-medium transition-colors"
          >
            <Sliders className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">Theme Customizer</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="border-b border-border bg-muted/20 py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-2xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Modernized Calm Enterprise Operations Design</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Configurable Enterprise UI Framework
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Host-agnostic, zero-backend, zero-auth UI foundation engineered for cyber-physical operations,
            SCADA control rooms, and enterprise platforms. Calm, dense-but-airy, 6-8px radius,
            neutral palette with dynamic brand tokens, full dark mode, and complete RTL internationalization.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/demo/combined/enterprise-showcase"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>Launch Flagship Showcase</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={toggleCustomizer}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-input bg-background hover:bg-muted text-xs font-medium transition-colors"
            >
              <Sliders className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Open Customizer Drawer</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Cards by Category */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-12">
        {categories.map((category) => {
          const items = DEMO_GALLERY.filter((d) => d.category === category);
          const icon =
            category === "Flagship Showcase" ? (
              <Zap className="h-4 w-4 text-amber-500" />
            ) : category === "Navigation Modes" ? (
              <Compass className="h-4 w-4 text-primary" />
            ) : category === "Content Layouts" ? (
              <Layout className="h-4 w-4 text-sky-500" />
            ) : category === "Feedback & Overlays" ? (
              <MessageSquare className="h-4 w-4 text-emerald-500" />
            ) : category === "Cross-Cutting Services" ? (
              <Shield className="h-4 w-4 text-violet-500" />
            ) : (
              <Cpu className="h-4 w-4 text-rose-500" />
            );

          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/80">
                {icon}
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  {category}
                </h2>
                <span className="text-2xs text-muted-foreground">({items.length} demos)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-xs group"
                  >
                    <CardHeader className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-xs font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        {item.tag && (
                          <Badge variant={item.tagVariant || "default"} size="sm" className="text-[9px]">
                            {item.tag}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-2xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <span>Open Demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* When to use which: Layout Decision Table */}
        <div className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              When to Use Which: Layout Template Decision Matrix
            </h2>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xs">
            <table className="w-full text-xs">
              <thead className="bg-muted/40 border-b border-border text-start text-muted-foreground">
                <tr>
                  <th className="p-3 text-start font-semibold">Template</th>
                  <th className="p-3 text-start font-semibold">Best Suited For</th>
                  <th className="p-3 text-start font-semibold">Information Density</th>
                  <th className="p-3 text-start font-semibold">Mobile Responsive Fallback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {LAYOUT_DECISION_TABLE.map((row) => (
                  <tr key={row.template} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-semibold text-primary font-mono">{row.template}</td>
                    <td className="p-3 text-foreground">{row.bestFor}</td>
                    <td className="p-3 text-muted-foreground">{row.density}</td>
                    <td className="p-3 text-2xs text-muted-foreground">{row.mobileStrategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-6 px-4 text-center text-xs text-muted-foreground">
        Enterprise UI Framework & Demo Gallery • Strict separation between framework (<code className="font-mono text-foreground">src/</code>) and demos (<code className="font-mono text-foreground">demo/</code>).
      </footer>

      {/* Floating customizer drawer */}
      <CustomizerDrawer />
    </div>
  );
}

export default GalleryLandingPage;

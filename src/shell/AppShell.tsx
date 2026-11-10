"use client";

import * as React from "react";
import type { NavigationItem } from "../navigation/core/types";
import { useNavigationTree } from "../navigation/core/useNavigationTree";
import { SidebarFull } from "../navigation/variants/sidebar-full";
import { SidebarRail } from "../navigation/variants/sidebar-rail";
import { SidebarHybrid } from "../navigation/variants/sidebar-hybrid";
import { SidebarDual } from "../navigation/variants/sidebar-dual";
import { SidebarInset } from "../navigation/variants/sidebar-inset";
import { Topnav } from "../navigation/variants/topnav";
import { BottomNav } from "../navigation/variants/bottom-nav";
import { Header, type BreadcrumbItem } from "./Header";
import { AppFooter } from "./AppFooter";
import { CommandPalette, type CommandPaletteAction } from "./CommandPalette";
import { CustomizerDrawer } from "../settings/CustomizerDrawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useLayoutSettings } from "../settings/provider";
import { LayoutDimensionsProvider } from "./useLayoutDimensions";
import { cn } from "../lib/utils";

export interface AppShellProps {
  children: React.ReactNode;
  navigationItems?: NavigationItem[];
  actions?: CommandPaletteAction[];
  breadcrumbs?: BreadcrumbItem[];
  headerSlot?: React.ReactNode;
  userMenuSlot?: React.ReactNode;
  logoSlot?: React.ReactNode;
  sidebarHeaderSlot?: React.ReactNode;
  sidebarFooterSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  showDefaultFooter?: boolean;
  hideHeader?: boolean;
  hideNavigation?: boolean;
  hideCustomizer?: boolean;
  className?: string;
  /** Forwarded to the header so the host decides the language. */
  searchLabel?: string;
  searchShortcut?: string;
  themeLabel?: string;
  languageLabel?: string;
  hideSearch?: boolean;
  hideLanguage?: boolean;
  hideTheme?: boolean;
}

export function AppShell({
  children,
  navigationItems = [],
  actions = [],
  breadcrumbs = [],
  headerSlot,
  userMenuSlot,
  logoSlot,
  sidebarHeaderSlot,
  sidebarFooterSlot,
  footerSlot,
  showDefaultFooter = false,
  hideHeader = false,
  hideNavigation = false,
  hideCustomizer = false,
  className = "",
  searchLabel,
  searchShortcut,
  themeLabel,
  languageLabel,
  hideSearch = false,
  hideLanguage = false,
  hideTheme = false,
}: AppShellProps) {
  const { settings, mobileMenuOpen, setMobileMenuOpen, isCustomizerOpen } = useLayoutSettings();
  const tree = useNavigationTree(navigationItems);
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Global Cmd/Ctrl+K shortcut
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { navigationMode, navigationPosition, contentWidth, contentLayout } = settings;

  // Responsive padding classes
  const desktopPad = contentLayout?.padding ?? "comfortable";
  const mobilePad = contentLayout?.mobilePadding ?? "compact";

  const paddingClasses = React.useMemo(() => {
    if (contentWidth === "full") return "p-0 m-0 w-full h-full";

    const pDesk = {
      none: "lg:p-0",
      compact: "lg:p-3",
      comfortable: "lg:p-6",
      spacious: "lg:p-8",
    }[desktopPad];

    const pMob = {
      none: "p-0",
      compact: "p-2 sm:p-3",
      comfortable: "p-4",
      spacious: "p-6",
    }[mobilePad];

    return `${pMob} ${pDesk}`;
  }, [contentWidth, desktopPad, mobilePad]);

  // Content width constraints
  const contentWidthClass = {
    boxed: `max-w-7xl mx-auto w-full ${paddingClasses}`,
    fluid: `w-full ${paddingClasses}`,
    full: "w-full h-full p-0 m-0",
  }[contentWidth];

  const isNavAtEnd = navigationPosition === "end";
  const isNavTop = navigationMode === "topnav" || navigationPosition === "top";
  const isNavBottom = navigationMode === "bottom-nav" || navigationPosition === "bottom";

  const renderNavVariant = () => {
    if (hideNavigation) return null;

    switch (navigationMode) {
      case "sidebar-rail":
        return (
          <SidebarRail
            tree={tree}
            headerSlot={sidebarHeaderSlot}
            footerSlot={sidebarFooterSlot}
          />
        );
      case "sidebar-hybrid":
        return (
          <SidebarHybrid
            tree={tree}
            headerSlot={sidebarHeaderSlot}
            footerSlot={sidebarFooterSlot}
          />
        );
      case "sidebar-dual":
        return (
          <SidebarDual
            tree={tree}
            headerSlot={sidebarHeaderSlot}
            footerSlot={sidebarFooterSlot}
          />
        );
      case "sidebar-inset":
        return (
          <SidebarInset
            tree={tree}
            headerSlot={sidebarHeaderSlot}
            footerSlot={sidebarFooterSlot}
          />
        );
      case "topnav":
        return <Topnav tree={tree} />;
      case "bottom-nav":
        return <BottomNav tree={tree} />;
      case "sidebar-full":
      default:
        return (
          <SidebarFull
            tree={tree}
            headerSlot={sidebarHeaderSlot}
            footerSlot={sidebarFooterSlot}
          />
        );
    }
  };

  // Determine whether to blur the main viewport when a side drawer (customizer/menu) opens
  const shouldBlurLeft =
    (isCustomizerOpen || mobileMenuOpen) && settings.overlays.blurLeftOnMenuOpen;

  return (
    <LayoutDimensionsProvider
      headerHeight={hideHeader ? 0 : 48}
      navHeight={isNavTop ? 40 : 0}
      footerHeight={footerSlot || showDefaultFooter ? 36 : 0}
    >
      <div
        className={cn(
          "relative flex min-h-screen w-full flex-col bg-background text-foreground transition-colors duration-150",
          className
        )}
      >
        {/* Top Header */}
        {!hideHeader && (
          <Header
            logoSlot={logoSlot}
            actionsSlot={headerSlot}
            userMenuSlot={userMenuSlot}
            breadcrumbs={breadcrumbs}
            onOpenSearch={() => setCommandOpen(true)}
            searchLabel={searchLabel}
            searchShortcut={searchShortcut}
            themeLabel={themeLabel}
            languageLabel={languageLabel}
            hideSearch={hideSearch}
            hideLanguage={hideLanguage}
            hideTheme={hideTheme}
          />
        )}

        {/* Top Navigation mode */}
        {isNavTop && !hideNavigation && (
          <div className="hidden lg:block border-b border-border/80">
            <Topnav tree={tree} />
          </div>
        )}

        {/* Main Layout Area */}
        <div
          className={cn(
            "flex flex-1 overflow-hidden transition-all duration-200",
            isNavAtEnd && "flex-row-reverse",
            shouldBlurLeft && "filter backdrop-blur-sm opacity-90 transition-all duration-200"
          )}
        >
          {/* Desktop Sidebar (hidden if topnav, bottom-nav, or on mobile) */}
          {!isNavTop && !isNavBottom && !hideNavigation && (
            <div
              className={cn(
                "hidden lg:flex shrink-0 transition-all duration-200",
                settings.sidebarSticky
                  ? "sticky top-[var(--header-height,48px)] h-[calc(100vh-var(--header-height,48px)-var(--footer-height,0px))] overflow-hidden"
                  : "min-h-full h-auto"
              )}
            >
              {renderNavVariant()}
            </div>
          )}

          {/* Content Body */}
          <main
            className={cn(
              "flex-1 flex flex-col focus:outline-none",
              contentLayout?.overflowMode === "fill-viewport" ? "overflow-hidden" : "overflow-y-auto",
              navigationMode === "sidebar-inset" && "p-2.5"
            )}
          >
            {navigationMode === "sidebar-inset" ? (
              <div className="flex-1 rounded-xl border border-border bg-card text-card-foreground shadow-2xs overflow-hidden flex flex-col">
                <div className={cn("flex-1 flex flex-col", contentWidthClass)}>{children}</div>
              </div>
            ) : (
              <div className={cn("flex-1 flex flex-col", contentWidthClass)}>{children}</div>
            )}
          </main>
        </div>

        {/* Bottom Nav on Desktop/Mobile if selected */}
        {isNavBottom && !hideNavigation && (
          <div className="block pb-14">
            <BottomNav tree={tree} />
          </div>
        )}

        {/* Dedicated Footer slot */}
        {footerSlot ? (
          footerSlot
        ) : showDefaultFooter ? (
          <AppFooter />
        ) : null}

        {/* Mobile Off-canvas Drawer fallback (<1024px) */}
        {!hideNavigation && (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="start" className="w-72 p-0 flex flex-col">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="text-sm font-semibold">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                <SidebarFull
                  tree={tree}
                  className="w-full border-none"
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Global Command Palette */}
        <CommandPalette
          open={commandOpen}
          onOpenChange={setCommandOpen}
          navigationItems={navigationItems}
          actions={actions}
        />

        {/* Layout/Theme Customizer Drawer */}
        {!hideCustomizer && <CustomizerDrawer />}
      </div>
    </LayoutDimensionsProvider>
  );
}

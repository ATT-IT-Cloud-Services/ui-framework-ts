"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, Sun, Moon, Sliders, ChevronRight } from "lucide-react";
import { useLayoutSettings } from "../settings/provider";
import { Button } from "../ui/button";
import { LanguageSwitcher } from "../i18n/LanguageSwitcher";
import { cn } from "../lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeaderProps {
  title?: React.ReactNode;
  logoSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
  userMenuSlot?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  showBreadcrumbs?: boolean;
  onOpenSearch?: () => void;
  className?: string;
}

export function Header({
  title,
  logoSlot,
  actionsSlot,
  userMenuSlot,
  breadcrumbs = [],
  showBreadcrumbs = true,
  onOpenSearch,
  className = "",
}: HeaderProps) {
  const { settings, updateSettings, toggleCustomizer, setMobileMenuOpen } =
    useLayoutSettings();

  const isSticky = settings.headerSticky;
  const isDark = settings.theme === "dark";

  return (
    <header
      className={cn(
        "flex h-12 w-full items-center justify-between border-b border-border bg-background/95 px-3 sm:px-4 backdrop-blur-md select-none transition-all",
        isSticky && "sticky top-0 z-header",
        className
      )}
    >
      {/* Left side: Hamburger, Logo, Title & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="inline-flex lg:hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        {/* Logo / Brand slot */}
        {logoSlot ? (
          logoSlot
        ) : (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
              E
            </div>
            <span className="font-semibold text-xs tracking-tight text-foreground group-hover:text-primary transition-colors">
              EnterpriseUI
            </span>
          </Link>
        )}

        {/* Optional Page Title or Breadcrumbs */}
        {showBreadcrumbs && settings.showBreadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="hidden md:flex items-center gap-1.5 ms-3 ps-3 border-s border-border text-xs text-muted-foreground"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-foreground transition-colors truncate max-w-[150px]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={cn("truncate max-w-[200px]", isLast && "font-medium text-foreground")}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {title && <div className="hidden lg:block ms-2">{title}</div>}
      </div>

      {/* Right side: Search, Actions, Language, Theme, Customizer, UserMenu */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Quick Search Trigger */}
        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-7 rounded-md border border-input bg-muted/30 px-2 text-2xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block rounded border border-border bg-background px-1 text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Host action items slot */}
        {actionsSlot}

        {/* Language switcher */}
        <LanguageSwitcher variant="dropdown" showName={false} />

        {/* Theme mode toggle button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() =>
            updateSettings({ theme: isDark ? "light" : "dark" })
          }
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </Button>

        {/* Customizer drawer toggle button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleCustomizer}
          title="Open Layout & Theme Settings"
          aria-label="Layout Customizer"
        >
          <Sliders className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
        </Button>

        {/* User Account menu */}
        {userMenuSlot}
      </div>
    </header>
  );
}

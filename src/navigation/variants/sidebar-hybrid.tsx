"use client";

import * as React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { NavigationItem, NavigationTreeState } from "../core/types";
import { SidebarFull } from "./sidebar-full";
import { SidebarRail } from "./sidebar-rail";
import { useLayoutSettings } from "../../settings/provider";
import { cn } from "../../lib/utils";

export interface SidebarHybridProps {
  tree: NavigationTreeState;
  className?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  onNavigate?: (item: NavigationItem) => void;
  hoverExpand?: boolean;
}

export function SidebarHybrid({
  tree,
  className = "",
  headerSlot,
  footerSlot,
  onNavigate,
  hoverExpand = false,
}: SidebarHybridProps) {
  const { sidebarCollapsed, toggleSidebar, settings } = useLayoutSettings();
  const [isHovered, setIsHovered] = React.useState(false);

  // Keyboard shortcut Ctrl/Cmd+B
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const shouldHoverExpand = hoverExpand || settings.sidebarState === "hover-expand";
  const effectivelyExpanded = !sidebarCollapsed || (shouldHoverExpand && isHovered);

  const toggleButton = (
    <button
      type="button"
      onClick={toggleSidebar}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      title="Toggle sidebar (Cmd+B)"
      aria-label="Toggle sidebar"
    >
      {effectivelyExpanded ? (
        <PanelLeftClose className="h-4 w-4" />
      ) : (
        <PanelLeftOpen className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <div
      className={cn("relative h-full transition-all duration-200", className)}
      onMouseEnter={() => shouldHoverExpand && setIsHovered(true)}
      onMouseLeave={() => shouldHoverExpand && setIsHovered(false)}
    >
      {effectivelyExpanded ? (
        <SidebarFull
          tree={tree}
          headerSlot={
            <div className="flex items-center justify-between">
              {headerSlot || <span className="font-semibold text-xs tracking-wider uppercase text-foreground">Navigation</span>}
              {toggleButton}
            </div>
          }
          footerSlot={footerSlot}
          onNavigate={onNavigate}
        />
      ) : (
        <SidebarRail
          tree={tree}
          headerSlot={toggleButton}
          footerSlot={footerSlot}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

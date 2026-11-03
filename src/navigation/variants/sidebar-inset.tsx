"use client";

import * as React from "react";
import type { NavigationItem, NavigationTreeState } from "../core/types";
import { SidebarFull } from "./sidebar-full";
import { cn } from "../../lib/utils";

export interface SidebarInsetProps {
  tree: NavigationTreeState;
  className?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  onNavigate?: (item: NavigationItem) => void;
}

export function SidebarInset({
  tree,
  className = "",
  headerSlot,
  footerSlot,
  onNavigate,
}: SidebarInsetProps) {
  return (
    <div className={cn("p-2.5 h-full shrink-0", className)}>
      <SidebarFull
        tree={tree}
        headerSlot={headerSlot}
        footerSlot={footerSlot}
        onNavigate={onNavigate}
        className="rounded-xl border border-border shadow-2xs h-full overflow-hidden"
      />
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { NavigationItem, NavigationTreeState } from "../core/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { SidebarFull } from "./sidebar-full";
import { cn } from "../../lib/utils";

export interface BottomNavProps {
  tree: NavigationTreeState;
  className?: string;
  maxItems?: number;
  onNavigate?: (item: NavigationItem) => void;
}

export function BottomNav({
  tree,
  className = "",
  maxItems = 4,
  onNavigate,
}: BottomNavProps) {
  const { items, activeChain, getItemLabel } = tree;
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const primaryItems = items.slice(0, maxItems);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-nav flex h-14 items-center justify-around border-t border-border bg-sidebar/95 backdrop-blur-md px-2 pb-safe select-none text-xs",
        className
      )}
    >
      {primaryItems.map((item) => {
        const isItemActive = activeChain.includes(item.id);
        const label = getItemLabel(item);
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href || "#"}
            onClick={() => {
              tree.recordRecent(item);
              onNavigate?.(item);
            }}
            className={cn(
              "flex flex-1 flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] px-1 gap-1 transition-colors cursor-pointer",
              isItemActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-4.5 w-4.5 shrink-0" />}
            <span className="text-[11px] leading-tight text-center truncate max-w-full font-medium">
              {label}
            </span>
          </Link>
        );
      })}

      {/* "More" trigger to open sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex flex-1 flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] px-1 gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Menu className="h-4.5 w-4.5 shrink-0" />
            <span className="text-[11px] leading-tight font-medium">Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] p-0 flex flex-col">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <SidebarFull
              tree={tree}
              className="w-full border-none"
              onNavigate={(item) => {
                setSheetOpen(false);
                onNavigate?.(item);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

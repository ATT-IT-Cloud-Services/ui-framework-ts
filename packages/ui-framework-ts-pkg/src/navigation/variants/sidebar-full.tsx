"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Pin, Star } from "lucide-react";
import type { NavigationItem, NavigationTreeState } from "../core/types";
import { Badge } from "../../ui/badge";
import { cn } from "../../lib/utils";

export interface SidebarFullProps {
  tree: NavigationTreeState;
  className?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  onNavigate?: (item: NavigationItem) => void;
}

export function SidebarFull({
  tree,
  className = "",
  headerSlot,
  footerSlot,
  onNavigate,
}: SidebarFullProps) {
  const { items, activeChain, isExpanded, toggleExpand, getItemLabel, pinnedItems } = tree;

  // Group items by section
  const sections = React.useMemo(() => {
    const map = new Map<string, NavigationItem[]>();
    for (const item of items) {
      const section = item.section || "General";
      if (!map.has(section)) {
        map.set(section, []);
      }
      map.get(section)!.push(item);
    }
    return Array.from(map.entries());
  }, [items]);

  const renderItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = activeChain.includes(item.id);
    const isDirectActive = activeChain[activeChain.length - 1] === item.id;
    const expanded = isExpanded(item.id);
    const label = getItemLabel(item);
    const Icon = item.icon;

    const content = (
      <div
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer select-none",
          isDirectActive
            ? "bg-primary/10 text-primary font-semibold"
            : isItemActive
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          depth > 0 && "ms-4 text-2xs",
          depth > 1 && "ms-6"
        )}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            toggleExpand(item.id);
          } else {
            tree.recordRecent(item);
            onNavigate?.(item);
          }
        }}
      >
        {Icon && (
          <Icon
            className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              isDirectActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        )}
        <span className="truncate flex-1 text-start">{label}</span>

        {item.tag && (
          <Badge variant="outline" size="sm" className="px-1 py-0 text-[9px] uppercase tracking-wider font-semibold">
            {item.tag}
          </Badge>
        )}

        {item.badge !== undefined && (
          <Badge variant={item.badgeVariant || "secondary"} size="sm">
            {item.badge}
          </Badge>
        )}

        {hasChildren && (
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 transition-transform duration-150",
              expanded && "rotate-90"
            )}
          />
        )}
      </div>
    );

    return (
      <li key={item.id} className="my-0.5">
        {item.href && !hasChildren ? (
          <Link href={item.href} className="block">
            {content}
          </Link>
        ) : (
          content
        )}

        {hasChildren && expanded && (
          <ul className="mt-0.5 space-y-0.5 border-s border-border/40 ms-4 ps-1 animate-in fade-in-50 duration-150">
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-e border-border bg-sidebar text-sidebar-foreground transition-all duration-200 select-none",
        className
      )}
    >
      {headerSlot && <div className="p-3 border-b border-border/60">{headerSlot}</div>}

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Pinned section */}
        {pinnedItems.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 px-2 text-2xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span>Favorites</span>
            </div>
            <ul className="space-y-0.5">
              {pinnedItems.map((item) => (
                <li key={`pinned-${item.id}`}>
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      activeChain.includes(item.id) && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    {item.icon && <item.icon className="h-3.5 w-3.5" />}
                    <span className="truncate">{getItemLabel(item)}</span>
                    <Pin className="ms-auto h-3 w-3 opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Regular Sections */}
        {sections.map(([sectionName, sectionItems]) => (
          <div key={sectionName} className="space-y-1">
            <div className="px-2 text-2xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              {sectionName}
            </div>
            <ul className="space-y-0.5">{sectionItems.map((item) => renderItem(item, 0))}</ul>
          </div>
        ))}
      </div>

      {footerSlot && <div className="p-3 border-t border-border/60 bg-muted/20">{footerSlot}</div>}
    </aside>
  );
}

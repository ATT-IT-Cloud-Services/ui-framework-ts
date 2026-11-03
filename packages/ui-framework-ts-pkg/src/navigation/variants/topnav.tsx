"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import type { NavigationItem, NavigationTreeState } from "../core/types";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { cn } from "../../lib/utils";

export interface TopnavProps {
  tree: NavigationTreeState;
  className?: string;
  maxVisibleItems?: number;
  onNavigate?: (item: NavigationItem) => void;
}

export function Topnav({
  tree,
  className = "",
  maxVisibleItems = 6,
  onNavigate,
}: TopnavProps) {
  const { items, activeChain, getItemLabel } = tree;

  const visibleItems = items.slice(0, maxVisibleItems);
  const overflowItems = items.slice(maxVisibleItems);

  const renderDropdownChildren = (children: NavigationItem[]) => {
    return children.map((child) => {
      const isChildActive = activeChain.includes(child.id);
      const label = getItemLabel(child);

      if (child.children && child.children.length > 0) {
        return (
          <DropdownMenuSub key={child.id}>
            <DropdownMenuSubTrigger className={cn(isChildActive && "font-semibold text-primary")}>
              {child.icon && <child.icon className="h-3.5 w-3.5 me-2" />}
              <span>{label}</span>
              {child.badge !== undefined && (
                <Badge variant="secondary" size="sm" className="ms-2">
                  {child.badge}
                </Badge>
              )}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              {child.children.map((sub) => (
                <DropdownMenuItem key={sub.id} asChild>
                  <Link
                    href={sub.href || "#"}
                    onClick={() => {
                      tree.recordRecent(sub);
                      onNavigate?.(sub);
                    }}
                    className={cn(
                      "flex items-center justify-between w-full",
                      activeChain.includes(sub.id) && "font-semibold text-primary"
                    )}
                  >
                    <span>{getItemLabel(sub)}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem key={child.id} asChild>
          <Link
            href={child.href || "#"}
            onClick={() => {
              tree.recordRecent(child);
              onNavigate?.(child);
            }}
            className={cn(
              "flex items-center justify-between w-full",
              isChildActive && "font-semibold text-primary"
            )}
          >
            <div className="flex items-center gap-2">
              {child.icon && <child.icon className="h-3.5 w-3.5 text-muted-foreground" />}
              <span>{label}</span>
            </div>
            {child.badge !== undefined && (
              <Badge variant="secondary" size="sm">
                {child.badge}
              </Badge>
            )}
          </Link>
        </DropdownMenuItem>
      );
    });
  };

  return (
    <nav
      className={cn(
        "flex items-center gap-1 border-b border-border bg-sidebar px-4 h-10 select-none overflow-x-auto text-xs",
        className
      )}
    >
      {visibleItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isItemActive = activeChain.includes(item.id);
        const label = getItemLabel(item);
        const Icon = item.icon;

        if (hasChildren) {
          return (
            <DropdownMenu key={item.id}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted/70",
                    isItemActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  <span>{label}</span>
                  {item.badge !== undefined && (
                    <Badge variant={item.badgeVariant || "secondary"} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronDown className="h-3 w-3 opacity-60 ms-0.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-2xs">{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {renderDropdownChildren(item.children!)}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.href || "#"}
            onClick={() => {
              tree.recordRecent(item);
              onNavigate?.(item);
            }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted/70",
              isItemActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span>{label}</span>
            {item.badge !== undefined && (
              <Badge variant={item.badgeVariant || "secondary"} size="sm">
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}

      {overflowItems.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span>More</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {overflowItems.map((item) => (
              <DropdownMenuItem key={item.id} asChild>
                <Link
                  href={item.href || "#"}
                  onClick={() => {
                    tree.recordRecent(item);
                    onNavigate?.(item);
                  }}
                  className="flex items-center justify-between w-full"
                >
                  <span>{getItemLabel(item)}</span>
                  {item.badge !== undefined && (
                    <Badge variant="secondary" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}

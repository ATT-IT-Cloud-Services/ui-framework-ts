"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavigationItem, NavigationTreeState } from "../core/types";
import { Badge } from "../../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { cn } from "../../lib/utils";

export interface SidebarDualProps {
  tree: NavigationTreeState;
  className?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  onNavigate?: (item: NavigationItem) => void;
}

export function SidebarDual({
  tree,
  className = "",
  headerSlot,
  footerSlot,
  onNavigate,
}: SidebarDualProps) {
  const { items, activeChain, getItemLabel } = tree;

  // Selected top-level module: defaults to active root item, or first item
  const [selectedModuleId, setSelectedModuleId] = React.useState<string>(() => {
    if (activeChain.length > 0) return activeChain[0];
    return items[0]?.id || "";
  });

  // Synchronize when activeChain changes
  React.useEffect(() => {
    if (activeChain.length > 0) {
      setSelectedModuleId(activeChain[0]);
    }
  }, [activeChain]);

  const activeModule = items.find((i) => i.id === selectedModuleId) || items[0];
  const subItems = activeModule?.children || [];

  return (
    <TooltipProvider delayDuration={150}>
      <aside className={cn("flex h-full border-e border-border select-none", className)}>
        {/* Primary Icon Rail */}
        <div className="flex h-full w-14 flex-col items-center border-e border-border/60 bg-muted/30 py-3">
          {headerSlot && <div className="mb-3">{headerSlot}</div>}
          <div className="flex-1 w-full flex flex-col items-center gap-1.5 overflow-y-auto px-1">
            {items.map((item) => {
              const isSelected = item.id === selectedModuleId;
              const isChainActive = activeChain.includes(item.id);
              const label = getItemLabel(item);
              const Icon = item.icon;

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModuleId(item.id);
                        if (!item.children || item.children.length === 0) {
                          tree.recordRecent(item);
                          onNavigate?.(item);
                        }
                      }}
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-md text-xs transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                          : isChainActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {Icon ? <Icon className="h-4.5 w-4.5" /> : <span>{label.charAt(0)}</span>}
                      {item.badge !== undefined && (
                        <span className="absolute top-1 end-1 flex h-2 w-2 rounded-full bg-amber-500" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
          {footerSlot && <div className="mt-auto">{footerSlot}</div>}
        </div>

        {/* Secondary Submenu Panel */}
        <div className="flex h-full w-52 flex-col bg-sidebar text-sidebar-foreground py-3 px-2">
          {activeModule && (
            <div className="px-2 pb-2 mb-2 border-b border-border/50">
              <h4 className="text-xs font-semibold text-foreground truncate">
                {getItemLabel(activeModule)}
              </h4>
              {activeModule.tag && (
                <Badge variant="outline" size="sm" className="mt-1">
                  {activeModule.tag}
                </Badge>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-0.5">
            {subItems.length === 0 ? (
              <div className="p-3 text-center text-2xs text-muted-foreground">
                No sub-items in this module
              </div>
            ) : (
              subItems.map((child) => {
                const isChildActive = activeChain.includes(child.id);
                const childLabel = getItemLabel(child);
                return (
                  <div key={child.id} className="space-y-0.5">
                    <Link
                      href={child.href || "#"}
                      onClick={() => {
                        tree.recordRecent(child);
                        onNavigate?.(child);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors",
                        isChildActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {child.icon && <child.icon className="h-3.5 w-3.5" />}
                        <span className="truncate">{childLabel}</span>
                      </div>
                      {child.badge !== undefined && (
                        <Badge variant={child.badgeVariant || "secondary"} size="sm">
                          {child.badge}
                        </Badge>
                      )}
                      {child.children && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                    </Link>

                    {/* Level 3 children */}
                    {child.children && child.children.length > 0 && (
                      <div className="ms-4 ps-2 border-s border-border/40 space-y-0.5 mt-0.5">
                        {child.children.map((sub) => {
                          const isSubActive = activeChain.includes(sub.id);
                          return (
                            <Link
                              key={sub.id}
                              href={sub.href || "#"}
                              onClick={() => {
                                tree.recordRecent(sub);
                                onNavigate?.(sub);
                              }}
                              className={cn(
                                "block rounded px-2 py-1 text-2xs transition-colors",
                                isSubActive
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {getItemLabel(sub)}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}

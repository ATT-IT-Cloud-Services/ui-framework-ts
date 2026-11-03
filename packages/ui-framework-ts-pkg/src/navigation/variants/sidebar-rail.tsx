"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Pin, X } from "lucide-react";
import type { NavigationItem, NavigationTreeState } from "../core/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Badge } from "../../ui/badge";
import { cn } from "../../lib/utils";

export interface SidebarRailProps {
  tree: NavigationTreeState;
  className?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  onNavigate?: (item: NavigationItem) => void;
}

export function SidebarRail({
  tree,
  className = "",
  headerSlot,
  footerSlot,
  onNavigate,
}: SidebarRailProps) {
  const { items, activeChain, getItemLabel } = tree;
  const [dockedModuleId, setDockedModuleId] = React.useState<string | null>(null);

  const dockedItem = items.find((i) => i.id === dockedModuleId);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex h-full">
        {/* Primary Icon Rail */}
        <aside
          className={cn(
            "flex h-full w-16 flex-col items-center border-e border-border bg-sidebar text-sidebar-foreground py-3 select-none shrink-0",
            className
          )}
        >
          {headerSlot && <div className="mb-3">{headerSlot}</div>}

          <div className="flex-1 w-full flex flex-col items-center gap-1.5 overflow-y-auto px-1.5">
            {items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isItemActive = activeChain.includes(item.id);
              const isDocked = dockedModuleId === item.id;
              const label = getItemLabel(item);
              const Icon = item.icon;

              if (hasChildren) {
                return (
                  <Popover key={item.id}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        onClick={() => {
                          if (dockedModuleId === item.id) {
                            setDockedModuleId(null);
                          }
                        }}
                        className={cn(
                          "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-xs transition-colors hover:bg-muted/70",
                          isDocked
                            ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                            : isItemActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {Icon ? <Icon className="h-5 w-5" /> : <span>{label.charAt(0)}</span>}
                        {item.badge !== undefined && (
                          <span className="absolute top-1 end-1 flex h-2 w-2 rounded-full bg-primary" />
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="right" align="start" className="w-60 p-2 shadow-lg">
                      <div className="flex items-center justify-between font-semibold text-xs text-foreground px-2 py-1.5 border-b border-border/50 mb-1.5">
                        <span className="truncate">{label}</span>
                        <button
                          type="button"
                          onClick={() => setDockedModuleId(isDocked ? null : item.id)}
                          className={cn(
                            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer border",
                            isDocked
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                          )}
                          title={isDocked ? "Dauerhaftes Ausfahren beenden" : "Dauerhaft ausfahren (Dock / Pin)"}
                        >
                          <Pin className="h-2.5 w-2.5" />
                          <span>{isDocked ? "Gedockt" : "Dauerhaft"}</span>
                        </button>
                      </div>
                      <ul className="space-y-0.5">
                        {item.children!.map((child) => {
                          const childActive = activeChain.includes(child.id);
                          const childLabel = getItemLabel(child);
                          return (
                            <li key={child.id}>
                              <Link
                                href={child.href || "#"}
                                onClick={() => {
                                  tree.recordRecent(child);
                                  onNavigate?.(child);
                                }}
                                className={cn(
                                  "flex items-center justify-between rounded px-2 py-1.5 text-xs transition-colors hover:bg-muted/60 cursor-pointer",
                                  childActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  {child.icon && <child.icon className="h-3.5 w-3.5" />}
                                  <span>{childLabel}</span>
                                </div>
                                {child.badge !== undefined && (
                                  <Badge variant="secondary" size="sm">
                                    {child.badge}
                                  </Badge>
                                )}
                                {child.children && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </PopoverContent>
                  </Popover>
                );
              }

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href || "#"}
                      onClick={() => {
                        tree.recordRecent(item);
                        onNavigate?.(item);
                      }}
                      className={cn(
                        "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-xs transition-colors hover:bg-muted/70",
                        isItemActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : <span>{label.charAt(0)}</span>}
                      {item.badge !== undefined && (
                        <span className="absolute top-1 end-1 flex h-2 w-2 rounded-full bg-primary" />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="flex items-center gap-2">
                      <span>{label}</span>
                      {item.tag && <span className="text-[9px] uppercase font-bold text-primary">{item.tag}</span>}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {footerSlot && <div className="mt-auto pt-2">{footerSlot}</div>}
        </aside>

        {/* Permanently Docked Submenu Panel (when operator activates Pin / Ausklappen) */}
        {dockedItem && dockedItem.children && (
          <aside className="flex h-full w-56 flex-col border-e border-border bg-sidebar/95 backdrop-blur-md p-3 select-none text-xs animate-in slide-in-from-left-2 duration-150 shrink-0">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
              <div className="flex items-center gap-1.5 truncate">
                <Pin className="h-3 w-3 text-primary shrink-0" />
                <span className="font-semibold text-foreground truncate">
                  {getItemLabel(dockedItem)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDockedModuleId(null)}
                className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title="Dauerhaftes Ausfahren schließen"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pe-0.5">
              {dockedItem.children.map((child) => {
                const childActive = activeChain.includes(child.id);
                const childLabel = getItemLabel(child);
                return (
                  <Link
                    key={child.id}
                    href={child.href || "#"}
                    onClick={() => {
                      tree.recordRecent(child);
                      onNavigate?.(child);
                    }}
                    className={cn(
                      "flex items-center justify-between rounded px-2.5 py-1.5 text-xs transition-colors hover:bg-muted/60 cursor-pointer",
                      childActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {child.icon && <child.icon className="h-3.5 w-3.5" />}
                      <span className="truncate">{childLabel}</span>
                    </div>
                    {child.badge !== undefined && (
                      <Badge variant="secondary" size="sm">
                        {child.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </TooltipProvider>
  );
}

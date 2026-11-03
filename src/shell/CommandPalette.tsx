"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import type { NavigationItem } from "../navigation/core/types";
import { useT } from "../i18n/provider";
import { useRouter } from "next/navigation";

export interface CommandPaletteAction {
  id: string;
  label: string;
  category?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
  shortcut?: string;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigationItems?: NavigationItem[];
  actions?: CommandPaletteAction[];
}

function flattenNav(items: NavigationItem[]): NavigationItem[] {
  const result: NavigationItem[] = [];
  for (const item of items) {
    if (item.href) result.push(item);
    if (item.children) result.push(...flattenNav(item.children));
  }
  return result;
}

export function CommandPalette({
  open,
  onOpenChange,
  navigationItems = [],
  actions = [],
}: CommandPaletteProps) {
  const t = useT();
  const router = useRouter();

  const flatNav = React.useMemo(() => flattenNav(navigationItems), [navigationItems]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton className="p-0 overflow-hidden max-w-lg border border-border shadow-2xl">
        <Command className="flex flex-col w-full bg-popover text-popover-foreground rounded-lg">
          <div className="flex items-center border-b border-border px-3">
            <Search className="me-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder={t("common.search", undefined, "Type a command or search...")}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-xs outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-1.5 space-y-1">
            <Command.Empty className="py-6 text-center text-xs text-muted-foreground">
              {t("table.noResults", undefined, "No results found.")}
            </Command.Empty>

            {flatNav.length > 0 && (
              <Command.Group
                heading="Navigation"
                className="text-2xs font-semibold text-muted-foreground uppercase px-2 py-1"
              >
                {flatNav.map((item) => {
                  const Icon = item.icon;
                  const label = item.labelKey ? t(item.labelKey, undefined, item.label || item.id) : item.label || item.id;
                  return (
                    <Command.Item
                      key={item.id}
                      value={`${label} ${item.section || ""}`}
                      onSelect={() => {
                        onOpenChange(false);
                        if (item.href) router.push(item.href);
                      }}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2.5 py-1.5 text-xs outline-none hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      {Icon && <Icon className="me-2 h-3.5 w-3.5 text-muted-foreground" />}
                      <span className="flex-1 truncate">{label}</span>
                      {item.section && (
                        <span className="text-2xs text-muted-foreground/70">{item.section}</span>
                      )}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            )}

            {actions.length > 0 && (
              <Command.Group
                heading="Actions"
                className="text-2xs font-semibold text-muted-foreground uppercase px-2 py-1"
              >
                {actions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Command.Item
                      key={action.id}
                      value={action.label}
                      onSelect={() => {
                        onOpenChange(false);
                        action.onSelect();
                      }}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2.5 py-1.5 text-xs outline-none hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      {Icon && <Icon className="me-2 h-3.5 w-3.5 text-muted-foreground" />}
                      <span className="flex-1">{action.label}</span>
                      {action.shortcut && (
                        <kbd className="ms-auto text-2xs text-muted-foreground px-1.5 py-0.5 rounded border border-border/60 bg-muted/50">
                          {action.shortcut}
                        </kbd>
                      )}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { cn } from "../../lib/utils";

export interface QuickActionItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export interface QuickActionsMenuProps {
  actions: QuickActionItem[];
  className?: string;
}

export function QuickActionsMenu({
  actions,
  className = "",
}: QuickActionsMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("fixed bottom-6 end-6 z-actionbar flex flex-col items-end gap-2", className)}>
      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-2 animate-in fade-in-50 slide-in-from-bottom-2">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  act.onClick();
                }}
                className="flex items-center gap-2 rounded-full bg-popover text-popover-foreground border border-border px-3 py-1.5 text-xs font-medium shadow-md hover:bg-muted transition-transform hover:scale-105 active:scale-95"
              >
                <span>{act.label}</span>
                {Icon && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-transform active:scale-95",
          isOpen && "rotate-45"
        )}
        aria-label="Toggle Quick Actions"
        title="Quick Actions"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </button>
    </div>
  );
}

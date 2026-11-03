import * as React from "react";
import { Inbox } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  };
  secondaryAction?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data available",
  description = "There are no records matching your request at this time.",
  icon: Icon = Inbox,
  action,
  secondaryAction,
  children,
  className = "",
}: EmptyStateProps) {
  const ActionIcon = action?.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border/80 bg-muted/10 space-y-3",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground/80">
        <Icon className="h-6 w-6" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {(action || secondaryAction || children) && (
        <div className="flex items-center gap-2 pt-2">
          {action && (
            <Button size="sm" onClick={action.onClick} className="text-xs font-semibold">
              {ActionIcon && <ActionIcon className="me-1.5 h-3.5 w-3.5" />}
              {action.label}
            </Button>
          )}
          {secondaryAction}
          {children}
        </div>
      )}
    </div>
  );
}

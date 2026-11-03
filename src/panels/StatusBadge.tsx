import * as React from "react";
import { Badge } from "../ui/badge";
import { cn } from "../lib/utils";

export type EntityStatus =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "error"
  | "warning"
  | "draft"
  | "offline";

export interface StatusBadgeProps {
  status: EntityStatus | string;
  label?: string;
  showDot?: boolean;
  pulse?: boolean;
  className?: string;
}

const STATUS_MAP: Record<
  EntityStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "muted"; dotColor: string }
> = {
  active: { label: "Active", variant: "success", dotColor: "bg-emerald-500" },
  completed: { label: "Completed", variant: "success", dotColor: "bg-emerald-500" },
  pending: { label: "Pending", variant: "warning", dotColor: "bg-amber-500" },
  warning: { label: "Warning", variant: "warning", dotColor: "bg-amber-500" },
  error: { label: "Error", variant: "destructive", dotColor: "bg-rose-500" },
  draft: { label: "Draft", variant: "outline", dotColor: "bg-slate-400" },
  inactive: { label: "Inactive", variant: "muted", dotColor: "bg-slate-400" },
  offline: { label: "Offline", variant: "muted", dotColor: "bg-slate-400" },
};

export function StatusBadge({
  status,
  label,
  showDot = true,
  pulse = false,
  className = "",
}: StatusBadgeProps) {
  const normalizedKey = status.toLowerCase() as EntityStatus;
  const config = STATUS_MAP[normalizedKey] || {
    label: status,
    variant: "secondary",
    dotColor: "bg-primary",
  };

  const displayLabel = label || config.label;

  return (
    <Badge
      variant={config.variant}
      className={cn("inline-flex items-center gap-1.5 font-medium", className)}
    >
      {showDot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                config.dotColor
              )}
            />
          )}
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", config.dotColor)} />
        </span>
      )}
      <span>{displayLabel}</span>
    </Badge>
  );
}

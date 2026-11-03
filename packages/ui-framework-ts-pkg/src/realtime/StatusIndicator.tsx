import * as React from "react";
import { cn } from "../lib/utils";

export type SystemStatus = "ok" | "warn" | "alarm" | "unknown" | "offline";

export interface StatusIndicatorProps {
  status: SystemStatus;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const STATUS_CONFIG: Record<
  SystemStatus,
  { label: string; color: string; ring: string }
> = {
  ok: { label: "Normal", color: "bg-emerald-500", ring: "ring-emerald-500/20" },
  warn: { label: "Warning", color: "bg-amber-500", ring: "ring-amber-500/20" },
  alarm: { label: "Alarm", color: "bg-rose-500", ring: "ring-rose-500/20" },
  unknown: { label: "Unknown", color: "bg-slate-400", ring: "ring-slate-400/20" },
  offline: { label: "Offline", color: "bg-zinc-600", ring: "ring-zinc-600/20" },
};

export function StatusIndicator({
  status,
  label,
  size = "md",
  className = "",
}: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.unknown;

  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3.5 w-3.5",
  }[size];

  return (
    <div className={cn("inline-flex items-center gap-2 text-xs select-none", className)}>
      <span
        className={cn(
          "rounded-full ring-4 transition-colors",
          sizeClasses,
          config.color,
          config.ring
        )}
      />
      <span className="font-medium text-foreground">{label || config.label}</span>
    </div>
  );
}

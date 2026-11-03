import * as React from "react";
import { cn } from "../lib/utils";

export interface LiveBadgeProps {
  label?: string;
  isLive?: boolean;
  className?: string;
}

export function LiveBadge({
  label = "LIVE",
  isLive = true,
  className = "",
}: LiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border select-none",
        isLive
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
          : "bg-muted text-muted-foreground border-border",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            isLive ? "bg-emerald-500" : "bg-muted-foreground"
          )}
        />
      </span>
      <span>{label}</span>
    </span>
  );
}

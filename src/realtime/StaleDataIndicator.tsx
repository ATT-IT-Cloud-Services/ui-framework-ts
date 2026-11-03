import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "../lib/utils";

export interface StaleDataIndicatorProps {
  lastUpdated?: string | Date;
  staleThresholdMs?: number; // threshold in milliseconds
  isStale?: boolean;
  className?: string;
}

export function StaleDataIndicator({
  lastUpdated,
  isStale = false,
  className = "",
}: StaleDataIndicatorProps) {
  if (!isStale) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-2xs font-medium border bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400 select-none",
        className
      )}
      title="Data stream has not received fresh updates recently"
    >
      <Clock className="h-3 w-3" />
      <span>Stale Data</span>
      {lastUpdated && (
        <span className="text-[10px] opacity-75">
          ({typeof lastUpdated === "object" ? lastUpdated.toLocaleTimeString() : String(lastUpdated)})
        </span>
      )}
    </div>
  );
}

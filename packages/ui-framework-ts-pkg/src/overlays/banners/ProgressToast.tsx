import * as React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ProgressToastProps {
  title: string;
  progress: number; // 0 to 100
  statusText?: string;
  completed?: boolean;
  className?: string;
}

export function ProgressToast({
  title,
  progress,
  statusText,
  completed = false,
  className = "",
}: ProgressToastProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-lg space-y-2 text-xs w-72 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground truncate">{title}</span>
        {completed ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
        ) : (
          <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />
        )}
      </div>

      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300",
            completed ? "bg-emerald-500" : "bg-primary"
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-2xs text-muted-foreground">
        <span>{statusText || (completed ? "Complete" : "Uploading...")}</span>
        <span className="font-mono font-medium">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

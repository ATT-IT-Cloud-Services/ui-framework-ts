import * as React from "react";
import { AlertOctagon, Check } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export interface AlarmBannerProps {
  source: string;
  message: string;
  timestamp?: string;
  onAcknowledge?: () => void;
  className?: string;
}

export function AlarmBanner({
  source,
  message,
  timestamp,
  onAcknowledge,
  className = "",
}: AlarmBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-2 bg-rose-600 text-white shadow-md text-xs select-none animate-in fade-in-50",
        className
      )}
    >
      <div className="flex items-center gap-2.5 truncate">
        <AlertOctagon className="h-4 w-4 shrink-0 animate-bounce" />
        <span className="font-bold uppercase tracking-wider text-[11px] bg-white/20 px-1.5 py-0.5 rounded">
          CRITICAL
        </span>
        <span className="font-semibold truncate">{source}:</span>
        <span className="truncate opacity-95">{message}</span>
        {timestamp && <span className="opacity-75 text-2xs hidden sm:inline">({timestamp})</span>}
      </div>

      {onAcknowledge && (
        <Button
          size="sm"
          onClick={onAcknowledge}
          className="h-6 text-2xs bg-white text-rose-700 hover:bg-white/90 font-semibold gap-1 shrink-0"
        >
          <Check className="h-3 w-3" />
          Acknowledge
        </Button>
      )}
    </div>
  );
}

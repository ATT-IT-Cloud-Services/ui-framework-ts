"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "../lib/utils";

export type TimeRangePreset = "live" | "15m" | "1h" | "6h" | "24h" | "custom";

export interface TimeRangePickerProps {
  value?: TimeRangePreset;
  onChange?: (range: TimeRangePreset) => void;
  className?: string;
}

export function TimeRangePicker({
  value = "live",
  onChange,
  className = "",
}: TimeRangePickerProps) {
  const [selected, setSelected] = React.useState<TimeRangePreset>(value);

  const handleSelect = (preset: TimeRangePreset) => {
    setSelected(preset);
    onChange?.(preset);
  };

  const presets: { id: TimeRangePreset; label: string }[] = [
    { id: "live", label: "Live (Streaming)" },
    { id: "15m", label: "Last 15m" },
    { id: "1h", label: "1 hour" },
    { id: "6h", label: "6 hours" },
    { id: "24h", label: "24 hours" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-input bg-background p-0.5 text-xs shadow-2xs select-none",
        className
      )}
    >
      <div className="flex items-center gap-1 px-2 text-muted-foreground border-e border-border/60">
        <Clock className="h-3 w-3" />
        <span className="text-2xs font-medium hidden sm:inline">Range</span>
      </div>

      <div className="flex items-center gap-0.5">
        {presets.map((p) => {
          const isSelected = selected === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelect(p.id)}
              className={cn(
                "rounded-sm px-2 py-1 text-2xs font-medium transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

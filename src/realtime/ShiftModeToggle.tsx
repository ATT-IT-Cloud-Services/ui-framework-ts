"use client";

import * as React from "react";
import { Sun, Moon, Contrast } from "lucide-react";
import { useLayoutSettings } from "../settings/provider";
import { cn } from "../lib/utils";

export type ShiftMode = "day" | "night" | "control-room";

export function ShiftModeToggle({ className = "" }: { className?: string }) {
  const { settings, updateSettings } = useLayoutSettings();

  const currentMode: ShiftMode =
    settings.contrast === "high" && settings.theme === "dark"
      ? "control-room"
      : settings.theme === "dark"
      ? "night"
      : "day";

  const handleSelect = (mode: ShiftMode) => {
    if (mode === "day") {
      updateSettings({ theme: "light", contrast: "normal" });
    } else if (mode === "night") {
      updateSettings({ theme: "dark", contrast: "normal" });
    } else if (mode === "control-room") {
      updateSettings({ theme: "dark", contrast: "high" });
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => handleSelect("day")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors",
          currentMode === "day"
            ? "bg-background text-foreground shadow-2xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Day</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect("night")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors",
          currentMode === "night"
            ? "bg-background text-foreground shadow-2xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Night</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect("control-room")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors",
          currentMode === "control-room"
            ? "bg-background text-primary shadow-2xs font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Contrast className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Control Room</span>
      </button>
    </div>
  );
}

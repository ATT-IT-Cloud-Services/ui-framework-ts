"use client";

import * as React from "react";
import { useDelayedLoading } from "./useDelayedLoading";
import { cn } from "../../lib/utils";

export interface LoadingBarProps {
  isLoading: boolean;
  showAfter?: number;
  minDuration?: number;
  position?: "top" | "inline";
  className?: string;
}

/**
 * Modernized enterprise-grade indeterminate progress bar.
 * Slides an energetic primary gradient bar horizontally across the top border.
 */
export function LoadingBar({
  isLoading,
  showAfter = 150,
  minDuration = 300,
  position = "top",
  className = "",
}: LoadingBarProps) {
  const visible = useDelayedLoading(isLoading, { showAfter, minDuration });

  if (!visible) return null;

  return (
    <div
      className={cn(
        "relative h-0.5 w-full overflow-hidden bg-primary/20 select-none z-header transition-opacity duration-150 animate-in fade-in-0",
        position === "top" ? "fixed top-0 inset-x-0" : "w-full",
        className
      )}
      role="progressbar"
      aria-label="Loading in progress"
    >
      <div className="absolute inset-y-0 w-1/3 bg-primary rounded-full animate-[fiori-progress_1.4s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
    </div>
  );
}

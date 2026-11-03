"use client";

import * as React from "react";
import { useDelayedLoading } from "./useDelayedLoading";
import { cn } from "../../lib/utils";

export interface LoadingSpinnerProps {
  isLoading?: boolean;
  showAfter?: number;
  minDuration?: number;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: "h-3.5 w-3.5 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-4",
};

export function LoadingSpinner({
  isLoading = true,
  showAfter = 150,
  minDuration = 300,
  size = "md",
  label,
  className = "",
}: LoadingSpinnerProps) {
  const visible = useDelayedLoading(isLoading, { showAfter, minDuration });

  if (!visible) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 select-none animate-in fade-in-0 duration-150",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "rounded-full border-muted-foreground/20 border-t-primary animate-spin",
          SIZE_MAP[size]
        )}
      />
      {label && <span className="text-xs text-muted-foreground font-medium">{label}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

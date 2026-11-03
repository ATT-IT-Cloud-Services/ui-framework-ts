"use client";

import * as React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useDelayedLoading } from "./useDelayedLoading";
import { cn } from "../../lib/utils";

export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  showAfter?: number;
  minDuration?: number;
  blur?: boolean;
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  message = "Loading...",
  showAfter = 200,
  minDuration = 350,
  blur = true,
  className = "",
}: LoadingOverlayProps) {
  const visible = useDelayedLoading(isLoading, { showAfter, minDuration });

  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-panel flex flex-col items-center justify-center gap-3 bg-background/60 select-none animate-in fade-in-0 duration-200",
        blur && "backdrop-blur-xs",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/80 bg-popover/90 shadow-md space-y-2">
        <LoadingSpinner size="lg" isLoading={true} showAfter={0} />
        {message && <p className="text-xs font-medium text-foreground">{message}</p>}
      </div>
    </div>
  );
}

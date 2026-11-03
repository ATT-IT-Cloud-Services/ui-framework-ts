"use client";

import * as React from "react";
import { useDelayedLoading, type DelayedLoadingOptions } from "./useDelayedLoading";
import { cn } from "../../lib/utils";

export interface DeferredProps extends DelayedLoadingOptions {
  isWaiting: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
  animate?: boolean;
  className?: string;
}

/**
 * Declarative component that delays showing the loading fallback until
 * the `showAfter` threshold has passed, avoiding flashes for fast responses.
 */
export function Deferred({
  isWaiting,
  fallback,
  children,
  showAfter = 200,
  minDuration = 350,
  animate = true,
  className = "",
}: DeferredProps) {
  const showLoading = useDelayedLoading(isWaiting, { showAfter, minDuration });

  if (showLoading) {
    return (
      <div
        className={cn(
          animate && "animate-in fade-in-0 duration-200",
          className
        )}
      >
        {fallback}
      </div>
    );
  }

  // If not waiting or before showAfter threshold
  if (isWaiting) {
    // Hidden or placeholder to avoid content jump
    return null;
  }

  return (
    <div className={cn(animate && "animate-in fade-in-0 duration-200", className)}>
      {children}
    </div>
  );
}

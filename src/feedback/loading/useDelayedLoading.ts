"use client";

import * as React from "react";

export interface DelayedLoadingOptions {
  /**
   * Delay in milliseconds before showing the loading state.
   * If the async operation finishes before this threshold, the loading state
   * is never displayed, completely eliminating visual flicker for fast network requests.
   * @default 200
   */
  showAfter?: number;

  /**
   * Minimum duration in milliseconds the loading state must remain visible once shown.
   * Prevents jarring micro-flashes where a skeleton appears and disappears instantly.
   * @default 350
   */
  minDuration?: number;
}

/**
   Hook implementing the `showAfter` delayed loading pattern.
 * Solves the UI flashing problem for fast network requests while ensuring
 * smooth, non-jarring transitions for longer tasks.
 */
export function useDelayedLoading(
  isLoading: boolean,
  options: DelayedLoadingOptions = {}
): boolean {
  const { showAfter = 200, minDuration = 350 } = options;

  const [shouldShow, setShouldShow] = React.useState(false);
  const shownAtRef = React.useRef<number | null>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Clean up any pending hide timers on state transitions
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (isLoading) {
      // If delay is 0, show immediately
      if (showAfter <= 0) {
        shownAtRef.current = Date.now();
        setShouldShow(true);
        return;
      }

      // Schedule showing loading indicator only after `showAfter` threshold
      timerRef.current = setTimeout(() => {
        shownAtRef.current = Date.now();
        setShouldShow(true);
      }, showAfter);
    } else {
      // Async operation finished
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (shownAtRef.current !== null) {
        const elapsed = Date.now() - shownAtRef.current;
        const remainingMinDuration = minDuration - elapsed;

        if (remainingMinDuration > 0) {
          // Keep showing until minDuration has elapsed to avoid visual jitter
          hideTimerRef.current = setTimeout(() => {
            shownAtRef.current = null;
            setShouldShow(false);
          }, remainingMinDuration);
        } else {
          shownAtRef.current = null;
          setShouldShow(false);
        }
      } else {
        setShouldShow(false);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isLoading, showAfter, minDuration]);

  return shouldShow;
}

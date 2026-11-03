"use client";

import * as React from "react";
import { AlertTriangle, Check } from "lucide-react";
import { cn } from "../lib/utils";

export interface ConfirmHoldProps {
  label: string;
  onConfirm: () => void;
  holdDurationMs?: number; // default 1500ms
  variant?: "destructive" | "warning" | "default";
  size?: "default" | "large";
  className?: string;
}

export function ConfirmHold({
  label,
  onConfirm,
  holdDurationMs = 1500,
  variant = "destructive",
  size = "default",
  className = "",
}: ConfirmHoldProps) {
  const [holding, setHolding] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [confirmed, setConfirmed] = React.useState(false);
  const startTimeRef = React.useRef<number | null>(null);
  const animFrameRef = React.useRef<number | null>(null);

  const startHold = () => {
    if (confirmed) return;
    setHolding(true);
    startTimeRef.current = Date.now();

    const update = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / holdDurationMs) * 100);
      setProgress(pct);

      if (elapsed >= holdDurationMs) {
        setConfirmed(true);
        setHolding(false);
        onConfirm();
      } else {
        animFrameRef.current = requestAnimationFrame(update);
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  };

  const endHold = () => {
    if (confirmed) return;
    setHolding(false);
    setProgress(0);
    startTimeRef.current = null;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
  };

  const sizeClass = size === "large" ? "min-h-[56px] px-6 text-sm" : "h-10 px-4 text-xs";

  const colorClasses = {
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    warning: "bg-amber-600 text-white hover:bg-amber-700",
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
  }[variant];

  return (
    <button
      type="button"
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      className={cn(
        "relative overflow-hidden rounded-md font-semibold select-none shadow-2xs transition-all active:scale-98 flex items-center justify-center gap-2",
        sizeClass,
        colorClasses,
        className
      )}
    >
      {/* Progress fill bar */}
      <span
        className="absolute inset-y-0 start-0 bg-black/25 dark:bg-white/20 transition-all pointer-events-none"
        style={{ width: `${progress}%` }}
      />

      <span className="relative z-10 flex items-center gap-1.5">
        {confirmed ? (
          <>
            <Check className="h-4 w-4" />
            <span>Executed</span>
          </>
        ) : holding ? (
          <>
            <AlertTriangle className="h-4 w-4 animate-pulse" />
            <span>Hold to confirm ({Math.round((holdDurationMs * (100 - progress)) / 1000)}s)...</span>
          </>
        ) : (
          <span>{label}</span>
        )}
      </span>
    </button>
  );
}

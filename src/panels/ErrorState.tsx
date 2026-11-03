"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Failed to load data",
  description = "An error occurred while fetching information. Please try again.",
  error,
  onRetry,
  className = "",
}: ErrorStateProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-lg border border-destructive/30 bg-destructive/5 space-y-3",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {error?.message || description}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="text-xs gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </Button>
        )}

        {error?.stack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails((p) => !p)}
            className="text-2xs text-muted-foreground"
          >
            {showDetails ? "Hide details" : "Show technical details"}
          </Button>
        )}
      </div>

      {showDetails && error?.stack && (
        <pre className="mt-4 p-3 rounded bg-muted text-[11px] font-mono text-start overflow-x-auto max-w-lg w-full text-muted-foreground">
          {error.stack}
        </pre>
      )}
    </div>
  );
}

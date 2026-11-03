import * as React from "react";
import { cn } from "../lib/utils";

export interface CenteredLayoutProps {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function CenteredLayout({
  children,
  headerSlot,
  footerSlot,
  maxWidth = "md",
  className = "",
}: CenteredLayoutProps) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[maxWidth];

  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-muted/30 select-none",
        className
      )}
    >
      {headerSlot && <div className="mb-4">{headerSlot}</div>}

      <div
        className={cn(
          "w-full rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4",
          maxWidthClass
        )}
      >
        {children}
      </div>

      {footerSlot && <div className="mt-4 text-center">{footerSlot}</div>}
    </div>
  );
}

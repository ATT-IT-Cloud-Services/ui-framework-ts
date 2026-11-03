import * as React from "react";
import { cn } from "../lib/utils";

export type FooterVariant = "default" | "minimal" | "status" | "dense";

export interface AppFooterProps {
  variant?: FooterVariant;
  sticky?: boolean;
  leftSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  border?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AppFooter({
  variant = "default",
  sticky = false,
  leftSlot,
  centerSlot,
  rightSlot,
  border = true,
  className = "",
  children,
}: AppFooterProps) {
  const heightClass = {
    default: "h-10 text-xs px-4 sm:px-6",
    minimal: "h-8 text-2xs px-4",
    status: "h-9 text-2xs px-4 sm:px-6 font-mono",
    dense: "h-7 text-[11px] px-3 font-mono",
  }[variant];

  return (
    <footer
      className={cn(
        "flex w-full items-center justify-between bg-background/95 backdrop-blur-md text-muted-foreground select-none transition-colors shrink-0",
        heightClass,
        border && "border-t border-border/80",
        sticky && "sticky bottom-0 z-header",
        className
      )}
    >
      <div className="flex items-center gap-3 truncate">
        {leftSlot || (
          <span className="truncate">
            © {new Date().getFullYear()} Enterprise Platform. All rights reserved.
          </span>
        )}
      </div>

      {centerSlot && <div className="hidden md:flex items-center gap-2">{centerSlot}</div>}

      <div className="flex items-center gap-3 shrink-0 ms-auto">
        {rightSlot || (
          <div className="flex items-center gap-2 text-2xs">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>Operational</span>
            <span className="text-muted-foreground/60">•</span>
            <span>v1.0.0</span>
          </div>
        )}
      </div>

      {children}
    </footer>
  );
}

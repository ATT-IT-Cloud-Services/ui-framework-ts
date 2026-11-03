import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

export interface FocusLayoutProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  closeHref?: string;
  onClose?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function FocusLayout({
  title,
  subtitle,
  closeHref,
  onClose,
  children,
  footer,
  className = "",
}: FocusLayoutProps) {
  return (
    <div className={cn("fixed inset-0 z-dialog flex flex-col bg-background text-foreground select-none overflow-hidden", className)}>
      {/* Minimal Top Header with Close Button */}
      <header className="flex h-12 items-center justify-between border-b border-border px-4 sm:px-6 bg-background">
        <div className="space-y-0.5">
          {title && <h2 className="text-xs font-semibold text-foreground">{title}</h2>}
          {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
        </div>

        {closeHref ? (
          <Link
            href={closeHref}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Exit focus mode"
            aria-label="Exit focus mode"
          >
            <X className="h-4 w-4" />
          </Link>
        ) : onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Exit focus mode"
            aria-label="Exit focus mode"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </header>

      {/* Distraction-free Content Body */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full">
        {children}
      </main>

      {/* Optional Sticky Footer */}
      {footer && (
        <footer className="border-t border-border px-4 py-3 bg-muted/20">
          <div className="max-w-4xl mx-auto flex items-center justify-end gap-2">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}

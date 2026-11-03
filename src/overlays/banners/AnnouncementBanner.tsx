"use client";

import * as React from "react";
import { Info, AlertTriangle, Sparkles, Wrench, X } from "lucide-react";
import { cn } from "../../lib/utils";

export type AnnouncementVariant = "info" | "warning" | "promo" | "maintenance";

export interface AnnouncementBannerProps {
  id?: string; // used for dismissal persistence in localStorage
  title?: string;
  message: React.ReactNode;
  variant?: AnnouncementVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<
  AnnouncementVariant,
  { bg: string; border: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  info: {
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-sky-200 dark:border-sky-900/60",
    text: "text-sky-900 dark:text-sky-200",
    icon: Info,
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-900/60",
    text: "text-amber-900 dark:text-amber-200",
    icon: AlertTriangle,
  },
  promo: {
    bg: "bg-primary/5 dark:bg-primary/10",
    border: "border-primary/20",
    text: "text-foreground",
    icon: Sparkles,
  },
  maintenance: {
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-900/60",
    text: "text-orange-900 dark:text-orange-200",
    icon: Wrench,
  },
};

export function AnnouncementBanner({
  id,
  title,
  message,
  variant = "info",
  action,
  dismissible = true,
  className = "",
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      try {
        if (localStorage.getItem(`fw-banner-${id}`) === "dismissed") {
          setDismissed(true);
        }
      } catch {
        // ignore
      }
    }
  }, [id]);

  if (dismissed) return null;

  const style = VARIANT_STYLES[variant];
  const Icon = style.icon;

  const handleDismiss = () => {
    setDismissed(true);
    if (id) {
      try {
        localStorage.setItem(`fw-banner-${id}`, "dismissed");
      } catch {
        // ignore
      }
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-3 px-4 py-2 text-xs border-b transition-colors select-none",
        style.bg,
        style.border,
        style.text,
        className
      )}
    >
      <div className="flex items-center gap-2.5 flex-1 truncate">
        <Icon className="h-4 w-4 shrink-0 opacity-80" />
        <div className="flex items-center gap-2 truncate">
          {title && <span className="font-semibold">{title}:</span>}
          <span className="truncate">{message}</span>
        </div>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="text-xs font-semibold underline underline-offset-2 hover:opacity-80 ms-2 shrink-0"
          >
            {action.label}
          </button>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

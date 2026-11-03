"use client";

import * as React from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, Sparkles, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export type InfoCardVariant = "info" | "success" | "warning" | "error" | "promo";

export interface InfoCardProps {
  title: string;
  description?: React.ReactNode;
  variant?: InfoCardVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  learnMoreHref?: string;
  onLearnMore?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const VARIANT_CONFIG: Record<
  InfoCardVariant,
  { icon: React.ComponentType<{ className?: string }>; border: string; bg: string; text: string; iconColor: string }
> = {
  info: {
    icon: Info,
    border: "border-sky-200 dark:border-sky-900/60",
    bg: "bg-sky-50/70 dark:bg-sky-950/30",
    text: "text-sky-900 dark:text-sky-200",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  success: {
    icon: CheckCircle2,
    border: "border-emerald-200 dark:border-emerald-900/60",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/30",
    text: "text-emerald-900 dark:text-emerald-200",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-200 dark:border-amber-900/60",
    bg: "bg-amber-50/70 dark:bg-amber-950/30",
    text: "text-amber-900 dark:text-amber-200",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  error: {
    icon: XCircle,
    border: "border-rose-200 dark:border-rose-900/60",
    bg: "bg-rose-50/70 dark:bg-rose-950/30",
    text: "text-rose-900 dark:text-rose-200",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  promo: {
    icon: Sparkles,
    border: "border-primary/30",
    bg: "bg-primary/5 dark:bg-primary/10",
    text: "text-foreground",
    iconColor: "text-primary",
  },
};

export function InfoCard({
  title,
  description,
  variant = "info",
  dismissible = false,
  onDismiss,
  learnMoreHref,
  onLearnMore,
  action,
  className = "",
}: InfoCardProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-lg border p-3.5 text-xs shadow-2xs transition-colors",
        config.border,
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", config.iconColor)} />

      <div className="flex-1 space-y-1">
        <h4 className="font-semibold text-foreground text-xs">{title}</h4>
        {description && <div className="text-2xs opacity-90 leading-relaxed">{description}</div>}

        {(learnMoreHref || onLearnMore || action) && (
          <div className="flex items-center gap-3 pt-1.5">
            {action && (
              <Button
                variant="default"
                size="sm"
                onClick={action.onClick}
                className="h-6 text-2xs px-2.5 font-semibold"
              >
                {action.label}
              </Button>
            )}
            {learnMoreHref ? (
              <a
                href={learnMoreHref}
                className="text-2xs font-medium underline underline-offset-2 hover:opacity-80"
              >
                Learn more
              </a>
            ) : onLearnMore ? (
              <button
                type="button"
                onClick={onLearnMore}
                className="text-2xs font-medium underline underline-offset-2 hover:opacity-80"
              >
                Learn more
              </button>
            ) : null}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground transition-opacity opacity-70 hover:opacity-100 p-0.5"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

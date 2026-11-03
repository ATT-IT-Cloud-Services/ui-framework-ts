import * as React from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export type AlertType = "info" | "success" | "warning" | "error";

export interface InlineAlertProps {
  title?: string;
  children: React.ReactNode;
  type?: AlertType;
  className?: string;
}

const ALERT_CONFIG: Record<
  AlertType,
  { icon: React.ComponentType<{ className?: string }>; border: string; bg: string; text: string; iconColor: string }
> = {
  info: {
    icon: Info,
    border: "border-sky-200 dark:border-sky-900/60",
    bg: "bg-sky-50/60 dark:bg-sky-950/20",
    text: "text-sky-900 dark:text-sky-200",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  success: {
    icon: CheckCircle2,
    border: "border-emerald-200 dark:border-emerald-900/60",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    text: "text-emerald-900 dark:text-emerald-200",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-200 dark:border-amber-900/60",
    bg: "bg-amber-50/60 dark:bg-amber-950/20",
    text: "text-amber-900 dark:text-amber-200",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  error: {
    icon: AlertCircle,
    border: "border-rose-200 dark:border-rose-900/60",
    bg: "bg-rose-50/60 dark:bg-rose-950/20",
    text: "text-rose-900 dark:text-rose-200",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
};

export function InlineAlert({
  title,
  children,
  type = "info",
  className = "",
}: InlineAlertProps) {
  const config = ALERT_CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-md border p-3 text-xs leading-normal select-none",
        config.border,
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", config.iconColor)} />
      <div className="space-y-0.5 flex-1">
        {title && <span className="font-semibold block">{title}</span>}
        <div className="text-2xs opacity-90">{children}</div>
      </div>
    </div>
  );
}

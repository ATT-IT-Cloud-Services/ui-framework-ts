import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "../lib/utils";

export interface StatTrend {
  value: string | number;
  direction: "up" | "down" | "neutral";
  label?: string;
}

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  trend?: StatTrend;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  children?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  className = "",
  children,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 text-card-foreground shadow-2xs space-y-2 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
          {title}
        </span>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
          {value}
        </div>

        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-2xs font-semibold px-1.5 py-0.5 rounded",
              trend.direction === "up" && "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/50",
              trend.direction === "down" && "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/50",
              trend.direction === "neutral" && "text-muted-foreground bg-muted"
            )}
          >
            {trend.direction === "up" && <TrendingUp className="h-3 w-3" />}
            {trend.direction === "down" && <TrendingDown className="h-3 w-3" />}
            {trend.direction === "neutral" && <Minus className="h-3 w-3" />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      {(subtitle || trend?.label) && (
        <p className="text-2xs text-muted-foreground truncate">
          {subtitle || trend?.label}
        </p>
      )}

      {children}
    </div>
  );
}

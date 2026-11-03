import * as React from "react";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { cn } from "../lib/utils";

export type DataQuality = "good" | "uncertain" | "bad";

export interface LiveValueProps {
  label?: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  quality?: DataQuality;
  precision?: number;
  className?: string;
}

export function LiveValue({
  label,
  value,
  unit,
  trend,
  quality = "good",
  precision,
  className = "",
}: LiveValueProps) {
  const formattedValue =
    typeof value === "number" && precision !== undefined
      ? value.toFixed(precision)
      : value;

  return (
    <div className={cn("inline-flex flex-col space-y-0.5 select-none", className)}>
      {label && <span className="text-2xs font-medium text-muted-foreground">{label}</span>}

      <div className="flex items-baseline gap-1.5 font-mono">
        <span
          className={cn(
            "text-lg sm:text-xl font-bold tracking-tight text-foreground",
            quality === "uncertain" && "text-amber-600 dark:text-amber-400",
            quality === "bad" && "text-rose-600 dark:text-rose-400 line-through opacity-70"
          )}
        >
          {formattedValue}
        </span>

        {unit && <span className="text-xs text-muted-foreground font-sans font-medium">{unit}</span>}

        {trend && (
          <span className="ms-1">
            {trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-emerald-600 inline" />}
            {trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-rose-600 inline" />}
            {trend === "stable" && <Minus className="h-3.5 w-3.5 text-muted-foreground inline" />}
          </span>
        )}

        {quality !== "good" && (
          <span
            className="ms-1 text-2xs text-amber-600 dark:text-amber-400"
            title={`Data quality: ${quality}`}
          >
            <AlertTriangle className="h-3.5 w-3.5 inline" />
          </span>
        )}
      </div>
    </div>
  );
}

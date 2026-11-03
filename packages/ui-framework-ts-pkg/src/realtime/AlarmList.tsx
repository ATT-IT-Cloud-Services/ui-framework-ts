"use client";

import * as React from "react";
import { AlertCircle, AlertTriangle, Info, BellOff, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export type AlarmSeverity = "critical" | "high" | "medium" | "low";

export interface AlarmItem {
  id: string;
  source: string;
  message: string;
  severity: AlarmSeverity;
  timestamp: string;
  acknowledged: boolean;
  shelved?: boolean;
}

export interface AlarmListProps {
  alarms: AlarmItem[];
  onAcknowledge?: (id: string) => void;
  onShelve?: (id: string) => void;
  className?: string;
}

const SEVERITY_CONFIG: Record<
  AlarmSeverity,
  { label: string; badgeVariant: "destructive" | "warning" | "info" | "secondary"; icon: React.ComponentType<{ className?: string }> }
> = {
  critical: { label: "CRITICAL", badgeVariant: "destructive", icon: AlertCircle },
  high: { label: "HIGH", badgeVariant: "destructive", icon: AlertTriangle },
  medium: { label: "MEDIUM", badgeVariant: "warning", icon: AlertTriangle },
  low: { label: "LOW", badgeVariant: "info", icon: Info },
};

export function AlarmList({
  alarms,
  onAcknowledge,
  onShelve,
  className = "",
}: AlarmListProps) {
  const [filterSeverity, setFilterSeverity] = React.useState<AlarmSeverity | "all">("all");

  const filteredAlarms = alarms.filter((alarm) => {
    if (filterSeverity !== "all" && alarm.severity !== filterSeverity) return false;
    return true;
  });

  return (
    <div className={cn("space-y-3", className)}>
      {/* Severity Filter Pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => setFilterSeverity("all")}
          className={cn(
            "px-2.5 py-1 text-2xs font-semibold rounded transition-colors",
            filterSeverity === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          All ({alarms.length})
        </button>
        {(["critical", "high", "medium", "low"] as AlarmSeverity[]).map((sev) => {
          const count = alarms.filter((a) => a.severity === sev).length;
          const isSelected = filterSeverity === sev;
          return (
            <button
              key={sev}
              type="button"
              onClick={() => setFilterSeverity(sev)}
              className={cn(
                "px-2.5 py-1 text-2xs font-semibold uppercase rounded transition-colors",
                isSelected
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {sev} ({count})
            </button>
          );
        })}
      </div>

      {/* Alarm rows list */}
      <div className="space-y-1.5">
        {filteredAlarms.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No active alarms in this category.
          </div>
        ) : (
          filteredAlarms.map((alarm) => {
            const config = SEVERITY_CONFIG[alarm.severity];
            const Icon = config.icon;

            return (
              <div
                key={alarm.id}
                className={cn(
                  "flex items-center justify-between gap-3 p-3 rounded-lg border text-xs transition-colors",
                  alarm.severity === "critical"
                    ? "border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <Badge variant={config.badgeVariant} size="sm" className="font-bold shrink-0">
                    <Icon className="h-3 w-3 me-1" />
                    {config.label}
                  </Badge>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-foreground truncate">{alarm.source}</span>
                    <span className="text-2xs text-muted-foreground truncate">{alarm.message}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-2xs text-muted-foreground hidden sm:inline">{alarm.timestamp}</span>

                  {!alarm.acknowledged && onAcknowledge && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAcknowledge(alarm.id)}
                      className="h-7 text-2xs gap-1"
                    >
                      <Check className="h-3 w-3" />
                      Ack
                    </Button>
                  )}

                  {!alarm.shelved && onShelve && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onShelve(alarm.id)}
                      className="h-7 text-2xs gap-1 text-muted-foreground"
                    >
                      <BellOff className="h-3 w-3" />
                      Shelve
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

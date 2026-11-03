import * as React from "react";
import { cn } from "../lib/utils";

export interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  tabs,
  className = "",
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("border-b border-border/80 bg-background/50 pb-3 pt-1 space-y-3", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Title and Subtitle */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Action button group */}
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>

      {/* Tabs or sub-nav slot */}
      {tabs && <div className="pt-1">{tabs}</div>}

      {children}
    </div>
  );
}

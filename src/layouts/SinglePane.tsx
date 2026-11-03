import * as React from "react";
import { cn } from "../lib/utils";

export interface SinglePaneProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function SinglePane({
  header,
  children,
  footer,
  className = "",
}: SinglePaneProps) {
  return (
    <div className={cn("flex flex-col min-h-full space-y-4", className)}>
      {header && <div>{header}</div>}
      <div className="flex-1">{children}</div>
      {footer && <div className="pt-4 border-t border-border/60">{footer}</div>}
    </div>
  );
}

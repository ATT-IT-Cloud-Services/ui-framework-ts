"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export interface InlineConfirmProps {
  label: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function InlineConfirm({
  label,
  onConfirm,
  confirmLabel = "Yes",
  cancelLabel = "No",
  variant = "destructive",
  size = "sm",
  className = "",
  icon: Icon,
}: InlineConfirmProps) {
  const [isAsking, setIsAsking] = React.useState(false);

  if (isAsking) {
    return (
      <div className={cn("inline-flex items-center gap-1.5 animate-in fade-in-50", className)}>
        <span className="text-2xs font-medium text-muted-foreground select-none">
          Are you sure?
        </span>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setIsAsking(false);
            onConfirm();
          }}
          className="h-6 px-2 text-2xs gap-1 font-semibold"
        >
          <Check className="h-3 w-3" />
          {confirmLabel}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAsking(false)}
          className="h-6 px-2 text-2xs gap-1"
        >
          <X className="h-3 w-3" />
          {cancelLabel}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setIsAsking(true)}
      className={cn("text-xs", className)}
    >
      {Icon && <Icon className="me-1.5 h-3.5 w-3.5" />}
      {label}
    </Button>
  );
}

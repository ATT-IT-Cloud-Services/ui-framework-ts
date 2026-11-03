"use client";

import * as React from "react";
import { AlertCircle, MoreHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../lib/utils";

// 1. Sticky Footer Action Bar (for forms, editor pages)
export interface StickyActionBarProps {
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  onSaveAndClose?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  isSaving?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
  className?: string;
  extraActions?: React.ReactNode;
}

export function StickyActionBar({
  hasUnsavedChanges = false,
  onSave,
  onSaveAndClose,
  onCancel,
  onDelete,
  isSaving = false,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  className = "",
  extraActions,
}: StickyActionBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-actionbar flex items-center justify-between border-t border-border bg-background/95 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {hasUnsavedChanges && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium animate-in fade-in-50">
            <AlertCircle className="h-4 w-4" />
            <span>Unsaved changes</span>
          </div>
        )}
        {extraActions}
      </div>

      <div className="flex items-center gap-2">
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={isSaving}
            className="me-2 text-xs"
          >
            Delete
          </Button>
        )}
        {onCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isSaving}
            className="text-xs"
          >
            {cancelLabel}
          </Button>
        )}
        {onSaveAndClose && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onSaveAndClose}
            disabled={isSaving}
            className="text-xs"
          >
            Save & Close
          </Button>
        )}
        {onSave && (
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="text-xs font-semibold"
          >
            {isSaving ? "Saving..." : saveLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

// 2. Floating Bulk-Action Bar for multi-row table selection
export interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  actions: {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary";
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  onClearSelection,
  actions,
  className = "",
}: BulkActionBarProps) {
  if (selectedCount <= 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-actionbar flex items-center gap-3 rounded-xl border border-border bg-foreground text-background px-4 py-2 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-3",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xs font-bold">
          {selectedCount}
        </span>
        <span>Selected</span>
        <button
          type="button"
          onClick={onClearSelection}
          className="text-muted-foreground hover:text-background transition-colors ms-1"
          title="Deselect all"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="h-4 w-px bg-muted-foreground/30" />

      <div className="flex items-center gap-1.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              type="button"
              onClick={act.onClick}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 text-2xs font-medium rounded transition-colors",
                act.variant === "destructive"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-background/15 hover:bg-background/25 text-background"
              )}
            >
              {Icon && <Icon className="h-3 w-3" />}
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 3. Page Header Action Group with responsive overflow menu
export interface PageHeaderActionsProps {
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  };
  secondaryActions?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    destructive?: boolean;
  }[];
  className?: string;
}

export function PageHeaderActions({
  primaryAction,
  secondaryActions = [],
  className = "",
}: PageHeaderActionsProps) {
  const visibleSecondary = secondaryActions.slice(0, 2);
  const overflowActions = secondaryActions.slice(2);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {visibleSecondary.map((act) => (
        <Button
          key={act.label}
          variant="outline"
          size="sm"
          onClick={act.onClick}
          className="text-xs h-8"
        >
          {act.icon && <act.icon className="me-1.5 h-3.5 w-3.5" />}
          {act.label}
        </Button>
      ))}

      {overflowActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-sm" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {overflowActions.map((act) => (
              <DropdownMenuItem
                key={act.label}
                onClick={act.onClick}
                destructive={act.destructive}
                className="text-xs"
              >
                {act.icon && <act.icon className="me-2 h-3.5 w-3.5" />}
                {act.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {primaryAction && (
        <Button
          variant="default"
          size="sm"
          onClick={primaryAction.onClick}
          className="text-xs h-8 font-semibold shadow-2xs"
        >
          {primaryAction.icon && <primaryAction.icon className="me-1.5 h-3.5 w-3.5" />}
          {primaryAction.label}
        </Button>
      )}
    </div>
  );
}

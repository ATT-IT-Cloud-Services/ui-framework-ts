"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export interface UnsavedChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void | Promise<void>;
  onDiscard: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

export function UnsavedChangesDialog({
  open,
  onOpenChange,
  onSave,
  onDiscard,
  onCancel,
  isSaving = false,
}: UnsavedChangesDialogProps) {
  const handleCancel = () => {
    onOpenChange(false);
    onCancel?.();
  };

  const handleDiscard = () => {
    onOpenChange(false);
    onDiscard();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600 pb-1">
            <AlertCircle className="h-5 w-5" />
            <DialogTitle className="text-sm font-semibold text-foreground">
              Unsaved Changes
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground pt-1 leading-relaxed">
            You have unsaved changes that will be lost if you leave without saving. How would you like to proceed?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-1.5 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={isSaving}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDiscard}
            disabled={isSaving}
            className="text-xs"
          >
            Discard Changes
          </Button>
          {onSave && (
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="text-xs font-semibold"
            >
              {isSaving ? "Saving..." : "Save & Continue"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

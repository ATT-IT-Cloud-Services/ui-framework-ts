"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface DestructiveConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  requiredConfirmationText?: string; // if provided, user must type this exact string
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function DestructiveConfirmDialog({
  open,
  onOpenChange,
  title = "Delete resource",
  description = "This action is permanent and cannot be reversed.",
  requiredConfirmationText,
  onConfirm,
  confirmText = "Delete Permanently",
  cancelText = "Cancel",
  isLoading = false,
}: DestructiveConfirmDialogProps) {
  const [typedText, setTypedText] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setTypedText("");
    }
  }, [open]);

  const isConfirmed = !requiredConfirmationText || typedText.trim() === requiredConfirmationText;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive pb-1">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle className="text-sm font-semibold text-foreground">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground pt-1 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        {requiredConfirmationText && (
          <div className="space-y-2 py-2">
            <label className="text-2xs text-muted-foreground block">
              Please type <strong className="text-foreground">{requiredConfirmationText}</strong> to confirm:
            </label>
            <Input
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder={requiredConfirmationText}
              className="text-xs font-mono"
              autoFocus
            />
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="text-xs"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={!isConfirmed || isLoading}
            className="text-xs font-semibold"
          >
            {isLoading ? "Deleting..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

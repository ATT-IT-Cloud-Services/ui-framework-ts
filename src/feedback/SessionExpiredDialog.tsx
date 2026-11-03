"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export interface SessionExpiredDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onAction?: () => void;
  actionLabel?: string;
  title?: string;
  description?: string;
}

export function SessionExpiredDialog({
  open,
  onOpenChange,
  onAction,
  actionLabel = "Sign in again",
  title = "Session Expired",
  description = "Your session has expired due to inactivity. Please sign in again to continue your work without losing state.",
}: SessionExpiredDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary pb-1">
            <Lock className="h-5 w-5" />
            <DialogTitle className="text-sm font-semibold text-foreground">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground pt-1 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-3">
          <Button
            size="sm"
            onClick={onAction || (() => window.location.reload())}
            className="w-full text-xs font-semibold"
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

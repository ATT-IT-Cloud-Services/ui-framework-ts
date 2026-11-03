"use client";

import * as React from "react";
import { Check, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  isValid?: boolean;
}

export interface WizardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  steps: WizardStep[];
  currentStepIndex: number;
  onStepChange: (newIndex: number) => void;
  onFinish: () => void | Promise<void>;
  finishLabel?: string;
  isSubmitting?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export function WizardDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  steps,
  currentStepIndex,
  onStepChange,
  onFinish,
  finishLabel = "Complete",
  isSubmitting = false,
  size = "lg",
  children,
}: WizardDialogProps) {
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;
  const currentStep = steps[currentStepIndex];

  const canProceed = currentStep?.isValid !== false;

  const handleNext = () => {
    if (!isLast && canProceed) {
      onStepChange(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      onStepChange(currentStepIndex - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size={size} className="p-0 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="p-5 pb-3 border-b border-border bg-muted/20 text-start">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <DialogTitle className="text-sm font-semibold">{title}</DialogTitle>
          </div>
          {subtitle && (
            <DialogDescription className="text-2xs text-muted-foreground pt-0.5">
              {subtitle}
            </DialogDescription>
          )}

          {/* Stepper Indicator */}
          <div className="grid grid-cols-3 gap-2 pt-3">
            {steps.map((s, idx) => {
              const isPassed = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={s.id}
                  onClick={() => isPassed && onStepChange(idx)}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-md border text-xs transition-colors",
                    isCurrent
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : isPassed
                      ? "border-border/80 bg-background text-foreground hover:bg-muted cursor-pointer"
                      : "border-transparent text-muted-foreground/60 opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-2xs font-bold",
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isPassed
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isPassed ? <Check className="h-3 w-3" /> : idx + 1}
                  </span>
                  <div className="truncate hidden sm:block">
                    <span className="block truncate text-2xs leading-tight">{s.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogHeader>

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleBack}
                disabled={isSubmitting}
                className="text-xs gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Back
              </Button>
            )}

            {isLast ? (
              <Button
                type="button"
                size="sm"
                onClick={onFinish}
                disabled={!canProceed || isSubmitting}
                className="text-xs font-semibold gap-1 bg-primary text-primary-foreground"
              >
                {isSubmitting ? "Submitting..." : finishLabel}
                <Check className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={handleNext}
                disabled={!canProceed}
                className="text-xs font-semibold gap-1"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as React from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "../../ui/button";

export interface TourStep {
  targetSelector?: string;
  title: string;
  content: string;
}

export interface TourProps {
  steps: TourStep[];
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export function Tour({
  steps,
  open,
  onClose,
  onComplete,
}: TourProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  if (!open || steps.length === 0) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete?.();
      onClose();
    } else {
      setCurrentStep((p) => p + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((p) => p - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-popover flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in-50">
      <div className="w-full max-w-sm rounded-xl border border-border bg-popover p-5 text-popover-foreground shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="text-2xs font-semibold uppercase tracking-wider text-primary">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Skip tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{step.content}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-2xs text-muted-foreground h-7"
          >
            Skip Tour
          </Button>

          <div className="flex items-center gap-1.5">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="h-7 text-xs px-2"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleNext}
              className="h-7 text-xs font-semibold px-3 gap-1"
            >
              <span>{isLast ? "Finish" : "Next"}</span>
              {!isLast && <ChevronRight className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

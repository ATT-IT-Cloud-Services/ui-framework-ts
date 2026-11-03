"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../ui/sheet";
import { Button } from "../ui/button";

export interface SideSheetFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  side?: "start" | "end";
}

export function SideSheetForm({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Save changes",
  cancelLabel = "Cancel",
  isSubmitting = false,
  side = "end",
}: SideSheetFormProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 768);
    }
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
  };

  const resolvedSide = isMobile ? "bottom" : side;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={resolvedSide}
        className={isMobile ? "h-[85vh] p-4 flex flex-col" : "w-full sm:max-w-md p-5 flex flex-col"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-4">
          <SheetHeader className="pb-2 border-b border-border">
            <SheetTitle className="text-sm font-semibold">{title}</SheetTitle>
            {description && (
              <SheetDescription className="text-xs text-muted-foreground pt-0.5">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-2 space-y-3">{children}</div>

          <SheetFooter className="pt-3 border-t border-border mt-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="text-xs"
            >
              {cancelLabel}
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="text-xs font-semibold"
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

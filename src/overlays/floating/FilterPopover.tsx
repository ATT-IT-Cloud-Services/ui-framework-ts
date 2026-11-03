"use client";

import * as React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";

export interface FilterPopoverProps {
  children: React.ReactNode;
  onApply?: () => void;
  onReset?: () => void;
  activeFilterCount?: number;
  title?: string;
  className?: string;
}

export function FilterPopover({
  children,
  onApply,
  onReset,
  activeFilterCount = 0,
  title = "Filters",
  className = "",
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 text-xs gap-1.5 ${className}`}
        >
          <Filter className="h-3.5 w-3.5" />
          <span>{title}</span>
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-3 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <span className="text-xs font-semibold text-foreground">{title}</span>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-2xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>

        <div className="space-y-3 text-xs">{children}</div>

        {onApply && (
          <div className="pt-2 border-t border-border flex justify-end">
            <Button
              size="sm"
              onClick={() => {
                onApply();
                setOpen(false);
              }}
              className="h-7 text-xs font-semibold"
            >
              Apply Filters
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

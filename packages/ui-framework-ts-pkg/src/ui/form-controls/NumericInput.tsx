"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NumericInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  prefix?: string;
  disabled?: boolean;
  className?: string;
}

export function NumericInput({
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = 1,
  unit,
  prefix,
  disabled = false,
  className = "",
}: NumericInputProps) {
  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(Number((value + step).toFixed(2)));
    }
  };

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(Number((value - step).toFixed(2)));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      onChange(Math.min(max, Math.max(min, parsed)));
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-input bg-background shadow-2xs h-8 text-xs focus-within:ring-1 focus-within:ring-ring select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="flex h-full w-7 items-center justify-center border-e border-border text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 cursor-pointer transition-colors"
      >
        <Minus className="h-3 w-3" />
      </button>

      <div className="flex items-center px-2 flex-1">
        {prefix && <span className="text-muted-foreground me-1 text-2xs">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-full text-center font-mono font-medium bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {unit && <span className="text-muted-foreground ms-1 text-2xs">{unit}</span>}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="flex h-full w-7 items-center justify-center border-s border-border text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 cursor-pointer transition-colors"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

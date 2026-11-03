"use client";

import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SearchFilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  debounceMs?: number;
  className?: string;
}

export function SearchFilterInput({
  value,
  onChange,
  placeholder = "Filter items...",
  isLoading = false,
  className = "",
}: SearchFilterInputProps) {
  return (
    <div
      className={cn(
        "relative flex items-center w-full rounded-md border border-input bg-background shadow-2xs h-8 text-xs focus-within:ring-1 focus-within:ring-ring transition-colors",
        className
      )}
    >
      <Search className="h-3.5 w-3.5 text-muted-foreground ms-2.5 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-2 text-xs outline-none placeholder:text-muted-foreground"
      />
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 text-primary animate-spin me-2 shrink-0" />
      ) : value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="me-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          title="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

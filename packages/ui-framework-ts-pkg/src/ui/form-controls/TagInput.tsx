"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "../badge";
import { cn } from "../../lib/utils";

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  tags,
  onChange,
  maxTags = 10,
  placeholder = "Type and press enter...",
  className = "",
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim().replace(/^,+|,+$/g, "");
      if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
        onChange([...tags, trimmed]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 p-1.5 min-h-[36px] w-full rounded-md border border-input bg-background text-xs shadow-2xs focus-within:ring-1 focus-within:ring-ring",
        className
      )}
    >
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          size="sm"
          className="gap-1 ps-2 pe-1 py-0.5 text-2xs"
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-muted-foreground hover:text-foreground cursor-pointer rounded"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </Badge>
      ))}

      {tags.length < maxTags && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent px-1 text-xs outline-none min-w-[120px] placeholder:text-muted-foreground"
        />
      )}
    </div>
  );
}

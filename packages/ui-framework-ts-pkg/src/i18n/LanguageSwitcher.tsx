"use client";

import * as React from "react";
import { useI18n, LOCALES_METADATA } from "./provider";
import type { SupportedLocale } from "./types";
import { Globe } from "lucide-react";

export interface LanguageSwitcherProps {
  showFlag?: boolean;
  showName?: boolean;
  className?: string;
  variant?: "dropdown" | "buttons";
}

export function LanguageSwitcher({
  showFlag = true,
  showName = true,
  className = "",
  variant = "dropdown",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentMeta = LOCALES_METADATA[locale] || LOCALES_METADATA.en;

  if (variant === "buttons") {
    return (
      <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
        {(Object.keys(LOCALES_METADATA) as SupportedLocale[]).map((code) => {
          const item = LOCALES_METADATA[code];
          const isSelected = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {showFlag && <span>{item.flag}</span>}
              <span>{item.nativeName}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-start ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted/40 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {showFlag ? <span>{currentMeta.flag}</span> : <Globe className="h-3.5 w-3.5 text-muted-foreground" />}
        {showName && <span>{currentMeta.nativeName}</span>}
        <span className="text-2xs text-muted-foreground uppercase ms-1">({currentMeta.code})</span>
      </button>

      {isOpen && (
        <div className="absolute end-0 mt-1.5 w-44 rounded-md border border-border bg-popover text-popover-foreground shadow-md p-1 z-popover animate-in fade-in-50 zoom-in-95">
          {(Object.keys(LOCALES_METADATA) as SupportedLocale[]).map((code) => {
            const item = LOCALES_METADATA[code];
            const isSelected = code === locale;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setLocale(code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span>{item.nativeName}</span>
                </div>
                <span className="text-2xs text-muted-foreground uppercase">{item.direction}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

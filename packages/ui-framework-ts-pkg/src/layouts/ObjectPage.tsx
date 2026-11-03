"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface ObjectPageAttribute {
  label: string;
  value: React.ReactNode;
}

export interface ObjectPageSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface ObjectPageProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  status?: React.ReactNode;
  attributes?: ObjectPageAttribute[];
  headerActions?: React.ReactNode;
  sections: ObjectPageSection[];
  footerActionBar?: React.ReactNode;
  className?: string;
}

export function ObjectPage({
  title,
  subtitle,
  status,
  attributes = [],
  headerActions,
  sections,
  footerActionBar,
  className = "",
}: ObjectPageProps) {
  const [activeSectionId, setActiveSectionId] = React.useState<string>(
    sections[0]?.id || ""
  );

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={cn("relative flex flex-col min-h-full pb-16 space-y-4", className)}>
      {/* 1. Enterprise Object Page Header */}
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
              {status}
            </div>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>

          {headerActions && (
            <div className="flex items-center gap-2 flex-wrap">{headerActions}</div>
          )}
        </div>

        {/* Key Attributes Bar */}
        {attributes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-border/60 text-xs">
            {attributes.map((attr) => (
              <div key={attr.label} className="space-y-0.5">
                <span className="text-2xs text-muted-foreground block">{attr.label}</span>
                <span className="font-semibold text-foreground block">{attr.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Sticky Anchor Tabs */}
      <div className="sticky top-12 z-header flex items-center gap-1 border-b border-border bg-background/95 backdrop-blur-md px-1 py-1 text-xs">
        {sections.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollToSection(sec.id)}
            className={cn(
              "px-3 py-1.5 font-medium rounded-sm transition-colors",
              activeSectionId === sec.id
                ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* 3. Sections Content */}
      <div className="space-y-6 pt-2">
        {sections.map((sec) => (
          <section
            key={sec.id}
            id={sec.id}
            className="scroll-mt-24 rounded-lg border border-border bg-card p-4 shadow-2xs space-y-3"
          >
            <h2 className="text-sm font-semibold tracking-tight text-foreground pb-2 border-b border-border/50">
              {sec.title}
            </h2>
            <div>{sec.content}</div>
          </section>
        ))}
      </div>

      {/* 4. Sticky Footer Action Bar */}
      {footerActionBar && (
        <div className="fixed inset-x-0 bottom-0 z-actionbar flex items-center justify-end gap-2 border-t border-border bg-background/95 backdrop-blur-md px-6 py-2.5 shadow-lg">
          {footerActionBar}
        </div>
      )}
    </div>
  );
}

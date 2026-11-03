"use client";

import * as React from "react";
import Link from "next/link";
import { Info, FolderGit2, ArrowLeft, X } from "lucide-react";
import { Badge } from "@fw/ui";
import { useLayoutSettings } from "@fw/settings";

export interface VariantInfoBannerProps {
  title: string;
  description: string;
  folderPath: string;
}

export function VariantInfoBanner({
  title,
  description,
  folderPath,
}: VariantInfoBannerProps) {
  const [dismissed, setDismissed] = React.useState(false);
  const { settings } = useLayoutSettings();

  if (dismissed) {
    return (
      <div className="flex items-center justify-between px-4 py-1.5 bg-muted/40 border-b border-border text-2xs text-muted-foreground select-none">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-foreground font-medium transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Back to gallery</span>
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="hover:text-foreground underline text-2xs"
        >
          Show demo info ({title})
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 py-2 bg-primary/5 dark:bg-primary/10 border-b border-primary/20 text-xs select-none animate-in fade-in-50">
      <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5 sm:mt-0">
          <Info className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground text-xs">{title}</span>
            <Badge variant="outline" size="sm" className="text-[10px] uppercase font-mono">
              {settings.navigationMode}
            </Badge>
          </div>
          <span className="text-2xs text-muted-foreground truncate hidden md:inline">
            • {description}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono bg-background/80 px-1.5 py-0.5 rounded border border-border/60">
            <FolderGit2 className="h-3 w-3 text-primary" />
            <span>{folderPath}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-2xs text-primary font-semibold hover:underline"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Gallery</span>
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground p-0.5"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { cn } from "../lib/utils";

export interface FullSplitProps {
  navPane: React.ReactNode;
  submenuPane: React.ReactNode;
  contentPane: React.ReactNode;
  infoPane: React.ReactNode;
  className?: string;
}

export function FullSplit({
  navPane,
  submenuPane,
  contentPane,
  infoPane,
  className = "",
}: FullSplitProps) {
  return (
    <PanelGroup
      direction="horizontal"
      className={cn("h-full min-h-[600px] rounded-lg border border-border bg-card overflow-hidden", className)}
    >
      <Panel defaultSize={16} minSize={12} maxSize={25} className="border-e border-border/70 bg-sidebar">
        <div className="h-full overflow-y-auto p-2">{navPane}</div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-border/30 hover:bg-primary/40 active:bg-primary transition-colors cursor-col-resize flex items-center justify-center" />

      <Panel defaultSize={20} minSize={15} maxSize={35} className="border-e border-border/70 bg-muted/20">
        <div className="h-full overflow-y-auto p-3">{submenuPane}</div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-border/30 hover:bg-primary/40 active:bg-primary transition-colors cursor-col-resize flex items-center justify-center" />

      <Panel defaultSize={40} minSize={25} className="bg-background">
        <div className="h-full overflow-y-auto p-4">{contentPane}</div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-border/30 hover:bg-primary/40 active:bg-primary transition-colors cursor-col-resize flex items-center justify-center" />

      <Panel defaultSize={24} minSize={18} maxSize={40} className="border-s border-border/70 bg-background/50">
        <div className="h-full overflow-y-auto p-3">{infoPane}</div>
      </Panel>
    </PanelGroup>
  );
}

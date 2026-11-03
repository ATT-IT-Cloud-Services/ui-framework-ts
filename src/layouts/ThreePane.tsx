"use client";

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { cn } from "../lib/utils";

export interface ThreePaneProps {
  leftPane: React.ReactNode;
  centerPane: React.ReactNode;
  rightPane: React.ReactNode;
  defaultSizes?: [number, number, number]; // e.g. [20, 30, 50]
  className?: string;
}

export function ThreePane({
  leftPane,
  centerPane,
  rightPane,
  defaultSizes = [20, 32, 48],
  className = "",
}: ThreePaneProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 1024);
    }
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (isMobile) {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <div className="rounded-lg border border-border bg-card p-3">{leftPane}</div>
        <div className="rounded-lg border border-border bg-card p-3">{centerPane}</div>
        <div className="rounded-lg border border-border bg-card p-3">{rightPane}</div>
      </div>
    );
  }

  return (
    <PanelGroup
      direction="horizontal"
      className={cn("h-full min-h-[550px] rounded-lg border border-border bg-card overflow-hidden", className)}
    >
      <Panel
        defaultSize={defaultSizes[0]}
        minSize={15}
        maxSize={30}
        className="flex flex-col h-full border-e border-border/70 bg-muted/20 overflow-hidden"
      >
        <div className="h-full overflow-y-auto p-3">{leftPane}</div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-border/40 hover:bg-primary/40 active:bg-primary transition-colors cursor-col-resize flex items-center justify-center">
        <div className="h-8 w-0.5 rounded-full bg-border" />
      </PanelResizeHandle>

      <Panel
        defaultSize={defaultSizes[1]}
        minSize={20}
        maxSize={45}
        className="flex flex-col h-full border-e border-border/70 bg-background/50 overflow-hidden"
      >
        <div className="h-full overflow-y-auto p-3">{centerPane}</div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-border/40 hover:bg-primary/40 active:bg-primary transition-colors cursor-col-resize flex items-center justify-center">
        <div className="h-8 w-0.5 rounded-full bg-border" />
      </PanelResizeHandle>

      <Panel defaultSize={defaultSizes[2]} minSize={30} className="flex flex-col h-full bg-background overflow-hidden">
        <div className="h-full overflow-y-auto p-4">{rightPane}</div>
      </Panel>
    </PanelGroup>
  );
}

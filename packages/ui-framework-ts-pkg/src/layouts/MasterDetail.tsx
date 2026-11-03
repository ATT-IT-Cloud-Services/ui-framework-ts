"use client";

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export interface MasterDetailProps {
  master: React.ReactNode;
  detail: React.ReactNode;
  selectedId?: string | null;
  onClearSelection?: () => void;
  defaultMasterSize?: number; // percentage, e.g. 30
  minMasterSize?: number;
  maxMasterSize?: number;
  className?: string;
}

export function MasterDetail({
  master,
  detail,
  selectedId,
  onClearSelection,
  defaultMasterSize = 32,
  minMasterSize = 22,
  maxMasterSize = 48,
  className = "",
}: MasterDetailProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 768);
    }
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // On Mobile: switch between Master view and Detail view
  if (isMobile) {
    if (selectedId) {
      return (
        <div className={cn("flex flex-col h-full space-y-3", className)}>
          {onClearSelection && (
            <div className="pb-2 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="gap-1.5 text-xs -ms-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to list
              </Button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{detail}</div>
        </div>
      );
    }
    return <div className={cn("h-full overflow-y-auto", className)}>{master}</div>;
  }

  // Desktop: Resizable 2-pane layout
  return (
    <PanelGroup
      direction="horizontal"
      className={cn("h-full min-h-[500px] rounded-lg border border-border bg-card overflow-hidden", className)}
    >
      <Panel
        defaultSize={defaultMasterSize}
        minSize={minMasterSize}
        maxSize={maxMasterSize}
        className="flex flex-col h-full border-e border-border/80 bg-background/50 overflow-hidden"
      >
        <div className="h-full overflow-y-auto">{master}</div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-border/40 hover:bg-primary/40 active:bg-primary transition-colors cursor-col-resize flex items-center justify-center">
        <div className="h-8 w-0.5 rounded-full bg-border" />
      </PanelResizeHandle>

      <Panel className="flex flex-col h-full bg-background overflow-hidden">
        <div className="h-full overflow-y-auto p-4">{detail}</div>
      </Panel>
    </PanelGroup>
  );
}

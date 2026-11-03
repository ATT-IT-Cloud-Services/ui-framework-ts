"use client";

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  PanelRightClose,
  PanelRightOpen,
  Pin,
  PinOff,
  Maximize2,
  Minimize2,
  Columns,
  Layers,
  Monitor,
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useLayoutSettings } from "../settings/provider";
import { cn } from "../lib/utils";

export type SplitRatio = "1/2" | "2/3" | "3/4";
export type SplitDisplayMode = "docked" | "overlap-third" | "overlap-half" | "maximized";
export type OverlayScope = "viewport" | "container";

export interface SplitWithInfoPanelProps {
  children: React.ReactNode;
  infoPanel: React.ReactNode;
  panelTitle?: string;
  defaultRatio?: SplitRatio;
  defaultMode?: SplitDisplayMode;
  defaultOverlayScope?: OverlayScope;
  defaultCollapsed?: boolean;
  isPinnable?: boolean;
  className?: string;
}

const RATIO_SIZES: Record<SplitRatio, { main: number; panel: number }> = {
  "1/2": { main: 50, panel: 50 },
  "2/3": { main: 66, panel: 34 },
  "3/4": { main: 75, panel: 25 },
};

export function SplitWithInfoPanel({
  children,
  infoPanel,
  panelTitle = "Information",
  defaultRatio = "2/3",
  defaultMode = "docked",
  defaultOverlayScope = "viewport",
  defaultCollapsed = false,
  isPinnable = true,
  className = "",
}: SplitWithInfoPanelProps) {
  const { settings } = useLayoutSettings();
  const [ratio, setRatio] = React.useState<SplitRatio>(defaultRatio);
  const [displayMode, setDisplayMode] = React.useState<SplitDisplayMode>(defaultMode);
  const [overlayScope, setOverlayScope] = React.useState<OverlayScope>(defaultOverlayScope);
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isPinned, setIsPinned] = React.useState(true);
  const [mobileSheetOpen, setMobileSheetOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 1024);
    }
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const sizes = RATIO_SIZES[ratio];
  const isOverlap = displayMode === "overlap-third" || displayMode === "overlap-half";
  const isMaximized = displayMode === "maximized";

  // Lock background scrolling when viewport overlay is active
  React.useEffect(() => {
    if (isOverlap && !isCollapsed && overlayScope === "viewport" && !isMobile) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOverlap, isCollapsed, overlayScope, isMobile]);

  // Mobile layout fallback
  if (isMobile) {
    return (
      <div className={cn("relative flex flex-col min-h-full space-y-4", className)}>
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground">Mobile View</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileSheetOpen(true)}
            className="text-xs gap-1.5"
          >
            <PanelRightOpen className="h-3.5 w-3.5" />
            {panelTitle}
          </Button>
        </div>

        <div className="flex-1">{children}</div>

        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetContent side="bottom" className="h-[80vh] p-0 flex flex-col">
            <SheetHeader className="p-4 border-b border-border">
              <SheetTitle className="text-sm font-semibold">{panelTitle}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">{infoPanel}</div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  const blurStyle = {
    backdropFilter: settings.overlays.blurLeftOnMenuOpen
      ? "blur(var(--backdrop-blur, 8px))"
      : "none",
    WebkitBackdropFilter: settings.overlays.blurLeftOnMenuOpen
      ? "blur(var(--backdrop-blur, 8px))"
      : "none",
  };

  return (
    <div className={cn("relative flex flex-col h-full min-h-[600px] space-y-2", className)}>
      {/* Top Toolbar: Mode Switcher & Controls */}
      <div className="flex items-center justify-between px-1 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="inline-flex items-center rounded-md border border-input bg-muted/40 p-0.5 text-2xs">
            <button
              type="button"
              onClick={() => {
                setDisplayMode("docked");
                setIsCollapsed(false);
              }}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors cursor-pointer",
                displayMode === "docked" && !isCollapsed
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Docked side-by-side (table and panel share space)"
            >
              <Columns className="h-3 w-3" />
              <span>Docked</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDisplayMode("overlap-third");
                setIsCollapsed(false);
              }}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors cursor-pointer",
                displayMode === "overlap-third" && !isCollapsed
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Overlap right 1/3 (table stays 100% full width, panel floats)"
            >
              <Layers className="h-3 w-3" />
              <span>Overlap 1/3</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDisplayMode("overlap-half");
                setIsCollapsed(false);
              }}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors cursor-pointer",
                displayMode === "overlap-half" && !isCollapsed
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Overlap right 1/2 (table stays 100% full width, panel floats)"
            >
              <Layers className="h-3 w-3" />
              <span>Overlap 1/2</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDisplayMode("maximized");
                setIsCollapsed(false);
              }}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 font-medium transition-colors cursor-pointer",
                displayMode === "maximized" && !isCollapsed
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Maximize panel to 100% width"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Maximized</span>
            </button>
          </div>

          {/* Ratios (only in docked mode) */}
          {displayMode === "docked" && !isCollapsed && (
            <div className="inline-flex items-center rounded-md border border-input bg-muted/40 p-0.5 text-2xs">
              {(["1/2", "2/3", "3/4"] as SplitRatio[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRatio(r)}
                  className={cn(
                    "rounded px-1.5 py-0.5 font-medium transition-colors cursor-pointer",
                    ratio === r ? "bg-background text-foreground shadow-2xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Overlay Scope Toggle (Viewport vs Container) */}
          {isOverlap && !isCollapsed && (
            <button
              type="button"
              onClick={() => setOverlayScope((s) => s === "viewport" ? "container" : "viewport")}
              className="inline-flex items-center gap-1 text-2xs px-2 py-1 rounded border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title="Toggle overlay height constraint"
            >
              <Monitor className="h-3 w-3 text-primary" />
              <span>{overlayScope === "viewport" ? "Display Height Overlay" : "In-Card Overlay"}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isPinnable && !isCollapsed && !isOverlap && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsPinned((prev) => !prev)}
              title={isPinned ? "Unpin panel" : "Pin panel"}
            >
              {isPinned ? <Pin className="h-3.5 w-3.5 text-primary" /> : <PinOff className="h-3.5 w-3.5 text-muted-foreground" />}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-xs gap-1.5 h-7 cursor-pointer"
          >
            {isCollapsed ? (
              <>
                <PanelRightOpen className="h-3.5 w-3.5" />
                <span>Show Panel</span>
              </>
            ) : (
              <>
                <PanelRightClose className="h-3.5 w-3.5" />
                <span>Hide Panel</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 rounded-lg border border-border bg-card overflow-hidden flex flex-col">
        {/* Case 1: Panel is Collapsed -> 100% full-width content */}
        {isCollapsed ? (
          <div className="h-full w-full overflow-y-auto p-4">{children}</div>
        ) : isMaximized ? (
          /* Case 2: Maximized Panel -> Panel takes 100% width */
          <div className="h-full w-full overflow-y-auto p-4 bg-background animate-in fade-in-50">
            <div className="flex justify-end pb-2 mb-2 border-b border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDisplayMode("docked")}
                className="text-xs gap-1 h-7 cursor-pointer"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                Restore Layout
              </Button>
            </div>
            {infoPanel}
          </div>
        ) : isOverlap ? (
          /* Case 3: OVERLAP MODE -> Table keeps 100% full width, panel floats as overlay on right */
          <div className="relative h-full w-full overflow-hidden flex flex-col">
            {/* 100% Full Width Main Content */}
            <div className="h-full w-full overflow-y-auto p-4">
              {children}
            </div>

            {/* Overlap Container Scope */}
            {overlayScope === "container" ? (
              <>
                {/* Backdrop Blur over left side */}
                <div
                  onClick={() => setIsCollapsed(true)}
                  style={blurStyle}
                  className={cn(
                    "absolute inset-0 bg-black/20 transition-all duration-200 cursor-pointer z-10",
                    displayMode === "overlap-third" ? "pe-[34%]" : "pe-[50%]"
                  )}
                />

                {/* In-Card Floating Overlap Panel */}
                <div
                  className={cn(
                    "absolute inset-y-0 end-0 z-20 flex flex-col border-s border-border bg-background/95 backdrop-blur-md shadow-2xl p-4 overflow-hidden transition-all duration-200 animate-in slide-in-from-right-4",
                    displayMode === "overlap-third" ? "w-full sm:w-1/3 min-w-[380px]" : "w-full sm:w-1/2"
                  )}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-border shrink-0">
                    <span className="text-2xs font-semibold text-primary uppercase tracking-wider">
                      In-Card Overlay ({displayMode === "overlap-third" ? "1/3" : "1/2"})
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCollapsed(true)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <PanelRightClose className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto pe-1">{infoPanel}</div>
                </div>
              </>
            ) : (
              /* Overlap Viewport Scope (Spans full display height under navbar & above footer) */
              <div
                className="fixed inset-0 z-panel pointer-events-none transition-all duration-200"
                style={{
                  top: "calc(var(--header-height, 48px) + var(--nav-height, 0px))",
                  bottom: "var(--footer-height, 0px)",
                }}
              >
                {/* Full Height Left Backdrop Blur (clicking closes) */}
                <div
                  onClick={() => setIsCollapsed(true)}
                  style={blurStyle}
                  className={cn(
                    "absolute inset-0 bg-black/25 pointer-events-auto transition-all duration-200 cursor-pointer",
                    displayMode === "overlap-third" ? "pe-[34%]" : "pe-[50%]"
                  )}
                />

                {/* Full Height Floating Overlap Panel (Scroll Locked to Panel only) */}
                <div
                  className={cn(
                    "absolute inset-y-0 end-0 pointer-events-auto flex flex-col border-s border-border bg-background/95 backdrop-blur-md shadow-2xl p-5 overflow-hidden transition-all duration-200 animate-in slide-in-from-right-4",
                    displayMode === "overlap-third" ? "w-full sm:w-1/3 min-w-[400px]" : "w-full sm:w-1/2"
                  )}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-border shrink-0">
                    <div className="space-y-0.5">
                      <span className="text-2xs font-bold text-primary uppercase tracking-wider block">
                        Full Display Height Overlay ({displayMode === "overlap-third" ? "1/3 Width" : "1/2 Width"})
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Background scroll-locked • Only this panel scrolls
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCollapsed(true)}
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      title="Close overlay"
                    >
                      <PanelRightClose className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto pe-1">{infoPanel}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Case 4: DOCKED MODE -> Resizable side-by-side */
          <PanelGroup direction="horizontal" className="h-full">
            <Panel defaultSize={sizes.main} minSize={30} className="flex flex-col h-full overflow-hidden">
              <div className="h-full overflow-y-auto p-4">{children}</div>
            </Panel>

            <PanelResizeHandle className="w-1.5 bg-border/40 hover:bg-primary/40 active:bg-primary transition-colors cursor-col-resize flex items-center justify-center">
              <div className="h-8 w-0.5 rounded-full bg-border" />
            </PanelResizeHandle>

            <Panel
              defaultSize={sizes.panel}
              minSize={20}
              maxSize={60}
              className={cn(
                "flex flex-col h-full border-s border-border bg-background/50 overflow-hidden",
                !isPinned && "shadow-xl"
              )}
            >
              <div className="h-full overflow-y-auto p-4">{infoPanel}</div>
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  );
}

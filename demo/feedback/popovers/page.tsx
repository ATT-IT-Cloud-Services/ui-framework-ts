"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import {
  FilterPopover,
  QuickActionsMenu,
  Tour,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@fw/overlays";
import { Button, Card, CardHeader, CardTitle, CardContent, Checkbox } from "@fw/ui";
import { toast } from "@fw/overlays";
import { HelpCircle, Zap, Shield, Plus, FileText, Printer, Copy } from "lucide-react";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function PopoversDemo() {
  const [tourOpen, setTourOpen] = React.useState(false);
  const [filterActiveCount, setFilterActiveCount] = React.useState(2);

  const tourSteps = [
    {
      title: "Welcome to Operator Console",
      content: "This guided tour illustrates how contextual coachmarks highlight key telemetry instruments.",
    },
    {
      title: "Real-Time Filter Popovers",
      content: "Filters preserve state in memory and allow instant apply and reset with active counter tags.",
    },
    {
      title: "Speed-Dial FAB Menu",
      content: "Trigger common emergency commands or fast actions anywhere from the bottom corner.",
    },
  ];

  return (
    <DemoFrame
      demoId="feedback-popovers"
      title="Popovers & Floating Overlays"
      description="Interactive showcase of FilterPopover, QuickActions speed-dial FAB, Tour coachmarks, ContextMenu, and HoverCards."
      folderPath="demo/feedback/popovers/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-6">
          <PageHeader
            title="Floating Overlays & Popovers"
            subtitle="Explore contextual dropdowns, hover cards, right-click context menus, and guided tours."
            actions={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTourOpen(true)}
                className="text-xs gap-1.5"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Start Tour
              </Button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Filter Popover */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">1. Filter Popover</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-2xs text-muted-foreground">
                  Popover with active filter badge counter, clear/reset triggers, and Apply button.
                </p>
                <FilterPopover
                  activeFilterCount={filterActiveCount}
                  onApply={() => toast.success("Filters applied")}
                  onReset={() => {
                    setFilterActiveCount(0);
                    toast.info("Filters cleared");
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="f-turbines" defaultChecked />
                      <label htmlFor="f-turbines" className="text-xs cursor-pointer">
                        Active Turbines Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="f-critical" defaultChecked />
                      <label htmlFor="f-critical" className="text-xs cursor-pointer">
                        Critical Alarms Only
                      </label>
                    </div>
                  </div>
                </FilterPopover>
              </CardContent>
            </Card>

            {/* 2. Hover Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">2. Hover Card (Inspection Preview)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-2xs text-muted-foreground">
                  Hover over the entity link to preview detailed live specifications without navigating away.
                </p>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="font-semibold text-primary underline underline-offset-4 cursor-pointer text-xs">
                      Inspect Turbine Cluster #04
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-border/60">
                      <span className="font-bold text-xs">Turbine #04-MUC</span>
                      <span className="text-[10px] text-emerald-600 font-bold">ONLINE</span>
                    </div>
                    <p className="text-2xs text-muted-foreground">
                      Siemens Energy 60MW industrial turbine running at 1,498 RPM with continuous vibration monitoring.
                    </p>
                    <div className="flex gap-3 text-2xs text-muted-foreground pt-1">
                      <span>Temp: 98.4°C</span>
                      <span>Output: 58.2 MW</span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>

            {/* 3. Context Menu */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xs font-semibold">
                  3. Right-Click Context Menu (Long-press on mobile)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground bg-muted/20 select-none">
                    Right click anywhere inside this box to open the contextual actions menu
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-52">
                    <ContextMenuItem onClick={() => toast.success("Diagnostic run")}>
                      <Zap className="h-3.5 w-3.5 me-2 text-primary" />
                      Run Diagnostics
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => toast.info("Specifications copied")}>
                      <Copy className="h-3.5 w-3.5 me-2" />
                      Copy Specs
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => toast.info("Printing report...")}>
                      <Printer className="h-3.5 w-3.5 me-2" />
                      Print Certificate
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Speed Dial FAB */}
          <QuickActionsMenu
            actions={[
              {
                id: "add-order",
                label: "New Order",
                icon: Plus,
                onClick: () => toast.success("New order dialog"),
              },
              {
                id: "export-log",
                label: "Export Logs",
                icon: FileText,
                onClick: () => toast.info("Exporting logs..."),
              },
              {
                id: "safety-lock",
                label: "Safety Lock",
                icon: Shield,
                onClick: () => toast.error("Safety lock engaged"),
              },
            ]}
          />

          {/* Tour Modal */}
          <Tour
            open={tourOpen}
            onClose={() => setTourOpen(false)}
            onComplete={() => toast.success("Tour finished!")}
            steps={tourSteps}
          />
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default PopoversDemo;

"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { FullSplit } from "@fw/layouts";
import { InfoPanel } from "@fw/panels";
import { DemoFrame } from "../../_shared/DemoFrame";
import { OrdersPage } from "../../_shared/shared-pages/OrdersPage";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function FullSplitDemo() {
  const navPane = (
    <div className="space-y-2 text-xs">
      <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
        Workspace Modules
      </span>
      <ul className="space-y-1">
        <li className="p-2 rounded bg-primary/10 text-primary font-semibold">SCADA Operations</li>
        <li className="p-2 rounded hover:bg-muted text-muted-foreground">Dispatch Logistics</li>
        <li className="p-2 rounded hover:bg-muted text-muted-foreground">Safety Audits</li>
      </ul>
    </div>
  );

  const submenuPane = (
    <div className="space-y-2 text-xs">
      <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
        Sub-Entities
      </span>
      <ul className="space-y-1">
        <li className="p-2 rounded border border-primary/20 bg-primary/5 text-foreground font-medium">
          Munich Central Plant
        </li>
        <li className="p-2 rounded border border-border/50 text-muted-foreground">
          Zurich Substation 2
        </li>
        <li className="p-2 rounded border border-border/50 text-muted-foreground">
          Oslo Offshore Node
        </li>
      </ul>
    </div>
  );

  const infoPane = (
    <InfoPanel
      title="Facility Properties"
      subtitle="Munich Central Plant"
      keyValues={[
        { key: "Status", value: "Operational" },
        { key: "Total MW", value: "482.6 MW" },
        { key: "Operators on duty", value: "14" },
      ]}
    />
  );

  return (
    <DemoFrame
      demoId="layout-full-split"
      title="FullSplit Layout Template"
      description="4-column resizable layout: Navigation | Submenu | Content | Info Panel, each column independently resizable."
      folderPath="demo/layouts/full-split/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS} hideNavigation>
        <div className="h-screen p-2">
          <FullSplit
            navPane={navPane}
            submenuPane={submenuPane}
            contentPane={<OrdersPage />}
            infoPane={infoPane}
          />
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default FullSplitDemo;

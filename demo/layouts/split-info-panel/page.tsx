"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { SplitWithInfoPanel } from "@fw/layouts";
import { InfoPanel } from "@fw/panels";
import { DemoFrame } from "../../_shared/DemoFrame";
import { OrdersPage } from "../../_shared/shared-pages/OrdersPage";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function SplitInfoPanelDemo() {
  const infoContent = (
    <InfoPanel
      title="Order Manifest Telemetry"
      subtitle="Selected Dispatch Properties"
      keyValues={[
        { key: "Active Contract", value: "CTR-2026-EU" },
        { key: "ISO Certification", value: "Verified (ISO-9001)" },
        { key: "Security Enclave", value: "Level 4 (Cryo)" },
        { key: "Hazardous Class", value: "None" },
      ]}
      activities={[
        { id: "a1", actor: "Dr. Elena Rostova", action: "approved safety sign-off", timestamp: "15m ago" },
        { id: "a2", actor: "Automated Dispatch", action: "allocated container pallet", timestamp: "1h ago" },
      ]}
      attachments={[
        { id: "att-1", name: "Customs_Manifest_9042.pdf", size: "1.4 MB" },
        { id: "att-2", name: "Valve_Torque_Audit.csv", size: "320 KB" },
      ]}
    />
  );

  return (
    <DemoFrame
      demoId="layout-split-info-panel"
      title="SplitWithInfoPanel Template"
      description="Main content + collapsible, pinnable, resizable right info panel. Switchable ratios: 1/2 (50/50), 2/3+1/3, 3/4+1/4. Automatically falls back to bottom drawer on mobile."
      folderPath="demo/layouts/split-info-panel/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-4">
          <PageHeader
            title="Split Workspace with Contextual InfoPanel"
            subtitle="Toggle ratios (1/2, 2/3, 3/4), pin or collapse the panel, or resize interactively."
          />
          <SplitWithInfoPanel
            infoPanel={infoContent}
            defaultRatio="2/3"
            panelTitle="Order Telemetry Info"
          >
            <OrdersPage />
          </SplitWithInfoPanel>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default SplitInfoPanelDemo;

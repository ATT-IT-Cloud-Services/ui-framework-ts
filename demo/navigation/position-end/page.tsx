"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function PositionEndDemo() {
  return (
    <DemoFrame
      demoId="nav-position-end"
      title="End-Positioned (Mirrored) Sidebar"
      description="Sidebar positioned at the trailing 'end' side (right in LTR, left in RTL). Demonstrates logical CSS properties (ms-, me-, ps-, pe-) across borders and flyouts."
      folderPath="demo/navigation/position-end/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default PositionEndDemo;

"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function PositionBottomDemo() {
  return (
    <DemoFrame
      demoId="nav-position-bottom"
      title="Bottom-Positioned Navigation"
      description="Navigation bar affixed to the bottom of the viewport with safe-area padding and compact density."
      folderPath="demo/navigation/position-bottom/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default PositionBottomDemo;

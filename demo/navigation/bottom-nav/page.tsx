"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function BottomNavDemo() {
  return (
    <DemoFrame
      demoId="nav-bottom-nav"
      title="Bottom Tab Navigation"
      description="Touch-first bottom bar with primary item tabs and a 'Menu' trigger opening a full-height Sheet drawer. Native feel on mobile and handheld terminals."
      folderPath="demo/navigation/bottom-nav/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default BottomNavDemo;

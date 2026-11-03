"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function SidebarInsetDemo() {
  return (
    <DemoFrame
      demoId="nav-sidebar-inset"
      title="Inset Floating Sidebar"
      description="Modern floating card styling. The sidebar floats with rounded corners and margins, while the main content area is wrapped as a distinct elevated card."
      folderPath="demo/navigation/sidebar-inset/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default SidebarInsetDemo;

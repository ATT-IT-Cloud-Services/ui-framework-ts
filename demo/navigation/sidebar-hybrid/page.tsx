"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function SidebarHybridDemo() {
  return (
    <DemoFrame
      demoId="nav-sidebar-hybrid"
      title="Hybrid Sidebar Navigation"
      description="Best of both worlds: rail when collapsed, full 260px when expanded. Features keyboard toggle (Cmd/Ctrl+B) and optional hover expansion."
      folderPath="demo/navigation/sidebar-hybrid/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default SidebarHybridDemo;

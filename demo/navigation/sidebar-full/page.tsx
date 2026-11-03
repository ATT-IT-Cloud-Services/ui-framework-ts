"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function SidebarFullDemo() {
  return (
    <DemoFrame
      demoId="nav-sidebar-full"
      title="Full Sidebar Navigation"
      description="Classic 260px wide enterprise navigation with section headings, animated 3-level accordions, and badge indicators."
      folderPath="demo/navigation/sidebar-full/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default SidebarFullDemo;

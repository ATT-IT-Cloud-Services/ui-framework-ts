"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function SidebarDualDemo() {
  return (
    <DemoFrame
      demoId="nav-sidebar-dual"
      title="Dual Rail Navigation"
      description="Two-tier navigation: narrow 56px module rail on the left + dedicated 200px secondary panel displaying the active module's hierarchy."
      folderPath="demo/navigation/sidebar-dual/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default SidebarDualDemo;

"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function SidebarRailDemo() {
  return (
    <DemoFrame
      demoId="nav-sidebar-rail"
      title="Icon Rail Navigation"
      description="Ultra-compact 64px icon rail maximizing horizontal workspace. Hovering shows tooltips; submenus render in flyout popovers."
      folderPath="demo/navigation/sidebar-rail/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default SidebarRailDemo;

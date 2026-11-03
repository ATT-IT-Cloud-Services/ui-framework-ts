"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { navigation } from "./navigation";
import { preset } from "./preset";

export function TopnavDemo() {
  return (
    <DemoFrame
      demoId="nav-topnav"
      title="Top Navigation Bar"
      description="Horizontal top navigation with dropdown submenus, 3rd level support, and overflow into a responsive 'More' menu. Optimal with boxed content width."
      folderPath="demo/navigation/topnav/"
      preset={preset}
    >
      <AppShell navigationItems={navigation}>
        <DashboardPage />
      </AppShell>
    </DemoFrame>
  );
}

export default TopnavDemo;

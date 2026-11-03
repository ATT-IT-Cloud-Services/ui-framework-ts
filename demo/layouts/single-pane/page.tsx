"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { SinglePane } from "@fw/layouts";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DashboardPage } from "../../_shared/shared-pages/DashboardPage";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function SinglePaneDemo() {
  return (
    <DemoFrame
      demoId="layout-single-pane"
      title="SinglePane Layout Template"
      description="Standard uncluttered single-pane layout for dashboards, full-width reports, and overview views."
      folderPath="demo/layouts/single-pane/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <SinglePane>
          <DashboardPage />
        </SinglePane>
      </AppShell>
    </DemoFrame>
  );
}

export default SinglePaneDemo;

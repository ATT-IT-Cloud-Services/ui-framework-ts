"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { SettingsPage } from "../../_shared/shared-pages/SettingsPage";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function SettingsLayoutDemo() {
  return (
    <DemoFrame
      demoId="layout-settings-layout"
      title="SettingsLayout Template"
      description="Vertical sub-navigation sidebar + form area layout for multi-category application settings."
      folderPath="demo/layouts/settings-layout/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <SettingsPage />
      </AppShell>
    </DemoFrame>
  );
}

export default SettingsLayoutDemo;

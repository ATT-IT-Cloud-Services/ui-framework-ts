"use client";

import * as React from "react";
import { AppShell } from "@fw/shell";
import { DemoFrame } from "../../_shared/DemoFrame";
import { OrderDetailPage } from "../../_shared/shared-pages/OrderDetailPage";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function ObjectPageDemo() {
  return (
    <DemoFrame
      demoId="layout-object-page"
      title="Enterprise ObjectPage Template"
      description="Modern entity overview Object Page with header title, status, key attributes bar, sticky anchor tabs, carded sections, and a sticky footer action bar."
      folderPath="demo/layouts/object-page/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <OrderDetailPage orderId="ord-102" />
      </AppShell>
    </DemoFrame>
  );
}

export default ObjectPageDemo;

"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { EmptyState, ErrorState, InfoCard, TableSkeleton, DashboardSkeleton } from "@fw/panels";
import { Card, CardHeader, CardTitle, CardContent } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function StatesDemo() {
  return (
    <DemoFrame
      demoId="feedback-states"
      title="UI States & Placeholders"
      description="Empty states, technical error boundaries, skeleton loaders, and contextual InfoCards (info, success, warning, error, promo)."
      folderPath="demo/feedback/states/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-6">
          <PageHeader
            title="State Presentations & Skeletons"
            subtitle="Graceful UI states for asynchronous loading, empty datasets, errors, and announcements."
          />

          {/* InfoCard Variants */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              InfoCard Variants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoCard
                variant="info"
                title="Firmware Upgrade Scheduled"
                description="Cluster 04 will undergo maintenance on April 5 at 02:00 UTC."
                action={{ label: "View Roadmap", onClick: () => toast.info("Roadmap opened") }}
                dismissible
              />
              <InfoCard
                variant="success"
                title="ISO-9001 Audit Passed"
                description="All 14 plant controllers compliant with zero safety non-conformances."
                learnMoreHref="#"
                dismissible
              />
              <InfoCard
                variant="warning"
                title="Peak Power Surcharge Alert"
                description="Grid tariff peak multiplier active until 18:00 local time."
                dismissible
              />
              <InfoCard
                variant="error"
                title="Substation 2 Telemetry Offline"
                description="Carrier heartbeat lost 14 minutes ago. Backup line active."
                action={{ label: "Diagnose", onClick: () => toast.error("Diagnostics started") }}
                dismissible
              />
            </div>
          </div>

          {/* Empty & Error States */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">Empty State</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState
                  title="No Dispatch Orders Found"
                  description="Try adjusting your filter criteria or register a new purchase order."
                  action={{
                    label: "Create Order",
                    onClick: () => toast.success("Order dialog opened"),
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">Error State</CardTitle>
              </CardHeader>
              <CardContent>
                <ErrorState
                  title="Telemetry Stream Disconnected"
                  description="WebSocket handshake failed with code 1006 (Abnormal Closure)."
                  error={new Error("E_CONNECTION_REFUSED: port 8443 unreachable")}
                  onRetry={() => toast.info("Retrying connection...")}
                />
              </CardContent>
            </Card>
          </div>

          {/* Skeletons */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Skeleton Loaders
            </h3>
            <TableSkeleton rows={3} />
            <DashboardSkeleton />
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default StatesDemo;

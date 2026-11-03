"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import {
  NotificationCenter,
  AnnouncementBanner,
  InlineAlert,
  ProgressToast,
  ConnectionStatusBanner,
  ConnectionStatusBadge,
} from "@fw/overlays";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function NotificationsDemo() {
  const [uploadProgress, setUploadProgress] = React.useState(68);
  const [connectionStatus, setConnectionStatus] = React.useState<"connected" | "disconnected" | "reconnecting">("reconnecting");

  return (
    <DemoFrame
      demoId="feedback-notifications"
      title="Notification Center & Banners"
      description="Notification center with unread tabs, persistent toast integration, announcement banners, progress toasts, and connection status alerts."
      folderPath="demo/feedback/notifications/"
      preset={preset}
    >
      <AppShell
        navigationItems={DEMO_NAVIGATION_ITEMS}
        headerSlot={<NotificationCenter />}
      >
        <div className="space-y-6">
          <AnnouncementBanner
            id="demo-announcement"
            title="Scheduled Maintenance Notice"
            message="Grid Substations 02 & 04 will perform routine safety checks on Sunday 01:00-03:00 UTC."
            variant="maintenance"
            action={{
              label: "View Schedule",
              onClick: () => toast.info("Opening maintenance schedule..."),
            }}
          />

          <ConnectionStatusBanner
            status={connectionStatus}
            onReconnect={() => {
              setConnectionStatus("connected");
              toast.success("Reconnected to live stream");
            }}
          />

          <PageHeader
            title="Notification Center & Status Banners"
            subtitle="Click the bell in the top header or examine the banners and progress indicators below."
            actions={
              <div className="flex items-center gap-2">
                <ConnectionStatusBadge status={connectionStatus} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setConnectionStatus((prev) =>
                      prev === "connected" ? "reconnecting" : "connected"
                    )
                  }
                  className="text-xs"
                >
                  Toggle Connection
                </Button>
              </div>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inline Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">Inline Alert Banners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InlineAlert type="info" title="Telemetry Calibration">
                  Automatic zero-point sensor calibration in progress for Sensor Rack 4.
                </InlineAlert>
                <InlineAlert type="success" title="Backup Complete">
                  Cold storage snapshot successfully verified with SHA-256 digest.
                </InlineAlert>
                <InlineAlert type="warning" title="Threshold Approaching">
                  Rotor speed has been within 5% of peak threshold for 40 minutes.
                </InlineAlert>
                <InlineAlert type="error" title="Emergency Stop Engaged">
                  Emergency breaker tripped manually on Line 2. Investigation required.
                </InlineAlert>
              </CardContent>
            </Card>

            {/* Progress Toast / Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">Async Progress Panel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-2xs text-muted-foreground">
                  Displays live task or file upload percentage with completion states.
                </p>
                <ProgressToast
                  title="Turbine Diagnostic Package"
                  progress={uploadProgress}
                  statusText={uploadProgress >= 100 ? "Ready for download" : "Compressing sensor samples..."}
                  completed={uploadProgress >= 100}
                />
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setUploadProgress((p) => Math.min(100, p + 15))}
                    className="text-xs"
                  >
                    Simulate +15%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setUploadProgress(0)}
                    className="text-xs"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default NotificationsDemo;

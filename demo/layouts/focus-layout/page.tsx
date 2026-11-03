"use client";

import * as React from "react";
import { FocusLayout } from "@fw/layouts";
import { Button, Input } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoFrame } from "../../_shared/DemoFrame";
import { preset } from "./preset";
import { useRouter } from "next/navigation";

export function FocusLayoutDemo() {
  const router = useRouter();

  return (
    <DemoFrame
      demoId="layout-focus-layout"
      title="FocusLayout Template"
      description="Distraction-free full-screen modal layout, completely hiding navigation with a top exit button and sticky footer."
      folderPath="demo/layouts/focus-layout/"
      preset={preset}
    >
      <FocusLayout
        title="Telemetry Data Export Wizard"
        subtitle="Configure sensor data extraction parameters"
        onClose={() => router.push("/")}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => router.push("/")} className="text-xs">
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => toast.success("Telemetry extraction job queued")}
              className="text-xs font-semibold"
            >
              Start Export Job
            </Button>
          </>
        }
      >
        <div className="space-y-6 max-w-xl mx-auto py-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-foreground">1. Select Target Cluster</h2>
            <p className="text-xs text-muted-foreground">Choose facility turbine or generator banks</p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-2xs text-muted-foreground">Cluster Name</label>
              <Input defaultValue="Munich Central Grid - Station 04" />
            </div>

            <div className="space-y-1">
              <label className="text-2xs text-muted-foreground">Telemetry Resolution</label>
              <Input defaultValue="50 Hz High-Frequency Vibration Samples" />
            </div>

            <div className="space-y-1">
              <label className="text-2xs text-muted-foreground">Output Format</label>
              <Input defaultValue="Parquet / CSV Compressed (.tar.gz)" />
            </div>
          </div>
        </div>
      </FocusLayout>
    </DemoFrame>
  );
}

export default FocusLayoutDemo;

"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { toast } from "@fw/overlays";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@fw/ui";
import { useLayoutSettings, type ToastPosition } from "@fw/settings";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

const POSITIONS: ToastPosition[] = [
  "top-start",
  "top-center",
  "top-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
];

export function ToastsDemo() {
  const { settings, updateOverlaySettings } = useLayoutSettings();

  const fireSuccess = () => {
    toast.success("Order #9042 successfully approved", {
      description: "Dispatch notification dispatched to logistics team.",
    });
  };

  const fireError = () => {
    toast.error("Telemetry connection lost", {
      description: "Turbine 4 sensor gateway timed out after 3 retries.",
    });
  };

  const fireWarning = () => {
    toast.warning("High Temperature Warning", {
      description: "Bearing temperature 98.4°C approaching safety limit.",
    });
  };

  const fireInfo = () => {
    toast.info("Firmware download completed", {
      description: "Version 4.2.1 is ready for installation.",
    });
  };

  const fireAction = () => {
    toast.success("Order #9045 deleted", {
      action: {
        label: "Undo",
        onClick: () => toast.info("Order deletion reverted"),
      },
    });
  };

  const firePromise = () => {
    const dummyPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve("Telemetry logs compiled");
        } else {
          reject(new Error("Timeout"));
        }
      }, 1500);
    });

    toast.promise(dummyPromise, {
      loading: "Compiling telemetry export...",
      success: () => "Archive ready for download",
      error: () => "Export compilation failed",
    });
  };

  return (
    <DemoFrame
      demoId="feedback-toasts"
      title="Toast Notifications System"
      description="Comprehensive Sonner wrapper with 6 mirrored live positions, status variants, promise toasts, undo actions, and stacking."
      folderPath="demo/feedback/toasts/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-6">
          <PageHeader
            title="Toast Overlays & Position Matrix"
            subtitle="Switch live positions (supporting LTR/RTL logical start/end) and trigger all notification variants."
            actions={
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.dismissAll()}
                className="text-xs"
              >
                Dismiss All Toasts
              </Button>
            }
          />

          {/* Live Position Switcher */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-semibold">
                Live Position Switcher (Active: {settings.overlays.toastPosition})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {POSITIONS.map((pos) => {
                  const isSelected = settings.overlays.toastPosition === pos;
                  return (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => updateOverlaySettings({ toastPosition: pos })}
                      className={`px-2.5 py-2 text-2xs font-mono rounded-md border text-center transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "border-border hover:bg-muted text-foreground"
                      }`}
                    >
                      {pos}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Toast Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-semibold">Toast Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2.5">
                <Button size="sm" onClick={fireSuccess} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                  Success Toast
                </Button>
                <Button size="sm" onClick={fireError} variant="destructive" className="text-xs">
                  Error Toast
                </Button>
                <Button size="sm" onClick={fireWarning} className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
                  Warning Toast
                </Button>
                <Button size="sm" onClick={fireInfo} className="bg-sky-600 hover:bg-sky-700 text-white text-xs">
                  Info Toast
                </Button>
                <Button size="sm" onClick={fireAction} variant="outline" className="text-xs">
                  Toast with &quot;Undo&quot; Action
                </Button>
                <Button size="sm" onClick={firePromise} variant="secondary" className="text-xs">
                  Promise Toast (Async)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default ToastsDemo;

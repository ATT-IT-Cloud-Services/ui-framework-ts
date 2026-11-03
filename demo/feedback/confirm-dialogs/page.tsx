"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import {
  ConfirmProvider,
  useConfirm,
  DestructiveConfirmDialog,
  InlineConfirm,
  BottomDrawerConfirm,
  SessionExpiredDialog,
} from "@fw/feedback";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

function ConfirmDialogsContent() {
  const confirm = useConfirm();
  const [destructiveOpen, setDestructiveOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [sessionOpen, setSessionOpen] = React.useState(false);

  const handlePromiseConfirm = async () => {
    const ok = await confirm({
      title: "Archive Telemetry Database?",
      description: "This will compress and move past 90-day records into cold storage.",
      confirmText: "Archive Now",
      cancelText: "Cancel",
    });
    if (ok) {
      toast.success("Archive procedure initiated.");
    } else {
      toast.info("Archive cancelled.");
    }
  };

  const handlePromiseDestructive = async () => {
    const ok = await confirm({
      title: "Decommission Cluster Station?",
      description: "All telemetry collection for Station 04 will be immediately terminated.",
      confirmText: "Decommission",
      variant: "destructive",
    });
    if (ok) {
      toast.error("Cluster decommissioned.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Confirmation Dialogs & Decision Modals"
        subtitle="Promise-based confirm hook, typed destructive validation, inline confirmations, and mobile drawers."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Promise-based useConfirm */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-semibold">1. Promise-based useConfirm()</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <p className="text-muted-foreground text-2xs">
              Call <code className="font-mono bg-muted px-1 rounded">await confirm(&#123;...&#125;)</code> anywhere without managing dialog open state in component state.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" onClick={handlePromiseConfirm} className="text-xs">
                Standard Confirm
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handlePromiseDestructive}
                className="text-xs"
              >
                Destructive Confirm
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 2. Destructive Confirm with Typed Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-semibold">
              2. Destructive Confirmation (Type to Confirm)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <p className="text-muted-foreground text-2xs">
              Requires user to type the exact resource identifier before enabling the destructive deletion button.
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDestructiveOpen(true)}
              className="text-xs"
            >
              Delete Turbine Cluster
            </Button>
          </CardContent>
        </Card>

        {/* 3. Inline In-Place Confirmation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-semibold">3. Inline In-Place Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <p className="text-muted-foreground text-2xs">
              Button transforms in-place into &quot;Are you sure? Yes/No&quot; without opening any dialog.
            </p>
            <div className="flex items-center gap-3">
              <InlineConfirm
                label="Quick Clear Cache"
                onConfirm={() => toast.success("Cache cleared")}
                variant="outline"
              />
              <InlineConfirm
                label="Revoke Key"
                onConfirm={() => toast.error("Key revoked")}
                variant="destructive"
              />
            </div>
          </CardContent>
        </Card>

        {/* 4. Bottom Drawer & Session Expired */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-semibold">
              4. Bottom Drawer & Session Expired
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <p className="text-muted-foreground text-2xs">
              Mobile-first bottom sheet confirm and generic session expired recovery modal.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                className="text-xs"
              >
                Bottom Drawer Confirm
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSessionOpen(true)}
                className="text-xs"
              >
                Session Expired Dialog
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog instances */}
      <DestructiveConfirmDialog
        open={destructiveOpen}
        onOpenChange={setDestructiveOpen}
        title="Delete Cluster STN-04"
        description="This action will delete all recorded telemetry logs and dispatch histories permanently."
        requiredConfirmationText="STN-04"
        onConfirm={() => {
          setDestructiveOpen(false);
          toast.error("Cluster STN-04 deleted");
        }}
      />

      <BottomDrawerConfirm
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Apply Industrial Firmware Upgrade?"
        description="Facility controllers will reboot and experience 15s telemetry interruption."
        onConfirm={() => toast.success("Firmware upgrade scheduled.")}
      />

      <SessionExpiredDialog
        open={sessionOpen}
        onOpenChange={setSessionOpen}
        onAction={() => {
          setSessionOpen(false);
          toast.success("Session renewed.");
        }}
      />
    </div>
  );
}

export function ConfirmDialogsDemo() {
  return (
    <DemoFrame
      demoId="feedback-confirm-dialogs"
      title="Confirmation Dialogs Gallery"
      description="Interactive showcase of promise-based confirm, typed destructive modals, in-place inline confirm, and mobile drawer confirms."
      folderPath="demo/feedback/confirm-dialogs/"
      preset={preset}
    >
      <ConfirmProvider>
        <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
          <ConfirmDialogsContent />
        </AppShell>
      </ConfirmProvider>
    </DemoFrame>
  );
}

export default ConfirmDialogsDemo;

"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { ShortcutProvider, useShortcut, ShortcutHelpButton } from "@fw/services";
import { Card, CardHeader, CardTitle, CardContent } from "@fw/ui";
import { toast } from "@fw/overlays";
import { Keyboard } from "lucide-react";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

function ShortcutsDemoContent() {
  useShortcut(
    "ctrl+s",
    () => toast.success("Ctrl+S intercepted: Saved current document"),
    "Save Document",
    "Actions"
  );

  useShortcut(
    "ctrl+e",
    () => toast.info("Ctrl+E intercepted: Exporting telemetry"),
    "Export Telemetry",
    "Actions"
  );

  useShortcut(
    "ctrl+b",
    () => toast.info("Ctrl+B: Sidebar toggle"),
    "Toggle Sidebar",
    "Navigation"
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Keyboard Shortcuts Registry"
        subtitle="Global listener, conflict-safe shortcuts, and automatic '?' modal catalog."
        actions={<ShortcutHelpButton />}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-xs font-semibold flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-primary" />
            <span>Interactive Shortcuts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <p className="text-2xs text-muted-foreground">
            Try pressing any of these combinations on your physical keyboard now:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
              <span>Help Dialog</span>
              <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono font-bold">
                ?
              </kbd>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
              <span>Command Palette</span>
              <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono font-bold">
                ⌘K
              </kbd>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
              <span>Save Document</span>
              <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono font-bold">
                Ctrl+S
              </kbd>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
              <span>Export Telemetry</span>
              <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono font-bold">
                Ctrl+E
              </kbd>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
              <span>Toggle Sidebar</span>
              <kbd className="px-2 py-1 rounded bg-background border border-border text-xs font-mono font-bold">
                ⌘B
              </kbd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ShortcutsDemo() {
  return (
    <DemoFrame
      demoId="services-shortcuts"
      title="Shortcuts System"
      description="Central keyboard shortcuts management, automatic conflict suppression, and '?' help dialog."
      folderPath="demo/services/shortcuts/"
      preset={preset}
    >
      <ShortcutProvider>
        <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
          <ShortcutsDemoContent />
        </AppShell>
      </ShortcutProvider>
    </DemoFrame>
  );
}

export default ShortcutsDemo;

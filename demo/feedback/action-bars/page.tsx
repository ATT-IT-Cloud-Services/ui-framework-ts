"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { StickyActionBar, BulkActionBar, PageHeaderActions } from "@fw/panels";
import { Button, Card, CardHeader, CardTitle, CardContent, Switch } from "@fw/ui";
import { toast } from "@fw/overlays";
import { Check, Trash2, Download, Printer, Share2 } from "lucide-react";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function ActionBarsDemo() {
  const [hasChanges, setHasChanges] = React.useState(true);
  const [selectedCount, setSelectedCount] = React.useState(3);

  return (
    <DemoFrame
      demoId="feedback-action-bars"
      title="ActionBar Variants Gallery"
      description="Sticky bottom footer action bar, floating multi-selection bulk action bar, and responsive page header actions."
      folderPath="demo/feedback/action-bars/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-6 pb-20">
          <PageHeader
            title="Action Bar Patterns"
            subtitle="Explore footer save bars, floating bulk selection pills, and page header actions."
            actions={
              <PageHeaderActions
                primaryAction={{
                  label: "Publish Changes",
                  onClick: () => toast.success("Changes published"),
                  icon: Check,
                }}
                secondaryActions={[
                  {
                    label: "Export",
                    onClick: () => toast.info("Exporting..."),
                    icon: Download,
                  },
                  {
                    label: "Print",
                    onClick: () => toast.info("Printing..."),
                    icon: Printer,
                  },
                  {
                    label: "Share",
                    onClick: () => toast.info("Link copied"),
                    icon: Share2,
                  },
                ]}
              />
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">1. Sticky Footer Action Bar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="text-muted-foreground text-2xs">
                  Fixed to the bottom of the viewport. Features unsaved changes indicator, Save, Save & close, and Discard.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-medium">Toggle unsaved changes flag:</span>
                  <Switch checked={hasChanges} onCheckedChange={setHasChanges} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">2. Floating Bulk Action Bar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="text-muted-foreground text-2xs">
                  Appears when table rows are checked. Center-anchored pill with count and action buttons.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedCount(selectedCount > 0 ? 0 : 4)}
                    className="text-xs"
                  >
                    {selectedCount > 0 ? "Clear Selection" : "Select 4 items"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sticky footer action bar */}
          <StickyActionBar
            hasUnsavedChanges={hasChanges}
            onSave={() => toast.success("Saved successfully")}
            onSaveAndClose={() => toast.success("Saved and closed")}
            onCancel={() => setHasChanges(false)}
          />

          {/* Floating bulk bar */}
          <BulkActionBar
            selectedCount={selectedCount}
            onClearSelection={() => setSelectedCount(0)}
            actions={[
              {
                label: "Approve Selected",
                onClick: () => {
                  toast.success(`Approved ${selectedCount} items`);
                  setSelectedCount(0);
                },
                icon: Check,
              },
              {
                label: "Delete",
                onClick: () => {
                  toast.error(`Deleted ${selectedCount} items`);
                  setSelectedCount(0);
                },
                variant: "destructive",
                icon: Trash2,
              },
            ]}
          />
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default ActionBarsDemo;

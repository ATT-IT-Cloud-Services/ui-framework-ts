"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { useQueryState } from "@fw/services";
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from "@fw/ui";
import { DemoFrame } from "../../_shared/DemoFrame";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function UrlStateDemo() {
  const [activeTab, setActiveTab] = useQueryState<string>("tab", "overview");
  const [query, setQuery] = useQueryState<string>("q", "");

  return (
    <DemoFrame
      demoId="services-url-state"
      title="URL-Synchronized State Engine"
      description="Bi-directional state sync with window URL search parameters for tabs, search, and filters with shareable links."
      folderPath="demo/services/url-state/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-6">
          <PageHeader
            title="URL State Synchronization"
            subtitle="Change tabs or type in the input below to watch the browser address bar update in real-time."
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-semibold">Live Query State Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-2">
                {["overview", "analytics", "audits", "history"].map((t) => (
                  <Button
                    key={t}
                    size="sm"
                    variant={activeTab === t ? "default" : "outline"}
                    onClick={() => setActiveTab(t)}
                    className="text-xs capitalize"
                  >
                    {t}
                  </Button>
                ))}
              </div>

              <div className="space-y-1 max-w-sm">
                <label className="text-2xs text-muted-foreground">Search Query Parameter (?q=)</label>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type search terms here..."
                />
              </div>

              <div className="p-3 rounded-lg border border-border bg-muted/20 font-mono text-2xs space-y-1">
                <div>
                  <strong>activeTab state:</strong> &quot;{activeTab}&quot;
                </div>
                <div>
                  <strong>query state:</strong> &quot;{query}&quot;
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default UrlStateDemo;

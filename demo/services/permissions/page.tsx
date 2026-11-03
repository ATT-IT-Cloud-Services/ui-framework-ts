"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { PermissionProvider, Can } from "@fw/services";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@fw/ui";
import { toast } from "@fw/overlays";
import { Shield, Lock, Trash2, Edit3, Eye } from "lucide-react";
import { DemoFrame } from "../../_shared/DemoFrame";
import { MOCK_ACCOUNTS, type MockRole } from "../../_shared/auth";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function PermissionsDemo() {
  const [activeRole, setActiveRole] = React.useState<MockRole>("admin");

  const account = MOCK_ACCOUNTS[activeRole];

  return (
    <DemoFrame
      demoId="services-permissions"
      title="Role-Based Permissions & Guarding"
      description="Declarative permission provider and <Can> authorization component. Switch between Admin, Editor, and Viewer to observe filtered buttons, actions, and features."
      folderPath="demo/services/permissions/"
      preset={preset}
    >
      <PermissionProvider roles={account.roles} permissions={account.permissions}>
        <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
          <div className="space-y-6">
            <PageHeader
              title="Role-Based Access Control (RBAC)"
              subtitle="The framework acts as a pure consumer of permissions supplied by any auth host."
            />

            {/* Role Switcher Toolbar */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <CardTitle className="text-xs font-semibold">Active Delegated Role</CardTitle>
                  </div>
                  <div className="flex gap-1.5">
                    {(["admin", "editor", "viewer"] as MockRole[]).map((r) => (
                      <Button
                        key={r}
                        size="sm"
                        variant={activeRole === r ? "default" : "outline"}
                        onClick={() => {
                          setActiveRole(r);
                          toast.info(`Switched role to ${r.toUpperCase()}`);
                        }}
                        className="text-2xs capitalize h-7"
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg border border-border bg-muted/20">
                  <div>
                    <span className="text-2xs text-muted-foreground block">Simulated User</span>
                    <span className="font-semibold">{account.name}</span>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground block">Email</span>
                    <span className="truncate block">{account.email}</span>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground block">Assigned Roles</span>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                      {account.roles.join(", ")}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-2xs text-muted-foreground block">Permissions</span>
                    <span className="text-2xs font-mono truncate block">
                      {account.permissions.join(", ")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Access Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Viewer permission */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-sky-600" />
                    <span>View Telemetry (orders:read)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p className="text-2xs text-muted-foreground">Available to Admin, Editor, and Viewer.</p>
                  <Can
                    permission="orders:read"
                    fallback={<div className="text-destructive text-2xs flex items-center gap-1"><Lock className="h-3 w-3" /> Locked</div>}
                  >
                    <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-2xs font-medium">
                      ✓ Telemetry Stream Visible
                    </div>
                  </Can>
                </CardContent>
              </Card>

              {/* Editor permission */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                    <Edit3 className="h-4 w-4 text-amber-600" />
                    <span>Dispatch Actions (orders:write)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p className="text-2xs text-muted-foreground">Available to Admin and Editor only.</p>
                  <Can
                    permission="orders:write"
                    fallback={<div className="text-muted-foreground text-2xs flex items-center gap-1"><Lock className="h-3 w-3" /> Hidden from Viewer</div>}
                  >
                    <Button size="sm" onClick={() => toast.success("Order edited")} className="w-full text-xs">
                      Edit Dispatch Manifest
                    </Button>
                  </Can>
                </CardContent>
              </Card>

              {/* Admin only */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                    <Trash2 className="h-4 w-4 text-rose-600" />
                    <span>System Administration (admin)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p className="text-2xs text-muted-foreground">Exclusive to Administrator role.</p>
                  <Can
                    role="admin"
                    fallback={<div className="text-muted-foreground text-2xs flex items-center gap-1"><Lock className="h-3 w-3" /> Admin Only</div>}
                  >
                    <Button size="sm" variant="destructive" onClick={() => toast.error("System reset")} className="w-full text-xs">
                      Emergency SCADA Override
                    </Button>
                  </Can>
                </CardContent>
              </Card>
            </div>
          </div>
        </AppShell>
      </PermissionProvider>
    </DemoFrame>
  );
}

export default PermissionsDemo;

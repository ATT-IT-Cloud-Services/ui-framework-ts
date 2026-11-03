"use client";

import * as React from "react";
import { AppShell, UserMenu, PageHeader } from "@fw/shell";
import { SplitWithInfoPanel } from "@fw/layouts";
import { InfoPanel, StatusBadge } from "@fw/panels";
import { NotificationCenter } from "@fw/overlays";
import { Button, Badge } from "@fw/ui";
import { toast } from "@fw/overlays";
import { LogOut, Shield, ShieldCheck } from "lucide-react";
import { DemoFrame } from "../../_shared/DemoFrame";
import { LoginPage, MOCK_ACCOUNTS, createMockAuthAdapter, type MockRole } from "../../_shared/auth";
import { OrdersPage } from "../../_shared/shared-pages/OrdersPage";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function EnterpriseShowcaseDemo() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentRole, setCurrentRole] = React.useState<MockRole>("admin");

  const account = MOCK_ACCOUNTS[currentRole];

  if (!isAuthenticated) {
    return (
      <DemoFrame
        demoId="combined-enterprise-showcase"
        title="Enterprise Showcase — Authentication Gateway"
        description="Choose a role to sign in to the full enterprise showcase shell."
        folderPath="demo/combined/enterprise-showcase/"
        preset={preset}
      >
        <LoginPage
          onSuccess={(role) => {
            setCurrentRole(role);
            setIsAuthenticated(true);
          }}
        />
      </DemoFrame>
    );
  }

  const infoPanelContent = (
    <InfoPanel
      title="Security & Operator Context"
      subtitle={`${account.name} (${currentRole.toUpperCase()})`}
      keyValues={[
        { key: "Session Status", value: "Authenticated" },
        { key: "Active Tenant", value: account.tenantName || "Central Grid" },
        { key: "Security Enclave", value: "Level 4 (EU-Central)" },
        { key: "Roles", value: account.roles.join(", ") },
      ]}
      activities={[
        { id: "s1", actor: account.name, action: "signed in via mock auth", timestamp: "Just now" },
        { id: "s2", actor: "Security Daemon", action: "granted permissions ticket", timestamp: "Just now" },
      ]}
    />
  );

  return (
    <DemoFrame
      demoId="combined-enterprise-showcase"
      title="Flagship Enterprise Operations Showcase"
      description="Starts at mock login, dual-rail navigation, SplitWithInfoPanel, full role filtering (Admin / Editor / Viewer), and integrated notification center."
      folderPath="demo/combined/enterprise-showcase/"
      preset={preset}
      authAdapter={createMockAuthAdapter(currentRole)}
    >
      <AppShell
        navigationItems={DEMO_NAVIGATION_ITEMS}
        headerSlot={
          <div className="flex items-center gap-2">
            <NotificationCenter />
            {/* Live role switcher inside the header */}
            <div className="hidden sm:flex items-center gap-1 bg-muted/60 p-0.5 rounded-md text-2xs">
              <span className="px-1.5 text-muted-foreground font-semibold flex items-center gap-1">
                <Shield className="h-3 w-3 text-primary" /> Role:
              </span>
              {(["admin", "editor", "viewer"] as MockRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setCurrentRole(r);
                    toast.info(`Switched role to ${r.toUpperCase()}`);
                  }}
                  className={`px-2 py-0.5 rounded font-medium capitalize transition-all ${
                    currentRole === r
                      ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        }
        userMenuSlot={
          <UserMenu
            user={account}
            onSignOut={() => {
              setIsAuthenticated(false);
              toast.info("Signed out of session");
            }}
          />
        }
      >
        <div className="space-y-4">
          <PageHeader
            title="Enterprise Dispatch & SCADA Control Room"
            subtitle={`Signed in as ${account.name}. Active role privileges are applied to menus and buttons.`}
            badge={<StatusBadge status="active" label={`Role: ${currentRole.toUpperCase()}`} />}
            actions={
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-2xs">
                  <ShieldCheck className="h-3 w-3 text-primary me-1" />
                  {account.permissions.length} Permissions Active
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAuthenticated(false)}
                  className="text-xs gap-1.5"
                >
                  <LogOut className="h-3 w-3" />
                  Sign out
                </Button>
              </div>
            }
          />

          <SplitWithInfoPanel
            infoPanel={infoPanelContent}
            defaultRatio="2/3"
            panelTitle="Operator & Security Context"
          >
            <OrdersPage />
          </SplitWithInfoPanel>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default EnterpriseShowcaseDemo;

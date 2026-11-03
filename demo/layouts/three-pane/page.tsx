"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { ThreePane } from "@fw/layouts";
import { StatusBadge } from "@fw/panels";
import { Building2, Package, Globe } from "lucide-react";
import { DemoFrame } from "../../_shared/DemoFrame";
import { MOCK_CUSTOMERS } from "../../_shared/mock-data/customers";
import { MOCK_ORDERS } from "../../_shared/mock-data/orders";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function ThreePaneDemo() {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState(MOCK_CUSTOMERS[0].id);
  const [selectedOrderId, setSelectedOrderId] = React.useState(MOCK_ORDERS[0].id);

  const selectedCustomer = MOCK_CUSTOMERS.find((c) => c.id === selectedCustomerId) || MOCK_CUSTOMERS[0];
  const selectedOrder = MOCK_ORDERS.find((o) => o.id === selectedOrderId) || MOCK_ORDERS[0];

  const leftPane = (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Building2 className="h-3.5 w-3.5" />
        <span>Enterprise Clients</span>
      </h3>
      <div className="space-y-1">
        {MOCK_CUSTOMERS.map((cust) => (
          <button
            key={cust.id}
            type="button"
            onClick={() => setSelectedCustomerId(cust.id)}
            className={`w-full text-start p-2 rounded-lg text-xs transition-colors border ${
              cust.id === selectedCustomerId
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-transparent hover:bg-muted/50 text-foreground"
            }`}
          >
            <div className="font-medium truncate">{cust.name}</div>
            <div className="flex items-center justify-between text-2xs text-muted-foreground pt-0.5">
              <span>{cust.industry}</span>
              <span>{cust.tier}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const centerPane = (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Package className="h-3.5 w-3.5" />
        <span>Dispatch Orders ({selectedCustomer.name})</span>
      </h3>
      <div className="space-y-1">
        {MOCK_ORDERS.map((ord) => (
          <button
            key={ord.id}
            type="button"
            onClick={() => setSelectedOrderId(ord.id)}
            className={`w-full text-start p-2.5 rounded-lg text-xs transition-colors border ${
              ord.id === selectedOrderId
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border/60 hover:bg-muted/50 text-foreground"
            }`}
          >
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-2xs">{ord.orderNumber}</span>
              <StatusBadge status={ord.status} />
            </div>
            <div className="font-semibold truncate">€{ord.amount.toLocaleString()}</div>
            <div className="text-2xs text-muted-foreground">{ord.destination}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const rightPane = (
    <div className="space-y-4 text-xs">
      <div className="pb-3 border-b border-border">
        <span className="text-2xs text-primary uppercase font-bold tracking-wider">
          Order Manifest Details
        </span>
        <h2 className="text-base font-bold text-foreground">{selectedOrder.orderNumber}</h2>
        <p className="text-2xs text-muted-foreground">Consigned to {selectedCustomer.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
          <span className="text-2xs text-muted-foreground flex items-center gap-1">
            <Globe className="h-3 w-3" /> Destination Country
          </span>
          <span className="font-semibold block">{selectedCustomer.country}</span>
        </div>
        <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
          <span className="text-2xs text-muted-foreground">Payment Method</span>
          <span className="font-semibold block">{selectedOrder.paymentMethod}</span>
        </div>
      </div>

      <div className="rounded-lg border border-border p-4 bg-card space-y-2">
        <h4 className="font-semibold">Logistics Notes</h4>
        <p className="text-muted-foreground text-2xs leading-relaxed">
          High-precision components packaged under argon inert gas. Gate pass approval required
          prior to offloading.
        </p>
      </div>
    </div>
  );

  return (
    <DemoFrame
      demoId="layout-three-pane"
      title="ThreePane Layout Template"
      description="Three resizable columns: [App Navigation / Category List] | [Submenu / Entity List] | [Detail / Content Pane]."
      folderPath="demo/layouts/three-pane/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-3 h-full flex flex-col">
          <PageHeader
            title="Three-Pane Navigation Hierarchy"
            subtitle="Client account selector -> Order manifests list -> Inspection detail pane."
          />
          <div className="flex-1 min-h-[600px]">
            <ThreePane leftPane={leftPane} centerPane={centerPane} rightPane={rightPane} />
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default ThreePaneDemo;

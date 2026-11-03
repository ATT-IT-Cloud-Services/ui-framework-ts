"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { MasterDetail } from "@fw/layouts";
import { StatusBadge } from "@fw/panels";
import { Input, Button } from "@fw/ui";
import { Search } from "lucide-react";
import { DemoFrame } from "../../_shared/DemoFrame";
import { OrderDetailPage } from "../../_shared/shared-pages/OrderDetailPage";
import { MOCK_ORDERS } from "../../_shared/mock-data/orders";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function MasterDetailDemo() {
  const [selectedId, setSelectedId] = React.useState<string>(MOCK_ORDERS[1].id);
  const [search, setSearch] = React.useState("");

  const filteredOrders = MOCK_ORDERS.filter(
    (o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  const masterList = (
    <div className="flex flex-col h-full space-y-3 p-3">
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Orders ({filteredOrders.length})
        </h3>
        <div className="relative">
          <Search className="absolute start-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ps-8 h-8 text-xs"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pe-1">
        {filteredOrders.map((ord) => {
          const isSelected = ord.id === selectedId;
          return (
            <div
              key={ord.id}
              onClick={() => setSelectedId(ord.id)}
              className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border/60 hover:bg-muted/50 text-foreground"
              }`}
            >
              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-2xs">{ord.orderNumber}</span>
                <StatusBadge status={ord.status} />
              </div>
              <div className="font-medium truncate">{ord.customerName}</div>
              <div className="flex justify-between text-2xs text-muted-foreground pt-1">
                <span>{ord.date}</span>
                <span className="font-mono font-semibold">€{ord.amount.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <DemoFrame
      demoId="layout-master-detail"
      title="MasterDetail Layout Template"
      description="2-pane resizable layout: searchable list panel (300-400px) + detail pane. On mobile, automatically collapses to list -> detail with back button."
      folderPath="demo/layouts/master-detail/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-3 h-full flex flex-col">
          <PageHeader
            title="Orders Master-Detail Workspace"
            subtitle="Select an order from the master list to review details and dispatch actions."
            actions={
              <Button size="sm" className="text-xs font-semibold">
                New Order
              </Button>
            }
          />
          <div className="flex-1 min-h-[600px]">
            <MasterDetail
              master={masterList}
              detail={<OrderDetailPage orderId={selectedId} />}
              selectedId={selectedId}
              onClearSelection={() => setSelectedId("")}
            />
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default MasterDetailDemo;

"use client";

import * as React from "react";
import { ObjectPage } from "@fw/layouts";
import { StatusBadge, StickyActionBar } from "@fw/panels";
import { Button, Card, CardContent } from "@fw/ui";
import { toast } from "@fw/overlays";
import { FileText, Printer, Check, Copy } from "lucide-react";
import { MOCK_ORDERS } from "../mock-data/orders";

export function OrderDetailPage({ orderId = "ord-102" }: { orderId?: string }) {
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[1];
  const [hasChanges, setHasChanges] = React.useState(false);

  const handleSave = () => {
    toast.success("Order specifications saved successfully.");
    setHasChanges(false);
  };

  const sections = [
    {
      id: "logistics",
      title: "1. Logistics & Fulfillment Details",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-2xs text-muted-foreground block">Customer Company</span>
            <span className="font-semibold text-foreground block">{order.customerName}</span>
            <span className="text-muted-foreground block">{order.customerEmail}</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xs text-muted-foreground block">Dispatch Destination</span>
            <span className="font-semibold text-foreground block">{order.destination}</span>
            <span className="text-muted-foreground block">Carrier: DHL Industrial Freight</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xs text-muted-foreground block">Payment Terms</span>
            <span className="font-semibold text-foreground block">{order.paymentMethod} (Net 30)</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xs text-muted-foreground block">Fulfillment SLA</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
              On Schedule (Expected April 2, 2026)
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "items",
      title: "2. Industrial Component Line Items",
      content: (
        <div className="space-y-3">
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted/40 border-b border-border text-start text-muted-foreground">
                <tr>
                  <th className="p-2.5 text-start font-semibold">SKU / Component</th>
                  <th className="p-2.5 text-end font-semibold">Unit Price</th>
                  <th className="p-2.5 text-end font-semibold">Quantity</th>
                  <th className="p-2.5 text-end font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="p-2.5">
                    <span className="font-semibold block">VLV-IND-320</span>
                    <span className="text-2xs text-muted-foreground">Cryogenic Pressure Valve 320mm</span>
                  </td>
                  <td className="p-2.5 text-end font-mono">€1,250.00</td>
                  <td className="p-2.5 text-end font-mono">20</td>
                  <td className="p-2.5 text-end font-mono font-semibold">€25,000.00</td>
                </tr>
                <tr>
                  <td className="p-2.5">
                    <span className="font-semibold block">SNS-VIB-90</span>
                    <span className="text-2xs text-muted-foreground">High-Temp Vibration Sensor</span>
                  </td>
                  <td className="p-2.5 text-end font-mono">€840.00</td>
                  <td className="p-2.5 text-end font-mono">4</td>
                  <td className="p-2.5 text-end font-mono font-semibold">€3,360.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end p-2 text-xs">
            <div className="space-y-1 text-end">
              <div className="text-muted-foreground">Subtotal: €28,360.00</div>
              <div className="text-muted-foreground">VAT & Freight: €10,040.50</div>
              <div className="text-sm font-bold text-foreground">Total Amount: €38,400.50</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "certifications",
      title: "3. Compliance & Quality Assurance",
      content: (
        <div className="space-y-2 text-xs">
          <Card className="border-border">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <span className="font-semibold block">ISO-9001 Factory Quality Certificate</span>
                  <span className="text-2xs text-muted-foreground">Verified by TÜV Rheinland</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-2xs">
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "notes",
      title: "4. Internal Dispatch Notes",
      content: (
        <div className="space-y-2">
          <textarea
            className="w-full h-24 p-2.5 text-xs rounded-md border border-input bg-background"
            defaultValue="Special container packaging required for high-pressure cryogenic units. Customer requested delivery notice 24h prior to gate arrival."
            onChange={() => setHasChanges(true)}
          />
        </div>
      ),
    },
  ];

  return (
    <ObjectPage
      title={`Order ${order.orderNumber}`}
      subtitle="Bavaria Power Systems — High-pressure industrial components dispatch"
      status={<StatusBadge status={order.status} />}
      attributes={[
        { label: "Total Value", value: `€${order.amount.toLocaleString()}` },
        { label: "Total Items", value: `${order.itemCount} units` },
        { label: "Fulfillment Date", value: order.date },
        { label: "Payment Mode", value: order.paymentMethod },
      ]}
      headerActions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("Printing dispatch manifest...")}
            className="h-8 text-xs gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(order.orderNumber);
              toast.success("Order number copied");
            }}
            className="h-8 text-xs gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy SKU
          </Button>
          <Button
            size="sm"
            onClick={() => toast.success("Order approved for dispatch")}
            className="h-8 text-xs font-semibold gap-1.5"
          >
            <Check className="h-3.5 w-3.5" />
            Approve Order
          </Button>
        </>
      }
      sections={sections}
      footerActionBar={
        <StickyActionBar
          hasUnsavedChanges={hasChanges}
          onSave={handleSave}
          onCancel={() => setHasChanges(false)}
        />
      }
    />
  );
}

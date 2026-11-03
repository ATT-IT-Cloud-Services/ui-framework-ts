"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Plus, Trash2, CheckCircle, Eye, Building2, Package, ShieldCheck } from "lucide-react";
import { PageHeader } from "@fw/shell";
import { DataTable, StatusBadge, BulkActionBar } from "@fw/panels";
import { WizardDialog } from "@fw/feedback";
import { Button, Input, Slider, NumericInput, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@fw/ui";
import { toast } from "@fw/overlays";
import { MOCK_ORDERS, type MockOrder } from "../mock-data/orders";
import { MOCK_CUSTOMERS } from "../mock-data/customers";
import { MOCK_PRODUCTS } from "../mock-data/products";

export function OrdersPage() {
  const [data, setData] = React.useState<MockOrder[]>(MOCK_ORDERS);
  const [selectedOrders, setSelectedOrders] = React.useState<MockOrder[]>([]);

  // Wizard state
  const [wizardOpen, setWizardOpen] = React.useState(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);

  // Wizard form state
  const [selectedCustomer, setSelectedCustomer] = React.useState(MOCK_CUSTOMERS[0].name);
  const [customerEmail, setCustomerEmail] = React.useState("procurement@nordic-auto.no");
  const [destination, setDestination] = React.useState("Oslo, Norway");
  const [paymentMethod, setPaymentMethod] = React.useState<"Invoice" | "Card" | "SEPA" | "Wire Transfer">("Invoice");

  const [selectedProductSku, setSelectedProductSku] = React.useState(MOCK_PRODUCTS[0].sku);
  const [quantity, setQuantity] = React.useState(12);
  const [unitPrice, setUnitPrice] = React.useState(MOCK_PRODUCTS[0].unitPrice);
  const [complianceChecked, setComplianceChecked] = React.useState(true);

  // Sync unit price when product changes
  React.useEffect(() => {
    const prod = MOCK_PRODUCTS.find((p) => p.sku === selectedProductSku);
    if (prod) {
      setUnitPrice(prod.unitPrice);
    }
  }, [selectedProductSku]);

  const totalAmount = quantity * unitPrice;

  const handleFinishWizard = () => {
    setSubmitting(true);
    setTimeout(() => {
      const newOrderNum = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: MockOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNum,
        customerName: selectedCustomer,
        customerEmail: customerEmail,
        date: new Date().toISOString().split("T")[0],
        amount: totalAmount,
        status: "active",
        itemCount: quantity,
        paymentMethod: paymentMethod,
        destination: destination,
      };

      setData((prev) => [newOrder, ...prev]);
      setSubmitting(false);
      setWizardOpen(false);
      setCurrentStepIndex(0);
      toast.success(`Purchase Order ${newOrderNum} created and dispatched!`);
    }, 700);
  };

  const columns: ColumnDef<MockOrder>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order #",
      cell: ({ row }) => (
        <span className="font-mono font-semibold text-primary">{row.original.orderNumber}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.original.customerName}</span>
          <span className="text-2xs text-muted-foreground">{row.original.customerEmail}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-mono font-semibold text-foreground">
          €{row.original.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      accessorKey: "destination",
      header: "Destination",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.destination}</span>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.date}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => toast.info(`Viewing ${row.original.orderNumber}`)}
            title="View Details"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const handleBulkComplete = () => {
    setData((prev) =>
      prev.map((ord) =>
        selectedOrders.some((s) => s.id === ord.id)
          ? { ...ord, status: "completed" as const }
          : ord
      )
    );
    toast.success(`Marked ${selectedOrders.length} orders as completed`);
    setSelectedOrders([]);
  };

  const handleBulkDelete = () => {
    setData((prev) => prev.filter((ord) => !selectedOrders.some((s) => s.id === ord.id)));
    toast.error(`Removed ${selectedOrders.length} orders`);
    setSelectedOrders([]);
  };

  const wizardSteps = [
    {
      id: "customer",
      title: "1. Customer & Destination",
      isValid: !!selectedCustomer && !!destination,
    },
    {
      id: "items",
      title: "2. Line Items & Units",
      isValid: quantity > 0 && unitPrice > 0,
    },
    {
      id: "review",
      title: "3. Review & Sign-Off",
      isValid: complianceChecked,
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Fulfillment & Dispatch Orders"
        subtitle="Manage and audit industrial component purchase orders and dispatch status."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Exporting CSV...")}
              className="text-xs gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setCurrentStepIndex(0);
                setWizardOpen(true);
              }}
              className="text-xs font-semibold gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Order
            </Button>
          </div>
        }
      />

      <DataTable
        columns={columns}
        data={data}
        searchKey="customerName"
        searchPlaceholder="Filter by customer name..."
        enableRowSelection
        onSelectionChange={setSelectedOrders}
      />

      {/* Floating bulk action bar */}
      <BulkActionBar
        selectedCount={selectedOrders.length}
        onClearSelection={() => setSelectedOrders([])}
        actions={[
          {
            label: "Complete All",
            onClick: handleBulkComplete,
            icon: CheckCircle,
          },
          {
            label: "Delete",
            onClick: handleBulkDelete,
            variant: "destructive",
            icon: Trash2,
          },
        ]}
      />

      {/* Multi-Step Wizard Modal for Creating Orders */}
      <WizardDialog
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        title="Create Industrial Dispatch Order"
        subtitle="Follow the 3-step wizard to register client details, allocate inventory, and confirm delivery."
        steps={wizardSteps}
        currentStepIndex={currentStepIndex}
        onStepChange={setCurrentStepIndex}
        onFinish={handleFinishWizard}
        finishLabel="Submit Purchase Order"
        isSubmitting={submitting}
        size="lg"
      >
        {currentStepIndex === 0 && (
          <div className="space-y-4 animate-in fade-in-50 text-xs">
            <div className="flex items-center gap-2 pb-1 text-primary font-semibold">
              <Building2 className="h-4 w-4" />
              <span>Step 1: Client Account & Logistics Route</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-2xs font-medium text-muted-foreground">Select Customer</label>
                <Select
                  value={selectedCustomer}
                  onValueChange={(val) => {
                    setSelectedCustomer(val);
                    const match = MOCK_CUSTOMERS.find((c) => c.name === val);
                    if (match) setDestination(`${match.country} Main Facility`);
                  }}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_CUSTOMERS.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name} ({c.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-2xs font-medium text-muted-foreground">Procurement Contact Email</label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-2xs font-medium text-muted-foreground">Delivery Destination Hub</label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="E.g. Hamburg, Germany"
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-2xs font-medium text-muted-foreground">Payment Terms</label>
                <Select
                  value={paymentMethod}
                  onValueChange={(val) => setPaymentMethod(val as "Invoice" | "Card" | "SEPA" | "Wire Transfer")}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Invoice">Invoice (Net 30)</SelectItem>
                    <SelectItem value="Wire Transfer">Wire Transfer (SEPA B2B)</SelectItem>
                    <SelectItem value="Card">Corporate Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {currentStepIndex === 1 && (
          <div className="space-y-4 animate-in fade-in-50 text-xs">
            <div className="flex items-center gap-2 pb-1 text-primary font-semibold">
              <Package className="h-4 w-4" />
              <span>Step 2: Component Allocation & Quantity</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-2xs font-medium text-muted-foreground">Select Component SKU</label>
              <Select
                value={selectedProductSku}
                onValueChange={setSelectedProductSku}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_PRODUCTS.map((prod) => (
                    <SelectItem key={prod.id} value={prod.sku}>
                      {prod.name} ({prod.sku}) — €{prod.unitPrice}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Slider + Numeric Input */}
            <div className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground block">Order Quantity</span>
                  <span className="text-2xs text-muted-foreground">Use the slider or stepper controls</span>
                </div>
                <NumericInput
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={100}
                  step={1}
                  unit="units"
                />
              </div>

              <Slider
                value={[quantity]}
                onValueChange={(val) => setQuantity(val[0])}
                min={1}
                max={100}
                step={1}
                showValue
                valueSuffix=" units"
              />
            </div>

            {/* Live Calculation preview */}
            <div className="flex justify-between items-center p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs">
              <span className="text-muted-foreground">Calculated Subtotal:</span>
              <span className="font-mono text-base font-bold text-primary">
                €{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}

        {currentStepIndex === 2 && (
          <div className="space-y-4 animate-in fade-in-50 text-xs">
            <div className="flex items-center gap-2 pb-1 text-primary font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Step 3: Verification & Compliance Sign-Off</span>
            </div>

            <div className="p-3.5 rounded-lg border border-border bg-card space-y-2 text-xs">
              <div className="flex justify-between pb-1 border-b border-border/60">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-semibold text-foreground">{selectedCustomer}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-border/60">
                <span className="text-muted-foreground">Destination:</span>
                <span className="font-semibold text-foreground">{destination}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-border/60">
                <span className="text-muted-foreground">Component:</span>
                <span className="font-mono">{selectedProductSku} ({quantity} units)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-bold text-foreground">Total Payable:</span>
                <span className="font-mono text-base font-bold text-primary">
                  €{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="compliance"
                checked={complianceChecked}
                onCheckedChange={(c) => setComplianceChecked(!!c)}
              />
              <label htmlFor="compliance" className="text-xs text-muted-foreground cursor-pointer leading-tight">
                I confirm that all allocated components meet ISO-9001 quality specifications and are cleared for industrial container transport.
              </label>
            </div>
          </div>
        )}
      </WizardDialog>
    </div>
  );
}

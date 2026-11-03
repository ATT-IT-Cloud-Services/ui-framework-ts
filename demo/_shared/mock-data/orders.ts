export interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  status: "active" | "pending" | "completed" | "error" | "warning";
  itemCount: number;
  paymentMethod: "Invoice" | "Card" | "SEPA" | "Wire Transfer";
  destination: string;
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-101",
    orderNumber: "ORD-2026-9041",
    customerName: "Nordic Automation AS",
    customerEmail: "procurement@nordic-auto.no",
    date: "2026-03-24",
    amount: 14250.0,
    status: "completed",
    itemCount: 8,
    paymentMethod: "Invoice",
    destination: "Oslo, Norway",
  },
  {
    id: "ord-102",
    orderNumber: "ORD-2026-9042",
    customerName: "Bavaria Power Systems",
    customerEmail: "engineering@bavaria-power.de",
    date: "2026-03-25",
    amount: 38400.5,
    status: "active",
    itemCount: 24,
    paymentMethod: "Wire Transfer",
    destination: "Munich, Germany",
  },
  {
    id: "ord-103",
    orderNumber: "ORD-2026-9043",
    customerName: "Helvetia Precision AG",
    customerEmail: "orders@helvetia-prec.ch",
    date: "2026-03-26",
    amount: 7200.0,
    status: "pending",
    itemCount: 4,
    paymentMethod: "Card",
    destination: "Zurich, Switzerland",
  },
  {
    id: "ord-104",
    orderNumber: "ORD-2026-9044",
    customerName: "Rhône Energy SAS",
    customerEmail: "logistics@rhone-energy.fr",
    date: "2026-03-27",
    amount: 51200.0,
    status: "warning",
    itemCount: 16,
    paymentMethod: "Invoice",
    destination: "Lyon, France",
  },
  {
    id: "ord-105",
    orderNumber: "ORD-2026-9045",
    customerName: "Iberica Grid S.L.",
    customerEmail: "supplies@ibericagrid.es",
    date: "2026-03-28",
    amount: 9800.0,
    status: "error",
    itemCount: 3,
    paymentMethod: "SEPA",
    destination: "Madrid, Spain",
  },
  {
    id: "ord-106",
    orderNumber: "ORD-2026-9046",
    customerName: "Baltic Cybernetics Ltd",
    customerEmail: "info@baltic-cyber.ee",
    date: "2026-03-29",
    amount: 19400.0,
    status: "completed",
    itemCount: 12,
    paymentMethod: "Invoice",
    destination: "Tallinn, Estonia",
  },
  {
    id: "ord-107",
    orderNumber: "ORD-2026-9047",
    customerName: "Vienna Operations GmbH",
    customerEmail: "ops@vienna-operations.at",
    date: "2026-03-30",
    amount: 22600.0,
    status: "active",
    itemCount: 15,
    paymentMethod: "Wire Transfer",
    destination: "Vienna, Austria",
  },
];

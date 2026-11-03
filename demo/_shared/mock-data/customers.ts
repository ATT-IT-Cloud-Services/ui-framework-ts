export interface MockCustomer {
  id: string;
  name: string;
  industry: string;
  tier: "Enterprise" | "Standard" | "Strategic";
  country: string;
  activeOrders: number;
}

export const MOCK_CUSTOMERS: MockCustomer[] = [
  {
    id: "cust-1",
    name: "Nordic Automation AS",
    industry: "Renewable Energy",
    tier: "Strategic",
    country: "Norway",
    activeOrders: 4,
  },
  {
    id: "cust-2",
    name: "Bavaria Power Systems",
    industry: "Turbomachinery",
    tier: "Enterprise",
    country: "Germany",
    activeOrders: 8,
  },
  {
    id: "cust-3",
    name: "Helvetia Precision AG",
    industry: "Semiconductors",
    tier: "Strategic",
    country: "Switzerland",
    activeOrders: 2,
  },
  {
    id: "cust-4",
    name: "Rhône Energy SAS",
    industry: "Grid Distribution",
    tier: "Enterprise",
    country: "France",
    activeOrders: 5,
  },
];

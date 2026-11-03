export interface MockProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  unitPrice: number;
  status: "In Stock" | "Low Stock" | "Backorder";
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "prod-1",
    sku: "VLV-IND-320",
    name: "Industrial Cryo Pressure Valve 320mm",
    category: "Actuators & Valves",
    stock: 42,
    unitPrice: 1250.0,
    status: "In Stock",
  },
  {
    id: "prod-2",
    sku: "SNS-VIB-90",
    name: "Tri-Axial High-Temp Vibration Sensor",
    category: "Sensors & Telemetry",
    stock: 5,
    unitPrice: 840.0,
    status: "Low Stock",
  },
  {
    id: "prod-3",
    sku: "PLC-MOD-X8",
    name: "Fault-Tolerant Safety PLC Module X8",
    category: "Process Controllers",
    stock: 0,
    unitPrice: 4600.0,
    status: "Backorder",
  },
  {
    id: "prod-4",
    sku: "FLT-HYD-500",
    name: "High-Pressure Hydraulic Micro-Filter",
    category: "Fluidics",
    stock: 128,
    unitPrice: 195.0,
    status: "In Stock",
  },
];

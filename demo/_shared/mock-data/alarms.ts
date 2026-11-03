import type { AlarmItem } from "@fw/realtime";

export const MOCK_ALARMS: AlarmItem[] = [
  {
    id: "alm-1",
    source: "Turbine-04 (Rotor Bearing)",
    message: "High temperature alert: 98.4°C exceeding 92.0°C safety envelope.",
    severity: "critical",
    timestamp: "12m ago",
    acknowledged: false,
  },
  {
    id: "alm-2",
    source: "Cooling Circuit B",
    message: "Inlet pressure drop to 2.1 bar (nominal 3.5 bar).",
    severity: "high",
    timestamp: "24m ago",
    acknowledged: false,
  },
  {
    id: "alm-3",
    source: "Generator Substation 2",
    message: "Harmonic distortion detected on Phase L3 (4.2% THD).",
    severity: "medium",
    timestamp: "1h ago",
    acknowledged: true,
  },
  {
    id: "alm-4",
    source: "Backup Battery Rack 01",
    message: "Ambient cell temperature 28°C (recommended < 25°C).",
    severity: "low",
    timestamp: "3h ago",
    acknowledged: true,
    shelved: true,
  },
];

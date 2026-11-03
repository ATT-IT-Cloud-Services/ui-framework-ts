export interface MockTicket {
  id: string;
  subject: string;
  sender: string;
  date: string;
  unread: boolean;
  priority: "High" | "Medium" | "Low";
  preview: string;
}

export const MOCK_INBOX: MockTicket[] = [
  {
    id: "msg-1",
    subject: "Urgent: Turbine 4 vibration audit request",
    sender: "Dr. K. Lindqvist (Chief Engineer)",
    date: "10:45 AM",
    unread: true,
    priority: "High",
    preview: "Telemetry indicates harmonic oscillation at 140Hz. Please confirm dispatch of specialist team...",
  },
  {
    id: "msg-2",
    subject: "Order #9042 component schedule updated",
    sender: "Supply Chain Automated",
    date: "09:12 AM",
    unread: true,
    priority: "Medium",
    preview: "Cryo valves have departed the central logistics warehouse in Hamburg...",
  },
  {
    id: "msg-3",
    subject: "Quarterly preventative maintenance checklist",
    sender: "Operations Control",
    date: "Yesterday",
    unread: false,
    priority: "Low",
    preview: "All plant managers are requested to complete the safety sign-offs by Friday...",
  },
];

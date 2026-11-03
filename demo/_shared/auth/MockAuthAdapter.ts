import type { AuthAdapter, AuthUser } from "@fw/adapters";

export type MockRole = "admin" | "editor" | "viewer";

export interface MockAccount {
  user: AuthUser;
  passwordHash: string;
}

export const MOCK_ACCOUNTS: Record<MockRole, AuthUser> = {
  admin: {
    id: "usr-admin-1",
    name: "Dr. Elena Rostova",
    email: "elena.admin@enterprise.internal",
    roles: ["admin"],
    permissions: ["orders:read", "orders:write", "telemetry:audit", "system:configure"],
    tenantId: "t-central-grid",
    tenantName: "Central Grid Operator",
  },
  editor: {
    id: "usr-editor-2",
    name: "Marcus Vance",
    email: "marcus.editor@enterprise.internal",
    roles: ["editor"],
    permissions: ["orders:read", "orders:write"],
    tenantId: "t-central-grid",
    tenantName: "Central Grid Operator",
  },
  viewer: {
    id: "usr-viewer-3",
    name: "Aisha Al-Mansoor",
    email: "aisha.viewer@enterprise.internal",
    roles: ["viewer"],
    permissions: ["orders:read"],
    tenantId: "t-central-grid",
    tenantName: "Central Grid Operator",
  },
};

export function createMockAuthAdapter(initialRole: MockRole = "admin"): AuthAdapter {
  let currentUser: AuthUser | null = MOCK_ACCOUNTS[initialRole];
  let currentStatus: "authenticated" | "unauthenticated" = "authenticated";

  return {
    status: currentStatus,
    user: currentUser,
    roles: currentUser ? currentUser.roles : [],
    permissions: currentUser ? currentUser.permissions : [],
    signOut: () => {
      currentUser = null;
      currentStatus = "unauthenticated";
    },
  };
}

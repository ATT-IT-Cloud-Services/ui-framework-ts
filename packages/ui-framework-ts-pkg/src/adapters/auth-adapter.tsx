"use client";

import * as React from "react";
import type { AuthAdapter, AuthUser, SessionStatus } from "./types";

export const AnonymousAuthAdapter: AuthAdapter = {
  status: "anonymous",
  user: null,
  roles: [],
  permissions: [],
};

const AuthContext = React.createContext<AuthAdapter>(AnonymousAuthAdapter);

export interface SessionProviderProps {
  children: React.ReactNode;
  adapter?: AuthAdapter;
}

export function SessionProvider({
  children,
  adapter = AnonymousAuthAdapter,
}: SessionProviderProps) {
  return <AuthContext.Provider value={adapter}>{children}</AuthContext.Provider>;
}

export function useSession(): {
  status: SessionStatus;
  user: AuthUser | null;
  roles: string[];
  permissions: string[];
  isAuthenticated: boolean;
  signOut: () => Promise<void> | void;
} {
  const context = React.useContext(AuthContext);
  return {
    status: context.status,
    user: context.user,
    roles: context.roles,
    permissions: context.permissions,
    isAuthenticated: context.status === "authenticated",
    signOut: context.signOut ?? (() => {}),
  };
}

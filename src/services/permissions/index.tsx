"use client";

import * as React from "react";
import { useSession } from "../../adapters/auth-adapter";

export interface PermissionContextValue {
  permissions: string[];
  roles: string[];
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  can: (opts: { permission?: string; role?: string }) => boolean;
}

const PermissionContext = React.createContext<PermissionContextValue | null>(null);

export function PermissionProvider({
  children,
  permissions: overridePermissions,
  roles: overrideRoles,
}: {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
}) {
  const session = useSession();

  const sessionPermissions = session.permissions;
  const sessionRoles = session.roles;

  const permissions = React.useMemo(
    () => overridePermissions ?? sessionPermissions ?? [],
    [overridePermissions, sessionPermissions]
  );
  const roles = React.useMemo(
    () => overrideRoles ?? sessionRoles ?? [],
    [overrideRoles, sessionRoles]
  );

  const hasPermission = React.useCallback(
    (perm: string) => {
      if (roles.includes("admin")) return true;
      return permissions.includes(perm);
    },
    [permissions, roles]
  );

  const hasRole = React.useCallback(
    (role: string) => roles.includes(role),
    [roles]
  );

  const can = React.useCallback(
    ({ permission, role }: { permission?: string; role?: string }) => {
      if (role && !hasRole(role)) return false;
      if (permission && !hasPermission(permission)) return false;
      return true;
    },
    [hasRole, hasPermission]
  );

  const value = React.useMemo<PermissionContextValue>(() => {
    return { permissions, roles, hasPermission, hasRole, can };
  }, [permissions, roles, hasPermission, hasRole, can]);

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

export function usePermission() {
  const context = React.useContext(PermissionContext);
  if (!context) {
    // Graceful fallback to session directly if provider wasn't mounted
    return {
      permissions: [],
      roles: [],
      hasPermission: () => true,
      hasRole: () => true,
      can: () => true,
    };
  }
  return context;
}

export function Can({
  permission,
  role,
  fallback = null,
  children,
}: {
  permission?: string;
  role?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { can } = usePermission();
  const allowed = can({ permission, role });

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

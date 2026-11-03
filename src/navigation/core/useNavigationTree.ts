"use client";

import * as React from "react";
import type { NavigationItem, NavigationTreeState } from "./types";
import { useSession } from "../../adapters/auth-adapter";
import { usePermission } from "../../services/permissions";
import { useT } from "../../i18n/provider";

function filterByPermissions(
  items: NavigationItem[],
  userRoles: string[],
  userPermissions: string[]
): NavigationItem[] {
  return items
    .filter((item) => {
      if (item.requiredRoles && item.requiredRoles.length > 0) {
        const hasRole = item.requiredRoles.some((role) => userRoles.includes(role));
        if (!hasRole) return false;
      }
      if (item.requiredPermissions && item.requiredPermissions.length > 0) {
        const hasPerm = item.requiredPermissions.some((perm) =>
          userPermissions.includes(perm)
        );
        if (!hasPerm) return false;
      }
      return true;
    })
    .map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: filterByPermissions(item.children, userRoles, userPermissions),
        };
      }
      return item;
    });
}

function findActiveChain(
  items: NavigationItem[],
  currentPath: string,
  chain: string[] = []
): { activeId: string | null; chain: string[] } {
  for (const item of items) {
    const nextChain = [...chain, item.id];
    if (item.href && (currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href)))) {
      return { activeId: item.id, chain: nextChain };
    }
    if (item.children && item.children.length > 0) {
      const found = findActiveChain(item.children, currentPath, nextChain);
      if (found.activeId) return found;
    }
  }
  return { activeId: null, chain: [] };
}

function flattenItems(items: NavigationItem[]): NavigationItem[] {
  const result: NavigationItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children) {
      result.push(...flattenItems(item.children));
    }
  }
  return result;
}

export function useNavigationTree(
  items: NavigationItem[],
  currentPath?: string
): NavigationTreeState {
  const session = useSession();
  const perm = usePermission();

  const roles = perm.roles.length > 0 ? perm.roles : session.roles;
  const permissions = perm.permissions.length > 0 ? perm.permissions : session.permissions;

  const t = useT();

  const [activePath, setActivePath] = React.useState<string>("");
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());
  const [pinnedIds, setPinnedIds] = React.useState<string[]>([]);
  const [recents, setRecents] = React.useState<NavigationItem[]>([]);

  // Update active path from window location if not passed explicitly
  React.useEffect(() => {
    if (currentPath !== undefined) {
      setActivePath(currentPath);
    } else if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, [currentPath]);

  // Load pinned items from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("fw-pinned-nav");
      if (stored) {
        setPinnedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Filter items by user permissions/roles
  const filteredItems = React.useMemo(() => {
    return filterByPermissions(items, roles, permissions);
  }, [items, roles, permissions]);

  // Find active chain and auto-expand active ancestors
  const { activeId, chain: activeChain } = React.useMemo(() => {
    if (!activePath) return { activeId: null, chain: [] };
    return findActiveChain(filteredItems, activePath);
  }, [filteredItems, activePath]);

  React.useEffect(() => {
    if (activeChain.length > 1) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        // Add all parents (all elements in chain except last item)
        for (let i = 0; i < activeChain.length - 1; i++) {
          next.add(activeChain[i]);
        }
        return next;
      });
    }
  }, [activeChain]);

  const toggleExpand = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isExpanded = React.useCallback(
    (id: string) => expandedIds.has(id),
    [expandedIds]
  );

  const pinItem = React.useCallback((id: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem("fw-pinned-nav", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const unpinItem = React.useCallback((id: string) => {
    setPinnedIds((prev) => {
      const next = prev.filter((item) => item !== id);
      try {
        localStorage.setItem("fw-pinned-nav", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const flat = React.useMemo(() => flattenItems(filteredItems), [filteredItems]);

  const pinnedItems = React.useMemo(() => {
    return flat.filter((item) => pinnedIds.includes(item.id) || item.pinned);
  }, [flat, pinnedIds]);

  const recordRecent = React.useCallback((item: NavigationItem) => {
    setRecents((prev) => {
      const filtered = prev.filter((p) => p.id !== item.id);
      return [item, ...filtered].slice(0, 5);
    });
  }, []);

  const getItemLabel = React.useCallback(
    (item: NavigationItem): string => {
      if (item.labelKey) {
        return t(item.labelKey, undefined, item.label || item.id);
      }
      return item.label || item.id;
    },
    [t]
  );

  return {
    items: filteredItems,
    activeId,
    activeChain,
    expandedIds,
    toggleExpand,
    isExpanded,
    pinItem,
    unpinItem,
    pinnedItems,
    recentItems: recents,
    recordRecent,
    getItemLabel,
  };
}

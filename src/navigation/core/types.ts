import type { ComponentType } from "react";

export interface NavigationItem {
  id: string;
  label?: string;
  labelKey?: string;
  icon?: ComponentType<{ className?: string }>;
  href?: string;
  children?: NavigationItem[];
  badge?: string | number;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
  tag?: string; // e.g. "NEW", "BETA"
  requiredPermissions?: string[];
  requiredRoles?: string[];
  section?: string;
  pinned?: boolean;
  external?: boolean;
  disabled?: boolean;
}

export interface NavigationTreeState {
  items: NavigationItem[];
  activeId: string | null;
  activeChain: string[];
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  isExpanded: (id: string) => boolean;
  pinItem: (id: string) => void;
  unpinItem: (id: string) => void;
  pinnedItems: NavigationItem[];
  recentItems: NavigationItem[];
  recordRecent: (item: NavigationItem) => void;
  getItemLabel: (item: NavigationItem) => string;
}

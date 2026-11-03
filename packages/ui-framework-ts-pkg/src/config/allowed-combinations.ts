import type { NavigationMode, NavigationPosition, NavigationMatrixEntry } from "./types";

export const NAVIGATION_MATRIX: Record<NavigationMode, NavigationMatrixEntry> = {
  "sidebar-full": {
    mode: "sidebar-full",
    allowedPositions: ["start", "end"],
    defaultPosition: "start",
    supportsHoverExpand: false,
    supportsDualRail: false,
  },
  "sidebar-rail": {
    mode: "sidebar-rail",
    allowedPositions: ["start", "end"],
    defaultPosition: "start",
    supportsHoverExpand: true,
    supportsDualRail: false,
  },
  "sidebar-hybrid": {
    mode: "sidebar-hybrid",
    allowedPositions: ["start", "end"],
    defaultPosition: "start",
    supportsHoverExpand: true,
    supportsDualRail: false,
  },
  "sidebar-dual": {
    mode: "sidebar-dual",
    allowedPositions: ["start", "end"],
    defaultPosition: "start",
    supportsHoverExpand: false,
    supportsDualRail: true,
  },
  "sidebar-inset": {
    mode: "sidebar-inset",
    allowedPositions: ["start", "end"],
    defaultPosition: "start",
    supportsHoverExpand: false,
    supportsDualRail: false,
  },
  "topnav": {
    mode: "topnav",
    allowedPositions: ["top"],
    defaultPosition: "top",
    supportsHoverExpand: false,
    supportsDualRail: false,
  },
  "bottom-nav": {
    mode: "bottom-nav",
    allowedPositions: ["bottom", "top"],
    defaultPosition: "bottom",
    supportsHoverExpand: false,
    supportsDualRail: false,
  },
};

export function isAllowedCombination(
  mode: NavigationMode,
  position: NavigationPosition
): boolean {
  const entry = NAVIGATION_MATRIX[mode];
  if (!entry) return false;
  return entry.allowedPositions.includes(position);
}

export function getAllowedPositions(mode: NavigationMode): NavigationPosition[] {
  return NAVIGATION_MATRIX[mode]?.allowedPositions ?? ["start"];
}

export function getDefaultPositionForMode(mode: NavigationMode): NavigationPosition {
  return NAVIGATION_MATRIX[mode]?.defaultPosition ?? "start";
}

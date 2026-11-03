export type NavigationMode =
  | "sidebar-full"
  | "sidebar-rail"
  | "sidebar-hybrid"
  | "sidebar-dual"
  | "sidebar-inset"
  | "topnav"
  | "bottom-nav";

export type NavigationPosition = "start" | "end" | "top" | "bottom";

export type ContentWidth = "boxed" | "fluid" | "full";
export type Density = "comfortable" | "compact";
export type Radius = "sm" | "md" | "lg";
export type BrandColor = "blue" | "teal" | "violet" | "green" | "orange" | "custom";
export type ThemeMode = "light" | "dark" | "system";
export type ContrastMode = "normal" | "high";

export interface NavigationMatrixEntry {
  mode: NavigationMode;
  allowedPositions: NavigationPosition[];
  defaultPosition: NavigationPosition;
  supportsHoverExpand: boolean;
  supportsDualRail: boolean;
}

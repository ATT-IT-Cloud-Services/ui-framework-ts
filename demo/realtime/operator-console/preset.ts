import type { LayoutSettings } from "@fw/settings";

export const preset: Partial<LayoutSettings> = {
  navigationMode: "sidebar-dual",
  navigationPosition: "start",
  sidebarState: "expanded",
  headerSticky: true,
  showBreadcrumbs: true,
  contentWidth: "fluid",
  density: "compact",
  radius: "sm",
  theme: "dark",
  contrast: "high", // Control room contrast
};

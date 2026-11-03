import type { LayoutSettings } from "@fw/settings";

export const preset: Partial<LayoutSettings> = {
  navigationMode: "sidebar-full",
  navigationPosition: "end", // Mirrored on the right side in LTR
  sidebarState: "expanded",
  headerSticky: true,
  showBreadcrumbs: true,
  contentWidth: "fluid",
  density: "comfortable",
  radius: "md",
};

/**
 * Strict single z-index scale for the entire application framework.
 * Prevents z-index collisions across navigation, overlays, dialogs, and toasts.
 */
export const Z_INDEX = {
  base: 0,
  nav: 100,
  panel: 200,
  actionbar: 250,
  header: 300,
  sheet: 400,
  dialog: 500,
  popover: 600,
  toast: 700,
  tooltip: 800,
} as const;

export type ZIndexLevel = keyof typeof Z_INDEX;

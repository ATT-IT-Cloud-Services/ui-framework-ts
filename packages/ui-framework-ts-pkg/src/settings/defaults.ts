import type { LayoutSettings, OverlaySettings, LoadingSettings, I18nSettings, ContentLayoutOptions } from "./types";

export const DEFAULT_OVERLAY_SETTINGS: OverlaySettings = {
  toastPosition: "bottom-end",
  toastDuration: 4000,
  toastMaxVisible: 4,
  toastStyle: "default",
  toastIcons: true,
  toastCloseButton: true,
  toastExpandOnHover: true,
  tooltipDelay: "short",
  popoverTrigger: "click",
  overlayAnimation: "subtle",
  backdropBlur: "sm",
  blurLeftOnMenuOpen: true,
  mobileModalBehavior: "auto",
  motionPreference: "system",
};

export const DEFAULT_LOADING_SETTINGS: LoadingSettings = {
  showAfter: 200, // 200ms delay to prevent flicker on fast network requests
  minDuration: 350, // 350ms minimum display time once shown
  skeletonStyle: "shimmer",
  indicatorType: "bar",
};

export const DEFAULT_I18N_SETTINGS: I18nSettings = {
  locale: "en",
  timeZone: "UTC",
  dateFormat: "medium",
  numberFormat: "standard",
  showTranslationKeys: false,
};

export const FONT_SANS_PRESETS: Record<
  import("./types").FontFamilyPreset,
  { name: string; value: string }
> = {
  inter: {
    name: "Inter",
    value: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  geist: {
    name: "Geist Sans",
    value: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  roboto: {
    name: "Roboto",
    value: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  jakarta: {
    name: "Plus Jakarta Sans",
    value: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  "ibm-plex": {
    name: "IBM Plex Sans",
    value: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  system: {
    name: "Native System UI",
    value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  custom: {
    name: "Custom Font (User defined)",
    value: "inherit",
  },
};

export const FONT_MONO_PRESETS: Record<
  import("./types").MonoFontPreset,
  { name: string; value: string }
> = {
  jetbrains: {
    name: "JetBrains Mono",
    value: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  "geist-mono": {
    name: "Geist Mono",
    value: "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
  },
  "fira-code": {
    name: "Fira Code",
    value: "'Fira Code', ui-monospace, Menlo, Monaco, Consolas, monospace",
  },
  "ibm-plex-mono": {
    name: "IBM Plex Mono",
    value: "'IBM Plex Mono', monospace",
  },
  "system-mono": {
    name: "System Monospace",
    value: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  },
  custom: {
    name: "Custom Monospace (User defined)",
    value: "monospace",
  },
};

export const DEFAULT_TYPOGRAPHY_SETTINGS: import("./types").TypographySettings = {
  fontSans: "inter",
  fontMono: "jetbrains",
  fontHeading: "inter",
  fontSize: "14px",
  letterSpacing: "normal",
};

export const DEFAULT_CONTENT_LAYOUT_OPTIONS: ContentLayoutOptions = {
  padding: "comfortable",
  mobilePadding: "compact",
  mobileBehavior: "stack",
  overflowMode: "auto-scroll",
};

export const DEFAULT_LAYOUT_SETTINGS: LayoutSettings = {
  navigationMode: "sidebar-full",
  navigationPosition: "start",
  sidebarState: "expanded",
  headerSticky: true,
  sidebarSticky: true,
  showBreadcrumbs: true,

  contentWidth: "fluid",
  contentLayout: DEFAULT_CONTENT_LAYOUT_OPTIONS,
  density: "comfortable",
  radius: "md",
  fontSize: "14px",
  typography: DEFAULT_TYPOGRAPHY_SETTINGS,
  brandColor: "blue",
  customBrandHex: "#0064d9",
  theme: "system",
  contrast: "normal",

  overlays: DEFAULT_OVERLAY_SETTINGS,
  loading: DEFAULT_LOADING_SETTINGS,
  i18n: DEFAULT_I18N_SETTINGS,
};

export const BRAND_COLOR_PRESETS: Record<
  "blue" | "teal" | "violet" | "green" | "orange",
  { name: string; hex: string; primaryHsl: string; ringHsl: string }
> = {
  blue: {
    name: "Horizon Blue",
    hex: "#0064d9",
    primaryHsl: "214 100% 43%",
    ringHsl: "214 100% 43%",
  },
  teal: {
    name: "Enterprise Teal",
    hex: "#0d9488",
    primaryHsl: "175 84% 32%",
    ringHsl: "175 84% 32%",
  },
  violet: {
    name: "Modern Violet",
    hex: "#7c3aed",
    primaryHsl: "263 70% 58%",
    ringHsl: "263 70% 58%",
  },
  green: {
    name: "Operations Green",
    hex: "#16a34a",
    primaryHsl: "142 76% 36%",
    ringHsl: "142 76% 36%",
  },
  orange: {
    name: "Industrial Amber",
    hex: "#ea580c",
    primaryHsl: "24 95% 48%",
    ringHsl: "24 95% 48%",
  },
};

import type {
  NavigationMode,
  NavigationPosition,
  ContentWidth,
  Density,
  Radius,
  BrandColor,
  ThemeMode,
  ContrastMode,
} from "../config/types";

import type { SupportedLocale } from "../i18n/types";

export type SidebarState = "expanded" | "collapsed" | "hover-expand";
export type ToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export type ToastStyle = "default" | "solid" | "outlined" | "minimal";
export type TooltipDelay = "instant" | "short" | "long" | "off";
export type PopoverTriggerMode = "click" | "hover";
export type OverlayAnimation = "none" | "subtle" | "smooth";
export type BackdropBlur = "none" | "sm" | "md" | "lg";
export type MobileModalBehavior = "auto" | "dialog" | "drawer";
export type MotionPreference = "system" | "always" | "never";

export type SkeletonStyle = "pulse" | "shimmer";
export type LoadingIndicatorType = "bar" | "spinner" | "both";

export interface LoadingSettings {
  showAfter: number; // ms delay before showing loading (e.g. 0, 150, 200, 300, 500)
  minDuration: number; // ms minimum display duration once shown (e.g. 0, 200, 350, 500)
  skeletonStyle: SkeletonStyle; // "pulse" | "shimmer"
  indicatorType: LoadingIndicatorType; // "bar" | "spinner" | "both"
}

export type DateFormatPreset = "short" | "medium" | "long";
export type NumberFormatPreset = "standard" | "compact";

export type FontFamilyPreset =
  | "inter"
  | "geist"
  | "roboto"
  | "jakarta"
  | "ibm-plex"
  | "system"
  | "custom";

export type MonoFontPreset =
  | "jetbrains"
  | "geist-mono"
  | "fira-code"
  | "ibm-plex-mono"
  | "system-mono"
  | "custom";

export interface TypographySettings {
  fontSans: FontFamilyPreset;
  customSansFont?: string;
  fontMono: MonoFontPreset;
  customMonoFont?: string;
  fontHeading?: FontFamilyPreset;
  customHeadingFont?: string;
  fontSize: "13px" | "14px" | "15px" | "16px";
  letterSpacing?: "tight" | "normal" | "wide";
}

export interface OverlaySettings {
  toastPosition: ToastPosition;
  toastDuration: number; // ms, 0 = persistent
  toastMaxVisible: number;
  toastStyle: ToastStyle;
  toastIcons: boolean;
  toastCloseButton: boolean;
  toastExpandOnHover: boolean;
  tooltipDelay: TooltipDelay;
  popoverTrigger: PopoverTriggerMode;
  overlayAnimation: OverlayAnimation;
  backdropBlur: BackdropBlur; // "none" | "sm" | "md" | "lg"
  blurLeftOnMenuOpen: boolean; // Blurs content to the left when right drawer/menu opens
  mobileModalBehavior: MobileModalBehavior;
  motionPreference: MotionPreference;
}

export type ContentPadding = "none" | "compact" | "comfortable" | "spacious";
export type MobileLayoutBehavior = "stack" | "drawer" | "tabs";
export type ContentOverflowMode = "auto-scroll" | "fill-viewport" | "expand";

export interface ContentLayoutOptions {
  padding: ContentPadding;
  mobilePadding: ContentPadding;
  mobileBehavior: MobileLayoutBehavior;
  overflowMode: ContentOverflowMode;
}

export interface I18nSettings {
  locale: SupportedLocale;
  timeZone: string;
  dateFormat: DateFormatPreset;
  numberFormat: NumberFormatPreset;
  showTranslationKeys: boolean;
}

export interface LayoutSettings {
  // Navigation & Shell
  navigationMode: NavigationMode;
  navigationPosition: NavigationPosition;
  sidebarState: SidebarState;
  headerSticky: boolean;
  sidebarSticky: boolean;
  showBreadcrumbs: boolean;

  // Appearance & Design Tokens
  contentWidth: ContentWidth;
  contentLayout: ContentLayoutOptions;
  density: Density;
  radius: Radius;
  fontSize: "13px" | "14px" | "15px";
  typography: TypographySettings;
  brandColor: BrandColor;
  customBrandHex?: string;
  theme: ThemeMode;
  contrast: ContrastMode;

  // Sections
  overlays: OverlaySettings;
  loading: LoadingSettings;
  i18n: I18nSettings;
}

export interface LayoutSettingsContextValue {
  settings: LayoutSettings;
  updateSettings: (partial: Partial<LayoutSettings>) => void;
  updateContentLayout: (partial: Partial<ContentLayoutOptions>) => void;
  updateTypography: (partial: Partial<TypographySettings>) => void;
  updateOverlaySettings: (partial: Partial<OverlaySettings>) => void;
  updateLoadingSettings: (partial: Partial<LoadingSettings>) => void;
  updateI18nSettings: (partial: Partial<I18nSettings>) => void;
  resetSettings: () => void;
  exportSettingsJson: () => string;
  importSettingsJson: (json: string) => boolean;
  isCustomizerOpen: boolean;
  setCustomizerOpen: (open: boolean) => void;
  toggleCustomizer: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

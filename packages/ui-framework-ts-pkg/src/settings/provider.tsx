"use client";

import * as React from "react";
import type { LayoutSettings, OverlaySettings, LoadingSettings, I18nSettings, TypographySettings, LayoutSettingsContextValue } from "./types";
import { DEFAULT_LAYOUT_SETTINGS, BRAND_COLOR_PRESETS, FONT_SANS_PRESETS, FONT_MONO_PRESETS } from "./defaults";
import { getAllowedPositions, isAllowedCombination } from "../config/allowed-combinations";

const LayoutSettingsContext = React.createContext<LayoutSettingsContextValue | null>(null);

export interface LayoutSettingsProviderProps {
  children: React.ReactNode;
  initialSettings?: Partial<LayoutSettings>;
  storageKey?: string;
}

function hexToHsl(hex: string): string {
  const sanitized = hex.replace("#", "");
  if (sanitized.length !== 6) return "214 100% 43%";
  const r = parseInt(sanitized.substring(0, 2), 16) / 255;
  const g = parseInt(sanitized.substring(2, 4), 16) / 255;
  const b = parseInt(sanitized.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function LayoutSettingsProvider({
  children,
  initialSettings,
  storageKey = "fw-layout-settings",
}: LayoutSettingsProviderProps) {
  const [settings, setSettings] = React.useState<LayoutSettings>(() => {
    return {
      ...DEFAULT_LAYOUT_SETTINGS,
      ...initialSettings,
      overlays: {
        ...DEFAULT_LAYOUT_SETTINGS.overlays,
        ...initialSettings?.overlays,
      },
      loading: {
        ...DEFAULT_LAYOUT_SETTINGS.loading,
        ...initialSettings?.loading,
      },
      i18n: {
        ...DEFAULT_LAYOUT_SETTINGS.i18n,
        ...initialSettings?.i18n,
      },
    };
  });

  const [isCustomizerOpen, setCustomizerOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(
    settings.sidebarState === "collapsed"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage on client mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          overlays: { ...prev.overlays, ...parsed.overlays },
          i18n: { ...prev.i18n, ...parsed.i18n },
        }));
      }
    } catch {
      // ignore JSON parse or storage errors
    }
    setMounted(true);
  }, [storageKey]);

  // Persist to localStorage when settings change
  React.useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
      // Store cookie for server rendering hints
      document.cookie = `${storageKey}=${encodeURIComponent(
        JSON.stringify({
          navMode: settings.navigationMode,
          theme: settings.theme,
          density: settings.density,
        })
      )}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore storage errors
    }
  }, [settings, storageKey, mounted]);

  // Apply theme tokens to DOM root
  React.useEffect(() => {
    const root = document.documentElement;

    // Density
    root.setAttribute("data-density", settings.density);

    // Contrast
    root.setAttribute("data-contrast", settings.contrast);

    // Theme Mode (dark / light / system)
    const isDark =
      settings.theme === "dark" ||
      (settings.theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Radius token
    let radiusValue = "0.375rem"; // 6px default
    if (settings.radius === "sm") radiusValue = "0.25rem"; // 4px
    if (settings.radius === "lg") radiusValue = "0.5rem"; // 8px
    root.style.setProperty("--radius", radiusValue);

    // Font size
    root.style.setProperty("--font-size-base", settings.fontSize);

    // Brand color
    if (settings.brandColor === "custom" && settings.customBrandHex) {
      const hsl = hexToHsl(settings.customBrandHex);
      root.style.setProperty("--primary", hsl);
      root.style.setProperty("--ring", hsl);
    } else {
      const presetKey = settings.brandColor in BRAND_COLOR_PRESETS
        ? (settings.brandColor as keyof typeof BRAND_COLOR_PRESETS)
        : "blue";
      const preset = BRAND_COLOR_PRESETS[presetKey];
      root.style.setProperty("--primary", preset.primaryHsl);
      root.style.setProperty("--ring", preset.ringHsl);
    }

    // Backdrop Blur
    root.setAttribute("data-backdrop-blur", settings.overlays.backdropBlur);
    let blurPx = "4px";
    if (settings.overlays.backdropBlur === "none") blurPx = "0px";
    if (settings.overlays.backdropBlur === "sm") blurPx = "4px";
    if (settings.overlays.backdropBlur === "md") blurPx = "8px";
    if (settings.overlays.backdropBlur === "lg") blurPx = "16px";
    root.style.setProperty("--backdrop-blur", blurPx);

    // Typography Font Tokens
    const sansPreset = settings.typography?.fontSans ?? "inter";
    const sansVal =
      sansPreset === "custom" && settings.typography?.customSansFont
        ? settings.typography.customSansFont
        : FONT_SANS_PRESETS[sansPreset]?.value || FONT_SANS_PRESETS.inter.value;
    root.style.setProperty("--font-sans", sansVal);

    const monoPreset = settings.typography?.fontMono ?? "jetbrains";
    const monoVal =
      monoPreset === "custom" && settings.typography?.customMonoFont
        ? settings.typography.customMonoFont
        : FONT_MONO_PRESETS[monoPreset]?.value || FONT_MONO_PRESETS.jetbrains.value;
    root.style.setProperty("--font-mono", monoVal);

    const headingPreset = settings.typography?.fontHeading ?? "inter";
    const headingVal =
      headingPreset === "custom" && settings.typography?.customHeadingFont
        ? settings.typography.customHeadingFont
        : FONT_SANS_PRESETS[headingPreset]?.value || sansVal;
    root.style.setProperty("--font-heading", headingVal);

    const spacing = settings.typography?.letterSpacing ?? "normal";
    const spacingVal = spacing === "tight" ? "-0.015em" : spacing === "wide" ? "0.025em" : "normal";
    root.style.setProperty("--letter-spacing", spacingVal);

    if (settings.typography?.fontSize) {
      root.style.setProperty("--font-size-base", settings.typography.fontSize);
    }

    // Motion preference
    if (settings.overlays.motionPreference === "never") {
      root.setAttribute("data-reduce-motion", "true");
    } else {
      root.removeAttribute("data-reduce-motion");
    }
  }, [settings]);

  const updateSettings = React.useCallback(
    (partial: Partial<LayoutSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...partial };
        // Validate navigation position combination
        if (partial.navigationMode && !isAllowedCombination(partial.navigationMode, next.navigationPosition)) {
          const allowed = getAllowedPositions(partial.navigationMode);
          next.navigationPosition = allowed[0] ?? "start";
        }
        return next;
      });
    },
    []
  );

  const updateOverlaySettings = React.useCallback(
    (partial: Partial<OverlaySettings>) => {
      setSettings((prev) => ({
        ...prev,
        overlays: { ...prev.overlays, ...partial },
      }));
    },
    []
  );

  const updateContentLayout = React.useCallback(
    (partial: Partial<import("./types").ContentLayoutOptions>) => {
      setSettings((prev) => ({
        ...prev,
        contentLayout: { ...prev.contentLayout, ...partial },
      }));
    },
    []
  );

  const updateTypography = React.useCallback(
    (partial: Partial<TypographySettings>) => {
      setSettings((prev) => ({
        ...prev,
        typography: { ...prev.typography, ...partial },
      }));
    },
    []
  );

  const updateLoadingSettings = React.useCallback(
    (partial: Partial<LoadingSettings>) => {
      setSettings((prev) => ({
        ...prev,
        loading: { ...prev.loading, ...partial },
      }));
    },
    []
  );

  const updateI18nSettings = React.useCallback(
    (partial: Partial<I18nSettings>) => {
      setSettings((prev) => ({
        ...prev,
        i18n: { ...prev.i18n, ...partial },
      }));
    },
    []
  );

  const resetSettings = React.useCallback(() => {
    const base = {
      ...DEFAULT_LAYOUT_SETTINGS,
      ...initialSettings,
    };
    setSettings(base);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [initialSettings, storageKey]);

  const exportSettingsJson = React.useCallback(() => {
    return JSON.stringify(settings, null, 2);
  }, [settings]);

  const importSettingsJson = React.useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (typeof parsed === "object" && parsed !== null) {
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          overlays: { ...prev.overlays, ...(parsed.overlays || {}) },
          i18n: { ...prev.i18n, ...(parsed.i18n || {}) },
        }));
        return true;
      }
    } catch {
      // invalid JSON
    }
    return false;
  }, []);

  const toggleCustomizer = React.useCallback(() => {
    setCustomizerOpen((prev) => !prev);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const value = React.useMemo<LayoutSettingsContextValue>(() => {
    return {
      settings,
      updateSettings,
      updateOverlaySettings,
      updateContentLayout,
      updateTypography,
      updateLoadingSettings,
      updateI18nSettings,
      resetSettings,
      exportSettingsJson,
      importSettingsJson,
      isCustomizerOpen,
      setCustomizerOpen,
      toggleCustomizer,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebar,
      mobileMenuOpen,
      setMobileMenuOpen,
    };
  }, [
    settings,
    updateSettings,
    updateOverlaySettings,
    updateContentLayout,
    updateTypography,
    updateLoadingSettings,
    updateI18nSettings,
    resetSettings,
    exportSettingsJson,
    importSettingsJson,
    isCustomizerOpen,
    toggleCustomizer,
    sidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
  ]);

  return (
    <LayoutSettingsContext.Provider value={value}>
      {children}
    </LayoutSettingsContext.Provider>
  );
}

export function useLayoutSettings(): LayoutSettingsContextValue {
  const context = React.useContext(LayoutSettingsContext);
  if (!context) {
    throw new Error("useLayoutSettings must be used within a LayoutSettingsProvider");
  }
  return context;
}

export function useOptionalLayoutSettings(): LayoutSettingsContextValue | null {
  return React.useContext(LayoutSettingsContext);
}

"use client";

import * as React from "react";
import {
  Sliders,
  RotateCcw,
  Copy,
  Upload,
  Check,
  Sun,
  Moon,
  Laptop,
  Bell,
  Languages,
  Sparkles,
  Loader2,
  Layers,
  Type,
} from "lucide-react";
import { useLayoutSettings } from "./provider";
import { BRAND_COLOR_PRESETS, FONT_SANS_PRESETS, FONT_MONO_PRESETS } from "./defaults";
import { isAllowedCombination, getAllowedPositions } from "../config/allowed-combinations";
import type { NavigationMode, NavigationPosition } from "../config/types";
import type { ToastPosition, ToastStyle, BackdropBlur, SkeletonStyle, LoadingIndicatorType, FontFamilyPreset, MonoFontPreset } from "./types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LOCALES_METADATA, useI18n } from "../i18n/provider";
import type { SupportedLocale } from "../i18n/types";

const NAV_MODES: { id: NavigationMode; label: string; desc: string }[] = [
  { id: "sidebar-full", label: "Full Sidebar", desc: "Classic 260px collapsible sidebar" },
  { id: "sidebar-rail", label: "Icon Rail", desc: "Compact 64px rail with flyout popovers" },
  { id: "sidebar-hybrid", label: "Hybrid Sidebar", desc: "Rail + full with Cmd+B toggle & hover expand" },
  { id: "sidebar-dual", label: "Dual Rail", desc: "Module rail + dedicated submenu panel" },
  { id: "sidebar-inset", label: "Inset Card", desc: "Floating inset sidebar with rounded card content" },
  { id: "topnav", label: "Top Navigation", desc: "Horizontal navigation bar with dropdown menus" },
  { id: "bottom-nav", label: "Bottom Tabs", desc: "Bottom tab bar with 'More' sheet" },
];

export function CustomizerDrawer() {
  const {
    settings,
    updateSettings,
    updateContentLayout,
    updateTypography,
    updateOverlaySettings,
    updateLoadingSettings,
    updateI18nSettings,
    resetSettings,
    exportSettingsJson,
    importSettingsJson,
    isCustomizerOpen,
    setCustomizerOpen,
  } = useLayoutSettings();

  const { t } = useI18n();
  const [copied, setCopied] = React.useState(false);
  const [importText, setImportText] = React.useState("");
  const [showImport, setShowImport] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [isTestingLoading, setIsTestingLoading] = React.useState(false);

  const testLoading = () => {
    setIsTestingLoading(true);
    setTimeout(() => {
      setIsTestingLoading(false);
      setToastMessage("Async operation completed (showAfter simulated)");
      setTimeout(() => setToastMessage(null), 2500);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportSettingsJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    if (importSettingsJson(importText)) {
      setShowImport(false);
      setImportText("");
    }
  };

  const testToast = () => {
    setToastMessage("Demo live toast triggered from Customizer!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const allowedPositions = getAllowedPositions(settings.navigationMode);

  return (
    <>
      {/* Floating customizer trigger button */}
      <button
        type="button"
        onClick={() => setCustomizerOpen(true)}
        className="fixed end-4 bottom-5 z-dialog flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open Layout Customizer"
        title="Layout & Theme Customizer"
      >
        <Sliders className="h-4.5 w-4.5" />
      </button>

      {/* Ephemeral in-drawer test toast */}
      {toastMessage && (
        <div className="fixed bottom-16 end-4 z-toast bg-foreground text-background text-xs py-2 px-3.5 rounded-md shadow-xl animate-in fade-in-50 slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}

      <Sheet open={isCustomizerOpen} onOpenChange={setCustomizerOpen}>
        <SheetContent side="end" className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-primary" />
                <SheetTitle className="text-sm font-semibold">{t("customizer.title")}</SheetTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={resetSettings} className="h-7 text-2xs gap-1">
                <RotateCcw className="h-3 w-3" />
                {t("customizer.resetToDefault")}
              </Button>
            </div>
            <SheetDescription className="text-2xs text-muted-foreground">
              {t("customizer.description")}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
            {/* 1. Navigation Mode */}
            <div className="space-y-2">
              <label className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("customizer.navigationMode")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {NAV_MODES.map((mode) => {
                  const isSelected = settings.navigationMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => updateSettings({ navigationMode: mode.id })}
                      className={`flex flex-col text-start p-2.5 rounded-lg border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-2xs font-medium"
                          : "border-border hover:border-input bg-card/50"
                      }`}
                    >
                      <span className="text-xs font-semibold text-foreground">{mode.label}</span>
                      <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        {mode.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Navigation Position */}
            <div className="space-y-2">
              <label className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("customizer.position")}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(["start", "end", "top", "bottom"] as NavigationPosition[]).map((pos) => {
                  const allowed = isAllowedCombination(settings.navigationMode, pos);
                  const isSelected = settings.navigationPosition === pos;
                  return (
                    <button
                      key={pos}
                      type="button"
                      disabled={!allowed}
                      onClick={() => updateSettings({ navigationPosition: pos })}
                      className={`px-2 py-1.5 rounded-md text-xs font-medium border capitalize transition-all ${
                        !allowed
                          ? "opacity-35 cursor-not-allowed border-dashed border-border"
                          : isSelected
                          ? "border-primary bg-primary text-primary-foreground font-semibold"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {pos}
                    </button>
                  );
                })}
              </div>
              {!allowedPositions.includes(settings.navigationPosition) && (
                <p className="text-2xs text-amber-600">
                  Current position adjusted automatically for this navigation mode.
                </p>
              )}
            </div>

            {/* 3. Appearance & Tokens */}
            <div className="space-y-3 pt-2 border-t border-border/60">
              <label className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                Theme & Design Tokens
              </label>

              {/* Theme Mode */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Color Theme</span>
                <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md">
                  <button
                    type="button"
                    onClick={() => updateSettings({ theme: "light" })}
                    className={`p-1.5 rounded ${settings.theme === "light" ? "bg-background shadow-xs text-primary" : "text-muted-foreground"}`}
                    title="Light"
                  >
                    <Sun className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSettings({ theme: "dark" })}
                    className={`p-1.5 rounded ${settings.theme === "dark" ? "bg-background shadow-xs text-primary" : "text-muted-foreground"}`}
                    title="Dark"
                  >
                    <Moon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSettings({ theme: "system" })}
                    className={`p-1.5 rounded ${settings.theme === "system" ? "bg-background shadow-xs text-primary" : "text-muted-foreground"}`}
                    title="System"
                  >
                    <Laptop className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Brand Color Presets */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-foreground">Brand Color</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {(Object.keys(BRAND_COLOR_PRESETS) as (keyof typeof BRAND_COLOR_PRESETS)[]).map(
                    (colorKey) => {
                      const preset = BRAND_COLOR_PRESETS[colorKey];
                      const isSelected = settings.brandColor === colorKey;
                      return (
                        <button
                          key={colorKey}
                          type="button"
                          onClick={() => updateSettings({ brandColor: colorKey })}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                            isSelected
                              ? "border-foreground ring-1 ring-ring font-semibold"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          <span
                            className="h-3 w-3 rounded-full shrink-0"
                            style={{ backgroundColor: preset.hex }}
                          />
                          <span>{preset.name}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Density & Radius */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-foreground">Density</span>
                  <Select
                    value={settings.density}
                    onValueChange={(val) => updateSettings({ density: val as "comfortable" | "compact" })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="compact">Compact (Fiori dense)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium text-foreground">Border Radius</span>
                  <Select
                    value={settings.radius}
                    onValueChange={(val) => updateSettings({ radius: val as "sm" | "md" | "lg" })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small (4px)</SelectItem>
                      <SelectItem value="md">Medium (6px)</SelectItem>
                      <SelectItem value="lg">Large (8px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Content Width & Sticky Header */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-foreground">Content Width</span>
                  <Select
                    value={settings.contentWidth}
                    onValueChange={(val) => updateSettings({ contentWidth: val as "boxed" | "fluid" | "full" })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boxed">Boxed (Max 1440px)</SelectItem>
                      <SelectItem value="fluid">Fluid (Padding)</SelectItem>
                      <SelectItem value="full">Full Screen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium text-foreground">Font Size</span>
                  <Select
                    value={settings.fontSize}
                    onValueChange={(val) => updateSettings({ fontSize: val as "13px" | "14px" | "15px" })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13px">13px (Compact)</SelectItem>
                      <SelectItem value="14px">14px (Standard)</SelectItem>
                      <SelectItem value="15px">15px (Airy)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-foreground block">Sticky Header (Navbar)</span>
                    <span className="text-2xs text-muted-foreground">Keep top bar fixed during scroll</span>
                  </div>
                  <Switch
                    checked={settings.headerSticky}
                    onCheckedChange={(checked) => updateSettings({ headerSticky: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-foreground block">Sticky Sidebar (Navigation)</span>
                    <span className="text-2xs text-muted-foreground">Pin sidebar to full viewport height</span>
                  </div>
                  <Switch
                    checked={settings.sidebarSticky}
                    onCheckedChange={(checked) => updateSettings({ sidebarSticky: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Show Breadcrumbs</span>
                  <Switch
                    checked={settings.showBreadcrumbs}
                    onCheckedChange={(checked) => updateSettings({ showBreadcrumbs: checked })}
                  />
                </div>
              </div>

              {/* Content Padding Controls */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40">
                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Desktop Padding</span>
                  <Select
                    value={settings.contentLayout?.padding ?? "comfortable"}
                    onValueChange={(val) =>
                      updateContentLayout({ padding: val as "none" | "compact" | "comfortable" | "spacious" })
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (0px)</SelectItem>
                      <SelectItem value="compact">Compact (12px)</SelectItem>
                      <SelectItem value="comfortable">Comfortable (24px)</SelectItem>
                      <SelectItem value="spacious">Spacious (32px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Mobile Padding</span>
                  <Select
                    value={settings.contentLayout?.mobilePadding ?? "compact"}
                    onValueChange={(val) =>
                      updateContentLayout({ mobilePadding: val as "none" | "compact" | "comfortable" | "spacious" })
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (0px)</SelectItem>
                      <SelectItem value="compact">Compact (8px)</SelectItem>
                      <SelectItem value="comfortable">Comfortable (16px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Typography & Fonts Section */}
            <div className="space-y-3 pt-2 border-t border-border/60">
              <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Type className="h-3 w-3 text-primary" />
                <span>Typography & Font Engine</span>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Body Font Family (Sans)</span>
                  <Select
                    value={settings.typography?.fontSans ?? "inter"}
                    onValueChange={(val) => updateTypography({ fontSans: val as FontFamilyPreset })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(FONT_SANS_PRESETS) as FontFamilyPreset[]).map((key) => (
                        <SelectItem key={key} value={key}>
                          {FONT_SANS_PRESETS[key].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {settings.typography?.fontSans === "custom" && (
                    <Input
                      placeholder="Type custom font name (e.g. Outfit, Space Grotesk)..."
                      value={settings.typography.customSansFont || ""}
                      onChange={(e) => updateTypography({ customSansFont: e.target.value })}
                      className="h-8 text-xs mt-1"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Monospace Font (Telemetry, Code, SKUs)</span>
                  <Select
                    value={settings.typography?.fontMono ?? "jetbrains"}
                    onValueChange={(val) => updateTypography({ fontMono: val as MonoFontPreset })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(FONT_MONO_PRESETS) as MonoFontPreset[]).map((key) => (
                        <SelectItem key={key} value={key}>
                          {FONT_MONO_PRESETS[key].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {settings.typography?.fontMono === "custom" && (
                    <Input
                      placeholder="Type custom monospace font (e.g. Fira Code, Courier)..."
                      value={settings.typography.customMonoFont || ""}
                      onChange={(e) => updateTypography({ customMonoFont: e.target.value })}
                      className="h-8 text-xs mt-1"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Letter Spacing (Tracking)</span>
                  <Select
                    value={settings.typography?.letterSpacing ?? "normal"}
                    onValueChange={(val) => updateTypography({ letterSpacing: val as "tight" | "normal" | "wide" })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tight">Tight (-0.015em)</SelectItem>
                      <SelectItem value="normal">Normal (Default)</SelectItem>
                      <SelectItem value="wide">Wide (+0.025em)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Live Font Preview Box */}
                <div className="p-2.5 rounded-lg border border-border bg-muted/20 text-xs space-y-1">
                  <p className="font-semibold text-foreground">The quick brown fox jumps over the lazy dog.</p>
                  <p className="font-mono text-2xs text-primary">RPM: 1498.4 • LATENCY: 2.4ms • SKU-9042</p>
                </div>
              </div>
            </div>

            {/* 4. Overlays & Notifications */}
            <div className="space-y-3 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Bell className="h-3 w-3" />
                  <span>{t("customizer.overlays")}</span>
                </div>
                <Button variant="outline" size="sm" onClick={testToast} className="h-6 text-[10px] gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  {t("customizer.testToast")}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Toast Position</span>
                  <Select
                    value={settings.overlays.toastPosition}
                    onValueChange={(val) => updateOverlaySettings({ toastPosition: val as ToastPosition })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-end">bottom-end</SelectItem>
                      <SelectItem value="bottom-start">bottom-start</SelectItem>
                      <SelectItem value="bottom-center">bottom-center</SelectItem>
                      <SelectItem value="top-end">top-end</SelectItem>
                      <SelectItem value="top-start">top-start</SelectItem>
                      <SelectItem value="top-center">top-center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Toast Style</span>
                  <Select
                    value={settings.overlays.toastStyle}
                    onValueChange={(val) => updateOverlaySettings({ toastStyle: val as ToastStyle })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="outlined">Outlined</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Backdrop Blur Configuration */}
              <div className="pt-2 border-t border-border/40 space-y-2">
                <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Layers className="h-3 w-3" />
                  <span>Backdrop & Left Blur on Drawer Open</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-2xs text-muted-foreground">Blur Intensity</span>
                    <Select
                      value={settings.overlays.backdropBlur}
                      onValueChange={(val) => updateOverlaySettings({ backdropBlur: val as BackdropBlur })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (0px)</SelectItem>
                        <SelectItem value="sm">Subtle (4px - sm)</SelectItem>
                        <SelectItem value="md">Medium (8px - md)</SelectItem>
                        <SelectItem value="lg">Intense Glass (16px - lg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col justify-end pb-1">
                    <div className="flex items-center justify-between">
                      <span className="text-2xs text-foreground">Blur Left View</span>
                      <Switch
                        checked={settings.overlays.blurLeftOnMenuOpen}
                        onCheckedChange={(checked) => updateOverlaySettings({ blurLeftOnMenuOpen: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Loading Animations & showAfter */}
            <div className="space-y-3 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Loader2 className={`h-3 w-3 text-primary ${isTestingLoading ? "animate-spin" : ""}`} />
                  <span>Loading Animations & showAfter</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={testLoading}
                  disabled={isTestingLoading}
                  className="h-6 text-[10px] gap-1"
                >
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  {isTestingLoading ? "Simulating..." : "Test showAfter"}
                </Button>
              </div>

              {isTestingLoading && (
                <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5 text-2xs space-y-1.5 animate-in fade-in-50">
                  <div className="flex items-center justify-between font-semibold text-primary">
                    <span>Simulated Async Request in Progress...</span>
                    <span>Threshold: {settings.loading?.showAfter ?? 200}ms</span>
                  </div>
                  <div className="relative h-1 w-full bg-muted rounded overflow-hidden">
                    <div className="h-full bg-primary animate-[fiori-progress_1.4s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">showAfter Delay</span>
                  <Select
                    value={`${settings.loading?.showAfter ?? 200}`}
                    onValueChange={(val) => updateLoadingSettings({ showAfter: Number(val) })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0ms (Instant - may flash)</SelectItem>
                      <SelectItem value="150">150ms (Snappy)</SelectItem>
                      <SelectItem value="200">200ms (Recommended)</SelectItem>
                      <SelectItem value="350">350ms (Conservative)</SelectItem>
                      <SelectItem value="500">500ms (High latency)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Min Duration (Visible)</span>
                  <Select
                    value={`${settings.loading?.minDuration ?? 350}`}
                    onValueChange={(val) => updateLoadingSettings({ minDuration: Number(val) })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0ms (Off)</SelectItem>
                      <SelectItem value="200">200ms</SelectItem>
                      <SelectItem value="350">350ms (Recommended)</SelectItem>
                      <SelectItem value="500">500ms (Smooth)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Skeleton Style</span>
                  <Select
                    value={settings.loading?.skeletonStyle ?? "shimmer"}
                    onValueChange={(val) => updateLoadingSettings({ skeletonStyle: val as SkeletonStyle })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shimmer">Shimmer (Gradient Wave)</SelectItem>
                      <SelectItem value="pulse">Pulse (Classic Opacity)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <span className="text-2xs text-muted-foreground">Indicator Type</span>
                  <Select
                    value={settings.loading?.indicatorType ?? "bar"}
                    onValueChange={(val) => updateLoadingSettings({ indicatorType: val as LoadingIndicatorType })}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Top Progress Bar (Fiori)</SelectItem>
                      <SelectItem value="spinner">Circular Spinner</SelectItem>
                      <SelectItem value="both">Both Combined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 6. Language & Region */}
            <div className="space-y-3 pt-2 border-t border-border/60">
              <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Languages className="h-3 w-3" />
                <span>{t("customizer.languageAndRegion")}</span>
              </div>

              <div className="space-y-1">
                <span className="text-2xs text-muted-foreground">Language / Locale</span>
                <Select
                  value={settings.i18n.locale}
                  onValueChange={(val) => updateI18nSettings({ locale: val as SupportedLocale })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(LOCALES_METADATA) as SupportedLocale[]).map((loc) => {
                      const meta = LOCALES_METADATA[loc];
                      return (
                        <SelectItem key={loc} value={loc}>
                          {meta.flag} {meta.nativeName} ({meta.code})
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-foreground">Debug: Show Translation Keys</span>
                <Switch
                  checked={settings.i18n.showTranslationKeys}
                  onCheckedChange={(checked) => updateI18nSettings({ showTranslationKeys: checked })}
                />
              </div>
            </div>

            {/* JSON Export & Import */}
            <div className="pt-3 border-t border-border/60 flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1 h-8 text-xs gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("customizer.copiedToClipboard") : t("customizer.copyConfig")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImport((prev) => !prev)}
                className="h-8 text-xs gap-1.5"
              >
                <Upload className="h-3.5 w-3.5" />
                {t("customizer.importConfig")}
              </Button>
            </div>

            {showImport && (
              <div className="p-3 rounded-lg border border-border bg-muted/40 space-y-2">
                <textarea
                  className="w-full h-24 p-2 text-2xs font-mono rounded border border-input bg-background"
                  placeholder="Paste configuration JSON here..."
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                />
                <Button size="sm" onClick={handleImport} className="w-full h-7 text-xs">
                  Apply JSON
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

"use client";

import * as React from "react";
import { Palette, Type, User, Bell, Shield, Sparkles } from "lucide-react";
import { SettingsLayout } from "@fw/layouts";
import { Button, Input, Switch, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@fw/ui";
import { useLayoutSettings, FONT_SANS_PRESETS, FONT_MONO_PRESETS, type FontFamilyPreset, type MonoFontPreset } from "@fw/settings";
import { toast } from "@fw/overlays";

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("appearance");
  const { settings, updateSettings, updateTypography } = useLayoutSettings();

  const navItems = [
    { id: "appearance", label: "Appearance & Theme", icon: Palette },
    { id: "typography", label: "Typography & Fonts", icon: Type },
    { id: "profile", label: "User Profile", icon: User },
    { id: "notifications", label: "Alert Notifications", icon: Bell },
    { id: "security", label: "Security & Roles", icon: Shield },
  ];

  const handleSave = () => {
    toast.success("Preferences updated successfully.");
  };

  return (
    <SettingsLayout
      title="Application & Workspace Settings"
      subtitle="Customize density, typography, theme preferences, and security permissions."
      navItems={navItems}
      activeId={activeTab}
      onSelectNav={setActiveTab}
    >
      {/* 1. Appearance Tab */}
      {activeTab === "appearance" && (
        <div className="space-y-5">
          <h3 className="text-sm font-semibold pb-2 border-b border-border">
            Appearance & Ergonomics
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-2xs font-semibold text-muted-foreground uppercase">
                  Layout Density
                </label>
                <Select
                  value={settings.density}
                  onValueChange={(val) => updateSettings({ density: val as "comfortable" | "compact" })}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Comfortable (Standard)</SelectItem>
                    <SelectItem value="compact">Compact (High density operations)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-2xs font-semibold text-muted-foreground uppercase">
                  Content Width
                </label>
                <Select
                  value={settings.contentWidth}
                  onValueChange={(val) => updateSettings({ contentWidth: val as "boxed" | "fluid" | "full" })}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boxed">Boxed (Max 1440px)</SelectItem>
                    <SelectItem value="fluid">Fluid (Responsive Padding)</SelectItem>
                    <SelectItem value="full">Full Screen Edge-to-Edge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-medium text-foreground block">Sticky Header</span>
                <span className="text-2xs text-muted-foreground">Keep top navigation bar fixed while scrolling</span>
              </div>
              <Switch
                checked={settings.headerSticky}
                onCheckedChange={(checked) => updateSettings({ headerSticky: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-foreground block">Show Breadcrumb Trails</span>
                <span className="text-2xs text-muted-foreground">Display hierarchical breadcrumbs in the header bar</span>
              </div>
              <Switch
                checked={settings.showBreadcrumbs}
                onCheckedChange={(checked) => updateSettings({ showBreadcrumbs: checked })}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button size="sm" onClick={handleSave} className="text-xs font-semibold">
              Save Preferences
            </Button>
          </div>
        </div>
      )}

      {/* 2. Typography & Fonts Tab */}
      {activeTab === "typography" && (
        <div className="space-y-5">
          <div className="pb-2 border-b border-border flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold">Typography & Font Engine</h3>
              <p className="text-2xs text-muted-foreground">
                Set custom font families for interface body, headings, and data telemetry monospace.
              </p>
            </div>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          <div className="space-y-4">
            {/* Primary Sans Font */}
            <div className="space-y-2">
              <label className="text-2xs font-semibold text-muted-foreground uppercase">
                Primary Body Font Family (Sans)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  value={settings.typography?.fontSans ?? "inter"}
                  onValueChange={(val) => updateTypography({ fontSans: val as FontFamilyPreset })}
                >
                  <SelectTrigger className="h-9 text-xs">
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
                    className="h-9 text-xs"
                  />
                )}
              </div>
            </div>

            {/* Monospace Font */}
            <div className="space-y-2">
              <label className="text-2xs font-semibold text-muted-foreground uppercase">
                Monospace Font Family (Telemetry, Code, SKUs)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  value={settings.typography?.fontMono ?? "jetbrains"}
                  onValueChange={(val) => updateTypography({ fontMono: val as MonoFontPreset })}
                >
                  <SelectTrigger className="h-9 text-xs">
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
                    className="h-9 text-xs"
                  />
                )}
              </div>
            </div>

            {/* Font Size & Letter Spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-2xs font-semibold text-muted-foreground uppercase">
                  Base Font Scale
                </label>
                <Select
                  value={settings.typography?.fontSize ?? "14px"}
                  onValueChange={(val) => updateTypography({ fontSize: val as "13px" | "14px" | "15px" | "16px" })}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13px">13px — High Density Control Room</SelectItem>
                    <SelectItem value="14px">14px — Standard Enterprise</SelectItem>
                    <SelectItem value="15px">15px — Comfortable Reading</SelectItem>
                    <SelectItem value="16px">16px — Large High-Visibility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-2xs font-semibold text-muted-foreground uppercase">
                  Letter Spacing (Tracking)
                </label>
                <Select
                  value={settings.typography?.letterSpacing ?? "normal"}
                  onValueChange={(val) => updateTypography({ letterSpacing: val as "tight" | "normal" | "wide" })}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tight">Tight (-0.015em)</SelectItem>
                    <SelectItem value="normal">Normal (Default)</SelectItem>
                    <SelectItem value="wide">Wide (+0.025em)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Live Typography Preview Card */}
            <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
              <span className="text-2xs text-muted-foreground font-semibold uppercase tracking-wider block">
                Live Font Preview
              </span>
              <p className="text-sm font-semibold text-foreground">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="font-mono text-xs text-primary">
                RPM: 1,498.4 • LATENCY: 2.4ms • SHA-256: 7f83b1657ff1fc53b92
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button size="sm" onClick={handleSave} className="text-xs font-semibold">
              Save Typography
            </Button>
          </div>
        </div>
      )}

      {/* 3. Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold pb-2 border-b border-border">
            Operator Profile
          </h3>
          <div className="space-y-3 max-w-md">
            <div className="space-y-1">
              <label className="text-2xs text-muted-foreground">Full Name</label>
              <Input defaultValue="Dr. Elena Rostova" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs text-muted-foreground">Work Email</label>
              <Input defaultValue="elena.rostova@enterprise.internal" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs text-muted-foreground">Facility / Station</label>
              <Input defaultValue="Central Grid Station 04 - Munich" />
            </div>
          </div>
          <div className="pt-4 border-t border-border flex justify-end">
            <Button size="sm" onClick={handleSave} className="text-xs font-semibold">
              Save Profile
            </Button>
          </div>
        </div>
      )}

      {/* 4. Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold pb-2 border-b border-border">
            Alarm & Alert Subscriptions
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-foreground block">Critical Telemetry Alarms</span>
                <span className="text-2xs text-muted-foreground">Audible alert and persistent desktop notification</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-foreground block">Order Dispatch Milestones</span>
                <span className="text-2xs text-muted-foreground">Notifications upon shipment and delivery confirmation</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      )}

      {/* 5. Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold pb-2 border-b border-border">
            Security & Delegated Roles
          </h3>
          <p className="text-xs text-muted-foreground">
            Current session permissions: <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">admin, orders:write, telemetry:audit</code>
          </p>
        </div>
      )}
    </SettingsLayout>
  );
}

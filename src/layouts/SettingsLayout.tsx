"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, HardDrive } from "lucide-react";
import { cn } from "../lib/utils";

export interface SettingsNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface SettingsLayoutProps {
  title?: string;
  subtitle?: string;
  navItems: SettingsNavItem[];
  activeId?: string;
  onSelectNav?: (id: string) => void;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  asideFooterSlot?: React.ReactNode;
  equalHeight?: boolean;
  className?: string;
}

export function SettingsLayout({
  title = "Settings",
  subtitle = "Manage your preferences and configurations",
  navItems,
  activeId,
  onSelectNav,
  children,
  headerActions,
  asideFooterSlot,
  equalHeight = true,
  className = "",
}: SettingsLayoutProps) {
  const currentActive = activeId || navItems[0]?.id;

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6", className)}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/80 gap-3">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
      </div>

      {/* Main Grid: Dynamically stretches so both aside and form card share identical height */}
      <div
        className={cn(
          "flex flex-col md:flex-row gap-6",
          equalHeight ? "items-stretch min-h-[580px]" : "items-start"
        )}
      >
        {/* Sub-navigation Menu Card */}
        <aside className="w-full md:w-64 shrink-0 rounded-xl border border-border bg-card p-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-2 block border-b border-border/50 mb-1.5">
              Categories
            </span>
            <div className="space-y-1">
              {navItems.map((item) => {
                const isSelected = item.id === currentActive;
                const Icon = item.icon;
                const content = (
                  <div
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors cursor-pointer",
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => onSelectNav?.(item.id)}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {Icon && <Icon className="h-4 w-4 shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          "px-1.5 py-0.2 text-[10px] rounded-full font-mono",
                          isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                );

                return item.href ? (
                  <Link key={item.id} href={item.href} className="block">
                    {content}
                  </Link>
                ) : (
                  <div key={item.id}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Bottom Widget in Aside to maintain balanced visual weight */}
          <div className="pt-4 mt-6 border-t border-border/60">
            {asideFooterSlot || (
              <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-2xs space-y-1.5">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Security
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold">ENCLAVE 4</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium">
                    <HardDrive className="h-3.5 w-3.5" /> Storage
                  </span>
                  <span className="text-[10px] font-mono">Synced</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Settings Form Area */}
        <main className="flex-1 w-full rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xs flex flex-col justify-between">
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}

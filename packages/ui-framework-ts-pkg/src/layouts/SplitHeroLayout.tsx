import * as React from "react";
import { cn } from "../lib/utils";

export interface SplitHeroLayoutProps {
  children: React.ReactNode;
  heroContent?: React.ReactNode;
  heroBackgroundClassName?: string;
  className?: string;
}

export function SplitHeroLayout({
  children,
  heroContent,
  heroBackgroundClassName = "bg-primary text-primary-foreground",
  className = "",
}: SplitHeroLayoutProps) {
  return (
    <div className={cn("min-h-screen w-full grid grid-cols-1 lg:grid-cols-2", className)}>
      {/* Primary Form / Content Area */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-background">
        <div className="w-full max-w-md space-y-6">{children}</div>
      </div>

      {/* Hero / Brand Showcase Panel */}
      <div
        className={cn(
          "hidden lg:flex flex-col justify-between p-12 lg:p-16 relative overflow-hidden select-none",
          heroBackgroundClassName
        )}
      >
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-background/20 backdrop-blur-xs flex items-center justify-center font-bold text-sm">
              E
            </div>
            <span className="font-semibold text-sm tracking-tight">Enterprise Platform</span>
          </div>
        </div>

        <div className="relative z-10 my-auto py-8">
          {heroContent || (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                Modern operations, simplified.
              </h2>
              <p className="text-sm opacity-90 max-w-md">
                Resilient cyber-physical and enterprise dashboards engineered for high density,
                mission-critical telemetry, and real-time control.
              </p>
            </div>
          )}
        </div>

        <div className="relative z-10 text-xs opacity-70">
          © Enterprise UI Framework. All rights reserved.
        </div>
      </div>
    </div>
  );
}

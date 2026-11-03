"use client";

import * as React from "react";
import { LayoutSettingsProvider, type LayoutSettings } from "@fw/settings";
import { I18nProvider } from "@fw/i18n";
import { SessionProvider, type AuthAdapter } from "@fw/adapters";
import { OverlayProvider } from "@fw/overlays";
import { VariantInfoBanner } from "./VariantInfoBanner";
import { CustomizerDrawer } from "@fw/settings";

export interface DemoFrameProps {
  demoId: string;
  title: string;
  description: string;
  folderPath: string;
  preset: Partial<LayoutSettings>;
  authAdapter?: AuthAdapter;
  children: React.ReactNode;
}

export function DemoFrame({
  demoId,
  title,
  description,
  folderPath,
  preset,
  authAdapter,
  children,
}: DemoFrameProps) {
  const storageKey = `fw-demo-${demoId}-settings`;

  return (
    <LayoutSettingsProvider initialSettings={preset} storageKey={storageKey}>
      <I18nProvider>
        <SessionProvider adapter={authAdapter}>
          <OverlayProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <VariantInfoBanner
                title={title}
                description={description}
                folderPath={folderPath}
              />
              <div className="flex-1 flex flex-col">{children}</div>
              <CustomizerDrawer />
            </div>
          </OverlayProvider>
        </SessionProvider>
      </I18nProvider>
    </LayoutSettingsProvider>
  );
}

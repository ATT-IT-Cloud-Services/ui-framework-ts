"use client";

import * as React from "react";
import { LayoutSettingsProvider } from "../settings/provider";
import type { LayoutSettings } from "../settings/types";
import { I18nProvider } from "../i18n/provider";
import type { SupportedLocale } from "../i18n/types";
import { SessionProvider } from "../adapters/auth-adapter";
import type { AuthAdapter } from "../adapters/types";
import { TelemetryProvider } from "../adapters/telemetry-adapter";
import type { TelemetryAdapter } from "../adapters/types";

export interface AppProvidersProps {
  children: React.ReactNode;
  initialSettings?: Partial<LayoutSettings>;
  storageKey?: string;
  initialLocale?: SupportedLocale;
  messages?: Partial<Record<SupportedLocale, Record<string, string>>>;
  authAdapter?: AuthAdapter;
  telemetryAdapter?: TelemetryAdapter;
}

export function AppProviders({
  children,
  initialSettings,
  storageKey = "fw-layout-settings",
  initialLocale = "en",
  messages,
  authAdapter,
  telemetryAdapter,
}: AppProvidersProps) {
  return (
    <LayoutSettingsProvider initialSettings={initialSettings} storageKey={storageKey}>
      <I18nProvider initialLocale={initialLocale} messages={messages}>
        <SessionProvider adapter={authAdapter}>
          <TelemetryProvider adapter={telemetryAdapter}>
            {children}
          </TelemetryProvider>
        </SessionProvider>
      </I18nProvider>
    </LayoutSettingsProvider>
  );
}

"use client";

import * as React from "react";
import type { TelemetryAdapter } from "./types";

export const NoopTelemetryAdapter: TelemetryAdapter = {
  trackPageView: () => {},
  trackEvent: () => {},
  trackError: () => {},
};

const TelemetryContext = React.createContext<TelemetryAdapter>(NoopTelemetryAdapter);

export interface TelemetryProviderProps {
  children: React.ReactNode;
  adapter?: TelemetryAdapter;
}

export function TelemetryProvider({
  children,
  adapter = NoopTelemetryAdapter,
}: TelemetryProviderProps) {
  return <TelemetryContext.Provider value={adapter}>{children}</TelemetryContext.Provider>;
}

export function useTelemetry(): TelemetryAdapter {
  return React.useContext(TelemetryContext);
}

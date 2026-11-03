"use client";

import * as React from "react";

export type FeatureFlagsMap = Record<string, boolean>;

export interface FeatureFlagContextValue {
  flags: FeatureFlagsMap;
  isEnabled: (flag: string) => boolean;
  setFlag: (flag: string, enabled: boolean) => void;
}

const FeatureFlagContext = React.createContext<FeatureFlagContextValue | null>(null);

export function FeatureFlagProvider({
  children,
  initialFlags = {},
}: {
  children: React.ReactNode;
  initialFlags?: FeatureFlagsMap;
}) {
  const [flags, setFlags] = React.useState<FeatureFlagsMap>(initialFlags);

  const isEnabled = React.useCallback(
    (flag: string) => flags[flag] ?? false,
    [flags]
  );

  const setFlag = React.useCallback((flag: string, enabled: boolean) => {
    setFlags((prev) => ({ ...prev, [flag]: enabled }));
  }, []);

  const value = React.useMemo<FeatureFlagContextValue>(() => {
    return { flags, isEnabled, setFlag };
  }, [flags, isEnabled, setFlag]);

  return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>;
}

export function useFeatureFlag(flag: string): boolean {
  const context = React.useContext(FeatureFlagContext);
  if (!context) return true; // default enabled if no provider
  return context.isEnabled(flag);
}

export function Feature({
  flag,
  fallback = null,
  children,
}: {
  flag: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const enabled = useFeatureFlag(flag);
  if (!enabled) return <>{fallback}</>;
  return <>{children}</>;
}

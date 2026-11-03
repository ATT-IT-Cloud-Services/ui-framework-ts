"use client";

import * as React from "react";
import { Toaster } from "sonner";
import { useLayoutSettings } from "../settings/provider";
import { useI18n } from "../i18n/provider";
import type { ToastPosition } from "../settings/types";

export interface OverlayProviderProps {
  children: React.ReactNode;
}

function resolveSonnerPosition(
  pos: ToastPosition,
  direction: "ltr" | "rtl"
): "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center" {
  const isRtl = direction === "rtl";

  switch (pos) {
    case "top-start":
      return isRtl ? "top-right" : "top-left";
    case "top-end":
      return isRtl ? "top-left" : "top-right";
    case "top-center":
      return "top-center";
    case "bottom-start":
      return isRtl ? "bottom-right" : "bottom-left";
    case "bottom-end":
      return isRtl ? "bottom-left" : "bottom-right";
    case "bottom-center":
    default:
      return "bottom-center";
  }
}

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useLayoutSettings();
  const { direction } = useI18n();

  const sonnerPosition = resolveSonnerPosition(settings.overlays.toastPosition, direction);
  const theme = settings.theme === "system" ? "system" : settings.theme;

  return (
    <>
      {children}
      <Toaster
        position={sonnerPosition}
        theme={theme as "light" | "dark" | "system"}
        duration={settings.overlays.toastDuration || 4000}
        visibleToasts={settings.overlays.toastMaxVisible || 4}
        closeButton={settings.overlays.toastCloseButton}
        expand={settings.overlays.toastExpandOnHover}
        dir={direction}
        toastOptions={{
          className:
            "rounded-lg border border-border bg-popover text-popover-foreground text-xs shadow-lg",
        }}
      />
    </>
  );
}

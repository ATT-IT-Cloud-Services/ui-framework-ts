"use client";

import * as React from "react";
import { useLayoutSettings } from "../settings/provider";

export interface LayoutDimensions {
  sidebarWidth: number; // in pixels
  headerHeight: number; // in pixels
  navHeight: number;    // in pixels
  footerHeight: number; // in pixels
  isMobile: boolean;
  contentPaddingX: number;
  contentPaddingY: number;
}

const LayoutDimensionsContext = React.createContext<LayoutDimensions>({
  sidebarWidth: 260,
  headerHeight: 48,
  navHeight: 0,
  footerHeight: 0,
  isMobile: false,
  contentPaddingX: 24,
  contentPaddingY: 16,
});

export function LayoutDimensionsProvider({
  children,
  headerHeight = 48,
  navHeight = 0,
  footerHeight = 0,
}: {
  children: React.ReactNode;
  headerHeight?: number;
  navHeight?: number;
  footerHeight?: number;
}) {
  const { settings, sidebarCollapsed } = useLayoutSettings();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 1024);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sidebarWidth = React.useMemo(() => {
    if (isMobile) return 0;
    if (settings.navigationMode === "topnav" || settings.navigationMode === "bottom-nav") {
      return 0;
    }
    if (settings.navigationMode === "sidebar-rail") {
      return 64;
    }
    if (settings.navigationMode === "sidebar-hybrid") {
      return sidebarCollapsed ? 64 : 260;
    }
    if (settings.navigationMode === "sidebar-dual") {
      return 264;
    }
    if (settings.navigationMode === "sidebar-inset") {
      return 276;
    }
    return sidebarCollapsed ? 0 : 260;
  }, [isMobile, settings.navigationMode, sidebarCollapsed]);

  const effectiveHeaderHeight = settings.headerSticky ? headerHeight : 0;
  const effectiveNavHeight = settings.navigationMode === "topnav" ? navHeight : 0;

  const contentPaddingX = React.useMemo(() => {
    if (settings.contentWidth === "full") return 0;
    const padding = isMobile
      ? settings.contentLayout?.mobilePadding ?? "compact"
      : settings.contentLayout?.padding ?? "comfortable";

    switch (padding) {
      case "none":
        return 0;
      case "compact":
        return 12;
      case "spacious":
        return 32;
      case "comfortable":
      default:
        return 24;
    }
  }, [isMobile, settings.contentWidth, settings.contentLayout]);

  const contentPaddingY = React.useMemo(() => {
    if (settings.contentWidth === "full") return 0;
    return isMobile ? 8 : 16;
  }, [isMobile, settings.contentWidth]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--sidebar-width", `${sidebarWidth}px`);
    root.style.setProperty("--header-height", `${effectiveHeaderHeight}px`);
    root.style.setProperty("--nav-height", `${effectiveNavHeight}px`);
    root.style.setProperty("--footer-height", `${footerHeight}px`);
    root.style.setProperty("--content-padding-x", `${contentPaddingX}px`);
    root.style.setProperty("--content-padding-y", `${contentPaddingY}px`);
  }, [sidebarWidth, effectiveHeaderHeight, effectiveNavHeight, footerHeight, contentPaddingX, contentPaddingY]);

  const value = React.useMemo<LayoutDimensions>(() => {
    return {
      sidebarWidth,
      headerHeight: effectiveHeaderHeight,
      navHeight: effectiveNavHeight,
      footerHeight,
      isMobile,
      contentPaddingX,
      contentPaddingY,
    };
  }, [sidebarWidth, effectiveHeaderHeight, effectiveNavHeight, footerHeight, isMobile, contentPaddingX, contentPaddingY]);

  return (
    <LayoutDimensionsContext.Provider value={value}>
      {children}
    </LayoutDimensionsContext.Provider>
  );
}

export function useLayoutDimensions(): LayoutDimensions {
  return React.useContext(LayoutDimensionsContext);
}

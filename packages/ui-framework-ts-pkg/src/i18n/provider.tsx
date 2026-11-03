"use client";

import * as React from "react";
import type { SupportedLocale, TextDirection, LocaleMetadata, I18nContextValue } from "./types";
import enMessages from "./messages/en.json";
import deMessages from "./messages/de.json";
import frMessages from "./messages/fr.json";
import esMessages from "./messages/es.json";
import arMessages from "./messages/ar.json";
import { useOptionalLayoutSettings } from "../settings/provider";

export const LOCALES_METADATA: Record<SupportedLocale, LocaleMetadata> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    direction: "ltr",
    flag: "🇺🇸",
    firstDayOfWeek: 0,
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    direction: "ltr",
    flag: "🇩🇪",
    firstDayOfWeek: 1,
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    direction: "ltr",
    flag: "🇫🇷",
    firstDayOfWeek: 1,
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    flag: "🇪🇸",
    firstDayOfWeek: 1,
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
    flag: "🇸🇦",
    firstDayOfWeek: 6,
  },
};

const BASE_MESSAGES: Record<SupportedLocale, Record<string, string>> = {
  en: enMessages,
  de: deMessages,
  fr: frMessages,
  es: esMessages,
  ar: arMessages,
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
  messages?: Partial<Record<SupportedLocale, Record<string, string>>>;
}

export function I18nProvider({
  children,
  initialLocale,
  messages: externalMessages,
}: I18nProviderProps) {
  const layoutSettings = useOptionalLayoutSettings();

  const [currentLocale, setCurrentLocale] = React.useState<SupportedLocale>(() => {
    return layoutSettings?.settings?.i18n?.locale || initialLocale || "en";
  });

  // Keep in sync with layoutSettings if updated externally
  React.useEffect(() => {
    if (layoutSettings?.settings?.i18n?.locale) {
      setCurrentLocale(layoutSettings.settings.i18n.locale);
    }
  }, [layoutSettings?.settings?.i18n?.locale]);

  const activeLocale: SupportedLocale = currentLocale;
  const showTranslationKeys: boolean =
    layoutSettings?.settings?.i18n?.showTranslationKeys || false;

  const [registry, setRegistry] = React.useState<
    Record<SupportedLocale, Record<string, string>>
  >(() => {
    const initial = { ...BASE_MESSAGES };
    if (externalMessages) {
      for (const loc of Object.keys(externalMessages) as SupportedLocale[]) {
        initial[loc] = { ...initial[loc], ...externalMessages[loc] };
      }
    }
    return initial;
  });

  const metadata = LOCALES_METADATA[activeLocale] || LOCALES_METADATA.en;
  const direction: TextDirection = metadata.direction;

  // Sync dir and lang attributes on the document
  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", activeLocale);
  }, [direction, activeLocale]);

  const setLocale = React.useCallback(
    (newLocale: SupportedLocale) => {
      setCurrentLocale(newLocale);
      if (layoutSettings) {
        layoutSettings.updateI18nSettings({ locale: newLocale });
      }
    },
    [layoutSettings]
  );

  const registerMessages = React.useCallback(
    (locale: SupportedLocale, namespace: string, messages: Record<string, string>) => {
      setRegistry((prev) => {
        const current = prev[locale] || {};
        const prefixed: Record<string, string> = {};
        for (const [k, v] of Object.entries(messages)) {
          const key = namespace ? `${namespace}.${k}` : k;
          prefixed[key] = v;
        }
        return {
          ...prev,
          [locale]: { ...current, ...prefixed },
        };
      });
    },
    []
  );

  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>, fallback?: string): string => {
      if (showTranslationKeys) {
        return `[${key}]`;
      }

      const activeDict = registry[activeLocale] || {};
      const enDict = registry.en || {};

      let message = activeDict[key] ?? enDict[key] ?? fallback ?? key;

      if (params) {
        for (const [paramKey, paramVal] of Object.entries(params)) {
          message = message.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramVal));
        }
      }

      return message;
    },
    [registry, activeLocale, showTranslationKeys]
  );

  const formatDate = React.useCallback(
    (date: Date | number | string, options?: Intl.DateTimeFormatOptions): string => {
      const d = typeof date === "object" ? date : new Date(date);
      const timeZone = layoutSettings?.settings?.i18n?.timeZone || "UTC";
      return new Intl.DateTimeFormat(activeLocale, {
        timeZone,
        dateStyle: options?.dateStyle ?? "medium",
        ...options,
      }).format(d);
    },
    [activeLocale, layoutSettings]
  );

  const formatTime = React.useCallback(
    (date: Date | number | string, options?: Intl.DateTimeFormatOptions): string => {
      const d = typeof date === "object" ? date : new Date(date);
      const timeZone = layoutSettings?.settings?.i18n?.timeZone || "UTC";
      return new Intl.DateTimeFormat(activeLocale, {
        timeZone,
        timeStyle: options?.timeStyle ?? "short",
        ...options,
      }).format(d);
    },
    [activeLocale, layoutSettings]
  );

  const formatRelativeTime = React.useCallback(
    (value: number, unit: Intl.RelativeTimeFormatUnit): string => {
      return new Intl.RelativeTimeFormat(activeLocale, { numeric: "auto" }).format(
        value,
        unit
      );
    },
    [activeLocale]
  );

  const formatNumber = React.useCallback(
    (value: number, options?: Intl.NumberFormatOptions): string => {
      return new Intl.NumberFormat(activeLocale, options).format(value);
    },
    [activeLocale]
  );

  const formatCurrency = React.useCallback(
    (value: number, currency = "EUR"): string => {
      return new Intl.NumberFormat(activeLocale, {
        style: "currency",
        currency,
      }).format(value);
    },
    [activeLocale]
  );

  const value = React.useMemo<I18nContextValue>(() => {
    return {
      locale: activeLocale,
      direction,
      setLocale,
      t,
      formatDate,
      formatTime,
      formatRelativeTime,
      formatNumber,
      formatCurrency,
      showTranslationKeys,
      registerMessages,
    };
  }, [
    activeLocale,
    direction,
    setLocale,
    t,
    formatDate,
    formatTime,
    formatRelativeTime,
    formatNumber,
    formatCurrency,
    showTranslationKeys,
    registerMessages,
  ]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useT() {
  const { t } = useI18n();
  return t;
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}

export function useDirection() {
  const { direction } = useI18n();
  return direction;
}

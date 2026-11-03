export type SupportedLocale = "en" | "de" | "fr" | "es" | "ar";
export type TextDirection = "ltr" | "rtl";

export interface LocaleMetadata {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  direction: TextDirection;
  flag: string;
  firstDayOfWeek: number; // 0 = Sunday, 1 = Monday
}

export type MessageDictionary = Record<string, string | Record<string, string>>;

export interface I18nContextValue {
  locale: SupportedLocale;
  direction: TextDirection;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, params?: Record<string, string | number>, fallback?: string) => string;
  formatDate: (date: Date | number | string, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date | number | string, options?: Intl.DateTimeFormatOptions) => string;
  formatRelativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (value: number, currency?: string) => string;
  showTranslationKeys: boolean;
  registerMessages: (locale: SupportedLocale, namespace: string, messages: Record<string, string>) => void;
}

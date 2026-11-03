export interface WhiteLabelThemeConfig {
  appName: string;
  appSubtitle?: string;
  logo?: {
    lightUrl: string;
    darkUrl?: string;
    altText?: string;
    markLetter?: string;
  };
  brandColors?: {
    primaryHex: string;
    secondaryHex?: string;
  };
  fontFamily?: string;
  baseRadius?: "sm" | "md" | "lg";
}

export const DefaultThemeConfig: WhiteLabelThemeConfig = {
  appName: "EnterpriseUI",
  appSubtitle: "Operations Platform",
  logo: {
    lightUrl: "/logo.svg",
    markLetter: "E",
    altText: "Enterprise Logo",
  },
  brandColors: {
    primaryHex: "#0064d9",
  },
  baseRadius: "md",
};

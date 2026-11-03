import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LayoutSettingsProvider } from "@fw/settings";
import { I18nProvider } from "@fw/i18n";
import { SessionProvider } from "@fw/adapters";
import { OverlayProvider } from "@fw/overlays";

export const metadata: Metadata = {
  title: "Enterprise UI Framework & Gallery",
  description: "Configurable enterprise UI framework with calm, dense ergonomics for cyber-physical and operations applications.",
  colorScheme: "light dark",
};

const themeScript = `
(function() {
  try {
    var d = document.documentElement;
    var stored = localStorage.getItem('fw-layout-settings');
    var theme = 'system';
    if (stored) {
      theme = JSON.parse(stored).theme || 'system';
    }
    var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      d.classList.add('dark');
      d.style.colorScheme = 'dark';
    } else {
      d.classList.remove('dark');
      d.style.colorScheme = 'light';
    }
    var m = document.querySelector('meta[name="color-scheme"]');
    if (!m) {
      m = document.createElement('meta');
      m.name = 'color-scheme';
      document.head.appendChild(m);
    }
    m.content = isDark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const settingsCookie = cookieStore.get("fw-layout-settings");

  let initialSettings: Record<string, unknown> = {};
  let initialTheme = "system";

  if (settingsCookie?.value) {
    try {
      initialSettings = JSON.parse(decodeURIComponent(settingsCookie.value));
      if (initialSettings.theme && typeof initialSettings.theme === "string") {
        initialTheme = initialSettings.theme;
      }
    } catch {
      // ignore
    }
  }

  const isDarkInitial = initialTheme === "dark";

  return (
    <html
      lang="en"
      dir="ltr"
      className={isDarkInitial ? "dark" : ""}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <LayoutSettingsProvider initialSettings={initialSettings}>
          <I18nProvider>
            <SessionProvider>
              <OverlayProvider>{children}</OverlayProvider>
            </SessionProvider>
          </I18nProvider>
        </LayoutSettingsProvider>
      </body>
    </html>
  );
}

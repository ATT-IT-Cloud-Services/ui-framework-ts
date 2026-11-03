"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import { LanguageSwitcher, useI18n, type SupportedLocale } from "@fw/i18n";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@fw/ui";
import { DemoFrame } from "../../_shared/DemoFrame";
import { OrdersPage } from "../../_shared/shared-pages/OrdersPage";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function I18nRtlDemo() {
  const { locale, setLocale, direction, t, formatDate, formatNumber, formatCurrency } =
    useI18n();

  const now = new Date();

  return (
    <DemoFrame
      demoId="services-i18n-rtl"
      title="Internationalization & RTL Engine"
      description="5 fully typed locales (en, de, fr, es, ar). Switching to Arabic automatically flips document direction to RTL, mirroring all sidebars, tables, and buttons."
      folderPath="demo/services/i18n-rtl/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-6">
          <PageHeader
            title={t("customizer.languageAndRegion")}
            subtitle="Demonstrating ICU message format, localized number/date/currency formatters, and automatic RTL mirroring."
            actions={<LanguageSwitcher variant="buttons" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">Active Direction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="text-xl font-bold font-mono text-primary uppercase">
                  {direction}
                </div>
                <p className="text-2xs text-muted-foreground">
                  Document root <code className="bg-muted px-1 rounded">&lt;html dir=&quot;{direction}&quot;&gt;</code> updated dynamically.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                  className="text-xs"
                >
                  Toggle {locale === "ar" ? "English (LTR)" : "Arabic (RTL)"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">Date & Time Formatter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="font-semibold text-foreground">{formatDate(now)}</div>
                <div className="text-2xs text-muted-foreground">
                  Full: {formatDate(now, { dateStyle: "full" })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold">Number & Currency Formatter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="font-mono font-semibold text-foreground">
                  {formatCurrency(142850.5, "EUR")}
                </div>
                <div className="text-2xs text-muted-foreground">
                  Number: {formatNumber(98400.25)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Language Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-semibold">Language Quick Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {(["en", "de", "fr", "es", "ar"] as SupportedLocale[]).map((loc) => (
                  <Button
                    key={loc}
                    size="sm"
                    variant={locale === loc ? "default" : "outline"}
                    onClick={() => setLocale(loc)}
                    className="text-xs font-medium uppercase"
                  >
                    {loc}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Render Orders Table to demonstrate RTL table layout */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              RTL Table & Form Alignment
            </h3>
            <OrdersPage />
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default I18nRtlDemo;

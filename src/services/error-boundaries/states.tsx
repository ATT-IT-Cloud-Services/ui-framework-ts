"use client";

import * as React from "react";
import { FileQuestion, ShieldAlert, ServerCrash, Wrench, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import { useT } from "../../i18n/provider";

export function NotFound({
  onBack,
  backHref = "/",
}: {
  onBack?: () => void;
  backHref?: string;
}) {
  const t = useT();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <FileQuestion className="h-7 w-7" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {t("errors.notFoundTitle")}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("errors.notFoundDesc")}
        </p>
      </div>
      {onBack ? (
        <Button variant="outline" size="sm" onClick={onBack} className="text-xs gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("common.back")}
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild className="text-xs gap-1.5">
          <a href={backHref}>
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("common.back")}
          </a>
        </Button>
      )}
    </div>
  );
}

export function Forbidden({
  onBack,
}: {
  onBack?: () => void;
}) {
  const t = useT();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
        <ShieldAlert className="h-7 w-7" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {t("errors.forbiddenTitle")}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("errors.forbiddenDesc")}
        </p>
      </div>
      {onBack && (
        <Button variant="outline" size="sm" onClick={onBack} className="text-xs gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("common.back")}
        </Button>
      )}
    </div>
  );
}

export function ServerError({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  const t = useT();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ServerCrash className="h-7 w-7" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {t("errors.serverErrorTitle")}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("errors.serverErrorDesc")}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="text-xs gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          {t("errors.retry")}
        </Button>
      )}
    </div>
  );
}

export function Maintenance() {
  const t = useT();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
        <Wrench className="h-7 w-7" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {t("errors.maintenanceTitle")}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("errors.maintenanceDesc")}
        </p>
      </div>
    </div>
  );
}

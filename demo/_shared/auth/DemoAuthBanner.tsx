import * as React from "react";
import { ShieldAlert } from "lucide-react";

export function DemoAuthBanner() {
  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-medium select-none text-center">
      <ShieldAlert className="h-4 w-4 shrink-0" />
      <span>
        <strong>Demo Only:</strong> Mock authentication flows for demonstration purposes. No real credentials or database.
      </span>
    </div>
  );
}

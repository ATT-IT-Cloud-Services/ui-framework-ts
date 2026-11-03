import * as React from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { cn } from "../../lib/utils";

export type ConnectionState = "connected" | "disconnected" | "reconnecting";

export interface ConnectionStatusBannerProps {
  status: ConnectionState;
  onReconnect?: () => void;
  className?: string;
}

export function ConnectionStatusBanner({
  status,
  onReconnect,
  className = "",
}: ConnectionStatusBannerProps) {
  if (status === "connected") return null;

  const isReconnecting = status === "reconnecting";

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-1.5 text-2xs font-medium border-b select-none transition-colors",
        isReconnecting
          ? "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
          : "bg-destructive/10 border-destructive/20 text-destructive",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {isReconnecting ? (
          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <WifiOff className="h-3.5 w-3.5" />
        )}
        <span>
          {isReconnecting
            ? "Reconnecting to live telemetry stream..."
            : "Connection lost. Live data updates paused."}
        </span>
      </div>

      {!isReconnecting && onReconnect && (
        <button
          type="button"
          onClick={onReconnect}
          className="underline font-semibold hover:opacity-80"
        >
          Reconnect now
        </button>
      )}
    </div>
  );
}

export function ConnectionStatusBadge({
  status,
  className = "",
}: {
  status: ConnectionState;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-2xs font-medium border",
        status === "connected" && "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
        status === "reconnecting" && "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
        status === "disconnected" && "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
        className
      )}
    >
      {status === "connected" && <Wifi className="h-3 w-3" />}
      {status === "reconnecting" && <RefreshCw className="h-3 w-3 animate-spin" />}
      {status === "disconnected" && <WifiOff className="h-3 w-3" />}
      <span className="capitalize">{status}</span>
    </div>
  );
}

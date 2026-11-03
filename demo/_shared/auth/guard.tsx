"use client";

import * as React from "react";
import { useSession } from "@fw/adapters";
import { LoginPage } from "./LoginPage";

export function DemoRouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xs text-muted-foreground">
        Checking session status...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
}

"use client";

import * as React from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { CenteredLayout } from "@fw/layouts";
import { Button, Input } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoAuthBanner } from "./DemoAuthBanner";

export function TwoFactorPage({ onVerified }: { onVerified?: () => void }) {
  const [code, setCode] = React.useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }
    toast.success("2FA Security Verification successful!");
    onVerified?.();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DemoAuthBanner />
      <div className="flex-1">
        <CenteredLayout
          headerSlot={
            <div className="text-center space-y-1">
              <div className="h-10 w-10 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                <KeyRound className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Two-Factor Security Challenge
              </h2>
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit one-time code from your authenticator device.
              </p>
            </div>
          }
          footerSlot={
            <p className="text-xs text-muted-foreground">
              Lost authenticator device?{" "}
              <Link
                href="/demo/combined/enterprise-showcase/login"
                className="font-medium text-primary hover:underline"
              >
                Use emergency rescue key
              </Link>
            </p>
          }
        >
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1 text-center">
              <Input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="text-center font-mono text-lg tracking-widest h-11"
                autoFocus
              />
              <span className="text-2xs text-muted-foreground block pt-1">
                Demo hint: enter any 6 numbers (e.g. 123456)
              </span>
            </div>

            <Button type="submit" className="w-full text-xs font-semibold h-9">
              Verify Credentials
            </Button>
          </form>
        </CenteredLayout>
      </div>
    </div>
  );
}

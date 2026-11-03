"use client";

import * as React from "react";
import Link from "next/link";
import { CenteredLayout } from "@fw/layouts";
import { Button, Input } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoAuthBanner } from "./DemoAuthBanner";

export function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your work email.");
      return;
    }
    setSent(true);
    toast.success("Mock password reset instructions sent.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DemoAuthBanner />
      <div className="flex-1">
        <CenteredLayout
          headerSlot={
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Reset Security Credentials
              </h2>
              <p className="text-xs text-muted-foreground">
                Enter your verified operator email to receive a recovery token.
              </p>
            </div>
          }
          footerSlot={
            <p className="text-xs text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/demo/combined/enterprise-showcase/login"
                className="font-medium text-primary hover:underline"
              >
                Back to sign in
              </Link>
            </p>
          }
        >
          {sent ? (
            <div className="text-center py-4 space-y-3">
              <div className="h-10 w-10 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                ✓
              </div>
              <h3 className="text-sm font-semibold text-foreground">Check your inbox</h3>
              <p className="text-xs text-muted-foreground">
                We sent recovery token link to <strong className="text-foreground">{email}</strong>.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSent(false)}
                className="text-xs"
              >
                Send again
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 text-start">
                <label className="text-2xs font-medium text-muted-foreground">Work Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@enterprise.internal"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-xs font-semibold h-9">
                Send Reset Link
              </Button>
            </form>
          )}
        </CenteredLayout>
      </div>
    </div>
  );
}

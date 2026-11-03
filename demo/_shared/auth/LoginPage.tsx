"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { LogIn, Shield, ArrowRight } from "lucide-react";
import { SplitHeroLayout } from "@fw/layouts";
import { Button, Input, Checkbox } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoAuthBanner } from "./DemoAuthBanner";
import { MOCK_ACCOUNTS, type MockRole } from "./MockAuthAdapter";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid work email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginPageProps {
  onSuccess?: (role: MockRole) => void;
}

export function LoginPage({ onSuccess }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = React.useState<MockRole>("admin");
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: MOCK_ACCOUNTS.admin.email,
      password: "password123",
      remember: true,
    },
  });

  const handleRoleSelect = (role: MockRole) => {
    setSelectedRole(role);
    setValue("email", MOCK_ACCOUNTS[role].email);
  };

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Signed in successfully as ${MOCK_ACCOUNTS[selectedRole].name} (${selectedRole})`);
      onSuccess?.(selectedRole);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DemoAuthBanner />
      <div className="flex-1">
        <SplitHeroLayout
          heroContent={
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-xs font-medium">
                <Shield className="h-3.5 w-3.5" />
                <span>Zero-Trust Enterprise Architecture</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Industrial Intelligence & Mission Operations
              </h2>
              <p className="text-sm opacity-90 leading-relaxed max-w-md">
                Stream real-time sensor metrics, manage multi-facility dispatch, and configure
                enterprise safety parameters in one calm, dense, unified interface.
              </p>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="space-y-1 text-start">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Sign in to your account
              </h1>
              <p className="text-xs text-muted-foreground">
                Select a mock role or enter your credentials below.
              </p>
            </div>

            {/* Quick Mock Role Switcher */}
            <div className="space-y-2 p-3 rounded-lg border border-border bg-muted/30">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Quick Demo Role Selection
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["admin", "editor", "viewer"] as MockRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`py-1.5 px-2 text-2xs font-semibold rounded capitalize transition-all border ${
                      selectedRole === r
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-background border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1 text-start">
                <label className="text-2xs font-medium text-muted-foreground">Work Email</label>
                <Input {...register("email")} placeholder="name@enterprise.internal" />
                {errors.email && (
                  <p className="text-2xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1 text-start">
                <div className="flex items-center justify-between">
                  <label className="text-2xs font-medium text-muted-foreground">Password</label>
                  <Link
                    href="/demo/combined/enterprise-showcase/forgot-password"
                    className="text-2xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <p className="text-2xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" {...register("remember")} defaultChecked />
                <label
                  htmlFor="remember"
                  className="text-xs text-muted-foreground cursor-pointer select-none"
                >
                  Remember this device for 30 days
                </label>
              </div>

              <Button type="submit" disabled={loading} className="w-full text-xs font-semibold h-9">
                {loading ? "Authenticating..." : "Sign in"}
                <LogIn className="ms-1.5 h-3.5 w-3.5" />
              </Button>
            </form>

            <div className="pt-2 border-t border-border/80 text-center text-xs text-muted-foreground">
              <span>Don&apos;t have an enterprise account? </span>
              <Link
                href="/demo/combined/enterprise-showcase/register"
                className="font-medium text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Register
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </SplitHeroLayout>
      </div>
    </div>
  );
}

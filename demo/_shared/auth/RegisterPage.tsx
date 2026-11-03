"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { CenteredLayout } from "@fw/layouts";
import { Button, Input } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoAuthBanner } from "./DemoAuthBanner";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  facilityCode: z.string().min(3, "Facility code required"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration submitted! (Mock verification email dispatched)");
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DemoAuthBanner />
      <div className="flex-1">
        <CenteredLayout
          headerSlot={
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Request Facility Access
              </h2>
              <p className="text-xs text-muted-foreground">
                Register for delegated operator or auditor access.
              </p>
            </div>
          }
          footerSlot={
            <p className="text-xs text-muted-foreground">
              Already registered?{" "}
              <Link
                href="/demo/combined/enterprise-showcase/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1 text-start">
              <label className="text-2xs font-medium text-muted-foreground">Full Name</label>
              <Input {...register("fullName")} placeholder="Jane Doe" />
              {errors.fullName && <p className="text-2xs text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1 text-start">
              <label className="text-2xs font-medium text-muted-foreground">Work Email</label>
              <Input {...register("email")} placeholder="jane.doe@facility.internal" />
              {errors.email && <p className="text-2xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1 text-start">
              <label className="text-2xs font-medium text-muted-foreground">Facility Station Code</label>
              <Input {...register("facilityCode")} placeholder="E.g. STN-GER-04" />
              {errors.facilityCode && (
                <p className="text-2xs text-destructive">{errors.facilityCode.message}</p>
              )}
            </div>

            <div className="space-y-1 text-start">
              <label className="text-2xs font-medium text-muted-foreground">Desired Password</label>
              <Input type="password" {...register("password")} />
              {errors.password && <p className="text-2xs text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full text-xs font-semibold h-9">
              {loading ? "Registering..." : "Submit Access Request"}
            </Button>
          </form>
        </CenteredLayout>
      </div>
    </div>
  );
}

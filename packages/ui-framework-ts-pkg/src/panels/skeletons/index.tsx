import * as React from "react";
import { Skeleton } from "../../ui/skeleton";
import { cn } from "../../lib/utils";

export function TableSkeleton({
  rows = 5,
  cols = 4,
  className = "",
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 rounded-lg border border-border p-4 bg-card", className)}>
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <Skeleton className="h-7 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 py-2 border-b border-border/40 last:border-none">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MasterDetailSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]", className)}>
      <div className="rounded-lg border border-border p-3 space-y-3 bg-card">
        <Skeleton className="h-7 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
      </div>
      <div className="md:col-span-2 rounded-lg border border-border p-5 space-y-4 bg-card">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-40 w-full mt-4" />
      </div>
    </div>
  );
}

export function ObjectPageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-lg border border-border p-5 bg-card space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 pt-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="rounded-lg border border-border p-6 bg-card space-y-4">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

export function DashboardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-72 rounded-lg" />
        <Skeleton className="h-72 rounded-lg" />
      </div>
      <TableSkeleton rows={4} />
    </div>
  );
}

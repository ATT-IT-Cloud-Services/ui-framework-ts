"use client";

import * as React from "react";
import { X, Pin, PinOff, Paperclip, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";

export interface KeyValuePair {
  key: string;
  value: React.ReactNode;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
}

export interface AttachmentItem {
  id: string;
  name: string;
  size: string;
  href?: string;
}

export interface InfoPanelProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
  keyValues?: KeyValuePair[];
  activities?: ActivityItem[];
  attachments?: AttachmentItem[];
  footerActions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function InfoPanel({
  title,
  subtitle,
  onClose,
  isPinned,
  onTogglePin,
  keyValues = [],
  activities = [],
  attachments = [],
  footerActions,
  children,
  className = "",
}: InfoPanelProps) {
  return (
    <aside className={cn("flex flex-col h-full space-y-4 select-none text-xs", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="space-y-0.5">
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          {subtitle && <p className="text-2xs text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-1">
          {onTogglePin && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onTogglePin}
              title={isPinned ? "Unpin panel" : "Pin panel"}
            >
              {isPinned ? <Pin className="h-3.5 w-3.5 text-primary" /> : <PinOff className="h-3.5 w-3.5 text-muted-foreground" />}
            </Button>
          )}

          {onClose && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              title="Close panel"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Body sections */}
      <div className="flex-1 overflow-y-auto space-y-5 pe-1">
        {/* Key-Value Pair Attributes */}
        {keyValues.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
              Properties
            </h4>
            <dl className="grid grid-cols-1 gap-2 rounded-md border border-border/60 bg-muted/20 p-3">
              {keyValues.map((pair) => (
                <div key={pair.key} className="flex items-center justify-between">
                  <dt className="text-muted-foreground text-2xs">{pair.key}</dt>
                  <dd className="font-medium text-foreground text-end">{pair.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Activity Timeline */}
        {activities.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Activity</span>
            </div>
            <ul className="space-y-2">
              {activities.map((act) => (
                <li key={act.id} className="text-2xs border-s-2 border-border ps-2.5 py-0.5 space-y-0.5">
                  <p className="text-foreground">
                    <span className="font-semibold">{act.actor}</span> {act.action}
                  </p>
                  <span className="text-muted-foreground text-[10px] block">{act.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Paperclip className="h-3 w-3" />
              <span>Attachments ({attachments.length})</span>
            </div>
            <ul className="space-y-1.5">
              {attachments.map((att) => (
                <li
                  key={att.id}
                  className="flex items-center justify-between rounded-md border border-border/60 p-2 hover:bg-muted/40 transition-colors"
                >
                  <span className="font-medium text-foreground truncate max-w-[150px]">{att.name}</span>
                  <span className="text-2xs text-muted-foreground">{att.size}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {children}
      </div>

      {/* Footer Actions */}
      {footerActions && (
        <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
          {footerActions}
        </div>
      )}
    </aside>
  );
}

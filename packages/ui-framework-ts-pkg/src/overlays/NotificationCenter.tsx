"use client";

import * as React from "react";
import { Bell, CheckCheck, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  day?: string; // e.g. "Today", "Yesterday", "Older"
  read: boolean;
  category: "alert" | "info" | "mention";
  actionUrl?: string;
}

export interface NotificationCenterProps {
  notifications?: NotificationItem[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  className?: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "Anomaly detected in Turbine 4",
    message: "Bearing vibration reached warning threshold (4.8 mm/s).",
    timestamp: "10 mins ago",
    day: "Today",
    read: false,
    category: "alert",
  },
  {
    id: "n-2",
    title: "Shift report generated",
    message: "Night shift telemetry logs successfully archived.",
    timestamp: "1 hour ago",
    day: "Today",
    read: false,
    category: "info",
  },
  {
    id: "n-3",
    title: "Marcus mentioned you in Order #8921",
    message: "'Please verify the valve dispatch certificate.'",
    timestamp: "Yesterday",
    day: "Yesterday",
    read: true,
    category: "mention",
  },
];

export function NotificationCenter({
  notifications: initialNotifications = DEFAULT_NOTIFICATIONS,
  onMarkAsRead,
  onMarkAllAsRead,
  className = "",
}: NotificationCenterProps) {
  const [items, setItems] = React.useState<NotificationItem[]>(initialNotifications);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    onMarkAllAsRead?.();
  };

  const markItemRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    onMarkAsRead?.(id);
  };

  const renderNotificationList = (filterType: "all" | "unread" | "mentions") => {
    const filtered = items.filter((n) => {
      if (filterType === "unread") return !n.read;
      if (filterType === "mentions") return n.category === "mention";
      return true;
    });

    if (filtered.length === 0) {
      return (
        <div className="py-12 text-center text-xs text-muted-foreground">
          No notifications in this view.
        </div>
      );
    }

    // Group by day
    const grouped = new Map<string, NotificationItem[]>();
    for (const item of filtered) {
      const day = item.day || "Recent";
      if (!grouped.has(day)) grouped.set(day, []);
      grouped.get(day)!.push(item);
    }

    return (
      <div className="space-y-4">
        {Array.from(grouped.entries()).map(([day, list]) => (
          <div key={day} className="space-y-1.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 block">
              {day}
            </span>
            <div className="space-y-1">
              {list.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markItemRead(item.id)}
                  className={cn(
                    "flex flex-col gap-1 p-2.5 rounded-md text-xs cursor-pointer transition-colors border",
                    item.read
                      ? "border-transparent hover:bg-muted/50 text-muted-foreground"
                      : "border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground font-medium"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground truncate">{item.title}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-2xs opacity-90 line-clamp-2">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const content = (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="default" size="sm" className="h-4 px-1.5 text-[10px]">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllRead}
            className="h-6 text-2xs gap-1 text-muted-foreground hover:text-foreground"
          >
            <CheckCheck className="h-3 w-3" />
            Mark all read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="grid grid-cols-3 h-7 w-full mb-2">
          <TabsTrigger value="all" className="text-2xs">All</TabsTrigger>
          <TabsTrigger value="unread" className="text-2xs">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger value="mentions" className="text-2xs">Mentions</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto pe-1">
          <TabsContent value="all" className="m-0">
            {renderNotificationList("all")}
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            {renderNotificationList("unread")}
          </TabsContent>
          <TabsContent value="mentions" className="m-0">
            {renderNotificationList("mentions")}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );

  const bellTrigger = (
    <button
      type="button"
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
        className
      )}
      aria-label="Notifications"
    >
      <Bell className="h-4 w-4" />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 end-1.5 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
      )}
    </button>
  );

  // Mobile layout: render as a full height drawer Sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>{bellTrigger}</SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] p-4 flex flex-col">
          <SheetHeader className="sr-only">
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop layout: render as popover
  return (
    <Popover>
      <PopoverTrigger asChild>{bellTrigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-3 h-96">
        {content}
      </PopoverContent>
    </Popover>
  );
}

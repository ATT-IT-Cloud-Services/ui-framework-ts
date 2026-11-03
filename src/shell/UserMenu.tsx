"use client";

import * as React from "react";
import { LogOut, User, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { AuthUser } from "../adapters/types";

export interface UserMenuProps {
  user?: AuthUser | null;
  items?: React.ReactNode;
  onSignOut?: () => void;
  className?: string;
}

export function UserMenu({
  user,
  items,
  onSignOut,
  className = "",
}: UserMenuProps) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "OP";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
          aria-label="User account menu"
        >
          <Avatar className="h-7 w-7 border border-border">
            {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1.5">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-semibold leading-none text-foreground">
              {user?.name || "Operator"}
            </p>
            <p className="text-2xs leading-none text-muted-foreground truncate">
              {user?.email || "operator@enterprise.internal"}
            </p>
            {user?.roles && user.roles.length > 0 && (
              <div className="flex items-center gap-1 pt-1 flex-wrap">
                {user.roles.map((role) => (
                  <Badge key={role} variant="outline" size="sm" className="text-[9px] uppercase tracking-wider">
                    <Shield className="h-2.5 w-2.5 me-0.5 text-primary" />
                    {role}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="text-xs cursor-pointer">
            <User className="me-2 h-3.5 w-3.5" />
            <span>Profile</span>
          </DropdownMenuItem>
          {items}
        </DropdownMenuGroup>

        {onSignOut && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={onSignOut}
              className="text-xs cursor-pointer"
            >
              <LogOut className="me-2 h-3.5 w-3.5" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type SessionStatus = "authenticated" | "unauthenticated" | "loading" | "anonymous";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: string[];
  permissions: string[];
  tenantId?: string;
  tenantName?: string;
}

export interface AuthAdapter {
  status: SessionStatus;
  user: AuthUser | null;
  roles: string[];
  permissions: string[];
  signOut?: () => Promise<void> | void;
  onSessionExpired?: (callback: () => void) => () => void;
}

export interface DataQueryPagination {
  pageIndex: number;
  pageSize: number;
}

export interface DataQuerySorting {
  id: string;
  desc: boolean;
}

export interface DataQueryFilter {
  id: string;
  value: unknown;
}

export interface DataQuery {
  pagination?: DataQueryPagination;
  sorting?: DataQuerySorting[];
  filters?: DataQueryFilter[];
  search?: string;
  params?: Record<string, unknown>;
}

export interface DataResult<T> {
  data: T[];
  totalCount: number;
  pageCount?: number;
  meta?: Record<string, unknown>;
}

export interface DataAdapter<T = unknown, Q = DataQuery> {
  load: (query: Q) => Promise<DataResult<T>>;
}

export interface TelemetryEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

export interface TelemetryAdapter {
  trackPageView: (path: string) => void;
  trackEvent: (name: string, properties?: Record<string, unknown>) => void;
  trackError: (error: Error, context?: Record<string, unknown>) => void;
}

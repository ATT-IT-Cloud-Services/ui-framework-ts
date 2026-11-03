"use client";

import * as React from "react";
import type { DataAdapter, DataQuery, DataResult } from "./types";

export function createInMemoryDataAdapter<T>(
  initialItems: T[],
  filterFn?: (item: T, query: DataQuery) => boolean
): DataAdapter<T, DataQuery> {
  return {
    async load(query: DataQuery): Promise<DataResult<T>> {
      let filtered = [...initialItems];

      if (filterFn) {
        filtered = filtered.filter((item) => filterFn(item, query));
      }

      const totalCount = filtered.length;
      const pageIndex = query.pagination?.pageIndex ?? 0;
      const pageSize = query.pagination?.pageSize ?? 10;

      const start = pageIndex * pageSize;
      const paginated = filtered.slice(start, start + pageSize);

      return {
        data: paginated,
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
      };
    },
  };
}

export function useDataQuery<T, Q extends DataQuery = DataQuery>(
  adapter: DataAdapter<T, Q>,
  query: Q
): {
  data: T[];
  totalCount: number;
  pageCount: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [data, setData] = React.useState<T[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [version, setVersion] = React.useState(0);

  const queryKey = JSON.stringify(query);

  React.useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    adapter
      .load(query)
      .then((result) => {
        if (!cancelled) {
          setData(result.data);
          setTotalCount(result.totalCount);
          setPageCount(result.pageCount ?? Math.ceil(result.totalCount / (query.pagination?.pageSize || 10)));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [adapter, queryKey, version, query]);

  const refetch = React.useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  return {
    data,
    totalCount,
    pageCount,
    isLoading,
    error,
    refetch,
  };
}

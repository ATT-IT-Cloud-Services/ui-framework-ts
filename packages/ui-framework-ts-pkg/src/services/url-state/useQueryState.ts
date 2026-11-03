"use client";

import * as React from "react";

export function useQueryState<T extends string>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  const [value, setValue] = React.useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    const params = new URLSearchParams(window.location.search);
    const paramVal = params.get(key);
    return (paramVal as T) || defaultValue;
  });

  const setQueryValue = React.useCallback(
    (newValue: T) => {
      setValue(newValue);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (newValue === defaultValue || !newValue) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, newValue);
        }
        window.history.replaceState({}, "", url.toString());
      }
    },
    [key, defaultValue]
  );

  return [value, setQueryValue];
}

"use client";

import { toast as sonnerToast, type ExternalToast } from "sonner";
import type { ReactNode, ReactElement } from "react";

export interface ToastOptions extends ExternalToast {
  description?: string;
  duration?: number;
  id?: string | number;
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, options as ExternalToast);
  },

  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, options as ExternalToast);
  },

  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, options as ExternalToast);
  },

  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, options as ExternalToast);
  },

  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, options as ExternalToast);
  },

  promise: <T,>(
    promise: Promise<T>,
    data: {
      loading: string;
      success: (data: T) => string;
      error: (error: Error) => string;
    }
  ) => {
    return sonnerToast.promise(promise, data);
  },

  custom: (jsx: ReactNode, options?: ToastOptions) => {
    return sonnerToast.custom(() => jsx as ReactElement, options as ExternalToast);
  },

  dismiss: (id?: string | number) => {
    sonnerToast.dismiss(id);
  },

  dismissAll: () => {
    sonnerToast.dismiss();
  },
};

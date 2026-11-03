import * as React from "react";
import { useComponentStyle } from "../settings/ComponentCustomizer";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customId?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, customId, style, ...props }, ref) => {
    const customStyle = useComponentStyle("input", customId);

    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          customStyle.className,
          className
        )}
        style={{ ...customStyle.style, ...style }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

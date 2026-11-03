"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useComponentStyle } from "../settings/ComponentCustomizer";
import { cn } from "../lib/utils";

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showValue?: boolean;
    valuePrefix?: string;
    valueSuffix?: string;
    trackClassName?: string;
    thumbClassName?: string;
    customId?: string;
  }
>(({ className, showValue = false, valuePrefix = "", valueSuffix = "", trackClassName = "", thumbClassName = "", customId, ...props }, ref) => {
  const customStyle = useComponentStyle("slider", customId);
  const value = props.value || props.defaultValue || [0];

  return (
    <div className={cn("relative flex flex-col gap-1.5 w-full select-none", customStyle.className)}>
      {showValue && (
        <div className="flex justify-between items-center text-2xs text-muted-foreground font-mono">
          <span>{props.min ?? 0}{valueSuffix}</span>
          <span className="font-semibold text-foreground">
            {valuePrefix}{value[0]}{valueSuffix}
          </span>
          <span>{props.max ?? 100}{valueSuffix}</span>
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center cursor-pointer",
          className
        )}
        style={{ ...customStyle.style, ...props.style }}
        {...props}
      >
        <SliderPrimitive.Track className={cn("relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted", trackClassName)}>
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={cn("block h-4 w-4 rounded-full border border-primary/50 bg-background shadow-xs ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform", thumbClassName)} />
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

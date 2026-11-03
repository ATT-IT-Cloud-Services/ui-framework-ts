"use client";

import * as React from "react";

export interface CustomComponentStyle {
  radius?: "none" | "sm" | "md" | "lg" | "full";
  density?: "compact" | "comfortable" | "spacious";
  variant?: string;
  className?: string;
  style?: React.CSSProperties;
}

export type ComponentRegistry = Record<
  string, // componentType (e.g. "button", "input", "card", "slider")
  {
    global?: CustomComponentStyle;
    byCustomId?: Record<string, CustomComponentStyle>; // customId -> style
  }
>;

interface ComponentCustomizerContextValue {
  registry: ComponentRegistry;
  registerGlobalStyle: (componentType: string, style: CustomComponentStyle) => void;
  registerCustomIdStyle: (componentType: string, customId: string, style: CustomComponentStyle) => void;
  getComponentStyle: (componentType: string, customId?: string) => CustomComponentStyle;
}

const ComponentCustomizerContext = React.createContext<ComponentCustomizerContextValue>({
  registry: {},
  registerGlobalStyle: () => {},
  registerCustomIdStyle: () => {},
  getComponentStyle: () => ({}),
});

export function ComponentCustomizerProvider({
  children,
  initialRegistry = {},
}: {
  children: React.ReactNode;
  initialRegistry?: ComponentRegistry;
}) {
  const [registry, setRegistry] = React.useState<ComponentRegistry>(initialRegistry);

  const registerGlobalStyle = React.useCallback((componentType: string, style: CustomComponentStyle) => {
    setRegistry((prev) => ({
      ...prev,
      [componentType]: {
        ...prev[componentType],
        global: { ...prev[componentType]?.global, ...style },
      },
    }));
  }, []);

  const registerCustomIdStyle = React.useCallback(
    (componentType: string, customId: string, style: CustomComponentStyle) => {
      setRegistry((prev) => ({
        ...prev,
        [componentType]: {
          ...prev[componentType],
          byCustomId: {
            ...prev[componentType]?.byCustomId,
            [customId]: style,
          },
        },
      }));
    },
    []
  );

  const getComponentStyle = React.useCallback(
    (componentType: string, customId?: string): CustomComponentStyle => {
      const entry = registry[componentType];
      if (!entry) return {};

      const globalStyle = entry.global || {};
      const idStyle = customId && entry.byCustomId ? entry.byCustomId[customId] || {} : {};

      return {
        ...globalStyle,
        ...idStyle,
        className: `${globalStyle.className || ""} ${idStyle.className || ""}`.trim(),
        style: { ...globalStyle.style, ...idStyle.style },
      };
    },
    [registry]
  );

  return (
    <ComponentCustomizerContext.Provider
      value={{
        registry,
        registerGlobalStyle,
        registerCustomIdStyle,
        getComponentStyle,
      }}
    >
      {children}
    </ComponentCustomizerContext.Provider>
  );
}

export function useComponentStyle(componentType: string, customId?: string): CustomComponentStyle {
  const context = React.useContext(ComponentCustomizerContext);
  return context.getComponentStyle(componentType, customId);
}

export function useComponentCustomizer() {
  return React.useContext(ComponentCustomizerContext);
}

/**
 * Component Factory: Allows developers and operators to create new custom
 * reusable variants with pre-configured tokens and behaviors.
 */
export function createCustomComponent<P extends { className?: string }>(
  BaseComponent: React.ComponentType<P>,
  defaultOverrides: CustomComponentStyle & { defaultCustomId?: string }
): React.FC<P & { customId?: string }> {
  const CustomComponent: React.FC<P & { customId?: string }> = ({
    customId = defaultOverrides.defaultCustomId,
    className = "",
    ...props
  }) => {
    const customStyle = useComponentStyle("custom", customId);
    const combinedClassName = `${defaultOverrides.className || ""} ${customStyle.className || ""} ${className}`.trim();

    return <BaseComponent {...(props as P)} className={combinedClassName} />;
  };

  CustomComponent.displayName = `Customized(${BaseComponent.displayName || BaseComponent.name || "Component"})`;
  return CustomComponent;
}

"use client";

import * as React from "react";
import { HelpCircle, Keyboard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";

export interface ShortcutDefinition {
  id: string;
  keys: string; // e.g. "ctrl+k", "shift+?", "b"
  description: string;
  category?: string;
  handler: () => void;
  disabled?: boolean;
}

export interface ShortcutContextValue {
  shortcuts: ShortcutDefinition[];
  registerShortcut: (shortcut: ShortcutDefinition) => () => void;
  openHelp: () => void;
}

const ShortcutContext = React.createContext<ShortcutContextValue | null>(null);

export function ShortcutProvider({ children }: { children: React.ReactNode }) {
  const [shortcuts, setShortcuts] = React.useState<ShortcutDefinition[]>([]);
  const [helpOpen, setHelpOpen] = React.useState(false);

  const registerShortcut = React.useCallback((shortcut: ShortcutDefinition) => {
    setShortcuts((prev) => {
      const filtered = prev.filter((s) => s.id !== shortcut.id);
      return [...filtered, shortcut];
    });

    return () => {
      setShortcuts((prev) => prev.filter((s) => s.id !== shortcut.id));
    };
  }, []);

  const openHelp = React.useCallback(() => {
    setHelpOpen(true);
  }, []);

  // Global keydown handler
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Help modal trigger "?"
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setHelpOpen((p) => !p);
        return;
      }

      for (const sc of shortcuts) {
        if (sc.disabled) continue;

        const parts = sc.keys.toLowerCase().split("+");
        const key = parts[parts.length - 1];
        const needsCtrl = parts.includes("ctrl") || parts.includes("cmd");
        const needsShift = parts.includes("shift");
        const needsAlt = parts.includes("alt");

        const ctrlMatches = !needsCtrl || (e.ctrlKey || e.metaKey);
        const shiftMatches = !needsShift || e.shiftKey;
        const altMatches = !needsAlt || e.altKey;
        const keyMatches = e.key.toLowerCase() === key;

        if (ctrlMatches && shiftMatches && altMatches && keyMatches) {
          e.preventDefault();
          sc.handler();
          break;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);

  // Group shortcuts by category
  const grouped = React.useMemo(() => {
    const map = new Map<string, ShortcutDefinition[]>();
    for (const sc of shortcuts) {
      const cat = sc.category || "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(sc);
    }
    return Array.from(map.entries());
  }, [shortcuts]);

  return (
    <ShortcutContext.Provider value={{ shortcuts, registerShortcut, openHelp }}>
      {children}

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 pb-1">
              <Keyboard className="h-4 w-4 text-primary" />
              <DialogTitle className="text-sm font-semibold">Keyboard Shortcuts</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Press keys anywhere to trigger common actions. Press <kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono">?</kbd> to toggle this dialog.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 space-y-4 max-h-[350px] overflow-y-auto pe-1">
            {grouped.map(([category, items]) => (
              <div key={category} className="space-y-1.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  {category}
                </span>
                <div className="space-y-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-1 px-1 rounded hover:bg-muted/40"
                    >
                      <span className="text-foreground">{item.description}</span>
                      <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-2xs text-muted-foreground uppercase">
                        {item.keys}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </ShortcutContext.Provider>
  );
}

export function useShortcut(
  keys: string,
  handler: () => void,
  description: string,
  category = "General"
) {
  const context = React.useContext(ShortcutContext);

  React.useEffect(() => {
    if (!context) return;
    const id = `${keys}-${description}`;
    return context.registerShortcut({
      id,
      keys,
      handler,
      description,
      category,
    });
  }, [context, keys, handler, description, category]);
}

export function ShortcutHelpButton() {
  const context = React.useContext(ShortcutContext);
  if (!context) return null;

  return (
    <button
      type="button"
      onClick={context.openHelp}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      title="Keyboard Shortcuts (?)"
      aria-label="Keyboard Shortcuts"
    >
      <HelpCircle className="h-4 w-4" />
    </button>
  );
}

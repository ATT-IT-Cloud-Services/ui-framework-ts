# Keyboard Shortcuts Registry (`shortcuts`)

## What it is
Global shortcut handling service:
- Registers key listeners safely ignoring input fields.
- Provides `<ShortcutHelpButton />` or press `?` to open a categorized shortcuts directory dialog.
- Hook: `useShortcut(keys, handler, description, category)`.

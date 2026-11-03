# MasterDetail Layout Template (`MasterDetail`)

## What it is
A resizable split view combining a searchable master entity list (300–400px default) on the left with a full detail panel on the right.

## Behavior
- Desktop: Uses `react-resizable-panels` with smooth drag handles.
- Mobile (<768px): Automatically collapses into a single-pane flow (master list -> click item -> detail view with top "Back to list" button).

## When to use it
- Inboxes, ticket systems, work order reviews, customer lists, and audit logs.

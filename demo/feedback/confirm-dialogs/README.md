# Confirmation Dialogs Gallery (`confirm-dialogs`)

## What it is
A comprehensive gallery of decision confirmation patterns:
1. `useConfirm()`: Promise-based hook for clean, imperatively awaited decisions (`const ok = await confirm({...})`).
2. `DestructiveConfirmDialog`: Requires typing exact resource ID to prevent catastrophic deletion.
3. `InlineConfirm`: Button transforms in-place without modal popups.
4. `BottomDrawerConfirm`: Mobile-first drawer confirmation.
5. `SessionExpiredDialog`: Generic session timeout modal with re-auth callback.

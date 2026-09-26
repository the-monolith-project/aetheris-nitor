# Palette's Journal - Critical UX/A11y Learnings

## 2026-03-30 - Workspace Panel Popup Menus
**Learning:** Custom popup menus rendered in client scripts (like workspace panel option menus) require explicit `focus-visible` styles and focus management (focusing the first item on open and restoring focus to the trigger button on close) to ensure seamless keyboard navigation.
**Action:** Always include `focus-visible:ring-2` focus rings and manage keyboard focus transitions when adding dynamic dropdown menus to components.

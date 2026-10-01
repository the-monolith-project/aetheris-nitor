## 2025-05-24 - Visual status feedback for action buttons
**Learning:** Sighted users need immediate visual status feedback when performing export/copy actions on standalone buttons (like downloading SVG/PNG charts), similar to dropdown export menus. Hiding status messages behind `sr-only` deprives visual users of confirmation and error feedback.
**Action:** Always provide visible status containers (`text-ink-muted`) with auto-clearing timers alongside action buttons rather than hiding status behind `sr-only`.

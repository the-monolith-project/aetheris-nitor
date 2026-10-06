# Palette's Journal - Critical Learnings

## 2026-03-30 - Form Input Focus Indicators with Tailwind CSS
**Learning:** In Tailwind CSS v4, utility classes like `focus:outline-hidden` or `focus:outline-none` strip the browser's default focus ring on form controls (`select`, `input`, `textarea`). If `focus-visible:ring-2 focus-visible:ring-accent` (or similar ring utilities) is omitted, keyboard users lose all visual focus feedback when tabbing through fields.
**Action:** Always pair `focus:outline-hidden` on interactive form controls with explicit focus ring utilities (`focus-visible:ring-2 focus-visible:ring-accent`) to maintain WCAG 2.4.7 Focus Visible compliance.

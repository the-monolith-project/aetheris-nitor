## 2026-09-24 - Focus Rings & Actionable Client Download Feedback
**Learning:** Client-side CSV/Blob downloads do not trigger traditional page navigation, leaving keyboard and screen-reader users without feedback unless the button text updates temporarily and an `aria-live` status element is populated.
**Action:** When adding client-side export or download buttons, always include `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent` and provide instant visual and screen reader status updates upon trigger.

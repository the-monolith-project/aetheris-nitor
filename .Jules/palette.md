## 2026-03-31 - Keyboard Focus States for Dynamic Dropdown Menus
**Learning:** When dropdown menus (such as panel options in workspace grids) use JavaScript keydown handlers to move DOM focus via `.focus()`, relying solely on `hover:bg-...` fails to indicate which item is selected for keyboard users.
**Action:** Always include explicit `focus:bg-...` and `focus-visible:ring-2 focus-visible:ring-accent` on custom menu items so keyboard arrow-key navigation is clearly highlighted.

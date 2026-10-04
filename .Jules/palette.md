## 2026-10-04 - Section Navigation Pills and Action Context

**Learning:** Navigation pills (`NavSecciones.astro`) used for sub-page routing lack accessible feedback (`aria-current="page"`) and active visual distinction when rendered statically without URL matching. Additionally, action buttons that share identical text across multiple cards (like "Incrustar") need specific context in `aria-label` and `title` to allow screen reader users to distinguish which widget is being operated.

**Action:** Always check `Astro.url.pathname` to mark active navigation pills with `aria-current="page"` and active styling, and ensure action buttons with repeated labels include context (`Incrustar: ${titulo}`) in `aria-label` and `title` attributes.

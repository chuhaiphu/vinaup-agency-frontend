# Date & Time Pattern

## What

### A timestamp is ONE instant; a timezone is a LENS

A `Date` / Postgres `timestamptz` is not the text "30/04/2026 08:00" — it is a single number, **milliseconds since the Unix epoch (UTC)**, one absolute point on the world timeline with **no timezone attached**. A timezone is only a _lens_: the number never changes, only the text we read it as.

```
CREATE                         DATA            DISPLAY
human text + a timezone   ──►  the number ──►  human text seen through a timezone
"30/04 00:00 in UTC+7"         (immutable)     VN lens → "30/04 00:00" · UTC lens → "29/04 17:00"
```

| Concept           | Meaning                                 | Timezone?                   |
| ----------------- | --------------------------------------- | --------------------------- |
| **Instant**       | a precise moment ("published at 14:35") | stored UTC, shown in a lens |
| **Calendar date** | a label on a wall calendar ("the 30th") | none — same for everyone    |

### The shared contract

**Instants stored in UTC, transmitted as ISO-8601, the _viewer_ owns the timezone.** The browser is the only place that knows the viewer's lens.

1. **Send** instants as UTC ISO — `.toISOString()` (always ends in `Z`).
2. **Display** through the browser-local lens — `dayjs(value).format(...)`.
3. **Compute "which calendar day/month"** locally — the backend ships instants only.

This app uses **Day.js core only** (no `utc`/`timezone` plugins). `dayjs(iso)` reads an instant through the browser-local lens; `.format(...)` renders local; `.toISOString()` applies the UTC lens.

## The SSR catch (this is the web-specific rule)

A Server Component renders on the **server**, in the **server's** timezone — not the viewer's. Formatting a date during SSR and again during client hydration can produce **different text → a hydration mismatch**.

```tsx
// ❌ page.tsx (Server Component) — formats on the server → hydration mismatch (server tz ≠ browser tz)
return <span>{dayjs(blog.publishedAt).format('DD/MM/YYYY')}</span>;
```

```tsx
// ✅ published-at.tsx — a Client Component formats in the viewer's tz
'use client';
export function PublishedAt({ iso }: { iso: string }) {
  return <span>{dayjs(iso).format('DD/MM/YYYY')}</span>;
}
```

Pass the **raw ISO string** from server to client and format it there (or, when a fixed display zone is a deliberate product decision, add the `utc`/`timezone` plugins and format with that fixed zone consistently on both sides).

## Why

The server doesn't know the viewer's timezone; only the browser does. Keeping instants in UTC on the wire and formatting in the browser means the same record reads as the correct local time for a viewer in Hanoi or New York, with no configuration — and avoids hydration mismatches.

## How

### Rule 1 — Send instants with `.toISOString()`

Never send a locally-formatted or date-only string for an instant.

### Rule 2 — Display with `dayjs(value).format(...)`

Never hand-roll offset math, and prefer `dayjs` over `new Date().toLocaleDateString(...)` for consistency.

### Rule 3 — Format dates in Client Components

Keep date formatting on the client (the viewer's lens) to avoid SSR hydration mismatch. → [SERVER-CLIENT-BOUNDARY](SERVER-CLIENT-BOUNDARY.md)

### Rule 4 — Name format strings as constants

Define `DD_MM_YYYY`, `HH_MM`, etc. in `src/constants/` and reuse — don't scatter magic format strings. → [DRY](../principle/DRY.md)

## References

- [Day.js — UTC plugin (why core is local)](https://day.js.org/docs/en/plugin/utc)
- [MDN — Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [PostgreSQL — Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html)

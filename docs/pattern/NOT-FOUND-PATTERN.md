# Not Found (404)

## What

### What "not found" means

A **404 "Not Found"** is an HTTP status that says: _the URL is valid, but there is no resource behind it._ Nothing crashed (that would be a 500) — the thing simply isn't there. A correct 404 does two things at once:

1. returns **HTTP status 404** to the browser, and
2. injects `<meta name="robots" content="noindex">` so search engines **don't index** the empty page.

Getting both is the whole point. A page that just _shows_ the text "not found" but returns status 200 is **not** a 404 — Google will index it as a real page.

### How "not found" works in Next.js

In the App Router a 404 is produced by **two separate pieces that work together**:

|            | `notFound()` — the **trigger**                                                          | `not-found.tsx` — the **UI**                       |
| ---------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- |
| What it is | a function from `next/navigation`                                                       | a file convention (its default-exported component) |
| Role       | control flow — call it to declare "this is a 404"                                       | the page Next renders to show that 404             |
| Mechanism  | **throws** `NEXT_HTTP_ERROR_FALLBACK;404`, which halts rendering of the current segment | rendered when that throw bubbles up to it          |

The key idea: **`notFound()` does not return anything — it throws**, exactly like `throw new Error()`. Next catches that specific error and, instead of showing a crash screen, walks **up** the route tree to the nearest `not-found.tsx` and renders it as a 404.

```
app/(landing)/[endpoint]/page.tsx   (Server Component)
  const page = await getPage(endpoint)
  if (!page) notFound()        ── throws NEXT_HTTP_ERROR_FALLBACK;404 → rendering stops here
                  │
                  ▼  Next walks UP to the nearest not-found.tsx
  app/not-found.tsx             ── renders this UI + sets status 404 + injects robots=noindex
```

### Where each piece is used

- **`notFound()`** — call it inside a **Server Component** (`page.tsx` or `layout.tsx`), right after reading data, when the resource is missing (deleted, unpublished, or never existed). This is the _only_ place a 404 decision is made in this app.
- **`not-found.tsx`** — a **single** file at the root: [app/not-found.tsx](../../apps/jenahair/src/app/not-found.tsx). It does two jobs:
  1. the UI for **every** `notFound()` thrown anywhere in the app (it is the nearest boundary), and
  2. the automatic catch-all for any **URL that matches no route at all** — since Next 13.3, unmatched URLs are routed straight to the root `not-found.tsx`.

## How

### Rule 1 — Always import `notFound` from `next/navigation`

```tsx
import { notFound } from 'next/navigation'; // ✅
// NOT: import notFound from '../not-found'  ❌ that imports the UI component;
//      calling it just returns JSX and throws nothing — the 404 never triggers.
```

### Rule 2 — Throw `notFound()` in the Server Component, the moment data is missing

```tsx
const result = await getPageByEndpointActionPublic(endpoint);
if (!result.success || !result.data) notFound(); // bail before rendering anything
return <PageContent page={result.data} />; // below this line the data exists
```

No `return notFound()` needed — it is typed `never`, so TypeScript knows code after it is unreachable.

### Rule 3 — Decide the 404 in the page, never fake it in a UI component

The 404 decision belongs to the Server Component that **reads** the data — not to the component that **displays** it. Once `notFound()` has guarded the page, pass **non-nullable** data down (`page: PageResponse`, not `PageResponse | undefined`): a presentational component that received props is, by definition, already on the success path.

```tsx
// ❌ in the UI component — renders with HTTP 200, so Google indexes a "not found" page
if (!page) return <div>Page not found</div>;

// ✅ the page already called notFound(); the UI only ever renders real data
return <PageContent page={page} />;
```

A returned `<div>` is a normal successful render: status **200**, no `noindex`. Only `notFound()` produces a true 404 with the right status and meta tag. → [SoC](../principle/SOC.md)

### Rule 4 — `notFound()` + `'use cache'`: guard outside, cache inside

**Why we cannot put both on the same function.** `notFound()` works by **throwing**. `'use cache'` does the opposite: it runs the function, measures the render, and stores its **return value** to fold into the prerendered static shell. When `notFound()` throws _inside_ a `'use cache'` scope, it aborts that measured render half-way — Next never gets a clean value to cache, the prerender timing becomes invalid (the `'… [Prerender]' cannot have a negative time stamp` error).

**The fix: split the two responsibilities.** The throw must live _outside_ any cache; the cached render _inside_. The page becomes a thin **uncached guard** that decides the 404, then hands off to a **cached child** that renders:

```tsx
// page.tsx — UNCACHED guard: the throw lives here
export default async function DynamicEndpointPage({ params }) {
  const { endpoint } = await params;
  const res = await getPageByEndpointActionPublic(endpoint); // cached action → cheap read
  if (!res.success || !res.data) notFound(); // throw in an uncached scope ✓
  return <DynamicCachedEndpointContent endpoint={endpoint} />; // hand off to the cache
}

// CACHED render: 'use cache' lives here — no throw can happen inside
async function DynamicCachedEndpointContent({ endpoint }: { endpoint: string }) {
  'use cache';
  cacheLife('default');
  cacheTag('pages', `page:${endpoint}`, 'app-config'); // tag every domain it reads
  // …re-read via the cached actions and render the content
}
```

**Why it stays efficient.** The guard's read and the cached child's read resolve to the **same cached action entry** (keyed by `build id + function id + endpoint`), so there is only one real request — the guard is a cache hit, not a second fetch.

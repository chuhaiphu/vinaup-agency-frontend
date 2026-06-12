# Data Streaming Pattern

## What

In Next.js 16 App Router, **data is read on the server**. A route's `page.tsx` is a Server Component: it reads route params, calls actions, and hands the data to the UI. The reader's first question is never "how do I fetch in the client" — it's **"which of three ways does this component meet its data?"**

### Every async component resolves one of three ways

With Cache Components (`cacheComponents: true`), at prerender each async component must fall into exactly one of these, or you get a build error `Uncached data was accessed outside of <Suspense>`:

| Way | Directive / wrapper | Resolves | Goes into | Use for |
| --- | --- | --- | --- | --- |
| **Cached** | `'use cache'` | build / revalidate time | static shell | public data, same for everyone, OK to be slightly stale |
| **Streamed** | `<Suspense>` | request time | streamed after a fallback | per-request / personalised / must-be-fresh data |
| **Static** | *(none — pure sync)* | prerender | static shell | no async data at all |

`'use cache'` says *"this result is reusable"* → fold it into the static shell, paint instantly. `<Suspense>` says *"this result can't / shouldn't be cached"* → stream it at request time behind a fallback. One page routinely uses both.

### The decision: cached vs streamed

```
Does the component read a request-time API?
(cookies / headers / searchParams / auth)
        │
   ┌────┴────────────────────────────────┐
  YES                                    NO
   │                                      │
   ▼                                      ▼
Can't use 'use cache'            Public + shared + OK to be
(these throw in a cached scope)  slightly stale (invalidate by tag)?
   │                              ┌───────┴──────────┐
   ▼                             YES               NO — must be fresh
Read them OUTSIDE the cache       │                every request
and pass values as args to a      ▼                     │
cached fn — OR stream the      'use cache'               ▼
component under <Suspense>     + cacheLife          <Suspense> — stream
                              + cacheTag            (await connection()
                              → static shell         first if output is
                                                     non-deterministic:
                                                     Date.now / random)
```

**`cookies()` / `headers()` / `searchParams` can't be used inside `'use cache'`** — they're request-time APIs, so a component that reads them is always a *stream*, never a cache. (In this codebase `apiPrivate` reads cookies → every private read is inherently un-cacheable.) → [SERVER-CLIENT-BOUNDARY](SERVER-CLIENT-BOUNDARY.md).

#### Non-deterministic data → `await connection()`

Non-deterministic data is data that must be fresh per request but **does not** read any request API.

**What "non-deterministic" means.** A deterministic call returns the same output for the same input every time (`formatPrice(100)` → always `"100₫"`). A non-deterministic call returns a different value on each call.

```
Date.now()  /  new Date()   → the current instant, different every call
Math.random()               → a different number every call
```

**Why prerendering breaks them.** With `cacheComponents`, a prerendered component runs **once at build time** and its output is frozen into the static HTML. So the value `new Date()` and `Math.random()` return at build time never what we want for "now" or "a fresh pick per request".

Next.js _recognises_ `cookies()`/`headers()`/`searchParams` as request-time APIs and forces those subtrees to render at request time on its own. But `Date.now()`/`Math.random()` look like ordinary pure JS — Next.js has no way to know. We must say so explicitly with [`connection()`](https://nextjs.org/docs/app/api-reference/functions/connection):

> `connection()` indicates that rendering should wait for an incoming user request before continuing.

`await connection()` is a **boundary**: code _before_ it can still prerender; code _after_ it runs only once a real request arrives.

**How — `connection()` pairs with `<Suspense>`.** Once `await connection()` pushes the component to request time, it becomes uncached request-time work, which must sit under `<Suspense>` (otherwise the build error `Uncached data was accessed outside of <Suspense>`).

```tsx
import { connection } from 'next/server';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <StaticHeader /> {/* prerendered into the static shell — paints instantly */}
      <Suspense fallback={<Spinner />}>
        <RandomPick /> {/* streams at request time */}
      </Suspense>
    </>
  );
}

async function RandomPick() {
  await connection(); // ⬅ prerender stops here; everything below runs per request
  const pick = items[Math.floor(Math.random() * items.length)];
  return <p>Today&apos;s pick: {pick}</p>;
}
```

```
BUILD:    render shell → hit await connection() → STOP, emit <Spinner/> into static HTML
REQUEST:  resume after connection() → Math.random() runs now → stream result, replacing <Spinner/>
```

## Streaming: the two shapes

When a component streams (the right column above), there are two ways to wire it. Both put the slow read behind `<Suspense>`; they differ in **who awaits the promise**.

| Shape | When | How |
| --- | --- | --- |
| **Await** | data is required to render and there's no interactive shell to paint first | `const res = await getXActionPublic(...)` inside a component that sits under `<Suspense>`; pass resolved data down |
| **Stream with `use(promise)`** | a detail/edit screen whose interactive shell can paint before the data lands | page creates the promise (no `await`), passes it to a Client Component wrapped in `<Suspense>`, which calls `use(promise)` |

### Await (landing read)

```tsx
// src/app/(landing)/blogs/(index)/page.tsx — Server Component
async function BlogIndexPageContent({
  searchParams,
}: {
  searchParams: Promise<BlogIndexPageQueryParams>;
}) {
  // reads searchParams (runtime) → this content must STREAM, never cache
  const blogsResponse = await getAllBlogsActionPublic(); // data itself is cached at the action layer
  const queryParams = await searchParams;
  return <BlogGrid blogs={blogsResponse.data ?? []} queryParams={queryParams} />;
}

export default function BlogsIndexPage({ searchParams }: { searchParams: Promise<...> }) {
  return (
    <Suspense fallback={<BlogGridSkeleton />}>
      <BlogIndexPageContent searchParams={searchParams} />
    </Suspense>
  );
}
```

### Stream with `use(promise)` (detail/edit)

```tsx
// src/app/(dashboard)/adminup/blog/[id]/page.tsx — Server Component (not async)
export default function AdminBlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // chain off the params promise — never `await` it at the page root
  const currentBlogPromise = params.then((p) => getBlogByIdActionPrivate(p.id));
  const blogCategoriesPromise = getAllBlogCategoriesActionPrivate();

  return (
    <Suspense fallback={<DetailSkeleton />}>
      <AdminBlogDetailPageContent
        currentBlogPromise={currentBlogPromise}
        blogCategoriesPromise={blogCategoriesPromise}
      />
    </Suspense>
  );
}
```

```tsx
// the Client Component unwraps the promise
'use client';
export default function AdminBlogDetailPageContent({ currentBlogPromise, blogCategoriesPromise }) {
  const currentBlogResult = use(currentBlogPromise);
  const blogCategoriesResult = use(blogCategoriesPromise);
  // …render; data is guaranteed resolved here
}
```

## The cache boundary — how `'use cache'` and `<Suspense>` nest

When a cached component and a streamed component sit near each other, **what is cached vs dynamic is decided by one rule:**

> The cache boundary is the **body of the `'use cache'` function**.
> - Created / `await`ed / rendered by **direct import** *inside* that body → **INSIDE** the boundary → cached (frozen).
> - Received through `children` / slot props (**pass-through**) → **OUTSIDE** the boundary → stays dynamic, renders at request time.

```
Outer parent (uncached)
   │  creates <Dynamic/> ──┐ passes as children
   ▼                       ▼
┌─ 'use cache' boundary ───────────────────────────┐
│  await fetch()        ← INSIDE: cached            │
│  <PrerenderedChild/>  ← INSIDE: cached            │
│  {children}           ← OUTSIDE: dynamic, request │
└───────────────────────────────────────────────────┘
```

Docs call this **interleaving**: *"Anything included as `children`… is passed through the cached component without affecting its cache entry, as long as you don't directly reference the JSX slots inside the body."*

### The three nesting relationships

```
✅ (1) SIBLINGS — most common
   <CachedComponent />                 ← 'use cache', no Suspense needed
   <Suspense><Dynamic/></Suspense>

✅ (2) CACHED SHELL WRAPS Suspense (interleaving via children)
   <CachedShell>                       ← 'use cache' (static shell)
     <Suspense><Dynamic/></Suspense>   ← passed as children → streams at request
   </CachedShell>

⚠️ (3) Suspense WRAPS a pure cached component
   <Suspense fallback={<Skeleton/>}>
     <CachedComponent />               ← pointless: cached resolves at prerender,
   </Suspense>                            the fallback almost never shows
```

A cached component does **not** need a `<Suspense>` around it — it's already in the static shell, there is nothing to wait for. `<Suspense>` is for the *uncached* part.

Never import a dynamic (especially cookie-reading) component directly into a cached body. → constraints: [`use cache`](https://nextjs.org/docs/app/api-reference/directives/use-cache#constraints).

## Why

Reading on the server removes the client fetch waterfall (no `useEffect` + `useState` + loading flags) and ships less JS. Splitting work into **cached** (static shell) and **streamed** (Suspense) parts is what makes Partial Prerendering pay off: the shell and all reusable content paint instantly, while only the genuinely per-request pieces stream in.

## How

### Rule 1 — Read on the server, never fetch server data in `useEffect`

A leaf must not call an action in `useEffect` to load its data. Read it in the Server Component and pass it down (resolved or as a promise).

### Rule 2 — Pick the shape by the data, not by habit

Runtime/personalised/must-be-fresh → `<Suspense>` (stream). Public + shared + stale-OK → `'use cache'` + `cacheLife` + `cacheTag` (static shell). Reads `searchParams`/`cookies` → must stream. → decision diagram above, tags in [CACHING-PATTERN](CACHING-PATTERN.md).

### Rule 3 — Give every `<Suspense>` a `fallback`, and add `error.tsx`

A `<Suspense>` with no `fallback` paints nothing while loading — pass a skeleton. Add `error.tsx` at the route segment so a rejected promise renders a graceful boundary instead of crashing the tree.

### Rule 4 — The UI branches on `ActionResponse`, never on a raw fetch

`use(promise)` / `await` resolves to `ActionResponse<T>`; check `result.success` before reading `result.data`. → [REPOSITORY-PATTERN](REPOSITORY-PATTERN.md)

### Rule 5 — To interleave dynamic content inside a cached shell, pass it as `children`

Never import a dynamic (cookie/header-reading) component directly into a `'use cache'` body — it either errors or gets frozen. Hand it in as `children`/slots from an uncached parent so it streams outside the boundary. → cache-boundary section above.

### Rule 6 — Don't cache a page that calls `notFound()` / `redirect()`

Those throw a control-flow error that a cached scope swallows. Leave such pages uncached; the data they read is already cached at the action layer. → [CACHING-PATTERN Rule 8](CACHING-PATTERN.md), [vercel/next.js#73130](https://github.com/vercel/next.js/issues/73130).

# Caching Pattern

## What

### Caching, from first principles

**Caching** is keeping a copy of the result of an expensive operation (a DB query, an HTTP call, a render) close to where it's consumed, so the next request for the *same* result is served from the copy instead of redoing the work. Every cache therefore trades one thing for another: **latency/cost ↓** in exchange for **staleness↑** — the copy can lag behind the source.

Three questions define any cache:

| Question                      | In Next.js terms        |
| ----------------------------- | ----------------------- |
| **What is the key?** (when are two requests "the same") | build id + function id + serialized args |
| **How long is the copy valid?** (time-based eviction)   | `cacheLife` profile (`stale`/`revalidate`/`expire`) |
| **How do I force it stale early?** (event-based eviction) | `cacheTag` + `updateTag` / `revalidateTag` |

### Where caches live — the layers

In a system a request passes through several tiers between the user and the database, and *each tier can hold a cache*:

```

 ┌──────────┐   ┌──────────────┐   ┌─────────────────────────────┐   ┌────────────┐
 │ Browser  │ → │  CDN / Edge  │ → │   App server (Next.js)      │ → │ Data store │
 │  cache   │   │   cache      │   │   ┌───────────────────────┐ │   │ (Database) │
 │ (memory, │   │ (shared HTML │   │   │ 'use cache' entries   │ │   │            │
 │  disk,   │   │  / assets)   │   │   │ (RSC output + data)   │ │   │  SOURCE OF │
 │  HTTP)   │   │              │   │   │ + client Router Cache │ │   │   TRUTH    │
 └──────────┘   └──────────────┘   │   └───────────────────────┘ │   └────────────┘
                                   └─────────────────────────────┘
```

This is the standard "tiered cache" taxonomy from systems design: client cache → edge/CDN cache → application cache → database cache. The closer to the user, the faster *and* the harder to invalidate precisely. 

Next.js's caching sits in the **application layer** (rendered output) with a thin **client-layer** companion (the Router Cache in the browser).

### Where Next.js fits — Cache Components

This monorepo runs **Next.js 16 App Router with Cache Components** (`cacheComponents: true` in each app's `next.config.ts`). That flag turns on an *explicit, opt-in* caching model: nothing is cached unless we say so with the [`'use cache'`](https://nextjs.org/docs/app/api-reference/directives/use-cache) directive.

How it works, mechanically:

1. **`'use cache'`** marks a function / component / route as cacheable. Next.js caches its **return value** — for a function, the data; for a component, the rendered **RSC payload**.
2. The **cache key** is `build id + function id + serialized arguments`. Different args ⇒ different entries. Arguments must be serializable; `cookies()`/`headers()` are **forbidden inside** a cached scope — read them outside and pass the value in.
3. **`cacheLife(profile)`** sets the time-based lifetime (`stale` for the client, `revalidate`/`expire` for the server). The `default` profile = stale 5 min (client) · revalidate 15 min (server) · never time-expires.
4. **`cacheTag(...tags)`** attaches invalidation handles so a mutation can expire *exactly* the affected entries on demand.
5. Cached output is folded into the **static shell** (Partial Prerendering): the page ships instantly, and only truly dynamic/uncached parts will be streamed in behind `<Suspense>`.

> a component is either cached (`'use cache'`), or it streams (`<Suspense>`), or it's static — anything else throws an "uncached data outside `<Suspense>`" build error.

### In this codebase

The pattern is applied in **`src/actions/`** (see [REPOSITORY-PATTERN](REPOSITORY-PATTERN.md)), where each domain has read + mutation actions:

```ts
// src/actions/blog-actions.ts — a PUBLIC read declares the cache
export async function getBlogByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<BlogResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('blogs', `blog:${endpoint}`); // domain tag + per-entity tag
  return executeApi(async () => getBlogByEndpointApiPublic(endpoint));
}
```

```ts
// …and the matching MUTATION expires exactly what it changed, on success only
export async function updateBlogActionPrivate(id: string, input: UpdateBlogRequest) {
  const result = await executeApi(async () => updateBlogApiPrivate(id, input));
  if (result.success) {
    updateTag('blogs');                                  // refresh the list
    if (input.endpoint) updateTag(`blog:${input.endpoint}`); // and this entity's page
  }
  return result;
}
```

Two tag tiers are used consistently: a **domain tag** (`'blogs'`, `'diaries'`, `'pages'`, `'section-ui'`, …) covering list reads, plus a **per-entity tag** (`` `blog:${endpoint}` ``) for an entity that has its own page. **Private/admin reads are never cached** — they are auth-scoped per request.

`'use cache'` is also applied at the **component level** for a few landing-page sections.

## `updateTag` vs `revalidateTag`

Both expire cache entries by tag; they differ in *timing* and *where they may run*:

|               | `updateTag(tag)`                                                                   | `revalidateTag(tag, 'max')`                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Semantics     | **immediate** — expires now; the same request reads fresh data (read-our-writes) | **eventual** — marks stale; the next visitor gets old data instantly while fresh loads in the background (stale-while-revalidate) |
| Where it runs | **Server Actions only**                                                            | Server Actions **and** Route Handlers                                                                                          |
| Use when      | the user made the change and is waiting to see it                                  | a background/secondary change where slight staleness is fine                                                                  |

**Default to `updateTag`** in mutation actions — the user expects to see their own write. Use `revalidateTag(tag, 'max')` only for content where a short delay is acceptable, or when we must invalidate from a Route Handler (e.g. a webhook). The `'max'` second argument gives the longest stale-serving window. To refresh the client Router Cache after an action, call `refresh()`.

> Official docs: [Revalidating](https://nextjs.org/docs/app/getting-started/revalidating), [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag), [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag), [`cacheLife`](https://nextjs.org/docs/app/api-reference/functions/cacheLife).

## Why

Concretely, for these landing sites:

- **The data is read far more than it's written.** A blog post, a menu, a theme config, a landing section is published once and then served to thousands of visitors. Hitting the API on every one of those reads is pure waste — same input, same output.

- **It removes the upstream API from the hot path.** Without the cache, every visitor's TTFB depends on the API + DB responding. With `'use cache'`, the cached read is folded into the **prerendered static shell**, so the page can paint before the API is even consulted.

- **Tags make invalidation surgical instead of guesswork.** The hard part of caching is *correctness*: "after I edit blog X, which cached pages are now wrong?" Tag-based revalidation answers it declaratively — the read tags itself (`'blogs'`, `` `blog:${endpoint}` ``), the mutation expires those exact tags, and nothing else is touched. 

- **`'use cache'` keeps the model explicit.** Because Cache Components caches nothing by default, a reader can tell exactly what is cached and what is live by looking for the directive — no hidden implicit `fetch` caching to reason about.

## How

### Rule 1 — Tag every cached read

`cacheTag('<domain>', '<domain>:<id>')` — always a **domain tag**, plus a **per-entity tag** when the entity has its own page/route. The per-entity tag is what lets a single-item edit refresh that item's page without rebuilding every list. → official: [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag).

### Rule 2 — Cache public reads only; never cache auth-scoped reads

**Never** add it to anything that depends on `cookies()`/`headers()` — cached scopes cannot access request APIs, and a shared entry would serve one user's data to another.

### Rule 3 — Set a lifetime with `cacheLife`

Every cached read uses `cacheLife('default')` unless a domain genuinely needs different freshness. Pick a longer profile (`'hours'`, `'days'`) for rarely-changing config and rely on tags for correction; pick `'minutes'`/`'seconds'` only when staleness is unacceptable *and* we can't invalidate on write. → [`cacheLife` profiles](https://nextjs.org/docs/app/api-reference/functions/cacheLife).

### Rule 4 — Expire only on success, by the narrowest tags

Call `updateTag` inside `if (result.success)`, expiring the list tag **and** the affected entity tag — never a blanket purge. Don't invalidate tags the mutation didn't actually change. Prefer tag-based invalidation over `revalidatePath` (path-based over-invalidates and is less precise). → [Revalidating](https://nextjs.org/docs/app/getting-started/revalidating).

### Rule 5 — `updateTag` for user-facing writes, `revalidateTag('…','max')` for background freshness

Inside a Server Action where the user is waiting on their own change, use `updateTag`. Use `revalidateTag(tag, 'max')` only when slight staleness is fine or we're in a Route Handler (webhook). See the table above.

### Rule 6 — High-frequency "counter" writes must not invalidate content caches

A read that is incremented on *every* page view (view counts, like toggles) must **not** call `updateTag` on the content's domain tag — doing so expires the cache on essentially every visit and defeats it entirely. Keep view/like counters out of the cached payload, or isolate them under their own narrow tag. → see the review note below.

### Rule 7 — A component/route-level `'use cache'` is its own entry — give it its own tags

Adding `'use cache'` to a **component or page** (not just a data action) creates a **second cache entry** that embeds a snapshot of what it rendered — separate from the cached actions it called. The docs do **not** guarantee that an inner action's `cacheTag` propagates up to this outer entry, so the cached component must declare `cacheLife` + `cacheTag(...)` for **every domain it reads**. Otherwise `updateTag` invalidates the action entry but leaves the component's snapshot stale until `cacheLife` revalidates. → see [DATA-STREAMING-PATTERN](DATA-STREAMING-PATTERN.md) for *where* the cache boundary sits.

# Caching & Revalidation

## What

Next.js 16 **Cache Components** make caching explicit. A function or component opts into the cache with the `'use cache'` directive; its lifetime is set with `cacheLife`, its invalidation handle with `cacheTag`. Tagged entries are later expired by `updateTag` or `revalidateTag`.

> Official docs: [`use cache` / caching](https://nextjs.org/docs/app/getting-started/caching-and-revalidating), [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag), [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag). `cacheComponents: true` is enabled in `next.config.ts`.

### Caching a read

A **public** read action declares the cache; the `cacheTag` ties it to a domain (and optionally an entity) so a later mutation can expire exactly the right entries.

```ts
// src/actions/blog-actions.ts
export async function getBlogByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<BlogResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('blogs', `blog:${endpoint}`); // domain tag + per-entity tag
  return executeApi(async () => getBlogByEndpointApiPublic(endpoint));
}
```

Private/admin reads are **not** cached — they reflect per-request auth state.

### Expiring after a mutation

```ts
export async function updateBlogActionPrivate(id: string, input: UpdateBlogRequest) {
  const result = await executeApi(async () => updateBlogApiPrivate(id, input));
  if (result.success) {
    updateTag('blogs'); // refresh the list
    if (input.endpoint) updateTag(`blog:${input.endpoint}`); // and this entity
  }
  return result;
}
```

## `updateTag` vs `revalidateTag`

|               | `updateTag(tag)`                                                                   | `revalidateTag(tag, 'max')`                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Semantics     | **immediate** — expires _and refreshes within the same request_ (read-your-writes) | **eventual** — marks stale; next visitor gets old data instantly while fresh loads in the background (stale-while-revalidate) |
| Where it runs | **Server Actions only**                                                            | Server Actions & Route Handlers                                                                                               |
| Use when      | the user made the change and is waiting to see it                                  | a background/secondary change where slight staleness is fine                                                                  |

**Default to `updateTag`** in mutation actions (the user expects to see their write). Use `revalidateTag(tag, 'max')` for content where a short delay is acceptable. To refresh the client router after an action, use `refresh()`.

## Why

Tag-based revalidation lets a mutation invalidate exactly the cached reads it affects — the list tag plus the changed entity's tag — without manually tracking which pages render that data. `'use cache'` keeps public reads fast while a single `updateTag` after a write keeps them correct.

## How

### Rule 1 — Tag every cached read

`cacheTag('<domain>', '<domain>:<id>')` — always a domain tag, plus a per-entity tag when an entity has its own page.

### Rule 2 — Cache public reads only

Add `'use cache'` to public read actions. Never cache `apiPrivate`/admin reads (auth-scoped).

### Rule 3 — Expire only on success, by the narrowest tags

Call `updateTag` inside `if (result.success)`, expiring the list tag and the affected entity tag — not a blanket purge.

### Rule 4 — `updateTag` for user-facing writes, `revalidateTag('…','max')` for background freshness.

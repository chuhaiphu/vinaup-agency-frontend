# Repository & Server Actions

## What

The **Repository pattern** abstracts all data access for a domain behind named functions. Callers request data by name and know nothing about the underlying transport. If the transport changes, only the repository changes — callers are untouched.


### In this codebase

These two layers map to `src/actions/` and `src/apis/`, and the UI only ever touches the top one:

```
UI (page / component)
   │  calls a named Action
   ▼
src/actions/   Server Actions — wrap the api call, normalise to ActionResponse<T>,
   │           revalidate caches by tag. THIS is the boundary the UI consumes.
   ▼
src/apis/      Repository — hide all transport behind named, typed functions
   │           (apiPublic / apiPrivate). The only place a `fetch` lives.
   ▼
VinaUp API (HTTP)
```

#### Layer 1 — Repository (`src/apis/`)

Every `fetch` lives behind `apiPublic` / `apiPrivate` in [`_base.ts`](../../apps/jenahair/src/apis/_base.ts); each domain exposes named, typed functions in `<domain>-apis.ts`. Actions and components import the named functions — they never `fetch` themselves.

```ts
// src/apis/_base.ts
apiPublic<T>(endpoint, options); // unauthenticated, cacheable
apiPrivate<T>(endpoint, options); // forwards the browser cookie to the API,
                                  // persists Set-Cookie for auth routes, redirects on 401
```

Both return `Promise<HttpResponse<T>>` (`{ statusCode, data?, error?, message? }`) and normalise transport failures into an `ApiError`. Functions are typed on both ends — request types from `src/interfaces/`, response as the generic of `apiPublic`/`apiPrivate`:

```ts
// src/apis/blog-apis.ts
export async function getAllBlogsApiPublic(filter?: BlogFilterParams) {
  const queryString = generateFilterQueryString({ visibility: filter?.visibility });
  return apiPublic<BlogResponse[]>(`/blogs${queryString}`, { method: 'GET' });
}

export async function createBlogApiPrivate(data: CreateBlogRequest) {
  return apiPrivate<BlogResponse>('/blogs/admin', { method: 'POST', body: JSON.stringify(data) });
}
```

#### Layer 2 — Server Actions (`src/actions/`)

A Server Action runs **only on the server**, callable directly from Server or Client Components. It wraps the api call through [`executeApi`](../../apps/jenahair/src/actions/_base.ts), which turns an `HttpResponse<T>` into a discriminated `ActionResponse<T>`:

```ts
// src/actions/_base.ts
export async function executeApi<T>(
  fn: () => Promise<HttpResponse<T>>,
): Promise<ActionResponse<T>> {
  try {
    const httpResponse = await fn();
    if (!isSuccessStatusCode(httpResponse.statusCode)) {
      return { success: false, error: httpResponse.error + ' - ' + httpResponse.message };
    }
    return { success: true, data: httpResponse.data };
  } catch (error: unknown) {
    unstable_rethrow(error); // let Next's redirect/notFound propagate
    return { success: false, error: generateErrorMessage(error) };
  }
}
```

`ActionResponse<T> = { success: true; data: T } | { success: false; error: string }` — the UI branches on `success` and never sees a raw `HttpResponse`.

```ts
// src/actions/blog-actions.ts
'use server';

export async function createBlogActionPrivate(
  input: CreateBlogRequest,
): Promise<ActionResponse<BlogResponse>> {
  const result = await executeApi(() => createBlogApiPrivate(input));
  if (result.success) updateTag('blogs'); // read-your-writes → CACHING-PATTERN
  return result;
}
```

```tsx
// calling from a component — only ever { success, data } | { success, error }
const result = await createBlogActionPrivate(values);
if (result.success) notifications.show({ message: 'Đã tạo bài viết' });
else notifications.show({ color: 'red', message: result.error });
```

> This layer replaces the React-Native "provider owns the mutation lifecycle" model — the server owns server state here. → [SoC](../principle/SOC.md)

## Why

When the backend changes a URL, renames a field, or alters a shape, **only one `*-apis.ts` file changes** — actions, pages, and components stay untouched. And because every action funnels through `executeApi`, a page only ever sees `{ success, data }` or `{ success, error }`: no component re-implements HTTP-status checks, error extraction, or cache invalidation, and revalidation lives next to the mutation that causes it.

## How

### Rule 1 — One file per domain, mirrored across both layers

`src/apis/<domain>-apis.ts` and `src/actions/<domain>-actions.ts`. No cross-domain leakage — don't add a blog function to `media-apis.ts` because it's "related".

### Rule 2 — Respect the layering

`fetch` lives **only** inside `src/apis/` (via `apiPublic`/`apiPrivate`). The UI imports **actions**, never apis. A component calling `fetch`/`apiPrivate` directly, or importing from `src/apis/`, is a layering violation. → [CODING-CONVENTION §3.3](../CODING-CONVENTION.md)

### Rule 3 — Name by verb + layer + scope

`[verb][Entity]Api[Public|Private]` for repository functions, `[verb][Entity]Action[Public|Private]` for actions — e.g. `getBlogByEndpointApiPublic` → `getBlogByEndpointActionPublic`. The `Api`/`Action` segment names the layer; `Public`/`Private` the auth scope. → [CODING-CONVENTION §1.3](../CODING-CONVENTION.md)

### Rule 4 — Wrap every api call in `executeApi`

An action never returns a raw `HttpResponse` to the UI — always `ActionResponse<T>`. The UI branches on `result.success`.

### Rule 5 — Revalidate by tag, only after `result.success`

`updateTag` / `revalidateTag` inside `if (result.success)`, next to the mutation — never a blanket purge. → [CACHING-PATTERN](CACHING-PATTERN.md)

### Rule 6 — Extract error messages with `generateErrorMessage`

In `executeApi` and anywhere a caught error becomes a string — never inline `error instanceof Error ? error.message : '...'`. → [DRY](../principle/DRY.md)

### Rule 7 — Repository conventions: filtered lists + empty responses

```ts
// ✅ filtered lists use generateFilterQueryString (one definition for the whole monorepo)
const queryString = generateFilterQueryString({ visibility: filter?.visibility });
// ❌ never hand-roll `new URLSearchParams()` inside an api file
```

Empty responses → `<void>`: `deleteBlogApiPrivate` returns `apiPrivate<void>(...)`.

## Adding a new domain

```ts
// 1) src/apis/xxx-apis.ts — repository
import { generateFilterQueryString } from '@vinaup/utils';
import { CreateXxxRequest, UpdateXxxRequest, XxxResponse } from '@/interfaces/xxx-interfaces';
import { apiPrivate, apiPublic } from './_base';

export async function getAllXxxApiPublic(filter?: XxxFilterParams) {
  const queryString = generateFilterQueryString({ ...filter });
  return apiPublic<XxxResponse[]>(`/xxx${queryString}`, { method: 'GET' });
}
export async function createXxxApiPrivate(data: CreateXxxRequest) {
  return apiPrivate<XxxResponse>('/xxx/admin', { method: 'POST', body: JSON.stringify(data) });
}
// getXxxByIdApiPrivate · updateXxxApiPrivate · deleteXxxApiPrivate …
```

```ts
// 2) src/actions/xxx-actions.ts — server actions
'use server';
import { updateTag } from 'next/cache';
import { executeApi } from '@/actions/_base';
import { createXxxApiPrivate, getAllXxxApiPublic } from '@/apis/xxx-apis';

export async function getAllXxxActionPublic() {
  return executeApi(() => getAllXxxApiPublic());
}
export async function createXxxActionPrivate(input: CreateXxxRequest) {
  const result = await executeApi(() => createXxxApiPrivate(input));
  if (result.success) updateTag('xxx');
  return result;
}
```

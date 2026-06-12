# Repository Pattern

## What

The Repository pattern hides all data access for a domain behind named functions. Callers request data by name and know nothing about the transport. If the transport changes, only the repository changes.

### In this codebase

`src/apis/` is the repository layer. Every `fetch` lives behind `apiPublic` / `apiPrivate` in [`_base.ts`](../../apps/jenahair/src/apis/_base.ts); each domain exposes named, typed functions in `<domain>-apis.ts`. Actions and components import the named functions — they never `fetch` themselves.

### Two transports — public vs private

```ts
// src/apis/_base.ts
apiPublic<T>(endpoint, options); // unauthenticated, cacheable
apiPrivate<T>(endpoint, options); // forwards the browser cookie to the API,
// persists Set-Cookie for auth routes, redirects on 401
```

Both return `Promise<HttpResponse<T>>` (`{ statusCode, data?, error?, message? }`) and normalise transport failures into an `ApiError`.

### Function shape

Typed on both ends — request types from `src/interfaces/`, response as the generic of `apiPublic`/`apiPrivate`.

```ts
// src/apis/blog-apis.ts
export async function getAllBlogsApiPublic(filter?: BlogFilterParams) {
  const queryString = generateFilterQueryString({ visibility: filter?.visibility });
  return apiPublic<BlogResponse[]>(`/blogs${queryString}`, { method: 'GET' });
}

export async function createBlogApiPrivate(data: CreateBlogRequest) {
  return apiPrivate<BlogResponse>('/blogs/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

## Why

When the backend changes a URL, renames a field, or alters a shape, **only one `*-apis.ts` file changes** — actions, pages, and components stay untouched.

## How

### Rule 1 — Never `fetch` outside `src/apis/`

Use `apiPublic` / `apiPrivate` inside api files; everything else imports the named functions. A component calling `fetch` or `apiPrivate` directly is a layering violation.

### Rule 2 — Name by verb + layer + scope

`[verb][Entity]Api[Public|Private]` — `getBlogByEndpointApiPublic`, `updateBlogApiPrivate`, `deleteBlogApiPrivate`. → [CODING-CONVENTION §1.3](../CODING-CONVENTION.md)

### Rule 3 — One file per domain

`blog-apis.ts`, `diary-apis.ts`. No cross-domain leakage — don't add a blog function to `media-apis.ts` because it's "related".

### Rule 4 — Filtered lists use `generateFilterQueryString`

```ts
// ✅ from @vinaup/utils — one definition for the whole monorepo
const queryString = generateFilterQueryString({ visibility: filter?.visibility });
// ❌ never hand-roll inside an api file
const params = new URLSearchParams(); ...
```

### Rule 5 — Empty responses → `<void>`

`deleteBlogApiPrivate` returns `apiPrivate<void>(...)`.

## Adding a new domain

```ts
// src/apis/xxx-apis.ts
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

Then expose them through `src/actions/xxx-actions.ts`. → [SERVER-ACTIONS-PATTERN](SERVER-ACTIONS-PATTERN.md)

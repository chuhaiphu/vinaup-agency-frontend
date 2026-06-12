# Server Actions Pattern

## What

A Server Action is a function that runs **only on the server**, callable directly from Server or Client Components. In this codebase `src/actions/` is the layer between the UI and the repository (`src/apis/`): it wraps api calls, normalises the result into `ActionResponse<T>`, and revalidates caches by tag.

> This layer replaces the React-Native "provider owns the mutation lifecycle" model. The server owns server state here. → [SoC](../principle/SOC.md)

### The `executeApi` wrapper

Every action runs its api call through [`executeApi`](../../apps/jenahair/src/actions/_base.ts), which converts an `HttpResponse<T>` into a discriminated `ActionResponse<T>`:

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

`ActionResponse<T> = { success: true; data: T } | { success: false; error: string }`. The UI branches on `success` — it never sees raw `HttpResponse`.

### Standard shape

```ts
// src/actions/blog-actions.ts
'use server';

export async function createBlogActionPrivate(
  input: CreateBlogRequest,
): Promise<ActionResponse<BlogResponse>> {
  const result = await executeApi(() => createBlogApiPrivate(input));
  if (result.success) updateTag('blogs'); // read-your-writes
  return result;
}
```

### Calling from a component

```tsx
const result = await createBlogActionPrivate(values);
if (result.success) {
  notifications.show({ message: 'Đã tạo bài viết' });
} else {
  notifications.show({ color: 'red', message: result.error });
}
```

## Why

Without this layer, components would call apis directly and each would re-implement HTTP-status checks, error extraction, and cache invalidation. Centralising it means a page only ever sees `{ success, data }` or `{ success, error }`, and revalidation lives next to the mutation that causes it.

## How

### Rule 1 — `'use server'` at the top; one file per domain

`src/actions/<domain>-actions.ts`. Mirrors the api domain split.

### Rule 2 — Wrap every api call in `executeApi`

Never return a raw `HttpResponse` to the UI. Always return `ActionResponse<T>`.

### Rule 3 — Components consume actions, never apis

The action is the public boundary. A component importing from `src/apis/` is a layering violation. → [CODING-CONVENTION §3.3](../CODING-CONVENTION.md)

### Rule 4 — Revalidate by tag after a successful mutation

`updateTag` / `revalidateTag` only after `result.success`. → [CACHING-REVALIDATION](CACHING-REVALIDATION.md)

### Rule 5 — Extract error messages with `generateErrorMessage`

In `executeApi` and anywhere a caught error becomes a string. Never inline `error instanceof Error ? error.message : '...'`. → [DRY](../principle/DRY.md)

# Server / Client Boundary

## What

In Next.js 16 App Router, **every component is a Server Component by default**. A Server Component runs only on the server: it can be `async`, read data, and ships **zero JS** to the browser. The `'use client'` directive marks the boundary where a component (and everything it imports) becomes a Client Component — hydrated in the browser, able to use state, effects, event handlers, and browser APIs.

```
Server Component (default)            'use client' boundary
─ async, reads data via actions       ─ useState / useEffect / onClick
─ no hooks, no browser APIs            ─ Mantine interactive widgets, Zustand
─ 0 KB JS to client                    ─ ships JS to the client
```

### Read data on the server

```tsx
// src/app/(landing)/blogs/[endpoint]/page.tsx — Server Component, no 'use client'
export async function generateStaticParams() {
  const res = await getAllBlogsActionPublic();
  return (res.data ?? []).map((blog) => ({ endpoint: blog.endpoint }));
}

export default async function BlogPage({ params }: { params: Promise<{ endpoint: string }> }) {
  const { endpoint } = await params;
  const result = await getBlogByEndpointActionPublic(endpoint);
  if (!result.success) notFound();
  return <BlogDetail blog={result.data} />; // pass data down as props
}
```

#### `await params` at the page root

`params` always arrives as a **promise**.

**1. The DATA-STREAMING default — a request-time dynamic route may NOT `await params` at the root.** When a `[id]`/`[endpoint]` route has _no_ `generateStaticParams`, the segment value is only known per request. Awaiting it at the page root would block the whole page on request-time data and cause the build error `Uncached data was accessed outside of <Suspense>`. 

So we should **chains off** the params promise (never `await` it at the root) and wraps the content in `<Suspense>`:

```tsx
// dynamic, request-time route — no generateStaticParams
export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const dataPromise = params.then((p) => getByIdActionPrivate(p.id)); // chain, don't await
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <DetailContent dataPromise={dataPromise} /> {/* Client Component calls use(dataPromise) */}
    </Suspense>
  );
}
```

→ full pattern in [DATA-STREAMING-PATTERN — Stream with `use(promise)`](DATA-STREAMING-PATTERN.md).

**2. What `generateStaticParams` changes.** It runs **at build time**, enumerates every concrete value of the dynamic segment (here, every blog `endpoint`). For such a route the params promise is a _build-time constant_ — it resolves at prerender, not per request.

```
generateStaticParams() → {endpoint:'a'}, {endpoint:'b'}   (build time)
        │  Next prerenders one page each
        ▼
/blogs/a   /blogs/b   …   ← each is a static page; its `params` is already fixed
```

Because the params promise resolves at prerender, there is nothing to `await` for, so a `<Suspense>` boundary would be pointless. Awaiting `params` at the root is therefore the correct.

> Rule of thumb: `generateStaticParams` ⇒ `params` is build-time ⇒ `await` at the root. No `generateStaticParams` ⇒ `params` is request-time ⇒ chain the promise + `<Suspense>`.

### Interactivity is a Client Component

```tsx
'use client';
// a small leaf that needs state/handlers
export function LikeButton({ blogId }: { blogId: string }) {
  const [liked, setLiked] = useState(false);
  ...
}
```

## Why

Server Components keep pages fast (less client JS) and let data-reading live next to rendering without a fetch waterfall. Pushing `'use client'` to small leaves means most of the tree stays server-rendered; pushing it to the root would ship the whole page as client JS and forfeit server data access.

## How

### Rule 1 — Default to Server Components

Don't add `'use client'` unless the component needs state, effects, event handlers, or browser APIs.

### Rule 2 — Put `'use client'` as low as possible

Mark the small interactive leaf, not the page. A server page can render client children and pass them server-fetched data as props.

### Rule 3 — Read data on the server, pass it down as props

Server Components call actions and hand data to (server or client) children. Leaf components receive data via props — they don't fetch. → [KISS](../principle/KISS.md), [SoC](../principle/SOC.md)

### Rule 4 — A Client Component can't import a Server Component as a child by rendering it

Pass server content through `children`/props instead. Server Actions, however, _can_ be called from Client Components.

### Rule 5 — Format dates inside Client Components

Server and browser time zones differ — formatting a date during SSR risks a hydration mismatch. → [DATE-TIME-PATTERN](DATE-TIME-PATTERN.md)

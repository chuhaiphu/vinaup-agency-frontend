# Separation of Concerns (SoC)

## What

Separation of Concerns divides a program into distinct sections — concerns — each responsible for one aspect of behaviour: fetching data, rendering UI, defining types, handling business logic. When concerns are cleanly separated, a change in one section does not ripple into others.

### Layers in this codebase

Dependencies point **inward** only — outer layers depend on inner layers, never the reverse.

```
┌────────────────────────────────────────────┐
│  UI            src/app/ · src/components/   │  Server & Client Components
├────────────────────────────────────────────┤
│  Server Actions   src/actions/              │  'use server' — mutate, tag, revalidate
├────────────────────────────────────────────┤
│  API (repository) src/apis/                 │  apiPublic / apiPrivate, typed HTTP
├────────────────────────────────────────────┤
│  Client State  src/providers/ · src/libs/zustand/  │  auth/theme context · UI Zustand
├────────────────────────────────────────────┤
│  Core   src/interfaces/ · src/constants/ · src/utils/ + @vinaup/utils │  types, enums, pure helpers
└────────────────────────────────────────────┘
```

> **Next.js shifts where "server state" lives.** On a React Native client, a Context provider owns the fetch lifecycle. Here, **Server Components fetch** (through `src/actions/` → `src/apis/`) and **Server Actions mutate + revalidate by tag**. React Context (`src/providers/`) is reserved for genuinely _client_ state (auth session, theme, UI). → [SERVER-CLIENT-BOUNDARY](../pattern/SERVER-CLIENT-BOUNDARY.md), [PROVIDER-PATTERN](../pattern/PROVIDER-PATTERN.md)

### UI layer — render only

`src/components/` and `src/app/` render. Server Components call **actions**; Client Components call **actions** or read client state. They never call `apiPublic`/`apiPrivate` directly, and never `fetch()`.

```ts
// a page (Server Component) reads through an action — never an api function
const result = await getBlogByEndpointActionPublic(endpoint);
```

### Server Actions layer — mutate & revalidate

`src/actions/*-actions.ts` (`'use server'`) wrap api calls in `executeApi`, return a typed `ActionResponse<T>`, and invalidate caches by tag (`updateTag`/`revalidateTag`). → [SERVER-ACTIONS-PATTERN](../pattern/SERVER-ACTIONS-PATTERN.md)

### API layer — HTTP adapters

`src/apis/*-apis.ts` translate typed Core objects into HTTP calls via `apiPublic`/`apiPrivate` ([src/apis/\_base.ts](../../apps/jenahair/src/apis/_base.ts)). They never import from actions, providers, or components.

### Core layer

`src/interfaces/`, `src/constants/`, `src/utils/`, and `@vinaup/utils` hold only types, enums, and pure helpers — no React, no Next, no `fetch`.

## Why

When boundaries are mixed, every change has a wider blast radius: editing a card's rendering risks breaking its data logic; a component that fetches, computes, and renders needs a full network setup to test a visual tweak. Inward-only dependencies keep each layer independently changeable — the api layer can change a URL without touching actions; actions can change cache strategy without touching pages.

## How

Dependencies point inward (UI → Actions → API → Core; client-state is a side layer consumed by UI). A component importing `apiPrivate`, or an api importing an action, is a layering violation. → [CODING-CONVENTION §3.3](../CODING-CONVENTION.md#33-import-direction)

| Concern                           | Where it lives                                   |
| --------------------------------- | ------------------------------------------------ |
| Render structure / interaction    | Component (Server or Client)                     |
| Read server data                  | Server Component → `src/actions/`                |
| Mutate server data + revalidate   | Server Action (`'use server'`)                   |
| HTTP transport                    | `src/apis/` only                                 |
| Auth/theme/UI client state        | `src/providers/` (context) · `src/libs/zustand/` |
| Business calculation / formatting | `src/utils/` or `@vinaup/utils`                  |

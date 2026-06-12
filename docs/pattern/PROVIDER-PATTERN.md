# Provider Pattern

## What

The Provider pattern is a structural pattern where a component wraps part of the component tree and makes shared data available to any descendant without passing props at every level.

### In this codebase

A provider is a React Context component that **distributes** a value across a subtree. The value is **seeded once from a Server Component** (passed in as a prop), then the provider hands every descendant a live client copy through a typed hook — so consumers read it without prop-drilling.

The key is **seed, not fetch**. A provider may distribute a value a Server Component already fetched; it must **never fetch server data on the client itself** — that would re-create the fetch/cache lifecycle the server already owns (see [REPOSITORY-PATTERN](REPOSITORY-PATTERN.md)). The only provider today is `AuthProvider`.

---

## The four state mechanisms

Every piece of state in this app belongs to exactly one of four tools. Two axes decide which: **where the source of truth lives**, and **how the value is consumed** (its distribution shape). The decision section below turns these two axes into questions.

| # | Mechanisms | Source of truth | Distribution shape must follow |
|---|------|-----------------|--------------------|
| ① | Server Component + Server Action + props | server | Read inside **one route's subtree** — the page hands the value to a content or table component one or two hops down. The value stays inside one cohesive branch and is mostly server-rendered. |
| ② | **Context Provider** (seeded from Server component) | server, per-user | Needed by **many Client Components scattered across unrelated subtrees** (header, sidebar, deep buttons, a table…), none of which can fetch it themselves. |
| ③ | `useState` | browser | **Lives and dies inside a single component** — no other component reads it. |
| ④ | Zustand | browser | Read by **many components across the tree**, but created in the browser (no server seed). |

---

## When to use a provider

```
Q1 — Where is the source of truth?
  ├─ SERVER (persisted, must be fetched) ───────────────────────► Q2
  └─ BROWSER (created client-side: a toggle, a draft, a UI flag) ─► Q3

Q2 — Server data: is it consumed by scattered Client Components
     that cannot fetch it themselves (so props would prop-drill)?
  ├─ NO  → ① Server Component fetches + passes props
  └─ YES → ② Seed from a Server Component → Provider → distribute

Q3 — Browser state: is it shared across the tree?
  ├─ NO  → ③ useState
  └─ YES → ④ Zustand
```

### Examples — and why each lands where it does

**① Server Component + props — `blog`, `diary`, `page`, `menu`, blog/diary categories, the users list.**
Server-owned entities: a route's Server Component fetches the entity (e.g. `getBlogByIdActionPrivate`) and hands it down. Two reasons they stay in ①, never a provider:

- **No scatter (Tier 1).** The blog edit form consumes the data in **one cohesive subtree** — `page → AdminBlogDetailPageContent → …Inner`, one or two hops. With nothing fanning out to unrelated branches, there is no prop-drilling for a provider to remove. The form is **deep** (dozens of fields) yet still cohesive.
- **Server data reads on the server .** If two distant **Server Components** needed the same blog in one render, Next.js **request-memoizes** the `fetch` — same `GET` URL + options runs once and the result is shared, automatically,. This holds even for uncached per-user reads; `'use cache'` is a *separate* layer that persists across requests, (see [CACHING-PATTERN](CACHING-PATTERN.md)). Server↔server sharing is therefore free, never forces a provider. A provider is forced **only** when the scattered consumers are **Client Components** that *cannot* run a server read. Blog has a single client consumer.

**② Context Provider — `AuthProvider`.**
It is needed by **scattered Client Components in unrelated subtrees** — the header, the sidebar, deep "create" buttons, the users table — and none can fetch the user themselves, so props would drill. And it carries a **client transition**: logout flips `setUser(null)` and syncs across tabs.

**③ `useState` — local field and UI state.**
Anything scoped to one component: the blog form's own `title` / `content` / `status` fields, a modal's open flag, a loading boolean. No other component reads them → no Context, no store.

**④ Zustand — `useSidebarStore`, `useAdminLayoutSiderStore`, `useCartStore`.**
Browser-only state shared widely: sidebar / sider collapse, cart contents. Created client-side (no server seed) and read across the tree → a store, not a provider. See [OBSERVER-PATTERN](OBSERVER-PATTERN.md).

### The one overlap to resolve: ② vs ④

Both a provider and a Zustand store distribute state across the tree. Discriminate with **one question — is it server-seeded per-user?**

- **Yes → Provider (②).** Context is seeded via a prop at a layout, so **every request gets its own instance**.
- **No, browser-only → Zustand (④).** A Zustand store is a **module-level singleton**. Zustand is for pure client state only.

> Classify by **source of truth**, not by name. A "theme" that is a pure client toggle is **④ Zustand**; a theme saved per-user on the server is **② Provider**.

---

## Why

Without Provider, a server value needed by many scattered Client Components would have to be prop-drilled through layers that never use it — or, worse, each island would fetch it again on the client, duplicating the server's work and re-introducing the cache problem RSC already solves. A seeded provider reads the value **once on the server** and hands every consumer a live client copy through a typed hook.

---

## How

### Rule 1 — Seed, never fetch

The provider receives its value as a prop from a Server Component. It must not call the API on the client. Fetching is the job of a Server Component + Server Action.

### Rule 2 — The trio: `null` default + guarded hook

`XxxProvider` + `useXxxContext()` guarded hook + `XxxContextType`, with `createContext<XxxContextType | null>(null)` — never a stub default. `null` makes bad wiring throw immediately instead of silently returning empty data. Consumers call the guarded hook, never `useContext` directly; the hook is the public API, the Context object is an implementation detail.

```tsx
// apps/jenahair/src/providers/auth-provider.tsx  ('use client' at the top)
interface AuthContextType {
  getUser: () => User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, initialUser, onLogout }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser); // seeded from the server
  // …client-owned transitions live here: logout → setUser(null) + cross-tab `storage` sync
  return <AuthContext value={{ getUser: () => user, logout }}>{children}</AuthContext>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
}
```

### Rule 3 — Mount at the closest layout that needs it

Seed the provider from the Server Component at that boundary; do not hoist it to root for convenience. Each mount is its own **per-request instance**, which is what keeps per-user data from leaking.

### Rule 4 — The provider module is a Client Component, kept thin

It uses state/effects, so its file is `'use client'`. Keep it a thin leaf so most of the tree stays server-rendered. → [SERVER-CLIENT-BOUNDARY](SERVER-CLIENT-BOUNDARY.md)

### Rule 5 — The provider may own client transitions on the seeded value

After seeding, the client owns transitions that must propagate live across the tree without a refetch — e.g. logout (`setUser(null)` + cross-tab `storage` sync). This is allowed and does not break Rule 1: a transition is a client state change and a server-action call, not a client fetch.

---

## Adding a new provider

First confirm it is box **②**: the value is **server-seeded, per-user**, and consumed by **scattered Client Components** that would otherwise prop-drill. If it is route-scoped server data use **① props**; if it is browser-only shared state use **④ Zustand**; if it is local use **③ `useState`**.

1. Declare `XxxContextType` with the seeded value and the handlers it exposes.
2. `const XxxContext = createContext<XxxContextType | null>(null);` — never a stub default.
3. Export `useXxxContext()` with the standard throw guard.
4. Mark the module `'use client'`; keep it a thin leaf.
5. Read the value in a Server Component and pass it in as a prop (`initialUser`) — seed, never fetch.
6. Mount it at the closest layout/route that wraps the subtree needing it. → [Coding Convention §7](../CODING-CONVENTION.md), [§11](../CODING-CONVENTION.md)

---

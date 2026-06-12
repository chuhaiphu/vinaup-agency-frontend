# Observer Pattern (Zustand)

## What

The Observer pattern notifies registered observers automatically when a subject's state changes. Here it is implemented with **Zustand stores** — module-level singletons that live for the app's lifetime. Components subscribe with a **selector** and re-render only when their slice changes.

### In this codebase — UI state only

> Zustand holds **UI / ephemeral client state** (sidebar open, a draft, a toggle). It never holds server entities — those are read on the server. → [SERVER-ACTIONS-PATTERN](SERVER-ACTIONS-PATTERN.md)

Stores live in `src/libs/zustand/<name>-store.ts`.

### Variant 1 — Simple (no middleware)

```ts
// src/libs/zustand/admin-layout-sider-store.ts
export const useAdminLayoutSiderStore = create<AdminLayoutSiderState>((set) => ({
  collapsed: false,
  toggle: () => set((state) => ({ collapsed: !state.collapsed })),
  open: () => set({ collapsed: false }),
  close: () => set({ collapsed: true }),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
```

### Variant 2 — Persisted (user preferences only)

Wrap with the `persist` middleware (localStorage). Persist **only** preferences that should survive a reload — never transient UI or drafts. Clear persisted stores on logout so the next user doesn't inherit state.

### Subscribing — always with a selector

```ts
// ✅ re-renders only when `collapsed` changes
const collapsed = useAdminLayoutSiderStore((s) => s.collapsed);
const toggle = useAdminLayoutSiderStore((s) => s.toggle); // stable action ref

// ❌ re-renders on ANY store change
const { collapsed, toggle } = useAdminLayoutSiderStore();
```

## Why

Sidebar state, modal open/close, and preferences are read from components scattered across the tree. Lifting and prop-drilling would drag props through components that never use them. Compared to Context, Zustand needs no provider wrapper and persistence is one middleware line. (Context still suits auth/theme — see [PROVIDER-PATTERN](PROVIDER-PATTERN.md).)

## How

### Rule 1 — UI / ephemeral state only

No API responses in Zustand. Server data is read on the server.

### Rule 2 — One store per concern, in `src/libs/zustand/`

File `use-<name>-store.ts` exporting `use<Name>Store`. (Note: a store is a Client-side construct; only Client Components may read it.)

### Rule 3 — Persist only preferences, and clear on logout

`persist` middleware for durable preferences; clear them in the logout flow.

### Rule 4 — Subscribe with a selector

`useStore((s) => s.slice)` — never destructure the whole store.

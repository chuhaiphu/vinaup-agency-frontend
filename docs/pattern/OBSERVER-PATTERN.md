# Observer Pattern

## What

The Observer pattern defines: when a subject changes state, all registered observers are notified automatically. This decouples state producers from the components that react to that state.

### In this codebase

In this codebase the Observer pattern is implemented through **Zustand stores** — module-level singletons that live for the entire app lifetime.

A store is a Client-side construct: only Client Components may read it.

### Subscribing

Components call the store hook and pass a selector to subscribe only to the slice they need — so they only re-render on changes to that slice.

```ts
// re-renders only when collapsed changes
const collapsed = useAdminLayoutSiderStore((s) => s.collapsed);

// actions have stable references → never trigger a re-render
const toggle = useAdminLayoutSiderStore((s) => s.toggle);
```

### Three store variants

#### Variant 1 — Simple

Ephemeral state that resets when the page reloads. No middleware.

```ts
// apps/jenahair/src/libs/zustand/admin-layout-sider-store.ts
export const useAdminLayoutSiderStore = create<AdminLayoutSiderState>((set) => ({
  collapsed: false,
  toggle: () => set((state) => ({ collapsed: !state.collapsed })),
  open: () => set({ collapsed: false }),
  close: () => set({ collapsed: true }),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
```

#### Variant 2 — Persisted

User preferences that must survive a reload. Uses the `persist` middleware backed by `localStorage` (the default web storage).

```ts
// src/libs/zustand/<name>-store.ts
export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      value: null,
      setValue: (value) => set({ value }),
    }),
    { name: 'example' }, // localStorage key; persist defaults to localStorage on web
  ),
);
```

#### Variant 3 — Complex with `get()`

When an action needs to read the current value of multiple fields (derived values, cross-field computation), use `(set, get) => ({})`. Multi-field **forms** are not stores — those use `@mantine/form`.

```ts
// apps/vitinhnet/src/stores/cart-store.ts
getSubtotal: () =>
  get()
    .items.filter((item) => item.isSelected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0),

getTotal: () => {
  const subtotal = get().getSubtotal();
  if (subtotal === 0) return 0;
  return subtotal - get().discount + get().shippingFee;
},
```

### Stores currently in the codebase

| Store                      | Variant           | Persisted | Purpose                                             |
| -------------------------- | ----------------- | :-------: | --------------------------------------------------- |
| `useSidebarStore`          | Simple            |    ❌     | toggle the landing sidebar (shared in `@vinaup/ui`) |
| `useAdminLayoutSiderStore` | Simple            |    ❌     | collapse the admin layout sider (jenahair)          |
| `useCartStore`             | Complex (`get()`) |    ❌     | cart items with derived totals (vitinhnet)          |

### Clearing persisted stores on logout

No persisted store exists yet, so there is nothing to clear today. When you add one, `clearStorage()` it inside the logout flow so the next user doesn't inherit the previous user's data:

```ts
// apps/jenahair/src/providers/auth-provider.tsx — logout()
useExampleStore.persist.clearStorage();
```

---

## Why

Sidebar/sider collapse, cart contents, user preferences… all need to be read from components scattered across the tree. Lifting state and prop-drilling it would drag props through components that never use them.
For pure client UI state that changes often, Zustand is lighter: no Provider wrapper, and persistence is one middleware line.
A Context provider solves the same problem but here it is reserved for the per-user auth session (see Provider Pattern); server data is owned by Server Components and Server Actions (see Repository pattern), never a store.

---

## How

### Rule 1 — Zustand is for UI / ephemeral state only

Do not store API responses (server entities) in Zustand. Server data is owned by Server Components and Server Actions (see Repository pattern).

### Rule 2 — Persist only user preferences

Use the `persist` middleware only for data that must survive a reload. Do not persist transient UI (sidebar/sider collapse) or drafts.

### Rule 3 — Clear persisted stores on logout

Every persisted store **must** be `clearStorage()`-ed inside the logout flow in `auth-provider.tsx`. Forgetting this means the next user inherits the previous user's data.

### Rule 4 — Selective subscription

```ts
// ✅ re-renders only when that slice changes
const collapsed = useAdminLayoutSiderStore((s) => s.collapsed);

// ❌ re-renders on any store change
const { collapsed, toggle } = useAdminLayoutSiderStore();
```

### Rule 5 — Use `(set, get) => ({})` only when cross-field is needed

Reserve the `(set, get)` signature for actions that need to read multiple fields before computing the next state (e.g. `getTotal` reading subtotal + discount + shippingFee). Plain setters only need `set`.

---

## Adding a new store

Copy from the matching variant:

- Pure ephemeral UI state → Variant 1.
- User preference that must persist → Variant 2 (pick a `localStorage` key and add `clearStorage()` to the logout flow).
- Derived values that read multiple fields → Variant 3. (Multi-field forms are not stores — use `@mantine/form`.)

The file lives at `src/libs/zustand/<name>-store.ts`. → [Coding Convention §8](../CODING-CONVENTION.md), [§11](../CODING-CONVENTION.md)

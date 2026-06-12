# Provider Pattern (client-only)

## What

A Provider is a Client Component that wraps part of the tree and makes shared **client state** available to descendants without prop-drilling, through a typed hook.

### In this codebase — client state only

> **Important:** in Next.js, server data is owned by Server Components + Server Actions ([SERVER-ACTIONS-PATTERN](SERVER-ACTIONS-PATTERN.md)), **not** by a Context provider. Providers here hold genuinely client-side state: the **auth session**, theme, or cross-tree UI. Do not put server entities in a provider.

### Standard shape — the trio

`XxxProvider` + `useXxx()` guarded hook + `XxxContextType`, with a `null` default:

```tsx
// src/providers/auth-provider.tsx  ('use client' at the top of the module that needs it)
interface AuthContextType {
  getUser: () => User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, initialUser, onLogout }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  // …client concerns: cross-tab logout sync via the `storage` event, etc.
  return <AuthContext value={{ getUser: () => user, logout }}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
```

### Server-seeded, client-owned

The provider is **seeded from the server** (`initialUser` comes from a Server Component that read the session) and then owns the live client copy. This is the idiomatic bridge: read once on the server, hand the value to a client provider as a prop.

## Why

Some state is inherently client-side — the current user across the tree, a theme toggle, a cross-tab logout signal. Lifting it and prop-drilling would drag props through components that never use it. Context is the right tool **for client state**; using it for server data would re-introduce the client fetch/cache problem the server already solves.

## How

### Rule 1 — Providers hold client state, never server entities

If the data comes from the API and has a fetch/cache lifecycle, it belongs in a Server Component + action, not a provider.

### Rule 2 — Context default is `null`; always export a guarded hook

`createContext<XxxContextType | null>(null)` and a hook that throws when used outside the provider. Consumers call the hook (`useAuth()`), never `useContext` directly.

### Rule 3 — Seed from the server, mount at the closest layout that needs it

Pass server-read values in as props (`initialUser`); mount the provider in the layout that wraps the subtree needing it — not at the root for convenience.

### Rule 4 — The provider module is a Client Component

It uses state/effects, so it (or its file) is `'use client'`. Keep it a thin leaf so most of the tree stays server-rendered. → [SERVER-CLIENT-BOUNDARY](SERVER-CLIENT-BOUNDARY.md)

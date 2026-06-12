# Coding Convention

The canonical, tooling-enforced rules for every app in the monorepo. Patterns and principles explain the _why_; this file is the _which_.

## How conventions are enforced

| Tier              | Enforced by                                                 | Examples                                                  |
| ----------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| **Mechanical**    | Prettier + ESLint (shared root config) — surfaces in `lint` | formatting, file naming, symbol casing, import order      |
| **Architectural** | Code review                                                 | layer/import direction, server/client split, action rules |

See the [Enforcement map](#enforcement-map) at the bottom.

---

## 1. Naming

### 1.1 File naming

Every file is `kebab-case` with a role suffix. The file name matches its primary exported symbol — one primary concept per file.

| Role             | Pattern                  |
| ---------------- | ------------------------ |
| Component        | `<name>.tsx`             |
| API (repository) | `<domain>-apis.ts`       |
| Server Action    | `<domain>-actions.ts`    |
| Interface group  | `<domain>-interfaces.ts` |
| Constants        | `<domain>-constants.ts`  |
| Provider         | `<name>-provider.tsx`    |
| Zustand store    | `<name>-store.ts`        |
| Hook             | `use-<name>.ts(x)`       |
| Pure helper      | `<verb>-<topic>.ts`      |

- **Role suffixes are plural** (`-apis`, `-actions`, `-interfaces`, `-constants`) — a file holds a _group_ of related members.
- Files under `src/app/` follow **Next.js App Router** naming (`page.tsx`, `layout.tsx`, `[param]`, `(group)`, `route.ts`, `sitemap.ts`) and are **exempt** from the kebab-case rule.
- Shared core files carry a leading `_` to sort to the top (`_base.ts`, `_base-interfaces.ts`).

### 1.2 Symbol naming

| Kind                                  | Style                                              |
| ------------------------------------- | -------------------------------------------------- |
| React component                       | `PascalCase`                                       |
| Hook                                  | `camelCase`, `use` prefix                          |
| Zustand store hook                    | `camelCase`, `use…Store` suffix                    |
| Provider trio                         | `XxxProvider` + `useXxxContext` + `XxxContextType` |
| Interface / Type                      | `PascalCase` — **never an `I` prefix**             |
| `as const` object / reusable constant | `CONSTANT_CASE`                                    |
| Other variable / function             | `camelCase`                                        |

**Interface role names:** `CreateXxxRequest`, `UpdateXxxRequest`, `XxxResponse`, `XxxFilterParams`. No `I` prefix — the `@typescript-eslint/naming-convention` rule rejects `^I[A-Z]` interfaces.

**Names carry their shape:** booleans read as predicates (`isLoading`, `canEdit`); non-primitive collections get a type suffix when the plural is ambiguous (`userByIdMap`, `tagList`); primitives keep semantic names.

### 1.3 API / Action function naming

A domain has both **public** (no auth) and **private** (admin, cookie-forwarded) endpoints, so the scope is part of the name:

- API: `[verb][Entity]Api[Public|Private]` — `getAllBlogsApiPublic`, `getBlogByIdApiPrivate`, `createBlogApiPrivate`.
- Action: `[verb][Entity]Action[Public|Private]` — `getAllBlogsActionPublic`, `createBlogActionPrivate`.

The `Api`/`Action` segment names the layer; `Public`/`Private` names the auth scope. → [REPOSITORY-PATTERN](pattern/REPOSITORY-PATTERN.md), [SERVER-ACTIONS-PATTERN](pattern/SERVER-ACTIONS-PATTERN.md)

### 1.4 Constants

Enums, format strings, colours, and option lists live in `src/constants/<domain>-constants.ts`. A single `src/constants.ts` is acceptable while small; split by domain as it grows.

---

## 2. File & folder structure

Organise **by layer, then by domain**. → [SoC](principle/SOC.md)

```
src/
├── app/          UI — App Router routes & layouts
├── components/   UI — split by scope (admin/ · landing/ · <feature>/)
├── actions/      Server Actions — 'use server', one file per domain
├── apis/         API repository — apiPublic/apiPrivate, one file per domain
├── providers/    Client state — auth/theme/UI React Context
├── libs/zustand/ Client state — Zustand stores
├── interfaces/   Core — request/response/entity types
├── constants/    Core — enums, formats, colours
├── utils/        Core — app-specific pure helpers
└── mocks/        static/seed data
```

Only create a folder an app actually needs (a static landing app has no `apis/`/`actions/`). → [KISS](principle/KISS.md)

---

## 3. Imports

### 3.1 Path alias

- `@/` for intra-app cross-layer imports (`@/apis/...`, `@/interfaces/...`); relative imports for same-folder siblings.
- `@vinaup/utils`, `@vinaup/ui/*` for shared packages. **A deep relative path into a package (`../../../../packages/utils/src/...`) is a violation** — always use the alias.

### 3.2 Import order

Groups: builtin → external → internal (`@/**`, `@vinaup/**`) → relative, blank line between groups, alphabetised. Enforced by `import/order`.

### 3.3 Import direction

Dependencies point **inward** (UI → Actions → API → Core; client-state is consumed by UI).

| Layer                      | May import                                                                       |
| -------------------------- | -------------------------------------------------------------------------------- |
| `interfaces` / `constants` | interfaces, constants, `@vinaup/utils`                                           |
| `utils`                    | interfaces, constants, utils, `@vinaup/utils`                                    |
| `apis`                     | interfaces, constants, utils, apis                                               |
| `actions`                  | interfaces, constants, utils, apis, actions                                      |
| `providers` / `libs`       | interfaces, constants, utils, actions                                            |
| `components`               | interfaces, constants, utils, actions, providers, libs, components, `@vinaup/ui` |
| `app`                      | everything above                                                                 |

A component importing `apiPrivate` directly, or an api importing an action, is a layering violation.

---

## 4. Formatting

Owned entirely by Prettier (`.prettierrc` at repo root):

| Option          | Value  |
| --------------- | ------ |
| `singleQuote`   | `true` |
| `semi`          | `true` |
| `trailingComma` | `all`  |
| `printWidth`    | `100`  |
| `tabWidth`      | `2`    |

---

## 5. Repository & API

→ [REPOSITORY-PATTERN](pattern/REPOSITORY-PATTERN.md)

- **Never call `fetch` outside `src/apis/`.** Use `apiPublic` / `apiPrivate` from [`_base.ts`](../apps/jenahair/src/apis/_base.ts) inside api files; everything else imports the named functions.
- `apiPublic` — unauthenticated, cacheable. `apiPrivate` — forwards the cookie, handles 401 redirect.
- **Verb table:** `create` (POST) · `get` (GET) · `update` (PUT/PATCH) · `delete` (DELETE) · domain verb for non-CRUD.
- **Filtered list endpoints use `generateFilterQueryString`** from `@vinaup/utils` — never hand-roll `URLSearchParams`.

---

## 6. Server Actions

→ [SERVER-ACTIONS-PATTERN](pattern/SERVER-ACTIONS-PATTERN.md), [CACHING-REVALIDATION](pattern/CACHING-REVALIDATION.md)

- An action file starts with `'use server'` and wraps each api call in `executeApi`, returning `ActionResponse<T>` (`{ success, data?, error? }`).
- **Components consume actions, never apis.** The action is the public boundary.
- Mutations revalidate by tag: `updateTag(tag)` for read-your-writes inside the same request, `revalidateTag(tag, 'max')` for eventual/background freshness. Cached reads declare `'use cache'` + `cacheTag`/`cacheLife`.

---

## 7. Providers (client-only)

→ [PROVIDER-PATTERN](pattern/PROVIDER-PATTERN.md)

- Reserved for **client state** (auth session, theme, cross-tree UI) — never server entities.
- Trio: `XxxProvider` + `useXxxContext()` (guarded throw) + `XxxContextType`; `createContext<XxxContextType | null>(null)` — never a stub default.

## 8. Zustand stores

→ [OBSERVER-PATTERN](pattern/OBSERVER-PATTERN.md)

- Zustand is for **UI / ephemeral state only**. Files in `src/libs/zustand/<name>-store.ts`.
- Persist **only** user preferences (`persist` middleware); clear them on logout.
- Subscribe with a **selector** (`useStore((s) => s.slice)`), never destructure the whole store.

## 9. Components

→ [SERVER-CLIENT-BOUNDARY](pattern/SERVER-CLIENT-BOUNDARY.md), [COMPOSITE-PATTERN](pattern/COMPOSITE-PATTERN.md)

- **Default to a Server Component.** Add `'use client'` only for interactivity/state, as **low** in the tree as possible.
- **Components receive data via props / read it on the server; leaf components do not fetch.**
- **Reuse cross-app components from `@vinaup/ui`** instead of copy-pasting. The agency reuses _higher-level_ components (no primitive-wrapping layer over Mantine).

## 10. Forms & modals

- Multi-field forms use **`@mantine/form`** (`useForm` + `validate`) — not a `useState` graph or a Zustand store.
- Modals use **`@mantine/modals`**; toasts use **`@mantine/notifications`**. Split a modal into shell + content when it owns local state or a multi-field form. → [COMPOSITE-PATTERN](pattern/COMPOSITE-PATTERN.md)

## 11. State mechanism

Pick the simplest that works. → [KISS](principle/KISS.md)

| Need                        | Mechanism                        |
| --------------------------- | -------------------------------- |
| Pure display                | props, Server Component          |
| Toggle / transient UI       | `useState`                       |
| Form + validation           | `@mantine/form`                  |
| UI shared across components | Zustand                          |
| Server data                 | Server Component + Server Action |
| Auth/theme/session          | client Context provider          |

## 12. Date & time

→ [DATE-TIME-PATTERN](pattern/DATE-TIME-PATTERN.md)

- **Send** instants as UTC ISO (`.toISOString()`); **display** through the browser-local lens (`dayjs(value).format(...)`).
- Day.js **core only**. Format dates on the **client** (or with a fixed zone) to avoid SSR hydration mismatch.

## 13. Comments

Comments answer **WHY**, not WHAT. Structure non-trivial logic as numbered/section steps; don't narrate obvious code.

---

## Enforcement map

| §        | Convention                                                         | Enforced by                                      |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| 1.1      | File naming                                                        | `eslint-plugin-check-file` (excludes `src/app/`) |
| 1.2      | Symbol casing, no-`I`-prefix                                       | `@typescript-eslint/naming-convention`           |
| 1.3–1.4  | Function / constant naming                                         | Review                                           |
| 2        | Folder structure                                                   | Review                                           |
| 3.2      | Import order                                                       | `import/order`                                   |
| 3.1, 3.3 | Path alias, import direction                                       | Review (deep-relative caught in review)          |
| 4        | Formatting                                                         | Prettier                                         |
| 5–13     | API, action, provider, store, component, form, date-time, comments | Review                                           |

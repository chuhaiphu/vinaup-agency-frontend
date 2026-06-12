# vinaup-agency-frontend — Engineering Docs

These docs are the **shared contract** for every app in this monorepo. They describe _how we build_, not _what each app does_.

## Two-tier docs

| Tier              | Lives in               | Holds                                                           |
| ----------------- | ---------------------- | --------------------------------------------------------------- |
| **Shared** (here) | `docs/`                | principles, patterns, coding convention — true for **all** apps |
| **Per-app**       | `apps/<app>/README.md` | domain model, route map, env vars, app-specific decisions       |

> **The rule:** if a rule is true for all three apps → it belongs in `docs/`. If it is true for one app only → it belongs in `apps/<app>/`.

This split exists because the three apps (`jenahair`, `vitinhnet`, `the-local-travel`) share **one stack** (Next.js 16 App Router · Mantine 9 · Zustand · Day.js) and **two shared packages** (`@vinaup/ui`, `@vinaup/utils`). Duplicating conventions per app guarantees drift; one source keeps them aligned.

## How to read these docs

The docs follow a three-layer split:

| Layer          | Question | Files                                                                                            |
| -------------- | -------- | ------------------------------------------------------------------------------------------------ |
| **Principle**  | _Why_    | [principle/SOC.md](principle/SOC.md) · [DRY.md](principle/DRY.md) · [KISS.md](principle/KISS.md) |
| **Pattern**    | _How_    | [pattern/](pattern/) — one file per recurring structure                                          |
| **Convention** | _Which_  | [CODING-CONVENTION.md](CODING-CONVENTION.md) — the canonical, tooling-enforced rules             |

`CODING-CONVENTION.md` is the **source of truth**. Everything else explains the reasoning behind it.

## Patterns index

| Pattern                                                       | Concern                                                               |
| ------------------------------------------------------------- | --------------------------------------------------------------------- |
| [REPOSITORY-PATTERN](pattern/REPOSITORY-PATTERN.md)           | `src/apis/` + `src/actions/` — `apiPublic`/`apiPrivate`, `executeApi` → `ActionResponse<T>`, revalidate by tag |
| [CACHING-PATTERN](pattern/CACHING-PATTERN.md)                 | `'use cache'`, `cacheTag`/`cacheLife`, `updateTag` vs `revalidateTag` |
| [SERVER-CLIENT-BOUNDARY](pattern/SERVER-CLIENT-BOUNDARY.md)   | RSC by default; where `'use client'` goes                             |
| [DATA-STREAMING-PATTERN](pattern/DATA-STREAMING-PATTERN.md)   | server read; cached vs streamed; `use(promise)`+Suspense; reseed on remount |
| [PROVIDER-PATTERN](pattern/PROVIDER-PATTERN.md)               | client-only React Context — seeded, per-user (auth session)           |
| [OBSERVER-PATTERN](pattern/OBSERVER-PATTERN.md)               | Zustand stores — UI/ephemeral state only                              |
| [COMPOSITE-PATTERN](pattern/COMPOSITE-PATTERN.md)             | reuse via `@vinaup/ui`; modal/form via Mantine; container/sections    |
| [DATE-TIME-PATTERN](pattern/DATE-TIME-PATTERN.md)             | Day.js local lens + SSR hydration                                     |

## Enforcement

The mechanical tier is enforced — not left to review:

- **Prettier** (`.prettierrc` at repo root) owns formatting.
- **ESLint** (`eslint.config.base.mjs` at repo root, spread into each app) owns file naming (`eslint-plugin-check-file`), symbol naming incl. the no-`I`-prefix rule (`@typescript-eslint/naming-convention`), and import order.

See [CODING-CONVENTION.md → Enforcement map](CODING-CONVENTION.md#enforcement-map).

Setup & scripts: [setup/SETUP.md](setup/SETUP.md).

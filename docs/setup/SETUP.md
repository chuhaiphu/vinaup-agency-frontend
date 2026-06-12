# Setup

## Stack

| Concern      | Choice                                                                              |
| ------------ | ----------------------------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack, React Compiler, Cache Components)                |
| UI           | Mantine 9 (`@mantine/core`, `form`, `modals`, `notifications`, `dates`, `carousel`) |
| Client state | Zustand 5                                                                           |
| Dates        | Day.js (core)                                                                       |
| Language     | TypeScript 5 (strict)                                                               |
| Monorepo     | npm workspaces — `apps/*`, `packages/*`                                             |

Requires **Node ≥ 20**.

## Layout

```
vinaup-agency-frontend/
├── apps/
│   ├── jenahair/          CMS / blog (reference app — fully conforms to docs/)
│   ├── vitinhnet/         e-commerce (cart, products)
│   └── the-local-travel/  static landing
├── packages/
│   ├── ui/                @vinaup/ui   — Mantine components, icons, config provider
│   └── utils/             @vinaup/utils — pure helpers, validators, classes
├── docs/                  ← this folder (shared contract)
├── .prettierrc            ← root formatting (covers every workspace)
└── eslint.config.base.mjs ← shared lint rules, spread into each app
```

## Install

```bash
npm install        # from the repo root — installs all workspaces
```

## Scripts (run from repo root)

| Script                                               | Does                                                        |
| ---------------------------------------------------- | ----------------------------------------------------------- |
| `npm run dev:jenahair` / `dev:vitinhnet` / `dev:tlt` | start an app in dev                                         |
| `npm run build:jenahair` / `build:vitinhnet`         | production build (compile + `tsc` type-check + static gen)  |
| `npm run start:jenahair`                             | serve a built app                                           |
| `npm run typecheck`                                  | `tsc --noEmit` across all workspaces that define the script |
| `npm run lint --workspace=apps/<app>`                | ESLint an app (shared base + `eslint-config-next`)          |
| `npx prettier --check .`                             | verify formatting repo-wide                                 |

> `next build` runs the TypeScript type-checker and **fails on type errors** — there is no `ignoreBuildErrors`. A green build is the real gate.

## Env

Each app reads its own `.env`. The server-side API base is `API_URL` (consumed in `src/apis/_base.ts`). Document app-specific env vars in `apps/<app>/README.md`.

## Adding a workspace dependency

```bash
npm install <pkg> --workspace=apps/<app>      # app dep
npm install -D <pkg>                          # root dev tooling (eslint plugins, prettier)
```

# DRY — Don't Repeat Yourself

## What

Every piece of knowledge should have a single representation. Duplication forces us to maintain multiple copies of the same decision — when the requirement changes, every copy must be found and updated consistently.

### Mechanisms in this codebase

#### Shared package `@vinaup/utils`

Cross-app pure logic lives **once** in [packages/utils/](../../packages/utils/), imported via the `@vinaup/utils` alias — never copied into an app, never reached through a deep relative path.

```ts
// ✅ one definition, every app + every layer imports it
import { generateFilterQueryString, generateErrorMessage } from '@vinaup/utils';
```

| Helper                                               | Replaces                                                                                        |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `generateFilterQueryString(params)`                  | hand-rolled `new URLSearchParams()` / `?key=…` in every api file                                |
| `generateErrorMessage(error, fallback)`              | the `error instanceof Error ? error.message : '…'` ternary repeated across actions & components |
| `generateFormattedPrice(n)`                          | inline `.toLocaleString('vi-VN')`                                                               |
| `ApiError`, `TreeManager`, `generateParsedCookie`, … | per-app re-implementations                                                                      |

#### Shared UI `@vinaup/ui`

Reusable components (`EntitiesTable`, `MediaModal`, carousels, icons, the Mantine config provider) live once in [packages/ui/](../../packages/ui/) and are consumed via `@vinaup/ui/landing`, `@vinaup/ui/admin`, `@vinaup/ui/cores`. → [COMPOSITE-PATTERN](../pattern/COMPOSITE-PATTERN.md)

#### Interface-driven typing

Request/response shapes are defined once in `src/interfaces/*-interfaces.ts` and shared between apis, actions, and components — never redefined inline. → [CODING-CONVENTION §5](../CODING-CONVENTION.md)

#### Named constants

Format strings, enums, colours, and magic numbers live once in `src/constants/` (or a small `src/constants.ts`) and are imported everywhere they are needed.

## Why

When logic exists in one place, fixing a bug touches exactly one file and TypeScript propagates the change to every caller. When the same decision is duplicated, certainty about completeness shrinks with every extra copy. (Before this convention, jenahair defined `buildQueryString` separately in three api files — fixing query encoding meant editing three places.)

## How

1. **Extract when the same decision appears in 2+ places** — identical logic, not merely similar code.
2. **Cross-app pure logic → `@vinaup/utils`.** App-specific logic → `src/utils/`.
3. **Cross-app components → `@vinaup/ui`.** Never copy-paste a component between apps.
4. **Always import shared code via its package alias** (`@vinaup/utils`, `@vinaup/ui/*`) — a deep relative path like `../../../../packages/utils/src/...` is a violation. → [CODING-CONVENTION §3](../CODING-CONVENTION.md)
5. **Do not DRY prematurely** — wait until something genuinely recurs before extracting. → [KISS](KISS.md)

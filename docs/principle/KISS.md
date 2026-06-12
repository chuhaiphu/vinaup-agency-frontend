# KISS — Keep It Simple, Stupid

## What

Systems work best kept simple. Complexity is a cost that must be justified by the problem it solves. Every unnecessary abstraction adds surface area that must be read, understood, and maintained. When a simpler approach solves the problem correctly, it is the right choice.

### In this codebase

- A landing page that only displays data is a **Server Component with no client state** — no provider, no store, no `useEffect`. (`the-local-travel` is built this way.)
- Server data is read in a **Server Component**, not fetched client-side with `useEffect` + `useState`.
- A form uses **`@mantine/form`**, not a hand-rolled `useState` graph or a Zustand store.
- Error extraction is one call — `generateErrorMessage(error, 'Failed to delete blog')` — not a repeated inline ternary.

### Pick the simplest state mechanism

| Need                                   | Mechanism                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Pure display                           | props, no state — keep it a Server Component                                                                                         |
| Toggle / transient local UI            | `useState` (Client Component)                                                                                                        |
| Form (multi-field + validation)        | `@mantine/form`                                                                                                                      |
| UI state shared across components      | Zustand store (`src/libs/zustand/`) → [OBSERVER-PATTERN](../pattern/OBSERVER-PATTERN.md)                                             |
| Server data                            | Server Component reads via `src/actions/`; mutate via Server Action → [SERVER-ACTIONS-PATTERN](../pattern/SERVER-ACTIONS-PATTERN.md) |
| Auth / theme / session across the tree | client Context provider → [PROVIDER-PATTERN](../pattern/PROVIDER-PATTERN.md)                                                         |

> **Don't reach for a client provider to hold server data.** In Next.js the server already owns that, with caching and revalidation built in. A client store of server entities is the classic over-engineering this codebase avoids.

### Don't add layers an app doesn't need

`the-local-travel` has no `apis/`, `actions/`, or `providers/` folders because it has no backend data to fetch — and that is correct. Add a layer when the need exists, not because another app has it.

## Why

Every line that isn't required is a line that must be read, tested, and maintained. Complexity compounds: a component that fetches, calculates, and renders fails in subtler ways than one that only renders. Simple code fails in simple, obvious ways.

## How

1. **Choose the simplest mechanism that works** (table above).
2. **Default to a Server Component.** Add `'use client'` only when you need interactivity/state, and as low in the tree as possible. → [SERVER-CLIENT-BOUNDARY](../pattern/SERVER-CLIENT-BOUNDARY.md)
3. **Don't add abstractions before they're needed** — extract when the complexity exists, not when it might.
4. **Use the project utilities** (`generateErrorMessage`, `generateFilterQueryString`, `generateFormattedPrice`) instead of re-implementing inline.
5. **Avoid nested ternary chains longer than 2 levels** — extract into a named helper.

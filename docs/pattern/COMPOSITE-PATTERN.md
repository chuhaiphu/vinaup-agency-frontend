# Composite Pattern

## What

The Composite pattern builds complex UI by assembling small pieces, each doing one thing. In this codebase composition happens at two levels:

- **Level 1 — shared high-level components** in `@vinaup/ui`, composed from Mantine.
- **Level 2 — modal split** into shell + content when a modal grows complex.

### Level 1 — reuse via `@vinaup/ui`, not a primitive-wrapping layer

> Unlike the React-Native app, the agency does **not** wrap Mantine into custom primitives (`Button`, `Input`). Mantine is used directly; reuse happens through **higher-level** components published from `@vinaup/ui`.

```tsx
import { EntitiesTable } from '@vinaup/ui/admin'; // generic typed table
import { MediaModal } from '@vinaup/ui/admin'; // media picker
import { HeroCarousel } from '@vinaup/ui/landing';
```

`@vinaup/ui` exports admin building blocks (`EntitiesTable`, `MediaModal`, editors), landing primitives (cards, carousels, skeletons), icons (`@vinaup/ui/cores`), and the Mantine config provider (`@vinaup/ui/libs/mantine`). A component used by 2+ apps lives here; an app-only component stays in that app's `src/components/`. → [DRY](../principle/DRY.md)

### Level 2 — modals via `@mantine/modals`, forms via `@mantine/form`

Modals use the Mantine **modals manager** (`@mantine/modals`) — declarative open/close, no imperative ref plumbing. Notifications use `@mantine/notifications`.

```tsx
const form = useForm<CreateBlogRequest>({
  initialValues: { title: '', endpoint: '' },
  validate: { title: (v) => (v ? null : 'Bắt buộc') },
});
```

When a modal owns local state or a multi-field form, split it into a **shell** (opens the modal, owns submit/close wiring) and **content** (the form + local state). A trivial confirm/single-field modal stays one file.

## Why

A single component that owns the container, the form state, the list, and the callbacks grows fast and becomes hard to read and test. Composing small pieces — and lifting shared ones into `@vinaup/ui` — keeps each file small and changes local. Reusing Mantine directly (instead of wrapping it) avoids a maintenance layer that adds no behaviour.

## How

### Rule 1 — Cross-app component → `@vinaup/ui`; app-only → local

Never copy a component between apps. If two apps need it, publish it from `@vinaup/ui` and consume via the subpath export.

### Rule 2 — Use Mantine directly

No custom `Button`/`Input` wrappers. Add a shared component only when it carries real composed behaviour (a typed table, a media picker), not to re-skin a single Mantine element.

### Rule 3 — Forms use `@mantine/form`

`useForm` + `validate`. Not a hand-rolled `useState` graph, not a Zustand store. → [KISS](../principle/KISS.md)

### Rule 4 — Split a modal into shell + content when it owns state

Shell = open/close + submit wiring; content = form + local state. Keep simple confirm modals in one file.

### Rule 5 — One concern per component

If a component fetches, computes, and renders, split it: read on the server, compute in a helper, render in a leaf. → [SoC](../principle/SOC.md)

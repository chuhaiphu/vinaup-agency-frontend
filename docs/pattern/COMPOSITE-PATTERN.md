# Composite Pattern

## What

The Composite pattern builds a complex whole by **assembling small parts, each doing one thing** — and treats the whole and its parts uniformly. In React this is the native model: a component is itself built from components, recursively, all the way down to the leaves. "Composite" here is less a special structure than the default discipline — **keep each component single-purpose, and compose**.

### In this codebase

Composition shows up two ways: we **assemble Mantine 9 primitives** into purpose-built components, and we **split any component that does more than one thing** (→ [SoC](../principle/SOC.md)).

Beyond that, three **independent** decisions govern composition, just three questions:

1. **Which mechanism** distributes the parts — props, children/slots, or a render-prop.
2. **Where the component lives** — shared in packages, or local to one app.
3. **Which split shape** applies when a component grows — a screens, or a modal.

---

## Composition mechanisms

A component receives its parts in one of three ways — **your situation decides which:**

| Situation | Mechanism | Example |
| --------- | --------- | ------- |
| the **data** differs each time | props | `OverlayCard` takes `title`, `description`, `src` |
| the caller supplies the **markup** | `children` or named slots | `ProductCard` takes `topLeftSection` / `topRightSection` slots |
| the child holds the data (a loop row), the parent decides the markup | render-prop | `EntitiesTable` calls `col.render({ entity })` per cell |

Default to props; use `children` / slots only when the caller truly supplies markup; reach for a render-prop only when the data lives inside the child but the markup is the caller's to decide.

---

## Reusable component placement — shared vs app-local

A component used by **2+ apps** is published from `@vinaup/ui` via a subpath export and consumed there; a component used by **one app** stays in that app's `src/components/`. Never copy a component between apps. → [DRY](../principle/DRY.md)

```tsx
import { EntitiesTable, MediaModal } from '@vinaup/ui/admin'; // generic table, media picker
import { HeroCarousel, ProductCard } from '@vinaup/ui/landing';
```

Subpath exports (verified in `packages/ui/package.json`): `@vinaup/ui/admin`, `@vinaup/ui/landing`, `@vinaup/ui/cores` (alias `/core`), `@vinaup/ui/libs/mantine`.

Use Mantine directly — no custom `Button` / `Input` re-skins. A shared component earns its place only when it carries **real composed behaviour** (a typed `EntitiesTable`, a `MediaModal` orchestrating grid + upload), not to restyle one Mantine element.

---

## The two recurring splits

When one component does too much, it takes one of two shapes here.

### Split A — screen → container + sections

Split  **god component** into a thin **container** (gets the data, owns the form + handlers) and **sections** (each render one concern).

The usual shape — **the container owns one `useForm`; each section reads only its own fields off it via a `form` prop:**

```tsx
// container (*-page-content.tsx) — thin: get data, own ONE form + handlers, compose sections
export default function EntityDetailPageContent({ entityPromise }: Props) {
  const entity = use(entityPromise); // unwrap here, or `await` it in a Server Component
  const form = useForm<EntityForm>({ initialValues: toForm(entity) });
  const handleSave = form.onSubmit((values) => updateEntityAction(entity.id, values));

  return (
    <form onSubmit={handleSave}>
      <SectionA form={form} /> {/* one concern */}
      <SectionB form={form} /> {/* one concern */}
      <SectionC form={form} /> {/* one concern */}
      <Button type="submit">Save</Button>
    </form>
  );
}

// section — presentational: binds only its own fields, fetches nothing of its own
function SectionA({ form }: { form: UseFormReturnType<EntityForm> }) {
  return <TextInput label="Title" {...form.getInputProps('title')} />;
}
```

The container gets the data either by `await` (Server Component) or `use(promise)` under `<Suspense>` (Client Component) → [DATA-STREAMING-PATTERN](DATA-STREAMING-PATTERN.md), [SERVER-CLIENT-BOUNDARY](SERVER-CLIENT-BOUNDARY.md). Sections live in the screen's own folder.

**When the blocks don't share one form**, each owns its own state instead — the container just composes them:

```tsx
// container — no shared form: each block is self-contained
export default async function EntityDetailPageContent({ params }: Props) {
  const { id } = await params;
  const entity = await getEntityAction(id); // await; nothing to seed a shared form

  return (
    <>
      <InfoBlock entity={entity} />     {/* read-only; owns its own modal state */}
      <SettingsForm entityId={entity.id} /> {/* leaf with its own useForm */}
    </>
  );
}
```

### Split B — modal → shell + content

A confirm dialog or a single-field modal stays in one file. But once a modal owns a multi-field form or real local state, split it into two halves:

- **Content** — the presentational half: renders `<Modal>` with the form fields, owns the `useForm` / local state, and on submit just **calls its `onSubmit` / `onClose` props**. It knows nothing about the server.
- **Shell** — the wiring half: turns that `onSubmit` into a real effect (call the Server Action, show a notification, close on success), and renders the content. No UI of its own.

The `opened` flag is a plain `useState` in **whoever triggers the modal** (a table row, a toolbar button) and is passed into the shell as a prop.

```tsx
// content — presentational: the <Modal> + form; validates, then calls props. No server calls.
function EntityModalContent({ opened, onClose, onSubmit }: ContentProps) {
  const form = useForm<EntityForm>({ initialValues: { name: '' } });
  return (
    <Modal opened={opened} onClose={onClose} title="Edit">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput label="Name" {...form.getInputProps('name')} />
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
}

// shell — wiring: maps the content's onSubmit to a Server Action + notification, then closes
export default function EntityModalShell({ opened, onClose }: ShellProps) {
  const handleSubmit = async (values: EntityForm) => {
    const res = await createEntityAction(values);
    if (!res.success) return notifications.show({ color: 'red', message: res.error });
    notifications.show({ message: 'Saved' });
    onClose();
  };
  return <EntityModalContent opened={opened} onClose={onClose} onSubmit={handleSubmit} />;
}

// trigger — owns the opened flag
// const [opened, setOpened] = useState(false);
// <EntityModalShell opened={opened} onClose={() => setOpened(false)} />
```

---

## What this codebase satisfies today

An honest scorecard — the gaps drive the [Refactor backlog](#refactor-backlog).

| Decision | Status | Evidence |
| -------- | :----: | -------- |
| Mechanisms (props / children / render-prop) | ✅ Satisfied | slots (`ProductCard`) + render-prop (`EntitiesTable`) used idiomatically |
| Placement (reuse via `@vinaup/ui`, no re-skins) | ✅ Satisfied | healthy package; only 3 borderline thin wrappers |
| Split A — container + sections | ✅ Satisfied | all six admin detail screens split — shared-form shape (blog/diary/page/category), independent-blocks (`admin-user-detail`), and mode-machine (`section-ui`); no god components remain |
| Split B — modal shell + content | ❌ Mostly not | raw modals are mostly inline/monolithic; `DeleteConfirmModal` (`admin/shared/`) now covers the confirm case |
| Forms via `@mantine/form` | ✅ Satisfied | every detail/edit screen uses `useForm` (section-ui's edit mode buffers behind Save; its create wizard stays imperative by nature) |

---

## Why

Composing small single-purpose pieces — and lifting shared ones into `@vinaup/ui` — keeps each file small and each change local. Using Mantine directly (instead of wrapping it) avoids a maintenance layer that adds no behaviour.

---

## How

### Rule 1 — Cross-app component → `@vinaup/ui`; app-only → local

Never copy a component between apps. If 2+ apps need it, publish from `@vinaup/ui` and consume via the subpath export.

### Rule 2 — Use Mantine directly

No custom `Button` / `Input` wrappers. Add a shared component only when it carries real composed behaviour, not to re-skin one Mantine element.

### Rule 3 — Multi-field forms use `@mantine/form`

`useForm` + `validate`. Not a hand-rolled `useState` graph, not a Zustand store. → [KISS](../principle/KISS.md), [Coding Convention §10](../CODING-CONVENTION.md)

### Rule 4 — Split a modal into shell + content when it owns state

Raw `<Modal>` from `@mantine/core` + `useState`. Shell = action / close wiring; content = form + local state. Keep simple confirm modals in one file.

### Rule 5 — One concern per component

If a component fetches, computes, and renders, split it: read on the server, compute in a helper, render in a leaf. → [SoC](../principle/SOC.md)

### Rule 6 — Split a screen into container + sections past ~250 lines or 3+ concerns

Thin container gets the data + owns the form; presentational sections render one concern each. The threshold is a smell, not a law — a 200-line single-concern component is fine; a 150-line one doing three things is not. → [SoC](../principle/SOC.md), [DATA-STREAMING-PATTERN](DATA-STREAMING-PATTERN.md)

---

## Adding a new screen or component

1. **Mechanism** — data → props; structure → children/slots; child-to-parent data → render-prop.
2. **Placement** — needed by 2+ apps → `@vinaup/ui` subpath; one app → `src/components/`.
3. **If it's a screen** — start as container + sections from the first commit; one `@mantine/form` in the container, one concern per section. Don't grow a god component first.
4. **If it's a stateful modal** — shell + content from the start; raw `<Modal>` + `useState`.

→ [Coding Convention §9](../CODING-CONVENTION.md), [§10](../CODING-CONVENTION.md), [§11](../CODING-CONVENTION.md)

---

## Refactor backlog

The scorecard gaps, prioritized. These are **not yet done** — they are the work this doc points at. New code follows the rules above from the start; these are the legacy screens that predate them.

**P0 — dead-dependency cleanup.** ✅ Done — `@mantine/modals` removed from both apps.

**P2 — medium screens:** `menu` (287), `settings/.../smtp-page-content` (274), `dashboard/admin-page-tabs/customer-contacts-tab` (258), `theme/*` (234–235), landing `blog`/`diary` detail (236–237).

**P3 — modal hygiene:** audit the 42 raw `<Modal>` sites; extract shell + content for the stateful ones (e.g. `user-details-block.tsx` reset-password modal, table delete modals). Leave simple confirms inline.

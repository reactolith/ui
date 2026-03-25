# Reactolith UI

Custom loadable loader for [Reactolith](https://reactolith.dev) that resolves `<ui-*>` tags to shadcn component exports. Includes behavior HOCs for close-on-navigate, render props, prop transforms, and more.

## Installation

```bash
npm install reactolith-ui
```

You also need shadcn components installed locally in your project (via `npx shadcn add`).

## Quick Start

```ts
import loadable from "@loadable/component"
import { App } from "reactolith"
import {
  createCompositeLoader,
  createShadcnLoader,
  createOverridesLoader,
  type ModuleMap,
} from "reactolith-ui"

const modules = import.meta.glob([
  "@/components/ui/*.tsx",
  // optional: override files
  "@/app/overrides/*.tsx",
]) as unknown as ModuleMap

const loaders = [
  createOverridesLoader(modules),
  createShadcnLoader(modules),
]

new App(
  loadable(
    createCompositeLoader(loaders),
    { cacheKey: ({ is }) => is },
  ),
)
```

Components are then usable as HTML tags:

```html
<ui-button variant="outline">Click me</ui-button>
<ui-dialog>
  <ui-dialog-trigger>Open</ui-dialog-trigger>
  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Title</ui-dialog-title>
    </ui-dialog-header>
  </ui-dialog-content>
</ui-dialog>
```

## How the Loader Works

`createCompositeLoader(loaders)` returns a load function that chains multiple loaders in priority order:

- **Module resolution**: `ui-field-label` → `components/ui/field.tsx` → `FieldLabel` (case-insensitive, progressively removes trailing kebab segments)
- **Override files**: checked first via `createOverridesLoader`, for standalone implementations (e.g. custom sonner, theme-switch)

After resolving, components are wrapped with behavior HOCs and prop transforms.

## Optional Sub-Packages

Additional loaders are available as separate imports so you only pay for what you use:

### Recharts (Charts)

```bash
npm install recharts
```

```ts
import { createRechartsLoader } from "reactolith-ui/recharts"

const loaders = [
  createOverridesLoader(modules),
  createRechartsLoader(),
  createShadcnLoader(modules),
]
```

### AI Elements

```ts
import { createAiElementsLoader } from "reactolith-ui"

const modules = import.meta.glob([
  "@/components/ui/*.tsx",
  "@/components/ai-elements/*.tsx",
  "@/app/overrides/*.tsx",
]) as unknown as ModuleMap

const loaders = [
  createOverridesLoader(modules),
  createAiElementsLoader(modules),
  createShadcnLoader(modules),
]
```

### Editor (Plate.js)

```bash
npm install platejs @platejs/markdown
```

```ts
import { useEditorFormSync, type EditorProps } from "reactolith-ui/editor"
```

## Behaviors

The loader applies behavior wrappers automatically based on the loader config. You can import and use these individually:

```ts
import {
  linkable,       // href support via renderLinkable
  linkableClose,  // href + close parent overlay
  trigger,        // single-child render prop (asChild)
  overlay,        // wraps children in CloseOverlayProvider
  closeClick,     // calls useCloseOverlay on click
} from "reactolith-ui"
```

### Close-on-Navigate

Navigation links inside overlays auto-close the overlay:

```ts
import { CloseOverlayProvider, useCloseOverlay } from "reactolith-ui"
```

- **Overlay containers** (Sheet, Dialog, Popover, etc.) provide `CloseOverlayProvider`
- **Items with `href`** consume `useCloseOverlay()` and call it on click
- **Sidebar** uses `useSidebar().setOpenMobile(false)` for mobile close

### Component Wrappers

For components needing custom logic beyond standard behaviors:

```ts
import {
  createSmartTriggerWrapper,   // drawer trigger: uses Button if available
  commandLinkable,             // command-item: href → <a> with close
  sidebarLinkable,             // sidebar button: mobile close + overlay close
  selectProvider,              // select: auto-registers items
  comboboxProvider,            // combobox: items prop support
} from "reactolith-ui"
```

### Prop Transforms

Simple prop rewriting applied after behavior wrapping:

```ts
import {
  progressTransform,        // value coercion to number
  spinnerTransform,          // size → className mapping
  chartContainerTransform,   // adds recharts responsive container styles
  chartTooltipTransform,     // children → content prop
} from "reactolith-ui"
```

## Utilities

```ts
import { renderLinkable, renderTrigger, getSingleElement, cn } from "reactolith-ui"
```

## Loader Classes

You can use the loader classes directly for custom setups:

```ts
import {
  ComponentLoader,
  OverrideLoader,
  AiElementsLoader,
  ExternalLoader,
  createCompositeLoader,
} from "reactolith-ui"

const loader = new ComponentLoader({
  modules,
  dirSegment: "/components/ui/",
  dir: "components/ui",
  prefix: "ui-",
  behaviors: { "button": linkable },
  wrappers: { "command-item": commandLinkable },
  propTransforms: { "progress": progressTransform },
})
```

## License

MIT

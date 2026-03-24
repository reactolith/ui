# Reactolith UI

Custom loadable loader for [Reactolith](https://reactolith.dev) that resolves `<ui-*>` tags to shadcn component exports. Includes behavior HOCs for close-on-navigate, render props, prop transforms, and more.

## Installation

```bash
npm install @reactolith/ui
```

You also need shadcn components installed locally in your project (via `npx shadcn add`).

## Quick Start

```ts
import loadable from "@loadable/component"
import { App } from "reactolith"
import { createComponentLoader } from "@reactolith/ui"

const modules = import.meta.glob([
  "@/components/ui/*.tsx",
  // optional: override files
  "@/app/overrides/*.tsx",
])

new App(
  loadable(
    createComponentLoader(modules),
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

`createComponentLoader(modules)` returns a load function that maps tag names to component exports:

- **Module resolution**: `ui-field-label` → `components/ui/field.tsx` → `FieldLabel` (case-insensitive, progressively removes trailing kebab segments)
- **Recharts**: `ui-area-chart` → `recharts` → `AreaChart`
- **Override files**: checked first, for standalone implementations (e.g. custom sonner, theme-switch)

After resolving, components are wrapped with behavior HOCs and prop transforms.

## Loader Options

```ts
createComponentLoader(modules, {
  // Custom dir segment for override file detection (default: '/app/overrides/')
  overrideDir: '/my-overrides/',

  // Additional or replacement component wrappers (merged with defaults)
  componentWrappers: {
    'my-component': (C, mod) => withLinkable(C),
  },
})
```

## Behaviors

The loader applies behavior wrappers automatically based on `STANDARD_BEHAVIORS`. You can import and use these individually:

```ts
import {
  withLinkable,       // href support via renderLinkable
  withLinkableClose,  // href + close parent overlay
  withTrigger,        // single-child render prop (asChild)
  withOverlay,        // wraps children in CloseOverlayProvider
  withCloseClick,     // calls useCloseOverlay on click
} from "@reactolith/ui"
```

### Close-on-Navigate

Navigation links inside overlays auto-close the overlay:

```ts
import { CloseOverlayProvider, useCloseOverlay } from "@reactolith/ui"
```

- **Overlay containers** (Sheet, Dialog, Popover, etc.) provide `CloseOverlayProvider`
- **Items with `href`** consume `useCloseOverlay()` and call it on click
- **Sidebar** uses `useSidebar().setOpenMobile(false)` for mobile close

### Component Wrappers

For components needing custom logic beyond standard behaviors:

```ts
import {
  DEFAULT_COMPONENT_WRAPPERS,  // the default wrapper map
  createSmartTriggerWrapper,   // drawer trigger: uses Button if available
  withCommandLinkable,         // command-item: href → <a> with close
  withSidebarLinkable,         // sidebar button: mobile close + overlay close
  withSelectProvider,          // select: auto-registers items
  withComboboxProvider,        // combobox: items prop support
} from "@reactolith/ui"
```

### Prop Transforms

Simple prop rewriting applied after behavior wrapping:

```ts
import { PROP_TRANSFORMS } from "@reactolith/ui"
// progress: value coercion to number
// spinner: size → className mapping
// chart-container: adds recharts responsive container styles
// chart-tooltip: children → content prop
```

## Utilities

```ts
import { renderLinkable, renderTrigger, getSingleElement } from "@reactolith/ui"
import { cn } from "@reactolith/ui/utils"
```

## Building a Custom Load Function

You can combine the exported pieces with your own logic:

```ts
import {
  findExport,
  findModuleInDir,
  wrapComponent,
  RECHARTS,
} from "@reactolith/ui"

function myLoader(modules) {
  return ({ is }) => {
    const name = is.substring(3)

    if (RECHARTS.has(name)) {
      return import('recharts').then(mod => ({
        default: findExport(mod, name),
      }))
    }

    const path = findModuleInDir(name, modules, '/components/ui/')
    return modules[path]().then(mod => ({
      default: wrapComponent(name, findExport(mod, name), mod),
    }))
  }
}
```

## License

MIT

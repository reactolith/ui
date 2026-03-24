# CLAUDE.md

## Project Structure

Reactolith UI — a component library built with Vite + React 19 + Base UI + Tailwind CSS v4. Published as an npm package.

### `components/ui/` — Base components (do NOT modify)

Shadcn base component copies. Treat as read-only third-party code.

### `components/ai-elements/` — AI components (do NOT modify)

AI-specific components (code blocks, messages, canvases, etc.). Also read-only.

### `lib/loader/` — Loader system

The loader system resolves `<ui-*>` tags to components using a class-based architecture with reusable behaviors.

#### Key files

- **`behaviors.tsx`** — Reusable behavior definitions (HOC + web-type metadata):
  - `linkable` — adds `href` prop, renders as `<a>` link
  - `linkableClose` — adds `href` + closes parent overlay on navigate
  - `trigger` — single-child asChild render prop pattern
  - `overlay` — wraps children with `CloseOverlayProvider`
  - `closeClick` — calls `useCloseOverlay()` on click
  - Component-specific wrappers: `commandLinkable`, `sidebarLinkable`, `sidebarSubLinkable`, `selectProvider`, `selectRegister`, `comboboxProvider`, `comboboxListRenderer`
  - Prop transforms: `progressTransform`, `spinnerTransform`, `chartContainerTransform`, `chartTooltipTransform`

- **`component-loader.tsx`** — Loader classes:
  - `ComponentLoader` — base class: module resolution, export lookup, behavior/wrapper/transform application
  - `OverrideLoader` — exact file name match, default export, no wrapping
  - `AiElementsLoader` — strips `ai-` prefix, delegates to `ComponentLoader`
  - `ExternalLoader` — imports from external packages (e.g. recharts)
  - `createCompositeLoader()` — chains loaders in priority order

- **`presets.tsx`** — Factory functions for common loader configurations:
  - `createShadcnLoader(modules)` — shadcn components with all behaviors pre-configured
  - `createAiElementsLoader(modules)` — AI element components
  - `createRechartsLoader()` — recharts chart components
  - `createOverridesLoader(modules)` — override files

- **`index.ts`** — Re-exports everything

#### How resolution works

1. `ui-field-label` → `ComponentLoader.findModule('field-label')` → `components/ui/field.tsx` → `findExport(mod, 'field-label')` → `FieldLabel` (case-insensitive, progressively removes trailing kebab segments)
2. `ui-ai-message-content` → `AiElementsLoader` strips `ai-` → resolves `message-content` in `components/ai-elements/`
3. `ui-area-chart` → `ExternalLoader` → `import('recharts')` → `AreaChart`
4. `ui-sonner` → `OverrideLoader` → `app/overrides/sonner.tsx` default export

### `app/overrides/` — Override files (2 files)

Only for components that are standalone implementations (not wrappers around base components): **sonner** (declarative toast firing via `toasts` prop) and **theme-switch** (light/dark/system toggle).

### `lib/` — Shared utilities

- `utils.ts` — cn() class merge utility
- `close-overlay.tsx` — CloseOverlayProvider/useCloseOverlay context
- `render-element.tsx` — renderLinkable, renderTrigger, getSingleElement
- `select-items.tsx` — SelectItemsProvider/useSelectItemsRegister context

## Close-on-Navigation Pattern

Navigation links inside overlays (sidebars, sheets, dropdowns, popovers, command palettes, etc.) **must close the overlay when clicked**.

### How it works

1. **Overlay containers** (`Sheet`, `Popover`, `CommandDialog`) provide a `CloseOverlayProvider` context with their `onOpenChange(false)` callback.

2. **Item components with `href`** (`DropdownMenuItem`, `ContextMenuItem`, `MenubarItem`, `CommandItem`, `NavigationMenuLink`) consume the context via `useCloseOverlay()` and call the close function on click.

3. **Sidebar** handles mobile close separately via `useSidebar().setOpenMobile(false)` in the `sidebarLinkable`/`sidebarSubLinkable` wrappers.

4. **Dropdown/Context/Menubar menus** auto-close their own menu via Base UI's built-in behavior. The `useCloseOverlay()` hook additionally closes any parent overlay (e.g., a Sheet containing a DropdownMenu).

### When adding new components with navigation links

- If the component is an **overlay container**: assign the `overlay` behavior in the loader's `behaviors` config.
- If the component is an **item with `href`**: assign `linkable` or `linkableClose` behavior.
- If the component is a **trigger with single-child render prop**: assign the `trigger` behavior.
- If it needs **unique logic**: create a `WrapperDef` and add it to the loader's `wrappers` config.
- If it needs **simple prop rewriting**: create a `PropTransformDef` and add it to the loader's `propTransforms` config.
- Only create an override file in `app/overrides/` if the component is a completely standalone implementation.

## Web Types

To regenerate `web-types.json` (all components with all props, including loader-injected attributes):
```
npm run generate-web-types
```

The script (`scripts/generate-web-types.ts`) scans all loader configs, extracts props via ts-morph, and enriches with additional attributes from behavior/wrapper metadata (e.g. `href` on linkable components, `items` on combobox).

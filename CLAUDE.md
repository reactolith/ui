# CLAUDE.md

## Project Structure

This is a shadcn-based component registry built with Vite + React 19 + Base UI + Tailwind CSS v4.

### `components/ui/` — Do NOT modify

These are shadcn base component copies. In a real project they come from `npx shadcn add` and should never be manually edited. Treat them as read-only third-party code.

### `app/loader.tsx` — Custom loadable loader

The loader automatically resolves `<ui-*>` tags to the correct component exports without needing individual wrapper files. It handles:

1. **Module resolution**: `ui-field-label` → `components/ui/field.tsx` → `FieldLabel` export (case-insensitive lookup, progressively removes trailing kebab segments to find the module file)
2. **AI components**: `ui-ai-message-content` → `components/ai-elements/message.tsx` → `MessageContent`
3. **Recharts**: `ui-area-chart` → `recharts` → `AreaChart`
4. **Standard behavior HOCs**: `STANDARD_BEHAVIORS` map — applies `renderLinkable`, `renderTrigger`, `CloseOverlayProvider`, or `useCloseOverlay` wrappers
5. **Component-specific wrappers**: `COMPONENT_WRAPPERS` map — inline HOCs for select (provider/consumer), combobox (provider/list-renderer), command-item (href→`<a>`), sidebar buttons (useSidebar + close), drawer triggers (smart Button wrapping)
6. **Prop transforms**: `PROP_TRANSFORMS` map — simple prop rewriting for progress (value coercion), spinner (size mapping), chart-container (className), chart-tooltip (children→content)
7. **Override files**: `registry/default/app/**/*.tsx` take priority for components that need standalone implementations

### `registry/default/app/` — Override files only

Only 2 override files remain for components that are standalone implementations (not wrappers around base components): **sonner** (declarative toast firing via `toasts` prop) and **theme-switch** (complete light/dark/system toggle component).

### `registry/default/lib/` — Shared utilities

- `close-overlay.tsx` — CloseOverlayProvider/useCloseOverlay context
- `render-element.tsx` — renderLinkable, renderTrigger, getSingleElement
- `select-items.tsx` — SelectItemsProvider/useSelectItemsRegister context

## Close-on-Navigation Pattern

Navigation links inside overlays (sidebars, sheets, dropdowns, popovers, command palettes, etc.) **must close the overlay when clicked**. This is standard UX — users expect menus to dismiss after selecting a link.

### How it works

1. **Overlay containers** (`Sheet`, `Popover`, `CommandDialog`) provide a `CloseOverlayProvider` context with their `onOpenChange(false)` callback.

2. **Item components with `href`** (`DropdownMenuItem`, `ContextMenuItem`, `MenubarItem`, `CommandItem`, `NavigationMenuLink`) consume the context via `useCloseOverlay()` and call the close function on click.

3. **Sidebar** handles mobile close separately via `useSidebar().setOpenMobile(false)` in the `withSidebarLinkable`/`withSidebarSubLinkable` wrappers in `app/loader.tsx`.

4. **Dropdown/Context/Menubar menus** auto-close their own menu via Base UI's built-in behavior. The `useCloseOverlay()` hook additionally closes any parent overlay (e.g., a Sheet containing a DropdownMenu).

### When adding new components with navigation links

- If the component is an **overlay container**: add it to the `'overlay'` behavior in `app/loader.tsx` `STANDARD_BEHAVIORS` map.
- If the component is an **item with `href`**: add it to `'linkable'` (without close) or `'linkable-close'` (with close) in the `STANDARD_BEHAVIORS` map.
- If the component is a **trigger with single-child render prop**: add it to `'trigger'` in the `STANDARD_BEHAVIORS` map.
- If it needs **unique logic**: add a wrapper function in `COMPONENT_WRAPPERS` (receives both the component and the loaded module for sibling export access).
- If it needs **simple prop rewriting**: add an entry to `PROP_TRANSFORMS`.
- Only create an override file in `registry/default/app/` if the component is a completely standalone implementation.

## When working on registry components

- Execute `npx generate-web-types --components registry/default/app/ --prefix ui-` to generate a web-types-json for all components with all props


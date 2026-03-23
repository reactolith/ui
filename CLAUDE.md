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
4. **Behavior HOCs**: Declared in `BEHAVIORS` map — applies `renderLinkable`, `renderTrigger`, `CloseOverlayProvider`, or `useCloseOverlay` wrappers automatically
5. **Override files**: `registry/default/app/**/*.tsx` take priority for components that need custom logic

### `registry/default/app/` — Override files only

Only components that require **custom logic beyond standard behaviors** live here (~15 files). The loader auto-resolves everything else. Override files exist for: sidebar buttons (useSidebar context), select/combobox (item registration contexts), command-item (custom href), sonner (toast logic), theme-switch, drawer triggers (smart Button wrapping), progress (value coercion), spinner (size mapping), chart-container/chart-tooltip.

### `registry/default/lib/` — Shared utilities

- `close-overlay.tsx` — CloseOverlayProvider/useCloseOverlay context
- `render-element.tsx` — renderLinkable, renderTrigger, getSingleElement
- `select-items.tsx` — SelectItemsProvider/useSelectItemsRegister context

## Close-on-Navigation Pattern

Navigation links inside overlays (sidebars, sheets, dropdowns, popovers, command palettes, etc.) **must close the overlay when clicked**. This is standard UX — users expect menus to dismiss after selecting a link.

### How it works

1. **Overlay containers** (`Sheet`, `Popover`, `CommandDialog`) provide a `CloseOverlayProvider` context with their `onOpenChange(false)` callback.

2. **Item components with `href`** (`DropdownMenuItem`, `ContextMenuItem`, `MenubarItem`, `CommandItem`, `NavigationMenuLink`) consume the context via `useCloseOverlay()` and call the close function on click.

3. **Sidebar** handles mobile close separately via `useSidebar().setOpenMobile(false)` in `sidebar-menu-button.tsx` and `sidebar-menu-sub-button.tsx`.

4. **Dropdown/Context/Menubar menus** auto-close their own menu via Base UI's built-in behavior. The `useCloseOverlay()` hook additionally closes any parent overlay (e.g., a Sheet containing a DropdownMenu).

### When adding new components with navigation links

- If the component is an **overlay container**: add it to the `'overlay'` behavior in `app/loader.tsx` `BEHAVIORS` map.
- If the component is an **item with `href`**: add it to `'linkable'` (without close) or `'linkable-close'` (with close) in the `BEHAVIORS` map.
- If the component is a **trigger with single-child render prop**: add it to `'trigger'` in the `BEHAVIORS` map.
- Only create an override file in `registry/default/app/` if the component needs logic that can't be expressed as a standard behavior HOC.

## When working on registry components

- Execute `npx generate-web-types --components registry/default/app/ --prefix ui-` to generate a web-types-json for all components with all props


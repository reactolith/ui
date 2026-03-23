# CLAUDE.md

## Project Structure

Reactolith UI — a component library built with Vite + React 19 + Base UI + Tailwind CSS v4. Published as an npm package.

### `components/ui/` — Base components (do NOT modify)

Shadcn base component copies. Treat as read-only third-party code.

### `components/ai-elements/` — AI components (do NOT modify)

AI-specific components (code blocks, messages, canvases, etc.). Also read-only.

### `app/loader.tsx` — Custom loadable loader

The loader resolves `<ui-*>` tags to the correct component exports without individual wrapper files. It handles:

1. **Module resolution**: `ui-field-label` → `components/ui/field.tsx` → `FieldLabel` export (case-insensitive lookup, progressively removes trailing kebab segments to find the module file)
2. **AI components**: `ui-ai-message-content` → `components/ai-elements/message.tsx` → `MessageContent`
3. **Recharts**: `ui-area-chart` → `recharts` → `AreaChart`
4. **Standard behavior HOCs**: `STANDARD_BEHAVIORS` map — applies `renderLinkable`, `renderTrigger`, `CloseOverlayProvider`, or `useCloseOverlay` wrappers
5. **Component-specific wrappers**: `COMPONENT_WRAPPERS` map — inline HOCs for select (provider/consumer), combobox (provider/list-renderer), command-item (href→`<a>`), sidebar buttons (useSidebar + close), drawer triggers (smart Button wrapping)
6. **Prop transforms**: `PROP_TRANSFORMS` map — simple prop rewriting for progress (value coercion), spinner (size mapping), chart-container (className), chart-tooltip (children→content)
7. **Override files**: `app/overrides/*.tsx` take priority for standalone implementations

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

3. **Sidebar** handles mobile close separately via `useSidebar().setOpenMobile(false)` in the `withSidebarLinkable`/`withSidebarSubLinkable` wrappers in `app/loader.tsx`.

4. **Dropdown/Context/Menubar menus** auto-close their own menu via Base UI's built-in behavior. The `useCloseOverlay()` hook additionally closes any parent overlay (e.g., a Sheet containing a DropdownMenu).

### When adding new components with navigation links

- If the component is an **overlay container**: add it to `'overlay'` in `STANDARD_BEHAVIORS`.
- If the component is an **item with `href`**: add it to `'linkable'` or `'linkable-close'` in `STANDARD_BEHAVIORS`.
- If the component is a **trigger with single-child render prop**: add it to `'trigger'` in `STANDARD_BEHAVIORS`.
- If it needs **unique logic**: add a wrapper function in `COMPONENT_WRAPPERS` (receives both the component and the loaded module for sibling export access).
- If it needs **simple prop rewriting**: add an entry to `PROP_TRANSFORMS`.
- Only create an override file in `app/overrides/` if the component is a completely standalone implementation.

## Web Types

To regenerate `web-types.json` (all components with all props):
```
npx generate-web-types -c components/ui -p ui- -o web-types.json && \
npx generate-web-types -c components/ai-elements -p ui-ai- -o web-types-ai.json && \
npx generate-web-types -c app/overrides -p ui- -o web-types-ov.json && \
node -e "const f=require('fs'),m=p=>JSON.parse(f.readFileSync(p,'utf8'));const u=m('web-types.json');u.contributions.html.elements.push(...m('web-types-ai.json').contributions.html.elements,...m('web-types-ov.json').contributions.html.elements);f.writeFileSync('web-types.json',JSON.stringify(u,null,2));['web-types-ai.json','web-types-ov.json'].forEach(p=>f.unlinkSync(p))"
```

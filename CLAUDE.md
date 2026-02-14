# CLAUDE.md

## Project Structure

This is a shadcn-based component registry built with Vite + React 19 + Base UI + Tailwind CSS v4.

### `components/ui/` — Do NOT modify

These are shadcn base component copies. In a real project they come from `npx shadcn add` and should never be manually edited. Treat them as read-only third-party code.

### `registry/default/` — All custom logic goes here

The `registry/` directory contains wrapper components that extend and enhance the base `components/ui/` primitives. **All feature implementations, behavioral enhancements, and custom logic MUST go in `registry/`**, never in `components/ui/`.

- `registry/default/app/` — Component wrappers (one subdirectory per component)
- `registry/default/lib/` — Shared utilities used across registry components

## Close-on-Navigation Pattern

Navigation links inside overlays (sidebars, sheets, dropdowns, popovers, drawers, command palettes, etc.) **must close the overlay when clicked**. This is standard UX — users expect menus to dismiss after selecting a link.

### How it works

1. **Overlay containers** (`Sheet`, `Popover`, `Drawer`, `CommandDialog`) provide a `CloseOverlayProvider` context with their `onOpenChange(false)` callback.

2. **Item components with `href`** (`DropdownMenuItem`, `ContextMenuItem`, `MenubarItem`, `CommandItem`, `NavigationMenuLink`) consume the context via `useCloseOverlay()` and call the close function on click.

3. **Sidebar** handles mobile close separately via `useSidebar().setOpenMobile(false)` in `sidebar-menu-button.tsx` and `sidebar-menu-sub-button.tsx`.

4. **Dropdown/Context/Menubar menus** auto-close their own menu via Base UI's built-in behavior. The `useCloseOverlay()` hook additionally closes any parent overlay (e.g., a Sheet containing a DropdownMenu).

### When adding new components with navigation links

- If the component is an **overlay container**: wrap children with `<CloseOverlayProvider onClose={...}>` using the `onOpenChange` prop.
- If the component is an **item with `href`**: call `useCloseOverlay()` and invoke it in the click handler.
- Import from `@/registry/default/lib/close-overlay`.

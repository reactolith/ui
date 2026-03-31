# CLAUDE.md

## Reactolith Runtime

This library is built on top of **[reactolith](https://github.com/reactolith/reactolith)** — a framework that lets you write React components directly in HTML. The backend (Symfony/Twig, Rails, etc.) returns HTML, and reactolith hydrates `<ui-*>` tags into live React components.

### Prop Passing (IMPORTANT)

Reactolith automatically parses HTML attributes into typed React props. **You do NOT need to manually parse props** — they arrive as the correct JS type:

| HTML attribute | React prop | Type |
|---|---|---|
| `name="test"` | `name: "test"` | string |
| `enabled` (no value) | `enabled: true` | boolean |
| `data-foo="bar"` | `foo: "bar"` | string |
| `json-config='{"a":1}'` | `config: { a: 1 }` | object |
| `json-items='["a","b"]'` | `items: ["a", "b"]` | string[] |
| `json-count="42"` | `count: 42` | number |
| `json-active="false"` | `active: false` | boolean |
| `as="{my-component}"` | `as: <MyComponent />` | ReactElement |

**Key rules:**
- **`json-*` prefix** = parsed JSON. The prefix is stripped and the value is `JSON.parse()`d. Use this for arrays, objects, numbers, and boolean `false`.
- **Boolean attributes** (no value) = `true`. E.g. `<ui-editor read-only>` → `readOnly: true`.
- **String attributes** = always strings. `enabled="false"` is the string `"false"`, NOT boolean. Use `json-enabled="false"` for boolean false.
- **Never write manual parsing** (`JSON.parse`, string-to-boolean conversion, etc.) in components. Reactolith handles it.

### Slots

Children with a `slot` attribute become named props:

```html
<my-component>
  <template slot="header"><h1>Title</h1></template>
  <div slot="footer">Footer</div>
</my-component>
```
→ `{ header: <h1>Title</h1>, footer: <div>Footer</div> }`

### Navigation & State

- Links are intercepted — fetches next HTML via AJAX, React reconciles only differences
- Component state is preserved across navigations
- Forms work with `method="get"` and `method="post"`
- `data-scroll="preserve"` on links/forms keeps scroll position

### Real-time (Mercure SSE)

- `data-mercure-hub-url` on root element enables Server-Sent Events
- Backend pushes HTML updates, UI updates automatically via React reconciliation
- `useMercureTopic(topic, initialValue)` hook for live JSON data (notification counts, statuses, etc.)
- Empty Mercure messages trigger automatic page refetch

## Project Structure

Reactolith UI — a component library built with Vite + React 19 + Base UI + Tailwind CSS v4. Published as an npm package.

### `components/ui/` — Base components (do NOT modify, do NOT add new files)

Shadcn base component copies. Treat as read-only third-party code. **NEVER create new component files here.** In real projects, developers place their own shadcn components in this folder — it is not the place for custom library components.

### `components/ai-elements/` — AI components (do NOT modify, do NOT add new files)

AI-specific components (code blocks, messages, canvases, etc.). Also read-only. Same rule: **never add new files here.**

### `lib/components/` — Custom library components (add new components HERE)

Custom components shipped with reactolith-ui (form, date-picker, sonner, theme-switch, editor, icon, etc.). **All new components must be created in this directory** and registered in `lib/loader/builtin-loader.ts` with a dynamic import. Each file exports a default component plus any named sub-component exports. Sub-components are registered in the builtin-loader using `.then(m => ({ default: m.SubComponent }))`.

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

#### How resolution works (priority order)

1. `ui-date-picker` → `BuiltinLoader` matches `"date-picker"` in registry → `import("../components/date-picker")` → `DatePicker` default export
2. `ui-field-label` → `ComponentLoader.findModule('field-label')` → `components/ui/field.tsx` → `findExport(mod, 'field-label')` → `FieldLabel` (case-insensitive, progressively removes trailing kebab segments)
3. `ui-ai-message-content` → `AiElementsLoader` strips `ai-` → resolves `message-content` in `components/ai-elements/`
4. `ui-area-chart` → `ExternalLoader` → `import('recharts')` → `AreaChart`

### `app/overrides/` — Override files (2 files)

Only for components that are standalone implementations (not wrappers around base components): **sonner** (declarative toast firing via `toasts` prop) and **theme-switch** (light/dark/system toggle).

### `lib/` — Shared utilities and contexts

- `utils.ts` — cn() class merge utility
- `close-overlay.tsx` — CloseOverlayProvider/useCloseOverlay context
- `render-element.tsx` — renderLinkable, renderTrigger, getSingleElement
- `select-items.tsx` — SelectItemsProvider/useSelectItemsRegister context
- `form-context.tsx` — Form error/interaction/item contexts

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

### When adding new custom components

1. **Create the component** in `lib/components/` with a `default` export and any named sub-component exports.
2. **Register** in `lib/loader/builtin-loader.ts` — add entries to `BUILTIN_COMPONENTS` with dynamic imports. For sub-components, use `.then(m => ({ default: m.SubComponent }))`.
3. **Add documentation** in `scripts/generate-docs.mjs` and run `node scripts/generate-docs.mjs`.
4. **NEVER** create files in `components/ui/` or `components/ai-elements/` — those are read-only base component directories.

## Documentation & Web Types

**IMPORTANT: Never edit documentation HTML files directly.** All docs are generated from scripts and manual edits will be overwritten.

### Docs generation

To regenerate all documentation pages (HTML files in `app/docs/`):
```
node scripts/generate-docs.mjs
```

The script (`scripts/generate-docs.mjs`) contains hardcoded component data (name, description, category, props, examples). When adding or modifying components, update the component data in the script and re-run it.

### Web Types generation

To regenerate `web-types.json` (all components with all props, including loader-injected attributes):
```
npm run generate-web-types
```

The script (`scripts/generate-web-types.ts`) scans all loader configs, extracts props via ts-morph, and enriches with additional attributes from behavior/wrapper metadata (e.g. `href` on linkable components, `items` on combobox).

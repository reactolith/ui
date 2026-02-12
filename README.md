# Reactolith UI

A [shadcn/ui](https://ui.shadcn.com)-compatible component registry for [Reactolith](https://github.com/reactolith/reactolith).

## What is Reactolith?

[Reactolith](https://github.com/reactolith/reactolith) is a library that lets you build React-powered interfaces using server-rendered HTML. Your backend (Symfony/Twig, Rails, Laravel, etc.) delivers HTML with custom tags like `<ui-button>`, and Reactolith automatically hydrates them into React components. It also includes an SPA router (AJAX navigation with DOM diffing, React state preserved) and Mercure integration for real-time updates via Server-Sent Events.

## What is this Registry?

This registry provides wrapper components that adapt [shadcn/ui](https://ui.shadcn.com) components for use with Reactolith. Each wrapper:

- Has a **default export** (required by Reactolith for dynamic loading)
- Lives in a consistent `name/name.tsx` directory structure (enables dynamic imports)
- Some components are extended (e.g., Button with `href` prop for link-buttons)
- Component families (Card, Dialog, etc.) have subcomponents as separate files

Components are installed locally into your project — you own the code and can customize freely.

## Installation

### 1. Add the registry to your `components.json`

```json
{
  "registries": {
    "@reactolith": "https://reactolith.github.io/ui/r/{name}.json"
  }
}
```

### 2. Install components

Install individual components:

```bash
npx shadcn add @reactolith/button
npx shadcn add @reactolith/card
npx shadcn add @reactolith/dialog
```

Component families (card, dialog, sheet, tabs, etc.) automatically install all their subcomponents.

## Loadable Setup

Set up the Reactolith loader in your application entry point. This connects custom HTML tags to the installed components:

```typescript
import { App } from "reactolith"
import loadable from "@loadable/component"

const component = loadable(
  async ({ is }: { is: string }) => {
    const name = is.substring(3) // removes "ui-" prefix
    return import(`@/components/reactolith/${name}/${name}.tsx`)
  },
  {
    cacheKey: ({ is }) => is,
    resolveComponent: (mod) => mod.default || mod[Object.keys(mod)[0]],
  }
)

new App(component)
```

This works because every component follows the `name/name.tsx` convention — the dynamic import resolves directly.

## Usage in HTML

Once set up, use components as HTML tags with the `ui-` prefix. Props are passed as HTML attributes:

```html
<!-- Button -->
<ui-button variant="secondary">Click me</ui-button>
<ui-button href="/about">Go to About</ui-button>

<!-- Card -->
<ui-card>
  <ui-card-header>
    <ui-card-title>Title</ui-card-title>
    <ui-card-description>Description</ui-card-description>
  </ui-card-header>
  <ui-card-content>
    <p>Content goes here.</p>
  </ui-card-content>
  <ui-card-footer>
    <ui-button>Action</ui-button>
  </ui-card-footer>
</ui-card>

<!-- Form elements -->
<ui-input placeholder="Enter text" />
<ui-textarea placeholder="Message..." />
<ui-checkbox id="agree" />
<ui-switch id="notifications" />

<!-- Dialog -->
<ui-dialog>
  <ui-dialog-trigger>
    <ui-button>Open</ui-button>
  </ui-dialog-trigger>
  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Title</ui-dialog-title>
    </ui-dialog-header>
    <p>Dialog content</p>
  </ui-dialog-content>
</ui-dialog>
```

## Components

| Component | HTML Tag | Description |
|-----------|----------|-------------|
| Button | `<ui-button>` | Button with variants, sizes, and `href` prop for links |
| Input | `<ui-input>` | Text input field |
| Textarea | `<ui-textarea>` | Multi-line text input |
| Label | `<ui-label>` | Form label |
| Checkbox | `<ui-checkbox>` | Checkbox input |
| Switch | `<ui-switch>` | Toggle switch |
| Select | `<ui-select>` | Dropdown select with trigger, content, item, value |
| Radio Group | `<ui-radio-group>` | Radio button group with items |
| Card | `<ui-card>` | Card with header, title, description, content, footer |
| Dialog | `<ui-dialog>` | Modal dialog with trigger, content, header, title, description, footer |
| Sheet | `<ui-sheet>` | Side sheet (drawer) with trigger, content, header, title, description, footer |
| Dropdown Menu | `<ui-dropdown-menu>` | Dropdown menu with trigger, content, item, separator, label |
| Tabs | `<ui-tabs>` | Tabbed interface with list, trigger, content |
| Table | `<ui-table>` | Data table with header, body, row, head, cell |
| Alert | `<ui-alert>` | Alert message with title and description |
| Badge | `<ui-badge>` | Status badge with variants |
| Separator | `<ui-separator>` | Visual separator line |
| Skeleton | `<ui-skeleton>` | Loading skeleton placeholder |
| Spinner | `<ui-spinner>` | Loading spinner animation |
| Avatar | `<ui-avatar>` | User avatar with image and fallback |
| Tooltip | `<ui-tooltip>` | Tooltip with trigger and content |
| Popover | `<ui-popover>` | Popover with trigger and content |
| Accordion | `<ui-accordion>` | Accordion with item, trigger, content |
| Progress | `<ui-progress>` | Progress bar |
| Slider | `<ui-slider>` | Range slider |
| Scroll Area | `<ui-scroll-area>` | Custom scrollable area |
| Toggle | `<ui-toggle>` | Toggle button |
| Toggle Group | `<ui-toggle-group>` | Group of toggle buttons with items |

## Customizing

Since components are installed locally in your project under `components/reactolith/`, you can edit them directly. The wrappers are intentionally thin — most just re-export shadcn components with a default export.

To customize a component, simply edit the file after installation:

```bash
# Install the component
npx shadcn add @reactolith/button

# Edit it in your project
# components/reactolith/button/button.tsx
```

You can also modify the underlying shadcn components in `components/ui/` as usual.

## Symfony Integration

For Symfony/Twig projects, check out the [Reactolith Symfony Bundle](https://github.com/reactolith/symfony-bundle) for seamless integration with Twig templates.

## License

MIT

# Reactolith UI

A component library built with React 19 + Base UI + Tailwind CSS v4. Uses a custom loader to resolve `<ui-*>` tags to the correct component exports — no individual wrapper files needed.

## Installation

```bash
npm install @reactolith/ui reactolith @loadable/component
```

## Setup

### 1. Vite configuration

Reactolith UI is distributed as source TypeScript. Add the `@/` alias and include the package in Tailwind's source scanning:

```ts
// vite.config.ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "node_modules/@reactolith/ui/"),
    },
  },
})
```

### 2. CSS

Import Tailwind and the component styles in your main CSS file:

```css
@import "tailwindcss";
@import "tw-animate-css";
@source "../node_modules/@reactolith/ui/components";
@source "../node_modules/@reactolith/ui/lib";
```

### 3. Entry point

Import the package to register all `<ui-*>` custom elements:

```ts
import "@reactolith/ui"
```

That's it. You can now use any component as an HTML tag:

```html
<ui-button variant="outline">Click me</ui-button>

<ui-card>
  <ui-card-header>
    <ui-card-title>Title</ui-card-title>
  </ui-card-header>
  <ui-card-content>Content here</ui-card-content>
</ui-card>
```

## How it works

The loader in `app/loader.tsx` dynamically resolves tag names to component exports:

- `ui-field-label` → `components/ui/field.tsx` → `FieldLabel` export
- `ui-ai-message-content` → `components/ai-elements/message.tsx` → `MessageContent`
- `ui-area-chart` → `recharts` → `AreaChart`

It also applies behavior wrappers (close-on-navigate for overlays, render props for triggers, prop transforms) without needing individual wrapper files per component.

## Advanced: Custom loader

If you need to customize the loader or add your own component modules:

```ts
import loadable from "@loadable/component"
import { App } from "reactolith"
import { createComponentLoader } from "@reactolith/ui/loader"
import type { ComponentType } from "react"

const modules = import.meta.glob([
  "@/components/ui/*.tsx",
  "@/components/ai-elements/*.tsx",
  // add your own component globs here
])

new App(
  loadable(
    createComponentLoader(modules),
    { cacheKey: ({ is }: { is: string }) => is },
  ) as unknown as ComponentType<Record<string, unknown>>,
)
```

## Components

### UI Components (`<ui-*>`)

54 component groups based on shadcn/ui: accordion, alert, button, card, dialog, dropdown-menu, sidebar, table, tabs, and more.

### AI Components (`<ui-ai-*>`)

Specialized components for AI interfaces: message, code-block, canvas, prompt-input, reasoning, tool, and more.

## License

MIT

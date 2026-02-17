#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";

// ============================================================================
// COMPONENT DATA
// ============================================================================

const components = [
  {
    name: "Accordion",
    slug: "accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/accordion",
    subComponents: [
      { tag: "ui-accordion", props: [{ name: "type", type: '"single" | "multiple"', default: '"single"', description: "Whether one or multiple items can be opened at the same time." }, { name: "defaultValue", type: "string | string[]", default: "—", description: "The default open item(s)." }, { name: "collapsible", type: "boolean", default: "false", description: "Whether an open item can be collapsed." }] },
      { tag: "ui-accordion-item", props: [{ name: "value", type: "string", default: "—", description: "A unique value for the item." }] },
      { tag: "ui-accordion-trigger", props: [] },
      { tag: "ui-accordion-content", props: [] },
    ],
    example: `<ui-accordion type="single" collapsible>
  <ui-accordion-item value="item-1">
    <ui-accordion-trigger>Is it accessible?</ui-accordion-trigger>
    <ui-accordion-content>Yes. It adheres to the WAI-ARIA design pattern.</ui-accordion-content>
  </ui-accordion-item>
  <ui-accordion-item value="item-2">
    <ui-accordion-trigger>Is it styled?</ui-accordion-trigger>
    <ui-accordion-content>Yes. It comes with default styles using shadcn/ui theming.</ui-accordion-content>
  </ui-accordion-item>
  <ui-accordion-item value="item-3">
    <ui-accordion-trigger>Is it animated?</ui-accordion-trigger>
    <ui-accordion-content>Yes. It uses CSS animations for smooth transitions.</ui-accordion-content>
  </ui-accordion-item>
</ui-accordion>`,
  },
  {
    name: "Alert",
    slug: "alert",
    description: "Displays a callout for important information, warnings, or error messages.",
    category: "Feedback",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/alert",
    subComponents: [
      { tag: "ui-alert", props: [{ name: "variant", type: '"default" | "destructive"', default: '"default"', description: "The visual style variant." }] },
      { tag: "ui-alert-title", props: [] },
      { tag: "ui-alert-description", props: [] },
      { tag: "ui-alert-action", props: [] },
    ],
    example: `<div class="space-y-3">
  <ui-alert>
    <ui-alert-title>Heads up!</ui-alert-title>
    <ui-alert-description>You can add components to your app using the CLI.</ui-alert-description>
  </ui-alert>
  <ui-alert variant="destructive">
    <ui-alert-title>Error</ui-alert-title>
    <ui-alert-description>Your session has expired. Please log in again.</ui-alert-description>
  </ui-alert>
</div>`,
  },
  {
    name: "Alert Dialog",
    slug: "alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/alert-dialog",
    subComponents: [
      { tag: "ui-alert-dialog", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "defaultOpen", type: "boolean", default: "false", description: "Default open state." }] },
      { tag: "ui-alert-dialog-trigger", props: [] },
      { tag: "ui-alert-dialog-portal", props: [] },
      { tag: "ui-alert-dialog-overlay", props: [] },
      { tag: "ui-alert-dialog-content", props: [{ name: "size", type: '"default" | "sm"', default: '"default"', description: "The size of the dialog." }] },
      { tag: "ui-alert-dialog-header", props: [] },
      { tag: "ui-alert-dialog-media", props: [] },
      { tag: "ui-alert-dialog-title", props: [] },
      { tag: "ui-alert-dialog-description", props: [] },
      { tag: "ui-alert-dialog-footer", props: [] },
      { tag: "ui-alert-dialog-action", props: [] },
      { tag: "ui-alert-dialog-cancel", props: [] },
    ],
    example: `<ui-alert-dialog>
  <ui-alert-dialog-trigger>
    <ui-button variant="outline">Delete Account</ui-button>
  </ui-alert-dialog-trigger>
  <ui-alert-dialog-content>
    <ui-alert-dialog-header>
      <ui-alert-dialog-title>Are you absolutely sure?</ui-alert-dialog-title>
      <ui-alert-dialog-description>
        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
      </ui-alert-dialog-description>
    </ui-alert-dialog-header>
    <ui-alert-dialog-footer>
      <ui-alert-dialog-cancel><ui-button variant="outline">Cancel</ui-button></ui-alert-dialog-cancel>
      <ui-alert-dialog-action><ui-button variant="destructive">Delete</ui-button></ui-alert-dialog-action>
    </ui-alert-dialog-footer>
  </ui-alert-dialog-content>
</ui-alert-dialog>`,
  },
  {
    name: "Aspect Ratio",
    slug: "aspect-ratio",
    description: "Displays content within a desired ratio.",
    category: "Layout",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/aspect-ratio",
    subComponents: [
      { tag: "ui-aspect-ratio", props: [{ name: "ratio", type: "number", default: "1", description: "The desired aspect ratio (e.g. 16/9)." }] },
    ],
    example: `<div class="w-[450px]">
  <ui-aspect-ratio ratio="16/9">
    <div class="bg-muted flex items-center justify-center rounded-md h-full w-full">
      <span class="text-muted-foreground text-sm">16:9 Aspect Ratio</span>
    </div>
  </ui-aspect-ratio>
</div>`,
  },
  {
    name: "Avatar",
    slug: "avatar",
    description: "An image element with a fallback for representing the user.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/avatar",
    subComponents: [
      { tag: "ui-avatar", props: [{ name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "The size of the avatar." }] },
      { tag: "ui-avatar-image", props: [{ name: "src", type: "string", default: "—", description: "The image source URL." }, { name: "alt", type: "string", default: "—", description: "Alt text for the image." }] },
      { tag: "ui-avatar-fallback", props: [] },
      { tag: "ui-avatar-badge", props: [] },
      { tag: "ui-avatar-group", props: [] },
      { tag: "ui-avatar-group-count", props: [] },
    ],
    example: `<div class="flex items-center gap-4">
  <ui-avatar>
    <ui-avatar-fallback>CN</ui-avatar-fallback>
  </ui-avatar>
  <ui-avatar>
    <ui-avatar-fallback>AB</ui-avatar-fallback>
  </ui-avatar>
</div>`,
  },
  {
    name: "Badge",
    slug: "badge",
    description: "Displays a badge or a component that looks like a badge.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/badge",
    subComponents: [
      { tag: "ui-badge", props: [{ name: "variant", type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"', default: '"default"', description: "The visual style variant." }] },
    ],
    example: `<div class="flex flex-wrap items-center gap-2">
  <ui-badge>Default</ui-badge>
  <ui-badge variant="secondary">Secondary</ui-badge>
  <ui-badge variant="outline">Outline</ui-badge>
  <ui-badge variant="destructive">Destructive</ui-badge>
  <ui-badge variant="ghost">Ghost</ui-badge>
</div>`,
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/breadcrumb",
    subComponents: [
      { tag: "ui-breadcrumb", props: [] },
      { tag: "ui-breadcrumb-list", props: [] },
      { tag: "ui-breadcrumb-item", props: [] },
      { tag: "ui-breadcrumb-link", props: [{ name: "href", type: "string", default: "—", description: "The URL to navigate to. Renders as an anchor tag when provided." }], custom: true },
      { tag: "ui-breadcrumb-page", props: [] },
      { tag: "ui-breadcrumb-separator", props: [] },
      { tag: "ui-breadcrumb-ellipsis", props: [] },
    ],
    example: `<ui-breadcrumb>
  <ui-breadcrumb-list>
    <ui-breadcrumb-item>
      <ui-breadcrumb-link href="/">Home</ui-breadcrumb-link>
    </ui-breadcrumb-item>
    <ui-breadcrumb-separator></ui-breadcrumb-separator>
    <ui-breadcrumb-item>
      <ui-breadcrumb-link href="/docs">Docs</ui-breadcrumb-link>
    </ui-breadcrumb-item>
    <ui-breadcrumb-separator></ui-breadcrumb-separator>
    <ui-breadcrumb-item>
      <ui-breadcrumb-page>Current Page</ui-breadcrumb-page>
    </ui-breadcrumb-item>
  </ui-breadcrumb-list>
</ui-breadcrumb>`,
  },
  {
    name: "Button",
    slug: "button",
    description: "Displays a button or a component that looks like a button.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/button",
    subComponents: [
      { tag: "ui-button", props: [
        { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"', default: '"default"', description: "The visual style variant." },
        { name: "size", type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"', default: '"default"', description: "The size of the button." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the button is disabled." },
        { name: "href", type: "string", default: "—", description: "When provided, renders the button as an anchor tag. (Custom prop)" },
      ], custom: true },
    ],
    example: `<div class="space-y-6">
  <div>
    <p class="text-sm font-medium text-muted-foreground mb-3">Variants</p>
    <div class="flex flex-wrap items-center gap-3">
      <ui-button variant="default">Default</ui-button>
      <ui-button variant="secondary">Secondary</ui-button>
      <ui-button variant="outline">Outline</ui-button>
      <ui-button variant="ghost">Ghost</ui-button>
      <ui-button variant="destructive">Destructive</ui-button>
      <ui-button variant="link">Link</ui-button>
    </div>
  </div>
  <div>
    <p class="text-sm font-medium text-muted-foreground mb-3">Sizes</p>
    <div class="flex flex-wrap items-center gap-3">
      <ui-button size="xs">Extra Small</ui-button>
      <ui-button size="sm">Small</ui-button>
      <ui-button size="default">Default</ui-button>
      <ui-button size="lg">Large</ui-button>
    </div>
  </div>
  <div>
    <p class="text-sm font-medium text-muted-foreground mb-3">States</p>
    <div class="flex flex-wrap items-center gap-3">
      <ui-button>Enabled</ui-button>
      <ui-button disabled>Disabled</ui-button>
      <ui-button href="https://github.com/reactolith/ui">As Link</ui-button>
    </div>
  </div>
</div>`,
  },
  {
    name: "Button Group",
    slug: "button-group",
    description: "Groups multiple buttons together with shared styling.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/button-group",
    subComponents: [
      { tag: "ui-button-group", props: [{ name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The orientation of the group." }] },
      { tag: "ui-button-group-separator", props: [] },
      { tag: "ui-button-group-text", props: [] },
    ],
    example: `<ui-button-group>
  <ui-button variant="outline">Left</ui-button>
  <ui-button variant="outline">Center</ui-button>
  <ui-button variant="outline">Right</ui-button>
</ui-button-group>`,
  },
  {
    name: "Calendar",
    slug: "calendar",
    description: "A date field component that allows users to enter and edit date.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/calendar",
    subComponents: [
      { tag: "ui-calendar", props: [{ name: "mode", type: '"single" | "multiple" | "range"', default: '"single"', description: "The selection mode." }, { name: "selected", type: "Date | Date[] | DateRange", default: "—", description: "The selected date(s)." }] },
      { tag: "ui-calendar-day-button", props: [] },
    ],
    example: `<ui-calendar mode="single"></ui-calendar>`,
  },
  {
    name: "Card",
    slug: "card",
    description: "Displays a card with header, content, and footer.",
    category: "Layout",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/card",
    subComponents: [
      { tag: "ui-card", props: [{ name: "size", type: '"default" | "sm"', default: '"default"', description: "The size of the card." }] },
      { tag: "ui-card-header", props: [] },
      { tag: "ui-card-title", props: [] },
      { tag: "ui-card-description", props: [] },
      { tag: "ui-card-action", props: [] },
      { tag: "ui-card-content", props: [] },
      { tag: "ui-card-footer", props: [] },
    ],
    example: `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <ui-card>
    <ui-card-header>
      <ui-card-title>Notifications</ui-card-title>
      <ui-card-description>You have 3 unread messages.</ui-card-description>
    </ui-card-header>
    <ui-card-content>
      <p class="text-sm text-muted-foreground">Your recent activity shows new notifications.</p>
    </ui-card-content>
    <ui-card-footer class="flex justify-end">
      <ui-button size="sm">View All</ui-button>
    </ui-card-footer>
  </ui-card>
  <ui-card size="sm">
    <ui-card-header>
      <ui-card-title>Small Card</ui-card-title>
      <ui-card-description>A compact card variant.</ui-card-description>
    </ui-card-header>
    <ui-card-content>
      <p class="text-sm text-muted-foreground">This card uses size="sm" for tighter spacing.</p>
    </ui-card-content>
  </ui-card>
</div>`,
  },
  {
    name: "Carousel",
    slug: "carousel",
    description: "A carousel with motion and swipe built using Embla.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/carousel",
    subComponents: [
      { tag: "ui-carousel", props: [{ name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The orientation of the carousel." }, { name: "opts", type: "EmblaOptionsType", default: "—", description: "Embla carousel options." }] },
      { tag: "ui-carousel-content", props: [] },
      { tag: "ui-carousel-item", props: [] },
      { tag: "ui-carousel-previous", props: [] },
      { tag: "ui-carousel-next", props: [] },
    ],
    example: `<ui-carousel class="w-full max-w-xs mx-auto">
  <ui-carousel-content>
    <ui-carousel-item>
      <ui-card><ui-card-content class="flex items-center justify-center p-6"><span class="text-4xl font-semibold">1</span></ui-card-content></ui-card>
    </ui-carousel-item>
    <ui-carousel-item>
      <ui-card><ui-card-content class="flex items-center justify-center p-6"><span class="text-4xl font-semibold">2</span></ui-card-content></ui-card>
    </ui-carousel-item>
    <ui-carousel-item>
      <ui-card><ui-card-content class="flex items-center justify-center p-6"><span class="text-4xl font-semibold">3</span></ui-card-content></ui-card>
    </ui-carousel-item>
  </ui-carousel-content>
  <ui-carousel-previous></ui-carousel-previous>
  <ui-carousel-next></ui-carousel-next>
</ui-carousel>`,
  },
  {
    name: "Chart",
    slug: "chart",
    description: "Beautiful and responsive charts built with Recharts.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/chart",
    subComponents: [
      { tag: "ui-chart-container", props: [{ name: "config", type: "ChartConfig", default: "—", description: "Chart configuration object. Use json-config for HTML." }] },
      { tag: "ui-chart-tooltip", props: [] },
      { tag: "ui-chart-tooltip-content", props: [{ name: "hideLabel", type: "boolean", default: "false", description: "Hide the label in the tooltip." }, { name: "hideIndicator", type: "boolean", default: "false", description: "Hide the indicator in the tooltip." }] },
      { tag: "ui-chart-legend", props: [] },
      { tag: "ui-chart-legend-content", props: [] },
      { tag: "ui-bar-chart", props: [{ name: "data", type: "object[]", default: "—", description: "Chart data array. Use json-data for HTML." }] },
      { tag: "ui-line-chart", props: [{ name: "data", type: "object[]", default: "—", description: "Chart data array. Use json-data for HTML." }] },
      { tag: "ui-area-chart", props: [{ name: "data", type: "object[]", default: "—", description: "Chart data array. Use json-data for HTML." }] },
      { tag: "ui-pie-chart", props: [] },
      { tag: "ui-radar-chart", props: [] },
      { tag: "ui-radial-bar-chart", props: [] },
      { tag: "ui-bar", props: [{ name: "dataKey", type: "string", default: "—", description: "The key of data for the bar." }, { name: "fill", type: "string", default: "—", description: "Fill color." }, { name: "radius", type: "number", default: "—", description: "Border radius." }] },
      { tag: "ui-line", props: [{ name: "dataKey", type: "string", default: "—", description: "The key of data for the line." }, { name: "stroke", type: "string", default: "—", description: "Stroke color." }] },
      { tag: "ui-area", props: [{ name: "dataKey", type: "string", default: "—", description: "The key of data for the area." }, { name: "fill", type: "string", default: "—", description: "Fill color." }, { name: "stroke", type: "string", default: "—", description: "Stroke color." }] },
      { tag: "ui-pie", props: [{ name: "dataKey", type: "string", default: "—", description: "The key of data for the pie." }, { name: "data", type: "object[]", default: "—", description: "Pie data array. Use json-data for HTML." }] },
      { tag: "ui-radar", props: [{ name: "dataKey", type: "string", default: "—", description: "The key of data for the radar." }] },
      { tag: "ui-radial-bar", props: [{ name: "dataKey", type: "string", default: "—", description: "The key of data for the radial bar." }] },
      { tag: "ui-x-axis", props: [{ name: "dataKey", type: "string", default: "—", description: "The key for axis labels." }] },
      { tag: "ui-y-axis", props: [] },
      { tag: "ui-cartesian-grid", props: [{ name: "vertical", type: "boolean", default: "true", description: "Show vertical grid lines." }, { name: "horizontal", type: "boolean", default: "true", description: "Show horizontal grid lines." }] },
      { tag: "ui-polar-grid", props: [] },
      { tag: "ui-polar-angle-axis", props: [{ name: "dataKey", type: "string", default: "—", description: "The key for angle axis labels." }] },
      { tag: "ui-polar-radius-axis", props: [] },
      { tag: "ui-cell", props: [{ name: "fill", type: "string", default: "—", description: "Fill color for the cell." }] },
      { tag: "ui-label-list", props: [{ name: "dataKey", type: "string", default: "—", description: "The key of data for labels." }, { name: "position", type: "string", default: "—", description: "Label position." }] },
    ],
    example: `<ui-chart-container json-config='{"desktop":{"label":"Desktop","color":"hsl(var(--chart-1))"},"mobile":{"label":"Mobile","color":"hsl(var(--chart-2))"}}'>\n  <ui-bar-chart json-data='[{"month":"Jan","desktop":186,"mobile":80},{"month":"Feb","desktop":305,"mobile":200},{"month":"Mar","desktop":237,"mobile":120}]'>\n    <ui-cartesian-grid vertical="false" />\n    <ui-x-axis dataKey="month" tickLine="false" axisLine="false" tickMargin="8" />\n    <ui-chart-tooltip>\n      <ui-chart-tooltip-content slot="content" />\n    </ui-chart-tooltip>\n    <ui-bar dataKey="desktop" fill="var(--color-desktop)" radius="4" />\n    <ui-bar dataKey="mobile" fill="var(--color-mobile)" radius="4" />\n  </ui-bar-chart>\n</ui-chart-container>`,
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/checkbox",
    subComponents: [
      { tag: "ui-checkbox", props: [{ name: "checked", type: "boolean", default: "false", description: "Controlled checked state." }, { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state." }, { name: "disabled", type: "boolean", default: "false", description: "Whether the checkbox is disabled." }, { name: "name", type: "string", default: "—", description: "The name for form submission." }] },
    ],
    example: `<div class="space-y-4">
  <div class="flex items-center gap-3">
    <ui-checkbox id="terms"></ui-checkbox>
    <ui-label for="terms">Accept terms and conditions</ui-label>
  </div>
  <div class="flex items-center gap-3">
    <ui-checkbox id="newsletter" defaultChecked></ui-checkbox>
    <ui-label for="newsletter">Subscribe to newsletter</ui-label>
  </div>
  <div class="flex items-center gap-3">
    <ui-checkbox id="disabled-cb" disabled></ui-checkbox>
    <ui-label for="disabled-cb">Disabled checkbox</ui-label>
  </div>
</div>`,
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    description: "An interactive component which expands/collapses a panel.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/collapsible",
    subComponents: [
      { tag: "ui-collapsible", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "defaultOpen", type: "boolean", default: "false", description: "Default open state." }] },
      { tag: "ui-collapsible-trigger", props: [] },
      { tag: "ui-collapsible-content", props: [] },
    ],
    example: `<ui-collapsible class="w-[350px] space-y-2">
  <div class="flex items-center justify-between">
    <h4 class="text-sm font-semibold">Starred repositories</h4>
    <ui-collapsible-trigger>
      <ui-button variant="ghost" size="sm">Toggle</ui-button>
    </ui-collapsible-trigger>
  </div>
  <div class="rounded-md border px-4 py-2 text-sm">reactolith/ui</div>
  <ui-collapsible-content class="space-y-2">
    <div class="rounded-md border px-4 py-2 text-sm">shadcn-ui/ui</div>
    <div class="rounded-md border px-4 py-2 text-sm">base-ui/react</div>
  </ui-collapsible-content>
</ui-collapsible>`,
  },
  {
    name: "Combobox",
    slug: "combobox",
    description: "Autocomplete input and command palette with a list of suggestions.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/combobox",
    subComponents: [
      { tag: "ui-combobox", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "value", type: "string", default: "—", description: "The selected value." }, { name: "items", type: 'string[] | {value: string, label: string}[]', default: "—", description: "Items for filtering/search. Use json-items in HTML. When provided, ui-combobox-list auto-renders filtered items." }] },
      { tag: "ui-combobox-trigger", props: [] },
      { tag: "ui-combobox-value", props: [{ name: "placeholder", type: "string", default: "—", description: "Placeholder text when no value is selected." }] },
      { tag: "ui-combobox-input", props: [{ name: "placeholder", type: "string", default: "—", description: "Input placeholder text." }] },
      { tag: "ui-combobox-content", props: [] },
      { tag: "ui-combobox-collection", props: [] },
      { tag: "ui-combobox-list", props: [] },
      { tag: "ui-combobox-empty", props: [] },
      { tag: "ui-combobox-group", props: [] },
      { tag: "ui-combobox-label", props: [] },
      { tag: "ui-combobox-item", props: [{ name: "value", type: "string", default: "—", description: "The value of the item." }] },
      { tag: "ui-combobox-separator", props: [] },
      { tag: "ui-combobox-chips", props: [] },
      { tag: "ui-combobox-chips-input", props: [] },
      { tag: "ui-combobox-chip", props: [] },
    ],
    example: `<ui-combobox json-items='[{"value":"react","label":"React"},{"value":"vue","label":"Vue.js"},{"value":"angular","label":"Angular"},{"value":"svelte","label":"Svelte"}]'>
  <ui-combobox-input placeholder="Select framework..." showClear></ui-combobox-input>
  <ui-combobox-content>
    <ui-combobox-empty>No framework found.</ui-combobox-empty>
    <ui-combobox-list></ui-combobox-list>
  </ui-combobox-content>
</ui-combobox>`,
  },
  {
    name: "Command",
    slug: "command",
    description: "Fast, composable, unstyled command menu for React.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/command",
    subComponents: [
      { tag: "ui-command", props: [] },
      { tag: "ui-command-dialog", props: [] },
      { tag: "ui-command-input", props: [{ name: "placeholder", type: "string", default: "—", description: "Input placeholder text." }] },
      { tag: "ui-command-list", props: [] },
      { tag: "ui-command-empty", props: [] },
      { tag: "ui-command-group", props: [{ name: "heading", type: "string", default: "—", description: "Group heading text." }] },
      { tag: "ui-command-item", props: [{ name: "value", type: "string", default: "—", description: "The value of the item." }] },
      { tag: "ui-command-separator", props: [] },
      { tag: "ui-command-shortcut", props: [] },
    ],
    example: `<ui-command class="rounded-lg border shadow-md max-w-md">
  <ui-command-input placeholder="Type a command or search..."></ui-command-input>
  <ui-command-list>
    <ui-command-empty>No results found.</ui-command-empty>
    <ui-command-group heading="Suggestions">
      <ui-command-item>Calendar</ui-command-item>
      <ui-command-item>Search</ui-command-item>
      <ui-command-item>Settings</ui-command-item>
    </ui-command-group>
  </ui-command-list>
</ui-command>`,
  },
  {
    name: "Context Menu",
    slug: "context-menu",
    description: "Displays a menu at the pointer's position on right-click or long-press.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/context-menu",
    subComponents: [
      { tag: "ui-context-menu", props: [] },
      { tag: "ui-context-menu-trigger", props: [] },
      { tag: "ui-context-menu-content", props: [] },
      { tag: "ui-context-menu-item", props: [] },
      { tag: "ui-context-menu-checkbox-item", props: [] },
      { tag: "ui-context-menu-radio-group", props: [] },
      { tag: "ui-context-menu-radio-item", props: [] },
      { tag: "ui-context-menu-label", props: [] },
      { tag: "ui-context-menu-separator", props: [] },
      { tag: "ui-context-menu-shortcut", props: [] },
      { tag: "ui-context-menu-group", props: [] },
      { tag: "ui-context-menu-portal", props: [] },
      { tag: "ui-context-menu-sub", props: [] },
      { tag: "ui-context-menu-sub-trigger", props: [] },
      { tag: "ui-context-menu-sub-content", props: [] },
    ],
    example: `<ui-context-menu>
  <ui-context-menu-trigger>
    <div class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      Right click here
    </div>
  </ui-context-menu-trigger>
  <ui-context-menu-content class="w-64">
    <ui-context-menu-item>Back</ui-context-menu-item>
    <ui-context-menu-item>Forward</ui-context-menu-item>
    <ui-context-menu-item>Reload</ui-context-menu-item>
    <ui-context-menu-separator></ui-context-menu-separator>
    <ui-context-menu-item>View Page Source</ui-context-menu-item>
    <ui-context-menu-item>Inspect</ui-context-menu-item>
  </ui-context-menu-content>
</ui-context-menu>`,
  },
  {
    name: "Dialog",
    slug: "dialog",
    description: "A window overlaid on the primary window, rendering content on top.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/dialog",
    subComponents: [
      { tag: "ui-dialog", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "defaultOpen", type: "boolean", default: "false", description: "Default open state." }] },
      { tag: "ui-dialog-trigger", props: [] },
      { tag: "ui-dialog-portal", props: [] },
      { tag: "ui-dialog-overlay", props: [] },
      { tag: "ui-dialog-content", props: [] },
      { tag: "ui-dialog-header", props: [] },
      { tag: "ui-dialog-title", props: [] },
      { tag: "ui-dialog-description", props: [] },
      { tag: "ui-dialog-footer", props: [] },
      { tag: "ui-dialog-close", props: [] },
    ],
    example: `<ui-dialog>
  <ui-dialog-trigger>
    <ui-button variant="outline">Open Dialog</ui-button>
  </ui-dialog-trigger>
  <ui-dialog-content>
    <ui-dialog-header>
      <ui-dialog-title>Edit Profile</ui-dialog-title>
      <ui-dialog-description>Make changes to your profile here. Click save when you're done.</ui-dialog-description>
    </ui-dialog-header>
    <div class="space-y-4 py-4">
      <div class="space-y-2">
        <ui-label>Name</ui-label>
        <ui-input placeholder="Enter your name"></ui-input>
      </div>
      <div class="space-y-2">
        <ui-label>Email</ui-label>
        <ui-input type="email" placeholder="Enter your email"></ui-input>
      </div>
    </div>
    <ui-dialog-footer>
      <ui-dialog-close><ui-button variant="outline">Cancel</ui-button></ui-dialog-close>
      <ui-button>Save changes</ui-button>
    </ui-dialog-footer>
  </ui-dialog-content>
</ui-dialog>`,
  },
  {
    name: "Drawer",
    slug: "drawer",
    description: "A panel that slides in from the edge of the screen, built on top of Vaul.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/drawer",
    subComponents: [
      { tag: "ui-drawer", props: [{ name: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "The direction the drawer slides from." }] },
      { tag: "ui-drawer-trigger", props: [] },
      { tag: "ui-drawer-portal", props: [] },
      { tag: "ui-drawer-overlay", props: [] },
      { tag: "ui-drawer-content", props: [] },
      { tag: "ui-drawer-header", props: [] },
      { tag: "ui-drawer-title", props: [] },
      { tag: "ui-drawer-description", props: [] },
      { tag: "ui-drawer-footer", props: [] },
      { tag: "ui-drawer-close", props: [] },
    ],
    example: `<ui-drawer>
  <ui-drawer-trigger>
    <ui-button variant="outline">Open Drawer</ui-button>
  </ui-drawer-trigger>
  <ui-drawer-content>
    <ui-drawer-header>
      <ui-drawer-title>Move Goal</ui-drawer-title>
      <ui-drawer-description>Set your daily activity goal.</ui-drawer-description>
    </ui-drawer-header>
    <div class="p-4">
      <p class="text-sm text-muted-foreground">Adjust your settings below.</p>
    </div>
    <ui-drawer-footer>
      <ui-button>Submit</ui-button>
      <ui-drawer-close><ui-button variant="outline">Cancel</ui-button></ui-drawer-close>
    </ui-drawer-footer>
  </ui-drawer-content>
</ui-drawer>`,
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    description: "Displays a menu of actions or options triggered by a button.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/dropdown-menu",
    subComponents: [
      { tag: "ui-dropdown-menu", props: [] },
      { tag: "ui-dropdown-menu-trigger", props: [] },
      { tag: "ui-dropdown-menu-content", props: [{ name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alignment of the content." }] },
      { tag: "ui-dropdown-menu-item", props: [] },
      { tag: "ui-dropdown-menu-checkbox-item", props: [] },
      { tag: "ui-dropdown-menu-radio-group", props: [] },
      { tag: "ui-dropdown-menu-radio-item", props: [] },
      { tag: "ui-dropdown-menu-label", props: [] },
      { tag: "ui-dropdown-menu-separator", props: [] },
      { tag: "ui-dropdown-menu-shortcut", props: [] },
      { tag: "ui-dropdown-menu-group", props: [] },
      { tag: "ui-dropdown-menu-portal", props: [] },
      { tag: "ui-dropdown-menu-sub", props: [] },
      { tag: "ui-dropdown-menu-sub-trigger", props: [] },
      { tag: "ui-dropdown-menu-sub-content", props: [] },
    ],
    example: `<ui-dropdown-menu>
  <ui-dropdown-menu-trigger>
    <ui-button variant="outline">Open Menu</ui-button>
  </ui-dropdown-menu-trigger>
  <ui-dropdown-menu-content class="w-56">
    <ui-dropdown-menu-label>My Account</ui-dropdown-menu-label>
    <ui-dropdown-menu-separator></ui-dropdown-menu-separator>
    <ui-dropdown-menu-group>
      <ui-dropdown-menu-item>Profile</ui-dropdown-menu-item>
      <ui-dropdown-menu-item>Settings</ui-dropdown-menu-item>
      <ui-dropdown-menu-item>Billing</ui-dropdown-menu-item>
    </ui-dropdown-menu-group>
    <ui-dropdown-menu-separator></ui-dropdown-menu-separator>
    <ui-dropdown-menu-item>Log out</ui-dropdown-menu-item>
  </ui-dropdown-menu-content>
</ui-dropdown-menu>`,
  },
  {
    name: "Empty",
    slug: "empty",
    description: "Displays an empty state with optional media, title, and description.",
    category: "Feedback",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/empty",
    subComponents: [
      { tag: "ui-empty", props: [] },
      { tag: "ui-empty-header", props: [] },
      { tag: "ui-empty-media", props: [] },
      { tag: "ui-empty-title", props: [] },
      { tag: "ui-empty-description", props: [] },
      { tag: "ui-empty-content", props: [] },
    ],
    example: `<ui-empty>
  <ui-empty-header>
    <ui-empty-title>No results found</ui-empty-title>
    <ui-empty-description>Try adjusting your search or filter to find what you're looking for.</ui-empty-description>
  </ui-empty-header>
  <ui-empty-content>
    <ui-button variant="outline">Clear Filters</ui-button>
  </ui-empty-content>
</ui-empty>`,
  },
  {
    name: "Field",
    slug: "field",
    description: "A form field wrapper with label, description, and error message.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/field",
    subComponents: [
      { tag: "ui-field", props: [] },
      { tag: "ui-field-label", props: [] },
      { tag: "ui-field-content", props: [] },
      { tag: "ui-field-description", props: [] },
      { tag: "ui-field-error", props: [] },
      { tag: "ui-field-group", props: [] },
      { tag: "ui-field-legend", props: [] },
      { tag: "ui-field-separator", props: [] },
      { tag: "ui-field-set", props: [] },
      { tag: "ui-field-title", props: [] },
    ],
    example: `<ui-field>
  <ui-field-label>Email</ui-field-label>
  <ui-field-content>
    <ui-input type="email" placeholder="you@example.com"></ui-input>
  </ui-field-content>
  <ui-field-description>We'll never share your email.</ui-field-description>
</ui-field>`,
  },
  {
    name: "Hover Card",
    slug: "hover-card",
    description: "For sighted users to preview content available behind a link.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/hover-card",
    subComponents: [
      { tag: "ui-hover-card", props: [] },
      { tag: "ui-hover-card-trigger", props: [] },
      { tag: "ui-hover-card-content", props: [] },
    ],
    example: `<ui-hover-card>
  <ui-hover-card-trigger>
    <ui-button variant="link">@reactolith</ui-button>
  </ui-hover-card-trigger>
  <ui-hover-card-content class="w-80">
    <div class="space-y-1">
      <h4 class="text-sm font-semibold">Reactolith UI</h4>
      <p class="text-sm text-muted-foreground">A component library powered by shadcn/ui and Base UI, exposed as web components.</p>
    </div>
  </ui-hover-card-content>
</ui-hover-card>`,
  },
  {
    name: "Input",
    slug: "input",
    description: "Displays a form input field.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/input",
    subComponents: [
      { tag: "ui-input", props: [{ name: "type", type: "string", default: '"text"', description: "The input type (text, email, password, etc.)." }, { name: "placeholder", type: "string", default: "—", description: "Placeholder text." }, { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." }] },
    ],
    example: `<div class="space-y-4 max-w-sm">
  <ui-input type="text" placeholder="Default input"></ui-input>
  <ui-input type="email" placeholder="Email address"></ui-input>
  <ui-input type="password" placeholder="Password"></ui-input>
  <ui-input disabled placeholder="Disabled input"></ui-input>
</div>`,
  },
  {
    name: "Input Group",
    slug: "input-group",
    description: "Groups input with addons, buttons, or text for combined input fields.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/input-group",
    subComponents: [
      { tag: "ui-input-group", props: [] },
      { tag: "ui-input-group-input", props: [] },
      { tag: "ui-input-group-addon", props: [] },
      { tag: "ui-input-group-button", props: [] },
      { tag: "ui-input-group-text", props: [] },
      { tag: "ui-input-group-textarea", props: [] },
    ],
    example: `<ui-input-group>
  <ui-input-group-text>https://</ui-input-group-text>
  <ui-input-group-input placeholder="example.com"></ui-input-group-input>
</ui-input-group>`,
  },
  {
    name: "Input OTP",
    slug: "input-otp",
    description: "Accessible one-time password component with copy paste functionality.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/input-otp",
    subComponents: [
      { tag: "ui-input-otp", props: [{ name: "maxLength", type: "number", default: "—", description: "Maximum number of characters." }] },
      { tag: "ui-input-otp-group", props: [] },
      { tag: "ui-input-otp-slot", props: [{ name: "index", type: "number", default: "—", description: "The slot index." }] },
      { tag: "ui-input-otp-separator", props: [] },
    ],
    example: `<ui-input-otp maxLength="6">
  <ui-input-otp-group>
    <ui-input-otp-slot index="0"></ui-input-otp-slot>
    <ui-input-otp-slot index="1"></ui-input-otp-slot>
    <ui-input-otp-slot index="2"></ui-input-otp-slot>
  </ui-input-otp-group>
  <ui-input-otp-separator></ui-input-otp-separator>
  <ui-input-otp-group>
    <ui-input-otp-slot index="3"></ui-input-otp-slot>
    <ui-input-otp-slot index="4"></ui-input-otp-slot>
    <ui-input-otp-slot index="5"></ui-input-otp-slot>
  </ui-input-otp-group>
</ui-input-otp>`,
  },
  {
    name: "Item",
    slug: "item",
    description: "A flexible list item component with media, content, and actions.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/item",
    subComponents: [
      { tag: "ui-item", props: [] },
      { tag: "ui-item-header", props: [] },
      { tag: "ui-item-media", props: [] },
      { tag: "ui-item-content", props: [] },
      { tag: "ui-item-title", props: [] },
      { tag: "ui-item-description", props: [] },
      { tag: "ui-item-actions", props: [] },
      { tag: "ui-item-footer", props: [] },
      { tag: "ui-item-group", props: [] },
      { tag: "ui-item-separator", props: [] },
    ],
    example: `<ui-item>
  <ui-item-content>
    <ui-item-title>List Item</ui-item-title>
    <ui-item-description>A description of the list item.</ui-item-description>
  </ui-item-content>
  <ui-item-actions>
    <ui-button variant="ghost" size="sm">Edit</ui-button>
  </ui-item-actions>
</ui-item>`,
  },
  {
    name: "Kbd",
    slug: "kbd",
    description: "Displays keyboard shortcuts and key combinations.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/kbd",
    subComponents: [
      { tag: "ui-kbd", props: [] },
      { tag: "ui-kbd-group", props: [] },
    ],
    example: `<div class="flex flex-wrap items-center gap-4">
  <div class="flex items-center gap-1">
    <ui-kbd>Ctrl</ui-kbd>
    <span class="text-muted-foreground text-sm">+</span>
    <ui-kbd>C</ui-kbd>
    <span class="text-sm text-muted-foreground ml-2">Copy</span>
  </div>
  <div class="flex items-center gap-1">
    <ui-kbd>Ctrl</ui-kbd>
    <span class="text-muted-foreground text-sm">+</span>
    <ui-kbd>V</ui-kbd>
    <span class="text-sm text-muted-foreground ml-2">Paste</span>
  </div>
  <div class="flex items-center gap-1">
    <ui-kbd>Esc</ui-kbd>
    <span class="text-sm text-muted-foreground ml-2">Close</span>
  </div>
</div>`,
  },
  {
    name: "Label",
    slug: "label",
    description: "Renders an accessible label associated with controls.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/label",
    subComponents: [
      { tag: "ui-label", props: [{ name: "for", type: "string", default: "—", description: "The id of the associated form element." }] },
    ],
    example: `<div class="space-y-2">
  <ui-label for="email-input">Email</ui-label>
  <ui-input id="email-input" type="email" placeholder="you@example.com"></ui-input>
</div>`,
  },
  {
    name: "Menubar",
    slug: "menubar",
    description: "A visually persistent menu common in desktop applications.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/menubar",
    subComponents: [
      { tag: "ui-menubar", props: [] },
      { tag: "ui-menubar-menu", props: [] },
      { tag: "ui-menubar-trigger", props: [] },
      { tag: "ui-menubar-content", props: [] },
      { tag: "ui-menubar-item", props: [] },
      { tag: "ui-menubar-checkbox-item", props: [] },
      { tag: "ui-menubar-radio-group", props: [] },
      { tag: "ui-menubar-radio-item", props: [] },
      { tag: "ui-menubar-label", props: [] },
      { tag: "ui-menubar-separator", props: [] },
      { tag: "ui-menubar-shortcut", props: [] },
      { tag: "ui-menubar-group", props: [] },
      { tag: "ui-menubar-portal", props: [] },
      { tag: "ui-menubar-sub", props: [] },
      { tag: "ui-menubar-sub-trigger", props: [] },
      { tag: "ui-menubar-sub-content", props: [] },
    ],
    example: `<ui-menubar>
  <ui-menubar-menu>
    <ui-menubar-trigger>File</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>New Tab <ui-menubar-shortcut>Ctrl+T</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>New Window <ui-menubar-shortcut>Ctrl+N</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-separator></ui-menubar-separator>
      <ui-menubar-item>Print <ui-menubar-shortcut>Ctrl+P</ui-menubar-shortcut></ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
  <ui-menubar-menu>
    <ui-menubar-trigger>Edit</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>Undo <ui-menubar-shortcut>Ctrl+Z</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Redo <ui-menubar-shortcut>Ctrl+Y</ui-menubar-shortcut></ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
</ui-menubar>`,
  },
  {
    name: "Native Select",
    slug: "native-select",
    description: "A native HTML select element with consistent styling.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/native-select",
    subComponents: [
      { tag: "ui-native-select", props: [{ name: "disabled", type: "boolean", default: "false", description: "Whether the select is disabled." }] },
      { tag: "ui-native-select-option", props: [{ name: "value", type: "string", default: "—", description: "The option value." }] },
      { tag: "ui-native-select-opt-group", props: [{ name: "label", type: "string", default: "—", description: "The group label." }] },
    ],
    example: `<div class="max-w-sm space-y-2">
  <ui-label>Framework</ui-label>
  <ui-native-select>
    <ui-native-select-option value="">Select a framework</ui-native-select-option>
    <ui-native-select-option value="react">React</ui-native-select-option>
    <ui-native-select-option value="vue">Vue</ui-native-select-option>
    <ui-native-select-option value="angular">Angular</ui-native-select-option>
    <ui-native-select-option value="svelte">Svelte</ui-native-select-option>
  </ui-native-select>
</div>`,
  },
  {
    name: "Navigation Menu",
    slug: "navigation-menu",
    description: "A collection of links for navigating websites.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/navigation-menu",
    subComponents: [
      { tag: "ui-navigation-menu", props: [] },
      { tag: "ui-navigation-menu-list", props: [] },
      { tag: "ui-navigation-menu-item", props: [] },
      { tag: "ui-navigation-menu-trigger", props: [] },
      { tag: "ui-navigation-menu-content", props: [] },
      { tag: "ui-navigation-menu-link", props: [] },
      { tag: "ui-navigation-menu-indicator", props: [] },
      { tag: "ui-navigation-menu-positioner", props: [] },
    ],
    example: `<ui-navigation-menu>
  <ui-navigation-menu-list>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link>Documentation</ui-navigation-menu-link>
    </ui-navigation-menu-item>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link>Components</ui-navigation-menu-link>
    </ui-navigation-menu-item>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link>Examples</ui-navigation-menu-link>
    </ui-navigation-menu-item>
  </ui-navigation-menu-list>
</ui-navigation-menu>`,
  },
  {
    name: "Pagination",
    slug: "pagination",
    description: "Pagination with page navigation, next and previous links.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/pagination",
    subComponents: [
      { tag: "ui-pagination", props: [] },
      { tag: "ui-pagination-content", props: [] },
      { tag: "ui-pagination-item", props: [] },
      { tag: "ui-pagination-link", props: [{ name: "isActive", type: "boolean", default: "false", description: "Whether this page is active." }] },
      { tag: "ui-pagination-previous", props: [] },
      { tag: "ui-pagination-next", props: [] },
      { tag: "ui-pagination-ellipsis", props: [] },
    ],
    example: `<ui-pagination>
  <ui-pagination-content>
    <ui-pagination-item><ui-pagination-previous></ui-pagination-previous></ui-pagination-item>
    <ui-pagination-item><ui-pagination-link>1</ui-pagination-link></ui-pagination-item>
    <ui-pagination-item><ui-pagination-link isActive>2</ui-pagination-link></ui-pagination-item>
    <ui-pagination-item><ui-pagination-link>3</ui-pagination-link></ui-pagination-item>
    <ui-pagination-item><ui-pagination-ellipsis></ui-pagination-ellipsis></ui-pagination-item>
    <ui-pagination-item><ui-pagination-next></ui-pagination-next></ui-pagination-item>
  </ui-pagination-content>
</ui-pagination>`,
  },
  {
    name: "Popover",
    slug: "popover",
    description: "Displays rich content in a portal, triggered by a button.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/popover",
    subComponents: [
      { tag: "ui-popover", props: [] },
      { tag: "ui-popover-trigger", props: [] },
      { tag: "ui-popover-content", props: [{ name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment of the content." }] },
      { tag: "ui-popover-header", props: [] },
      { tag: "ui-popover-title", props: [] },
      { tag: "ui-popover-description", props: [] },
    ],
    example: `<ui-popover>
  <ui-popover-trigger>
    <ui-button variant="outline">Open Popover</ui-button>
  </ui-popover-trigger>
  <ui-popover-content class="w-80">
    <ui-popover-header>
      <ui-popover-title>Dimensions</ui-popover-title>
      <ui-popover-description>Set the dimensions for the layer.</ui-popover-description>
    </ui-popover-header>
    <div class="grid gap-2">
      <div class="space-y-1">
        <ui-label>Width</ui-label>
        <ui-input placeholder="100%"></ui-input>
      </div>
      <div class="space-y-1">
        <ui-label>Height</ui-label>
        <ui-input placeholder="auto"></ui-input>
      </div>
    </div>
  </ui-popover-content>
</ui-popover>`,
  },
  {
    name: "Progress",
    slug: "progress",
    description: "Displays an indicator showing the completion progress of a task.",
    category: "Feedback",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/progress",
    subComponents: [
      { tag: "ui-progress", props: [{ name: "value", type: "number", default: "0", description: "The progress value (0-100)." }] },
      { tag: "ui-progress-track", props: [] },
      { tag: "ui-progress-indicator", props: [] },
      { tag: "ui-progress-label", props: [] },
      { tag: "ui-progress-value", props: [] },
    ],
    example: `<div class="space-y-4 max-w-md">
  <ui-progress value="25"></ui-progress>
  <ui-progress value="60"></ui-progress>
  <ui-progress value="90"></ui-progress>
</div>`,
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    description: "A set of checkable buttons where only one can be checked at a time.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/radio-group",
    subComponents: [
      { tag: "ui-radio-group", props: [{ name: "defaultValue", type: "string", default: "—", description: "The default selected value." }, { name: "value", type: "string", default: "—", description: "Controlled selected value." }] },
      { tag: "ui-radio-group-item", props: [{ name: "value", type: "string", default: "—", description: "The value of this radio item." }] },
    ],
    example: `<ui-radio-group defaultValue="option-1">
  <div class="flex items-center space-x-2">
    <ui-radio-group-item value="option-1" id="option-1"></ui-radio-group-item>
    <ui-label for="option-1">Option 1</ui-label>
  </div>
  <div class="flex items-center space-x-2">
    <ui-radio-group-item value="option-2" id="option-2"></ui-radio-group-item>
    <ui-label for="option-2">Option 2</ui-label>
  </div>
  <div class="flex items-center space-x-2">
    <ui-radio-group-item value="option-3" id="option-3"></ui-radio-group-item>
    <ui-label for="option-3">Option 3</ui-label>
  </div>
</ui-radio-group>`,
  },
  {
    name: "Resizable",
    slug: "resizable",
    description: "Accessible resizable panel groups and layouts with keyboard support.",
    category: "Layout",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/resizable",
    subComponents: [
      { tag: "ui-resizable-panel-group", props: [{ name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The direction of the panels." }] },
      { tag: "ui-resizable-panel", props: [{ name: "defaultSize", type: "number", default: "—", description: "Default size in percent." }] },
      { tag: "ui-resizable-handle", props: [{ name: "withHandle", type: "boolean", default: "false", description: "Show a visible handle grip." }] },
    ],
    example: `<ui-resizable-panel-group direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
  <ui-resizable-panel defaultSize="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Panel A</span>
    </div>
  </ui-resizable-panel>
  <ui-resizable-handle withHandle></ui-resizable-handle>
  <ui-resizable-panel defaultSize="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Panel B</span>
    </div>
  </ui-resizable-panel>
</ui-resizable-panel-group>`,
  },
  {
    name: "Scroll Area",
    slug: "scroll-area",
    description: "Augments native scroll functionality for custom, cross-browser styling.",
    category: "Layout",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/scroll-area",
    subComponents: [
      { tag: "ui-scroll-area", props: [] },
      { tag: "ui-scroll-bar", props: [{ name: "orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "The scrollbar orientation." }] },
    ],
    example: `<ui-scroll-area class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
    <div class="text-sm">v1.0.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.0.1</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.1.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.2.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.2.1</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.3.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.4.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.4.1</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.5.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.5.1</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v1.5.2</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v2.0.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v2.0.1</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v2.1.0</div>
    <ui-separator class="my-2"></ui-separator>
    <div class="text-sm">v2.1.1</div>
  </div>
</ui-scroll-area>`,
  },
  {
    name: "Select",
    slug: "select",
    description: "Displays a list of options for the user to pick from, triggered by a button.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/select",
    subComponents: [
      { tag: "ui-select", props: [{ name: "value", type: "string", default: "—", description: "Controlled selected value." }, { name: "defaultValue", type: "string", default: "—", description: "Default selected value." }] },
      { tag: "ui-select-trigger", props: [] },
      { tag: "ui-select-value", props: [{ name: "placeholder", type: "string", default: "—", description: "Placeholder text." }] },
      { tag: "ui-select-content", props: [] },
      { tag: "ui-select-group", props: [] },
      { tag: "ui-select-label", props: [] },
      { tag: "ui-select-item", props: [{ name: "value", type: "string", default: "—", description: "The item value." }] },
      { tag: "ui-select-separator", props: [] },
      { tag: "ui-select-scroll-up-button", props: [] },
      { tag: "ui-select-scroll-down-button", props: [] },
    ],
    example: `<ui-select>
  <ui-select-trigger class="w-[180px]">
    <ui-select-value placeholder="Select a fruit"></ui-select-value>
  </ui-select-trigger>
  <ui-select-content>
    <ui-select-group>
      <ui-select-label>Fruits</ui-select-label>
      <ui-select-item value="apple">Apple</ui-select-item>
      <ui-select-item value="banana">Banana</ui-select-item>
      <ui-select-item value="orange">Orange</ui-select-item>
      <ui-select-item value="grape">Grape</ui-select-item>
    </ui-select-group>
  </ui-select-content>
</ui-select>`,
  },
  {
    name: "Separator",
    slug: "separator",
    description: "Visually or semantically separates content.",
    category: "Layout",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/separator",
    subComponents: [
      { tag: "ui-separator", props: [{ name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The orientation." }] },
    ],
    example: `<div>
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">Reactolith UI</h4>
    <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
  </div>
  <ui-separator class="my-4"></ui-separator>
  <div class="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <ui-separator orientation="vertical"></ui-separator>
    <div>Docs</div>
    <ui-separator orientation="vertical"></ui-separator>
    <div>Source</div>
  </div>
</div>`,
  },
  {
    name: "Sheet",
    slug: "sheet",
    description: "Extends the Dialog component to display content that complements the main content.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/sheet",
    subComponents: [
      { tag: "ui-sheet", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }] },
      { tag: "ui-sheet-trigger", props: [] },
      { tag: "ui-sheet-content", props: [{ name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "The side the sheet slides in from." }] },
      { tag: "ui-sheet-header", props: [] },
      { tag: "ui-sheet-title", props: [] },
      { tag: "ui-sheet-description", props: [] },
      { tag: "ui-sheet-footer", props: [] },
      { tag: "ui-sheet-close", props: [] },
    ],
    example: `<ui-sheet>
  <ui-sheet-trigger>
    <ui-button variant="outline">Open Sheet</ui-button>
  </ui-sheet-trigger>
  <ui-sheet-content>
    <ui-sheet-header>
      <ui-sheet-title>Edit Profile</ui-sheet-title>
      <ui-sheet-description>Make changes to your profile. Click save when done.</ui-sheet-description>
    </ui-sheet-header>
    <div class="space-y-4 py-4">
      <div class="space-y-2">
        <ui-label>Name</ui-label>
        <ui-input placeholder="Your name"></ui-input>
      </div>
    </div>
    <ui-sheet-footer>
      <ui-sheet-close><ui-button variant="outline">Cancel</ui-button></ui-sheet-close>
      <ui-button>Save</ui-button>
    </ui-sheet-footer>
  </ui-sheet-content>
</ui-sheet>`,
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    description: "A composable, themeable sidebar component for application navigation.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/sidebar",
    subComponents: [
      { tag: "ui-sidebar-provider", props: [{ name: "defaultOpen", type: "boolean", default: "true", description: "Default open state." }] },
      { tag: "ui-sidebar", props: [{ name: "side", type: '"left" | "right"', default: '"left"', description: "Which side." }, { name: "variant", type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: "Visual variant." }, { name: "collapsible", type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: "Collapse behavior." }] },
      { tag: "ui-sidebar-header", props: [] },
      { tag: "ui-sidebar-content", props: [] },
      { tag: "ui-sidebar-footer", props: [] },
      { tag: "ui-sidebar-group", props: [] },
      { tag: "ui-sidebar-group-label", props: [] },
      { tag: "ui-sidebar-group-action", props: [] },
      { tag: "ui-sidebar-group-content", props: [] },
      { tag: "ui-sidebar-menu", props: [] },
      { tag: "ui-sidebar-menu-item", props: [] },
      { tag: "ui-sidebar-menu-button", props: [{ name: "isActive", type: "boolean", default: "false", description: "Whether active." }] },
      { tag: "ui-sidebar-menu-action", props: [] },
      { tag: "ui-sidebar-menu-badge", props: [] },
      { tag: "ui-sidebar-menu-skeleton", props: [] },
      { tag: "ui-sidebar-menu-sub", props: [] },
      { tag: "ui-sidebar-menu-sub-item", props: [] },
      { tag: "ui-sidebar-menu-sub-button", props: [] },
      { tag: "ui-sidebar-trigger", props: [] },
      { tag: "ui-sidebar-rail", props: [] },
      { tag: "ui-sidebar-inset", props: [] },
      { tag: "ui-sidebar-input", props: [] },
      { tag: "ui-sidebar-separator", props: [] },
    ],
    example: `<p class="text-sm text-muted-foreground">The Sidebar is a complex component requiring SidebarProvider context. See the <a href="https://ui.shadcn.com/docs/components/base/sidebar" class="underline">shadcn/ui sidebar docs</a> for full usage examples.</p>`,
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    description: "Used to show a placeholder while content is loading.",
    category: "Feedback",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/skeleton",
    subComponents: [
      { tag: "ui-skeleton", props: [] },
    ],
    example: `<div class="flex items-center space-x-4">
  <ui-skeleton class="h-12 w-12 rounded-full"></ui-skeleton>
  <div class="space-y-2">
    <ui-skeleton class="h-4 w-[250px]"></ui-skeleton>
    <ui-skeleton class="h-4 w-[200px]"></ui-skeleton>
  </div>
</div>`,
  },
  {
    name: "Slider",
    slug: "slider",
    description: "An input where the user selects a value from within a given range.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/slider",
    subComponents: [
      { tag: "ui-slider", props: [{ name: "value", type: "number[]", default: "—", description: "Controlled value." }, { name: "defaultValue", type: "number[]", default: "[0]", description: "Default value." }, { name: "min", type: "number", default: "0", description: "Minimum value." }, { name: "max", type: "number", default: "100", description: "Maximum value." }, { name: "step", type: "number", default: "1", description: "Step increment." }] },
    ],
    example: `<div class="space-y-4 max-w-md">
  <ui-slider json-default-value="[33]"></ui-slider>
  <ui-slider json-default-value="[66]"></ui-slider>
</div>`,
  },
  {
    name: "Sonner",
    slug: "sonner",
    description: "An opinionated toast component for React, built by Emil Kowalski.",
    category: "Feedback",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/sonner",
    subComponents: [
      { tag: "ui-sonner", props: [{ name: "position", type: '"top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"', default: '"bottom-right"', description: "Toast position." }, { name: "richColors", type: "boolean", default: "false", description: "Use rich colors." }] },
    ],
    example: `<p class="text-sm text-muted-foreground">Sonner requires the toast() function from the sonner package. Place &lt;ui-sonner&gt; once in your layout. See the <a href="https://ui.shadcn.com/docs/components/base/sonner" class="underline">shadcn/ui sonner docs</a> for examples.</p>`,
  },
  {
    name: "Spinner",
    slug: "spinner",
    description: "A loading spinner indicator.",
    category: "Feedback",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/spinner",
    subComponents: [
      { tag: "ui-spinner", props: [{ name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "The size of the spinner." }] },
    ],
    example: `<div class="flex items-center gap-4">
  <ui-spinner size="sm"></ui-spinner>
  <ui-spinner></ui-spinner>
  <ui-spinner size="lg"></ui-spinner>
</div>`,
  },
  {
    name: "Switch",
    slug: "switch",
    description: "A control that allows the user to toggle between two states.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/switch",
    subComponents: [
      { tag: "ui-switch", props: [{ name: "checked", type: "boolean", default: "—", description: "Controlled checked state." }, { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state." }, { name: "disabled", type: "boolean", default: "false", description: "Whether disabled." }] },
    ],
    example: `<div class="space-y-4">
  <div class="flex items-center gap-3">
    <ui-switch id="airplane-mode"></ui-switch>
    <ui-label for="airplane-mode">Airplane Mode</ui-label>
  </div>
  <div class="flex items-center gap-3">
    <ui-switch defaultChecked></ui-switch>
    <ui-label>Notifications (on)</ui-label>
  </div>
  <div class="flex items-center gap-3">
    <ui-switch disabled></ui-switch>
    <ui-label>Disabled</ui-label>
  </div>
</div>`,
  },
  {
    name: "Table",
    slug: "table",
    description: "A responsive table component.",
    category: "Data Display",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/table",
    subComponents: [
      { tag: "ui-table", props: [] },
      { tag: "ui-table-header", props: [] },
      { tag: "ui-table-body", props: [] },
      { tag: "ui-table-footer", props: [] },
      { tag: "ui-table-row", props: [] },
      { tag: "ui-table-head", props: [] },
      { tag: "ui-table-cell", props: [] },
      { tag: "ui-table-caption", props: [] },
    ],
    example: `<ui-table>
  <ui-table-caption>A list of recent invoices.</ui-table-caption>
  <ui-table-header>
    <ui-table-row>
      <ui-table-head class="w-[100px]">Invoice</ui-table-head>
      <ui-table-head>Status</ui-table-head>
      <ui-table-head>Method</ui-table-head>
      <ui-table-head class="text-right">Amount</ui-table-head>
    </ui-table-row>
  </ui-table-header>
  <ui-table-body>
    <ui-table-row>
      <ui-table-cell class="font-medium">INV001</ui-table-cell>
      <ui-table-cell>Paid</ui-table-cell>
      <ui-table-cell>Credit Card</ui-table-cell>
      <ui-table-cell class="text-right">$250.00</ui-table-cell>
    </ui-table-row>
    <ui-table-row>
      <ui-table-cell class="font-medium">INV002</ui-table-cell>
      <ui-table-cell>Pending</ui-table-cell>
      <ui-table-cell>PayPal</ui-table-cell>
      <ui-table-cell class="text-right">$150.00</ui-table-cell>
    </ui-table-row>
  </ui-table-body>
</ui-table>`,
  },
  {
    name: "Tabs",
    slug: "tabs",
    description: "A set of layered sections of content, known as tab panels.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/tabs",
    subComponents: [
      { tag: "ui-tabs", props: [{ name: "defaultValue", type: "string", default: "—", description: "The default active tab." }, { name: "value", type: "string", default: "—", description: "Controlled active tab." }] },
      { tag: "ui-tabs-list", props: [] },
      { tag: "ui-tabs-trigger", props: [{ name: "value", type: "string", default: "—", description: "The tab value." }] },
      { tag: "ui-tabs-content", props: [{ name: "value", type: "string", default: "—", description: "The content panel value." }] },
    ],
    example: `<ui-tabs defaultValue="account" class="w-[400px]">
  <ui-tabs-list>
    <ui-tabs-trigger value="account">Account</ui-tabs-trigger>
    <ui-tabs-trigger value="password">Password</ui-tabs-trigger>
  </ui-tabs-list>
  <ui-tabs-content value="account" class="mt-4">
    <ui-card>
      <ui-card-header>
        <ui-card-title>Account</ui-card-title>
        <ui-card-description>Make changes to your account here.</ui-card-description>
      </ui-card-header>
      <ui-card-content class="space-y-2">
        <div class="space-y-1">
          <ui-label>Name</ui-label>
          <ui-input value="John Doe"></ui-input>
        </div>
      </ui-card-content>
    </ui-card>
  </ui-tabs-content>
  <ui-tabs-content value="password" class="mt-4">
    <ui-card>
      <ui-card-header>
        <ui-card-title>Password</ui-card-title>
        <ui-card-description>Change your password here.</ui-card-description>
      </ui-card-header>
      <ui-card-content class="space-y-2">
        <div class="space-y-1">
          <ui-label>Current password</ui-label>
          <ui-input type="password"></ui-input>
        </div>
      </ui-card-content>
    </ui-card>
  </ui-tabs-content>
</ui-tabs>`,
  },
  {
    name: "Textarea",
    slug: "textarea",
    description: "Displays a form textarea.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/textarea",
    subComponents: [
      { tag: "ui-textarea", props: [{ name: "placeholder", type: "string", default: "—", description: "Placeholder text." }, { name: "disabled", type: "boolean", default: "false", description: "Whether disabled." }, { name: "rows", type: "number", default: "—", description: "Number of visible rows." }] },
    ],
    example: `<div class="space-y-4 max-w-md">
  <ui-textarea placeholder="Type your message here..."></ui-textarea>
  <ui-textarea placeholder="Disabled textarea" disabled></ui-textarea>
</div>`,
  },
  {
    name: "Toggle",
    slug: "toggle",
    description: "A two-state button that can be either on or off.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/toggle",
    subComponents: [
      { tag: "ui-toggle", props: [{ name: "variant", type: '"default" | "outline"', default: '"default"', description: "Visual variant." }, { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Toggle size." }, { name: "pressed", type: "boolean", default: "—", description: "Controlled pressed state." }] },
    ],
    example: `<div class="flex items-center gap-2">
  <ui-toggle>B</ui-toggle>
  <ui-toggle>I</ui-toggle>
  <ui-toggle variant="outline">U</ui-toggle>
</div>`,
  },
  {
    name: "Toggle Group",
    slug: "toggle-group",
    description: "A set of two-state buttons that can be toggled on or off.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/toggle-group",
    subComponents: [
      { tag: "ui-toggle-group", props: [{ name: "type", type: '"single" | "multiple"', default: '"single"', description: "Single or multiple selection." }, { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Visual variant." }] },
      { tag: "ui-toggle-group-item", props: [{ name: "value", type: "string", default: "—", description: "The item value." }] },
    ],
    example: `<ui-toggle-group type="single">
  <ui-toggle-group-item value="left">Left</ui-toggle-group-item>
  <ui-toggle-group-item value="center">Center</ui-toggle-group-item>
  <ui-toggle-group-item value="right">Right</ui-toggle-group-item>
</ui-toggle-group>`,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description: "A popup that displays information related to an element on hover.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/tooltip",
    subComponents: [
      { tag: "ui-tooltip-provider", props: [{ name: "delayDuration", type: "number", default: "200", description: "Delay in ms before showing." }] },
      { tag: "ui-tooltip", props: [] },
      { tag: "ui-tooltip-trigger", props: [] },
      { tag: "ui-tooltip-content", props: [{ name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side." }] },
    ],
    example: `<ui-tooltip-provider>
  <ui-tooltip>
    <ui-tooltip-trigger>
      <ui-button variant="outline">Hover me</ui-button>
    </ui-tooltip-trigger>
    <ui-tooltip-content>
      <p>Add to library</p>
    </ui-tooltip-content>
  </ui-tooltip>
</ui-tooltip-provider>`,
  },
  {
    name: "Direction Provider",
    slug: "direction-provider",
    description: "Wraps your app to provide a global direction for all components (LTR or RTL).",
    category: "Layout",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/direction-provider",
    subComponents: [
      { tag: "ui-direction-provider", props: [{ name: "direction", type: '"ltr" | "rtl"', default: '"ltr"', description: "The text direction." }] },
    ],
    example: `<ui-direction-provider direction="ltr">
  <!-- Your app content -->
  <p class="text-sm text-muted-foreground">Wrap your application root with this provider to set the text direction globally.</p>
</ui-direction-provider>`,
  },
];

// ============================================================================
// CATEGORY ORDERING
// ============================================================================

const categoryOrder = ["Layout", "Forms", "Data Display", "Feedback", "Overlay", "Navigation"];

function groupByCategory(comps) {
  const grouped = {};
  for (const cat of categoryOrder) {
    grouped[cat] = comps.filter(c => c.category === cat);
  }
  return grouped;
}

// ============================================================================
// HTML TEMPLATES
// ============================================================================

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// depth: 0 = app/index.html, 1 = app/docs/*.html, 2 = app/docs/components/*.html
function sidebarHtml(activeSlug = "", depth = 0) {
  const grouped = groupByCategory(components);
  const docsPrefix = depth === 0 ? "docs/" : depth === 1 ? "" : "../";
  const compPrefix = depth === 0 ? "docs/components/" : depth === 1 ? "components/" : "";

  let html = `
    <aside class="hidden lg:block w-64 shrink-0">
      <div class="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pr-4">
        <nav class="space-y-6">
          <div>
            <h3 class="text-sm font-semibold mb-2">Getting Started</h3>
            <ul class="space-y-1">
              <li><a href="${docsPrefix}introduction.html" class="block text-sm py-1 ${activeSlug === 'introduction' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}">Introduction</a></li>
              <li><a href="${docsPrefix}installation.html" class="block text-sm py-1 ${activeSlug === 'installation' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}">Installation</a></li>
              <li><a href="${docsPrefix}usage.html" class="block text-sm py-1 ${activeSlug === 'usage' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}">Usage</a></li>
            </ul>
          </div>`;

  for (const [category, comps] of Object.entries(grouped)) {
    if (comps.length === 0) continue;
    html += `
          <div>
            <h3 class="text-sm font-semibold mb-2">${category}</h3>
            <ul class="space-y-1">`;
    for (const comp of comps) {
      html += `
              <li><a href="${compPrefix}${comp.slug}.html" class="block text-sm py-1 ${activeSlug === comp.slug ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}">${comp.name}</a></li>`;
    }
    html += `
            </ul>
          </div>`;
  }

  html += `
        </nav>
      </div>
    </aside>`;
  return html;
}

const themeInitScript = `<script>
      (function() {
        var t = localStorage.getItem('theme') || 'system';
        if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>`;

// depth: 0 = app/index.html, 1 = app/docs/*.html, 2 = app/docs/components/*.html
function headerHtml(depth = 0) {
  const rootPrefix = depth === 0 ? "" : depth === 1 ? "../" : "../../";
  const docsPrefix = depth === 0 ? "docs/" : depth === 1 ? "" : "../";
  const compPrefix = depth === 0 ? "docs/components/" : depth === 1 ? "components/" : "";

  return `
    <header class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex h-14 items-center justify-between px-6">
        <div class="flex items-center gap-6">
          <a href="${rootPrefix}index.html" class="text-lg font-bold tracking-tight">Reactolith UI</a>
          <nav class="hidden md:flex items-center gap-4 text-sm">
            <a href="${docsPrefix}introduction.html" class="text-muted-foreground hover:text-foreground">Docs</a>
            <a href="${compPrefix}button.html" class="text-muted-foreground hover:text-foreground">Components</a>
          </nav>
        </div>
        <nav class="flex items-center gap-2">
          <a href="https://github.com/reactolith/ui" class="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
          <ui-theme-switch></ui-theme-switch>
        </nav>
      </div>
    </header>`;
}

function pageShell(title, activeSlug, content, depth = 0) {
  const scriptPath = depth === 0 ? "./app.ts" : depth === 1 ? "../app.ts" : "../../app.ts";
  const base = depth === 0 ? "." : depth === 1 ? ".." : "../..";
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Reactolith UI</title>
    <script type="module" src="${scriptPath}"></script>
    ${themeInitScript}
</head>
<body class="style-vega">
<div id="reactolith-app">
<ui-docs-layout page="${activeSlug}" base="${base}">
    ${content}
</ui-docs-layout>
</div>
</body>
</html>
`;
}

// ============================================================================
// COMPONENT PAGE
// ============================================================================

function componentPage(comp) {
  let propsHtml = "";

  for (const sub of comp.subComponents) {
    if (sub.props.length === 0) continue;
    propsHtml += `
            <div class="mt-6">
              <h3 class="text-lg font-semibold mb-3"><code class="text-sm bg-muted px-2 py-1 rounded">&lt;${sub.tag}&gt;</code>${sub.custom ? ' <span class="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded ml-2">Custom wrapper</span>' : ""}</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm"><thead><tr class="border-b"><th class="text-left py-2 pr-4 font-medium">Prop</th><th class="text-left py-2 pr-4 font-medium">Type</th><th class="text-left py-2 pr-4 font-medium">Default</th><th class="text-left py-2 font-medium">Description</th></tr></thead><tbody>`;
    for (const prop of sub.props) {
      propsHtml += `<tr class="border-b"><td class="py-2 pr-4"><code class="text-xs bg-muted px-1.5 py-0.5 rounded">${prop.name}</code></td><td class="py-2 pr-4 text-muted-foreground"><code class="text-xs">${escapeHtml(prop.type)}</code></td><td class="py-2 pr-4 text-muted-foreground"><code class="text-xs">${escapeHtml(prop.default)}</code></td><td class="py-2 text-muted-foreground">${prop.description}</td></tr>`;
    }
    propsHtml += `</tbody></table>
              </div>
            </div>`;
  }

  const subComponentsList = comp.subComponents.map(s =>
    `<code class="text-xs bg-muted px-1.5 py-0.5 rounded">&lt;${s.tag}&gt;</code>`
  ).join(" ");

  const content = `
            <div class="space-y-2 mb-8">
              <div class="flex items-center gap-3">
                <h1 class="text-3xl font-bold tracking-tight">${comp.name}</h1>
                <a href="${comp.shadcnUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-muted-foreground hover:text-foreground border rounded px-2 py-1">shadcn/ui docs</a>
              </div>
              <p class="text-lg text-muted-foreground">${comp.description}</p>
            </div>

            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">Preview</h2>
              <div class="rounded-lg border p-6 bg-background overflow-x-auto">
                ${comp.example}
              </div>
            </section>

            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">Usage</h2>
              <div class="rounded-lg border bg-muted/30 overflow-x-auto">
                <pre class="p-4 text-sm"><code>${escapeHtml(comp.example.trim())}</code></pre>
              </div>
            </section>

            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">Sub-components</h2>
              <div class="flex flex-wrap gap-2">
                ${subComponentsList}
              </div>
            </section>

            ${propsHtml ? `<section class="mb-10"><h2 class="text-xl font-semibold mb-4">Props</h2>${propsHtml}</section>` : ""}

            <section class="mb-10">
              <p class="text-sm text-muted-foreground">
                All components also accept standard HTML attributes (class, id, style, data-*, aria-*, etc.) which are passed through to the underlying element.
              </p>
            </section>`;

  return pageShell(comp.name, comp.slug, content, 2);
}

// ============================================================================
// STATIC PAGES
// ============================================================================

function introductionPage() {
  const content = `
            <div class="space-y-2 mb-8">
              <h1 class="text-3xl font-bold tracking-tight">Introduction</h1>
              <p class="text-lg text-muted-foreground">Reactolith UI brings shadcn/ui components to the web as standard HTML custom elements.</p>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>What is Reactolith UI?</h2>
              <p>Reactolith UI is a component library that wraps <a href="https://ui.shadcn.com">shadcn/ui</a> components (built on <a href="https://base-ui.com">Base UI</a>) and exposes them as <strong>HTML custom elements</strong> (web components) via <a href="https://github.com/nicosResworworworworb/reactolith">Reactolith</a>.</p>
              <p>This means you can use beautifully designed, accessible React components directly in your HTML — no React knowledge required.</p>

              <h2>Key Features</h2>
              <ul>
                <li><strong>55 component groups</strong> with 299 sub-components</li>
                <li><strong>Standard HTML</strong> — use <code>&lt;ui-button&gt;</code> instead of importing React components</li>
                <li><strong>shadcn/ui design</strong> — same beautiful, accessible components</li>
                <li><strong>Base UI primitives</strong> — built on unstyled, accessible Base UI components</li>
                <li><strong>Tailwind CSS v4</strong> — fully styled with Tailwind utilities</li>
                <li><strong>Customizable</strong> — use Tailwind classes directly on any element</li>
              </ul>

              <h2>How It Works</h2>
              <p>Each shadcn/ui component is wrapped in a thin Reactolith layer that registers it as an HTML custom element. For example, the React <code>Button</code> component becomes <code>&lt;ui-button&gt;</code>.</p>
              <p>Props are passed as HTML attributes:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<!-- Instead of React JSX: -->
<!-- <Button variant="outline" size="lg">Click me</Button> -->

<!-- Use standard HTML: -->
<ui-button variant="outline" size="lg">Click me</ui-button>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Architecture</h2>
              <p>The library consists of three layers:</p>
              <ol>
                <li><strong>Base UI</strong> — Provides unstyled, accessible component primitives</li>
                <li><strong>shadcn/ui</strong> — Adds Tailwind-based styling and design system</li>
                <li><strong>Reactolith</strong> — Wraps React components as HTML custom elements</li>
              </ol>

              <h2>Browser Support</h2>
              <p>Reactolith UI works in all modern browsers that support custom elements (Chrome, Firefox, Safari, Edge).</p>
            </div>`;

  return pageShell("Introduction", "introduction", content, 1);
}

function installationPage() {
  const content = `
            <div class="space-y-2 mb-8">
              <h1 class="text-3xl font-bold tracking-tight">Installation</h1>
              <p class="text-lg text-muted-foreground">Get started with Reactolith UI in your project.</p>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Using the shadcn CLI (Recommended)</h2>
              <p>Reactolith UI is distributed as a <a href="https://ui.shadcn.com/docs/registry">shadcn registry</a>. You can add individual components to your project using the shadcn CLI:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>npx shadcn@latest add https://reactolith.github.io/ui/r/button.json</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <p>This will install the button component and all its dependencies into your project.</p>

              <h2>Prerequisites</h2>
              <ul>
                <li>Node.js 18+</li>
                <li>A project with <a href="https://tailwindcss.com/docs/v4">Tailwind CSS v4</a> configured</li>
                <li><a href="https://reactolith.dev">Reactolith</a> installed in your project</li>
              </ul>

              <h2>Project Setup</h2>
              <p>If you're starting a new project, set up the basic structure:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`# 1. Create a new project
mkdir my-app && cd my-app
npm init -y

# 2. Install dependencies
npm install reactolith react react-dom
npm install -D tailwindcss @tailwindcss/vite vite @vitejs/plugin-react

# 3. Install shadcn
npx shadcn@latest init

# 4. Add components from the Reactolith UI registry
npx shadcn@latest add https://reactolith.github.io/ui/r/button.json
npx shadcn@latest add https://reactolith.github.io/ui/r/card.json
# ... add more components as needed`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>CSS Setup</h2>
              <p>Make sure your main CSS file imports Tailwind and the shadcn styles:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

/* Import the style-vega.css for cn-* component classes */
@import "./style-vega.css";`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Available Components</h2>
              <p>Browse all ${components.length} component groups in the sidebar to see what's available. Each component can be installed individually from the registry.</p>
            </div>`;

  return pageShell("Installation", "installation", content, 1);
}

function usagePage() {
  const content = `
            <div class="space-y-2 mb-8">
              <h1 class="text-3xl font-bold tracking-tight">Usage</h1>
              <p class="text-lg text-muted-foreground">Learn how to use Reactolith UI components in your HTML.</p>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Basic Usage</h2>
              <p>Reactolith UI components are used as standard HTML custom elements. All custom element tags use the <code>ui-</code> prefix:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<ui-button>Click me</ui-button>
<ui-input placeholder="Enter text..."></ui-input>
<ui-badge variant="secondary">New</ui-badge>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Passing Props</h2>
              <p>Props are passed as HTML attributes. String values work directly, and boolean attributes follow HTML conventions:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<!-- String props -->
<ui-button variant="outline" size="lg">Large Outline</ui-button>

<!-- Boolean props -->
<ui-button disabled>Disabled</ui-button>
<ui-checkbox defaultChecked></ui-checkbox>

<!-- Number props -->
<ui-progress value="75"></ui-progress>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Composing Components</h2>
              <p>Complex components are built by nesting sub-components, just like in HTML:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<ui-card>
  <ui-card-header>
    <ui-card-title>My Card</ui-card-title>
    <ui-card-description>A description of the card.</ui-card-description>
  </ui-card-header>
  <ui-card-content>
    <p>Card content goes here.</p>
  </ui-card-content>
  <ui-card-footer>
    <ui-button>Action</ui-button>
  </ui-card-footer>
</ui-card>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Styling with Tailwind</h2>
              <p>You can add Tailwind CSS classes directly to any component using the <code>class</code> attribute:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<ui-button class="w-full">Full Width Button</ui-button>
<ui-card class="max-w-md mx-auto">
  <ui-card-content class="p-8">Centered card</ui-card-content>
</ui-card>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Custom Props (Reactolith Extensions)</h2>
              <p>Some components have additional props added by the Reactolith wrapper. These are marked with a <span class="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Custom wrapper</span> badge in the component docs.</p>
              <p>Currently, two components have custom extensions:</p>
              <ul>
                <li><strong><code>&lt;ui-button&gt;</code></strong> — adds <code>href</code> prop to render as a link</li>
                <li><strong><code>&lt;ui-breadcrumb-link&gt;</code></strong> — adds <code>href</code> prop to render as a link</li>
              </ul>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<!-- Button as a link -->
<ui-button href="https://example.com">Visit Site</ui-button>

<!-- Breadcrumb with links -->
<ui-breadcrumb-link href="/docs">Documentation</ui-breadcrumb-link>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Naming Convention</h2>
              <p>The HTML tag name maps directly to the component path:</p>
              <ul>
                <li><code>&lt;ui-button&gt;</code> → <code>Button</code> component</li>
                <li><code>&lt;ui-card-header&gt;</code> → <code>CardHeader</code> component</li>
                <li><code>&lt;ui-dropdown-menu-trigger&gt;</code> → <code>DropdownMenuTrigger</code> component</li>
              </ul>
              <p>The pattern is always: <code>ui-</code> prefix + kebab-case component name.</p>
            </div>`;

  return pageShell("Usage", "usage", content, 1);
}

function landingPage() {
  const grouped = groupByCategory(components);

  let componentGrid = "";
  for (const [category, comps] of Object.entries(grouped)) {
    if (comps.length === 0) continue;
    componentGrid += `
              <div>
                <h3 class="text-sm font-semibold text-muted-foreground mb-3">${category}</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">`;
    for (const comp of comps) {
      componentGrid += `
                  <a href="docs/components/${comp.slug}.html" class="rounded-lg border p-3 text-sm text-center hover:bg-muted transition-colors">${comp.name}</a>`;
    }
    componentGrid += `
                </div>
              </div>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reactolith UI - Component Library</title>
    <script type="module" src="/app.ts"></script>
    ${themeInitScript}
</head>
<body class="style-vega">
<div id="reactolith-app">
    ${headerHtml(0)}

    <main class="max-w-5xl mx-auto px-6 py-16">

        <!-- Hero -->
        <section class="text-center mb-20">
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Build with Web Components.
                <br>
                <span class="text-muted-foreground">Style with shadcn.</span>
            </h1>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                ${components.length} component groups powered by Reactolith, shadcn/ui, and Base UI.
                Use standard HTML custom elements with world-class design.
            </p>
            <div class="flex items-center justify-center gap-3">
                <ui-button size="lg" href="docs/introduction.html">Get Started</ui-button>
                <ui-button variant="outline" size="lg" href="https://github.com/reactolith/ui">GitHub</ui-button>
            </div>
        </section>

        <!-- Quick Example -->
        <section class="mb-20">
            <h2 class="text-2xl font-semibold tracking-tight text-center mb-6">Use anywhere. Just HTML.</h2>
            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-2xl mx-auto">
              <pre class="p-6 text-sm"><code>${escapeHtml(`<ui-card>
  <ui-card-header>
    <ui-card-title>Hello World</ui-card-title>
    <ui-card-description>Built with web components.</ui-card-description>
  </ui-card-header>
  <ui-card-content>
    <ui-button variant="outline">Click me</ui-button>
  </ui-card-content>
</ui-card>`)}</code></pre>
            </div>
        </section>

        <!-- Live Demo -->
        <section class="mb-20">
            <h2 class="text-2xl font-semibold tracking-tight text-center mb-6">Live Preview</h2>
            <div class="max-w-2xl mx-auto rounded-lg border p-8 bg-background">
              <ui-card>
                <ui-card-header>
                  <ui-card-title>Hello World</ui-card-title>
                  <ui-card-description>Built with web components.</ui-card-description>
                </ui-card-header>
                <ui-card-content>
                  <div class="flex flex-wrap gap-3">
                    <ui-button variant="default">Default</ui-button>
                    <ui-button variant="outline">Outline</ui-button>
                    <ui-button variant="secondary">Secondary</ui-button>
                    <ui-button variant="ghost">Ghost</ui-button>
                  </div>
                </ui-card-content>
              </ui-card>
            </div>
        </section>

        <!-- All Components -->
        <section class="mb-16">
            <h2 class="text-2xl font-semibold tracking-tight text-center mb-8">All Components</h2>
            <div class="space-y-8">
              ${componentGrid}
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="border-t border-border">
      <div class="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground">
          Built with <a href="https://github.com/nicosResworworworworb/reactolith" class="underline hover:text-foreground">Reactolith</a>, <a href="https://ui.shadcn.com" class="underline hover:text-foreground">shadcn/ui</a>, <a href="https://base-ui.com" class="underline hover:text-foreground">Base UI</a>, and <a href="https://tailwindcss.com" class="underline hover:text-foreground">Tailwind CSS v4</a>.
        </p>
      </div>
    </footer>

</div>
</body>
</html>
`;
}

// ============================================================================
// GENERATE FILES
// ============================================================================

const BASE_DIR = "app";

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(filePath);
  // Replace __BASE__ with "/" — Vite's `base` config handles the actual prefix at build time
  writeFileSync(filePath, content.replace(/__BASE__/g, "/"), "utf-8");
  console.log(`  ${filePath}`);
}

console.log("Generating docs pages...\n");

// Landing page
writeFile(`${BASE_DIR}/index.html`, landingPage());

// Static pages
writeFile(`${BASE_DIR}/docs/introduction.html`, introductionPage());
writeFile(`${BASE_DIR}/docs/installation.html`, installationPage());
writeFile(`${BASE_DIR}/docs/usage.html`, usagePage());

// Component pages
for (const comp of components) {
  writeFile(`${BASE_DIR}/docs/components/${comp.slug}.html`, componentPage(comp));
}

console.log(`\nGenerated ${components.length + 4} pages.`);

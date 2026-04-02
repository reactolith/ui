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
      { tag: "ui-accordion-trigger", props: [{ name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkable" }], enhancedBy: "linkable behavior" },
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
  <ui-alert-dialog-trigger>Delete Account</ui-alert-dialog-trigger>
  <ui-alert-dialog-content>
    <ui-alert-dialog-header>
      <ui-alert-dialog-title>Are you absolutely sure?</ui-alert-dialog-title>
      <ui-alert-dialog-description>
        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
      </ui-alert-dialog-description>
    </ui-alert-dialog-header>
    <ui-alert-dialog-footer>
      <ui-alert-dialog-cancel>Cancel</ui-alert-dialog-cancel>
      <ui-alert-dialog-action variant="destructive">Delete</ui-alert-dialog-action>
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
    example: `<div class="max-w-[450px] w-full">
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
      { tag: "ui-breadcrumb-link", props: [{ name: "href", type: "string", default: "—", description: "The URL to navigate to. Renders as an anchor tag when provided.", source: "linkableClose" }], enhancedBy: "linkableClose behavior" },
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
        { name: "href", type: "string", default: "—", description: "When provided, renders the button as an anchor tag.", source: "linkable" },
      ], enhancedBy: "linkable behavior" },
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
    name: "Date Picker",
    slug: "date-picker",
    description: "A date picker with calendar popup and direct text input. Supports locale-aware formatting and native form values.",
    category: "Forms",
    subComponents: [
      { tag: "ui-date-picker", props: [
        { name: "value", type: "Date", default: "—", description: "The selected date (controlled)." },
        { name: "defaultValue", type: "Date", default: "—", description: "Default date (uncontrolled)." },
        { name: "onValueChange", type: "(date: Date | undefined) => void", default: "—", description: "Callback when date changes." },
        { name: "displayFormat", type: "string", default: "browser locale short date", description: "date-fns format pattern for display (e.g. 'dd.MM.yyyy')." },
        { name: "valueFormat", type: "string", default: '"yyyy-MM-dd"', description: "date-fns format pattern for the hidden form value. Defaults to native HTML date format." },
        { name: "locale", type: "string", default: "navigator.language", description: "BCP 47 locale string for Intl formatting (e.g. 'de-AT')." },
        { name: "name", type: "string", default: "—", description: "Name for the hidden form input. Enables form submission." },
        { name: "placeholder", type: "string", default: "current date formatted", description: "Placeholder text for the input." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the picker is disabled." },
      ] },
      { tag: "ui-time-picker", props: [
        { name: "value", type: "Date", default: "—", description: "The selected time (controlled)." },
        { name: "defaultValue", type: "Date", default: "—", description: "Default time (uncontrolled)." },
        { name: "onValueChange", type: "(date: Date | undefined) => void", default: "—", description: "Callback when time changes." },
        { name: "displayFormat", type: "string", default: "browser locale HH:mm", description: "date-fns format pattern for display (e.g. 'hh:mm a')." },
        { name: "valueFormat", type: "string", default: '"HH:mm"', description: "date-fns format pattern for the hidden form value. Defaults to native HTML time format." },
        { name: "locale", type: "string", default: "navigator.language", description: "BCP 47 locale string for Intl formatting." },
        { name: "name", type: "string", default: "—", description: "Name for the hidden form input." },
        { name: "placeholder", type: "string", default: "current time formatted", description: "Placeholder text for the input." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the picker is disabled." },
      ] },
      { tag: "ui-date-time-picker", props: [
        { name: "value", type: "Date", default: "—", description: "The selected datetime (controlled)." },
        { name: "defaultValue", type: "Date", default: "—", description: "Default datetime (uncontrolled)." },
        { name: "onValueChange", type: "(date: Date | undefined) => void", default: "—", description: "Callback when datetime changes." },
        { name: "displayFormat", type: "string", default: "browser locale short date", description: "date-fns format pattern for date display." },
        { name: "timeDisplayFormat", type: "string", default: "browser locale HH:mm", description: "date-fns format pattern for time display." },
        { name: "valueFormat", type: "string", default: '"yyyy-MM-dd\'T\'HH:mm"', description: "date-fns format pattern for the hidden form value. Defaults to native HTML datetime-local format." },
        { name: "locale", type: "string", default: "navigator.language", description: "BCP 47 locale string for Intl formatting." },
        { name: "name", type: "string", default: "—", description: "Name for the hidden form input." },
        { name: "placeholder", type: "string", default: "current date formatted", description: "Placeholder text for the date input." },
        { name: "timePlaceholder", type: "string", default: "current time formatted", description: "Placeholder text for the time input." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the picker is disabled." },
      ] },
      { tag: "ui-date-range-picker", props: [
        { name: "value", type: "DateRange", default: "—", description: "The selected range (controlled). Object with from and to Date properties." },
        { name: "defaultValue", type: "DateRange", default: "—", description: "Default range (uncontrolled)." },
        { name: "onValueChange", type: "(range: DateRange | undefined) => void", default: "—", description: "Callback when range changes." },
        { name: "displayFormat", type: "string", default: "browser locale short date", description: "date-fns format pattern for display." },
        { name: "valueFormat", type: "string", default: '"yyyy-MM-dd"', description: "date-fns format pattern for the hidden form values. Defaults to native HTML date format." },
        { name: "locale", type: "string", default: "navigator.language", description: "BCP 47 locale string for Intl formatting." },
        { name: "name", type: "string", default: "—", description: "Name prefix for the hidden form inputs. Creates {name}-from and {name}-to." },
        { name: "placeholderFrom", type: "string", default: "current date formatted", description: "Placeholder text for the start date input." },
        { name: "placeholderTo", type: "string", default: "current date formatted", description: "Placeholder text for the end date input." },
        { name: "numberOfMonths", type: "number", default: "2", description: "Number of months to display in the calendar popup." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the picker is disabled." },
      ] },
    ],
    example: `<div class="space-y-6 max-w-sm">
  <ui-field>
    <ui-field-label>Date</ui-field-label>
    <ui-date-picker name="date" default-value="2026-06-15"></ui-date-picker>
  </ui-field>
  <ui-field>
    <ui-field-label>Time</ui-field-label>
    <ui-time-picker name="time" default-value="14:30"></ui-time-picker>
  </ui-field>
</div>`,
    additionalExamples: [
      {
        title: "Date Time Picker with Default",
        example: `<ui-field class="max-w-md">
  <ui-field-label>Appointment</ui-field-label>
  <ui-date-time-picker name="appointment" default-value="2026-06-15T14:30"></ui-date-time-picker>
</ui-field>`,
      },
      {
        title: "Date Range Picker with Default",
        example: `<ui-field class="max-w-lg">
  <ui-field-label>Travel Dates</ui-field-label>
  <ui-date-range-picker name="travel" json-default-value='{"from":"2026-06-15","to":"2026-06-22"}'></ui-date-range-picker>
</ui-field>`,
      },
      {
        title: "Custom Display Format",
        example: `<ui-field class="max-w-sm">
  <ui-field-label>Date (custom format)</ui-field-label>
  <ui-date-picker name="custom-date" displayFormat="dd.MM.yyyy" default-value="2026-04-23" placeholder="23.04.2026"></ui-date-picker>
</ui-field>`,
        readableExample: `<!-- Use date-fns format patterns for custom display -->
<ui-date-picker
  name="custom-date"
  displayFormat="dd.MM.yyyy"
  default-value="2026-04-23"
  placeholder="23.04.2026">
</ui-date-picker>

<!-- Custom value format for form submission -->
<ui-date-picker
  name="iso-date"
  default-value="2026-04-23"
  valueFormat="yyyy-MM-dd'T'HH:mm:ss">
</ui-date-picker>

<!-- Specify locale explicitly -->
<ui-date-picker
  name="de-date"
  default-value="2026-04-23"
  locale="de-AT">
</ui-date-picker>`,
      },
    ],
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
    example: `<ui-chart-container json-config='{"desktop":{"label":"Desktop","color":"hsl(var(--chart-1))"},"mobile":{"label":"Mobile","color":"hsl(var(--chart-2))"}}'>\n  <ui-bar-chart json-data='[{"month":"Jan","desktop":186,"mobile":80},{"month":"Feb","desktop":305,"mobile":200},{"month":"Mar","desktop":237,"mobile":120}]'>\n    <ui-cartesian-grid json-vertical="false" />\n    <ui-x-axis dataKey="month" json-tickLine="false" json-axisLine="false" json-tickMargin="8" />\n    <ui-chart-tooltip>\n      <ui-chart-tooltip-content />\n    </ui-chart-tooltip>\n    <ui-bar dataKey="desktop" fill="var(--color-desktop)" json-radius="4" />\n    <ui-bar dataKey="mobile" fill="var(--color-mobile)" json-radius="4" />\n  </ui-bar-chart>\n</ui-chart-container>`,
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/checkbox",
    subComponents: [
      { tag: "ui-checkbox", props: [{ name: "checked", type: "boolean", default: "false", description: "Controlled checked state." }, { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state." }, { name: "disabled", type: "boolean", default: "false", description: "Whether the checkbox is disabled." }, { name: "name", type: "string", default: "—", description: "The name for form submission." }], enhancedBy: "formField behavior — auto-applies aria-invalid and disabled inside ui-form-item" },
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
    example: `<ui-collapsible class="max-w-[350px] w-full space-y-2">
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
      { tag: "ui-combobox", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "value", type: "string", default: "—", description: "The selected value. When items are objects, pass the value string — it is resolved to the matching item automatically." }, { name: "default-value", type: "string", default: "—", description: "Default selected value. Resolved to matching item object automatically." }, { name: "items", type: '(string | {value, label})[]', default: "—", description: "Items for filtering/search. Use json-items in HTML. When provided, ui-combobox-list auto-renders filtered items.", source: "comboboxProvider" }, { name: "src", type: "string", default: "—", description: "URL to fetch items from. Appends ?q={query} on input change. Mutually exclusive with items.", source: "comboboxProvider" }, { name: "initial-items", type: '(string | {value, label})[]', default: "—", description: "Initial items for async mode (src). Use json-initial-items in HTML. Allows displaying labels for pre-set values before any search.", source: "comboboxProvider" }, { name: "debounce", type: "number", default: "300", description: "Debounce delay in ms before fetching (only with src).", source: "comboboxProvider" }, { name: "min-length", type: "number", default: "2", description: "Minimum input length before fetching (only with src).", source: "comboboxProvider" }] },
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
    additionalExamples: [
      {
        title: "Initial Value",
        example: `<ui-combobox default-value="vue" json-items='[{"value":"react","label":"React"},{"value":"vue","label":"Vue.js"},{"value":"angular","label":"Angular"},{"value":"svelte","label":"Svelte"}]'>
  <ui-combobox-input placeholder="Select framework..." showClear></ui-combobox-input>
  <ui-combobox-content>
    <ui-combobox-empty>No framework found.</ui-combobox-empty>
    <ui-combobox-list></ui-combobox-list>
  </ui-combobox-content>
</ui-combobox>`,
        readableExample: `<!-- Pass default-value or value — the label is resolved automatically from the items array -->
<ui-combobox default-value="vue" json-items='[
  {"value":"react","label":"React"},
  {"value":"vue","label":"Vue.js"},
  {"value":"angular","label":"Angular"},
  {"value":"svelte","label":"Svelte"}
]'>
  ...
</ui-combobox>`,
      },
      {
        title: "Async Search (src)",
        example: `<ui-combobox src="/search.json" placeholder="Search languages..." show-clear></ui-combobox>`,
        readableExample: `<!-- The endpoint should return: [{"value": "...", "label": "...", "suffix": "..."}, ...] -->
<!-- The query is appended as ?q={input}, debounce defaults to 300ms, min-length to 2 -->
<ui-combobox src="/api/search" placeholder="Search..." show-clear></ui-combobox>`,
      },
      {
        title: "Async Search with Initial Value",
        example: `<ui-combobox src="/search.json" value="js" json-initial-items='[{"value":"js","label":"JavaScript"}]' placeholder="Search languages..." show-clear></ui-combobox>`,
        readableExample: `<!-- For async comboboxes with a pre-selected value, pass json-initial-items -->
<!-- so the label can be resolved and displayed before the user types -->
<ui-combobox src="/api/search" value="js"
  json-initial-items='[{"value":"js","label":"JavaScript"}]'
  placeholder="Search..." show-clear>
</ui-combobox>`,
      },
      {
        title: "Multiple Selection (Chips)",
        example: `<ui-combobox multiple json-items='[{"value":"react","label":"React"},{"value":"vue","label":"Vue.js"},{"value":"angular","label":"Angular"},{"value":"svelte","label":"Svelte"},{"value":"solid","label":"Solid"}]'>
  <ui-combobox-chips>
    <ui-combobox-value placeholder="Select frameworks..."></ui-combobox-value>
  </ui-combobox-chips>
  <ui-combobox-content>
    <ui-combobox-empty>No framework found.</ui-combobox-empty>
    <ui-combobox-list></ui-combobox-list>
  </ui-combobox-content>
</ui-combobox>`,
        readableExample: `<!-- Use multiple + chips for multi-select with tag-style display -->
<ui-combobox multiple json-items='[
  {"value":"react","label":"React"},
  {"value":"vue","label":"Vue.js"},
  {"value":"angular","label":"Angular"},
  {"value":"svelte","label":"Svelte"},
  {"value":"solid","label":"Solid"}
]'>
  <ui-combobox-chips>
    <ui-combobox-value placeholder="Select frameworks..."></ui-combobox-value>
  </ui-combobox-chips>
  <ui-combobox-content>
    <ui-combobox-empty>No framework found.</ui-combobox-empty>
    <ui-combobox-list></ui-combobox-list>
  </ui-combobox-content>
</ui-combobox>`,
      },
      {
        title: "Multiple with Default Values",
        example: `<ui-combobox multiple json-default-value='["react","svelte"]' json-items='[{"value":"react","label":"React"},{"value":"vue","label":"Vue.js"},{"value":"angular","label":"Angular"},{"value":"svelte","label":"Svelte"},{"value":"solid","label":"Solid"}]'>
  <ui-combobox-chips>
    <ui-combobox-value placeholder="Select frameworks..."></ui-combobox-value>
  </ui-combobox-chips>
  <ui-combobox-content>
    <ui-combobox-empty>No framework found.</ui-combobox-empty>
    <ui-combobox-list></ui-combobox-list>
  </ui-combobox-content>
</ui-combobox>`,
        readableExample: `<!-- Use json-default-value with an array for pre-selected values -->
<ui-combobox multiple json-default-value='["react","svelte"]' json-items='[...]'>
  <ui-combobox-chips>
    <ui-combobox-value placeholder="Select frameworks..."></ui-combobox-value>
  </ui-combobox-chips>
  <ui-combobox-content>
    <ui-combobox-empty>No framework found.</ui-combobox-empty>
    <ui-combobox-list></ui-combobox-list>
  </ui-combobox-content>
</ui-combobox>`,
      },
    ],
  },
  {
    name: "Command",
    slug: "command",
    description: "Fast, composable, unstyled command menu for React.",
    category: "Navigation",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/command",
    subComponents: [
      { tag: "ui-command", props: [] },
      { tag: "ui-command-dialog", props: [{ name: "title", type: "string", default: '"Command Palette"', description: "Title for the dialog." }, { name: "description", type: "string", default: '"Search for a command to run..."', description: "Description for accessibility." }, { name: "showCloseButton", type: "boolean", default: "false", description: "Whether to show a close button." }] },
      { tag: "ui-command-input", props: [{ name: "placeholder", type: "string", default: "—", description: "Input placeholder text." }] },
      { tag: "ui-command-list", props: [] },
      { tag: "ui-command-empty", props: [] },
      { tag: "ui-command-group", props: [{ name: "heading", type: "string", default: "—", description: "Group heading text." }] },
      { tag: "ui-command-item", props: [{ name: "value", type: "string", default: "—", description: "The value of the item." }, { name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "commandLinkable" }], enhancedBy: "commandLinkable wrapper" },
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
      { tag: "ui-context-menu-item", props: [{ name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkableClose" }, { name: "inset", type: "boolean", default: "false", description: "Indent the item to align with items that have icons." }, { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "The visual style variant." }], enhancedBy: "linkableClose behavior" },
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
    <div class="flex h-[150px] max-w-[300px] w-full items-center justify-center rounded-md border border-dashed text-sm">
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
      { tag: "ui-dialog-content", props: [{ name: "showCloseButton", type: "boolean", default: "true", description: "Whether to show the close button." }] },
      { tag: "ui-dialog-header", props: [] },
      { tag: "ui-dialog-title", props: [] },
      { tag: "ui-dialog-description", props: [] },
      { tag: "ui-dialog-footer", props: [] },
      { tag: "ui-dialog-close", props: [] },
    ],
    example: `<ui-dialog>
  <ui-dialog-trigger>Open Dialog</ui-dialog-trigger>
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
      <ui-dialog-close>Cancel</ui-dialog-close>
      <ui-button>Save changes</ui-button>
    </ui-dialog-footer>
  </ui-dialog-content>
</ui-dialog>`,
  },
  {
    name: "Drawer",
    slug: "drawer",
    description: "A drawer component that slides in from the edge of the screen, built on top of Vaul.",
    category: "Overlay",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/drawer",
    subComponents: [
      { tag: "ui-drawer", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "shouldScaleBackground", type: "boolean", default: "true", description: "Whether the background should scale down when the drawer opens." }] },
      { tag: "ui-drawer-trigger", props: [], enhancedBy: "trigger behavior" },
      { tag: "ui-drawer-content", props: [] },
      { tag: "ui-drawer-header", props: [] },
      { tag: "ui-drawer-title", props: [] },
      { tag: "ui-drawer-description", props: [] },
      { tag: "ui-drawer-footer", props: [] },
      { tag: "ui-drawer-close", props: [], enhancedBy: "trigger behavior" },
      { tag: "ui-drawer-overlay", props: [] },
      { tag: "ui-drawer-portal", props: [] },
    ],
    example: `<ui-drawer>
  <ui-drawer-trigger>Open Drawer</ui-drawer-trigger>
  <ui-drawer-content>
    <ui-drawer-header>
      <ui-drawer-title>Move Goal</ui-drawer-title>
      <ui-drawer-description>Set your daily activity goal.</ui-drawer-description>
    </ui-drawer-header>
    <div class="p-4">
      <div class="flex items-center justify-center space-x-2">
        <ui-button variant="outline" size="icon-sm">−</ui-button>
        <div class="text-7xl font-bold tracking-tighter">350</div>
        <ui-button variant="outline" size="icon-sm">+</ui-button>
      </div>
      <p class="text-center text-muted-foreground text-sm mt-2">Calories/day</p>
    </div>
    <ui-drawer-footer>
      <ui-button>Submit</ui-button>
      <ui-drawer-close>Cancel</ui-drawer-close>
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
      { tag: "ui-dropdown-menu-content", props: [{ name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alignment of the content." }, { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side of the trigger." }, { name: "sideOffset", type: "number", default: "4", description: "Offset from the trigger in pixels." }] },
      { tag: "ui-dropdown-menu-item", props: [{ name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkableClose" }, { name: "inset", type: "boolean", default: "false", description: "Indent the item to align with items that have icons." }, { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "The visual style variant." }], enhancedBy: "linkableClose behavior" },
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
  <ui-dropdown-menu-trigger>Open Menu</ui-dropdown-menu-trigger>
  <ui-dropdown-menu-content class="w-56">
    <ui-dropdown-menu-group>
      <ui-dropdown-menu-label>My Account</ui-dropdown-menu-label>
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
  <ui-field-label html-for="field-email">Email</ui-field-label>
  <ui-field-content>
    <ui-input id="field-email" type="email" placeholder="you@example.com"></ui-input>
  </ui-field-content>
  <ui-field-description>We'll never share your email.</ui-field-description>
</ui-field>`,
  },
  {
    name: "Form",
    slug: "form",
    description: "A form wrapper with validation, error display, submitting state, and auto-submit support (onChange, onBlur).",
    category: "Forms",
    subComponents: [
      { tag: "ui-form", props: [{ name: "errors", type: "FormError[]", default: "[]", description: "Array of form errors to display. Each error has message, name/id, optional label." }, { name: "errors-title", type: "string", default: "—", description: "Optional title for the error summary alert." }] },
      { tag: "ui-form-item", props: [{ name: "name", type: "string", default: "—", description: "Field name matching error id/name. Auto-displays errors and sets data-invalid." }, { name: "auto-submit", type: '"onChange" | "onBlur"', default: "—", description: "Auto-submit the form when a field inside this item changes (onChange) or loses focus (onBlur)." }] },
    ],
    example: `<ui-form errors='[{"id":"email","message":"Email is required"},{"id":"password","message":"Password must be at least 8 characters"}]' errors-title="Please fix the following errors:">
  <div class="space-y-4 max-w-md">
    <ui-form-item name="email">
      <ui-field>
        <ui-field-label html-for="email">Email</ui-field-label>
        <ui-field-content>
          <ui-input id="email" name="email" type="email" placeholder="you@example.com"></ui-input>
        </ui-field-content>
      </ui-field>
    </ui-form-item>
    <ui-form-item name="password">
      <ui-field>
        <ui-field-label html-for="password">Password</ui-field-label>
        <ui-field-content>
          <ui-input id="password" name="password" type="password"></ui-input>
        </ui-field-content>
      </ui-field>
    </ui-form-item>
    <ui-button type="submit">Submit</ui-button>
  </div>
</ui-form>`,
    additionalExamples: [
      {
        title: "Auto-Submit on Change",
        readableExample: `<ui-form method="get" data-scroll="preserve">
  <div class="space-y-4 max-w-md">
    <ui-form-item name="theme" auto-submit="onChange">
      <ui-field>
        <ui-field-label html-for="theme">Theme</ui-field-label>
        <ui-field-content>
          <ui-native-select id="theme" name="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </ui-native-select>
        </ui-field-content>
      </ui-field>
    </ui-form-item>
    <ui-form-item name="language" auto-submit="onChange">
      <ui-field>
        <ui-field-label html-for="language">Language</ui-field-label>
        <ui-field-content>
          <ui-select name="language" json-items='[...]'>
            <ui-select-trigger><ui-select-value placeholder="Select language"></ui-select-value></ui-select-trigger>
            <ui-select-content></ui-select-content>
          </ui-select>
        </ui-field-content>
      </ui-field>
    </ui-form-item>
    <ui-form-item name="framework" auto-submit="onChange">
      <ui-field>
        <ui-field-label>Framework</ui-field-label>
        <ui-field-content>
          <ui-combobox name="framework" json-items='[...]'>
          </ui-combobox>
        </ui-field-content>
      </ui-field>
    </ui-form-item>
    <ui-form-item name="notifications" auto-submit="onChange">
      <div class="flex items-center gap-3">
        <ui-checkbox id="notifications" name="notifications" value="1"></ui-checkbox>
        <ui-label for="notifications">Enable notifications</ui-label>
      </div>
    </ui-form-item>
  </div>
</ui-form>`,
        example: `<div id="auto-submit-change-demo">
  <ui-form method="get" data-scroll="preserve">
    <div class="space-y-4 max-w-md">
      <ui-form-item name="theme" auto-submit="onChange">
        <ui-field>
          <ui-field-label html-for="theme">Theme</ui-field-label>
          <ui-field-content>
            <ui-native-select id="theme" name="theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </ui-native-select>
          </ui-field-content>
        </ui-field>
      </ui-form-item>
      <ui-form-item name="language" auto-submit="onChange">
        <ui-field>
          <ui-field-label html-for="language">Language</ui-field-label>
          <ui-field-content>
            <ui-select name="language" json-items='[{"value":"en","label":"English"},{"value":"de","label":"Deutsch"},{"value":"fr","label":"Français"},{"value":"es","label":"Español"}]'>
              <ui-select-trigger><ui-select-value placeholder="Select language"></ui-select-value></ui-select-trigger>
              <ui-select-content></ui-select-content>
            </ui-select>
          </ui-field-content>
        </ui-field>
      </ui-form-item>
      <ui-form-item name="framework" auto-submit="onChange">
        <ui-field>
          <ui-field-label>Framework</ui-field-label>
          <ui-field-content>
            <ui-combobox name="framework" json-items='[{"value":"react","label":"React"},{"value":"vue","label":"Vue.js"},{"value":"angular","label":"Angular"},{"value":"svelte","label":"Svelte"}]'>
              <ui-combobox-input placeholder="Select framework..." show-clear></ui-combobox-input>
              <ui-combobox-content>
                <ui-combobox-empty>No framework found.</ui-combobox-empty>
                <ui-combobox-list></ui-combobox-list>
              </ui-combobox-content>
            </ui-combobox>
          </ui-field-content>
        </ui-field>
      </ui-form-item>
      <ui-form-item name="notifications" auto-submit="onChange">
        <div class="flex items-center gap-3">
          <ui-checkbox id="notifications" name="notifications" value="1"></ui-checkbox>
          <ui-label for="notifications">Enable notifications</ui-label>
        </div>
      </ui-form-item>
    </div>
  </ui-form>
</div>
<script>
(function() {
  var n = 0;
  function toast(msg) {
    var d = document.createElement('div');
    d.textContent = msg;
    d.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#22c55e;color:white;padding:12px 20px;border-radius:8px;z-index:9999;font-size:14px;font-weight:500;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.5s;pointer-events:none';
    document.body.appendChild(d);
    setTimeout(function() { d.style.opacity = '0' }, 2000);
    setTimeout(function() { d.remove() }, 2500);
  }
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form || !form.closest('#auto-submit-change-demo')) return;
    n++;
    toast('Auto-submitted (' + n + ') — ' + new Date().toLocaleTimeString());
  }, true);
})();
</script>`,
      },
      {
        title: "Auto-Submit on Blur",
        readableExample: `<ui-form method="get" data-scroll="preserve">
  <div class="space-y-4 max-w-md">
    <ui-form-item name="username" auto-submit="onBlur">
      <ui-field>
        <ui-field-label html-for="username">Username</ui-field-label>
        <ui-field-content>
          <ui-input id="username" name="username" value="johndoe" placeholder="Enter username"></ui-input>
        </ui-field-content>
        <ui-field-description>Saves automatically when you leave the field.</ui-field-description>
      </ui-field>
    </ui-form-item>
    <ui-form-item name="bio" auto-submit="onBlur">
      <ui-field>
        <ui-field-label html-for="bio">Bio</ui-field-label>
        <ui-field-content>
          <ui-textarea id="bio" name="bio" placeholder="Tell us about yourself"></ui-textarea>
        </ui-field-content>
      </ui-field>
    </ui-form-item>
  </div>
</ui-form>`,
        example: `<div id="auto-submit-blur-demo">
  <ui-form method="get" data-scroll="preserve">
    <div class="space-y-4 max-w-md">
      <ui-form-item name="username" auto-submit="onBlur">
        <ui-field>
          <ui-field-label html-for="username">Username</ui-field-label>
          <ui-field-content>
            <ui-input id="username" name="username" value="johndoe" placeholder="Enter username"></ui-input>
          </ui-field-content>
          <ui-field-description>Saves automatically when you leave the field.</ui-field-description>
        </ui-field>
      </ui-form-item>
      <ui-form-item name="bio" auto-submit="onBlur">
        <ui-field>
          <ui-field-label html-for="bio">Bio</ui-field-label>
          <ui-field-content>
            <ui-textarea id="bio" name="bio" placeholder="Tell us about yourself"></ui-textarea>
          </ui-field-content>
        </ui-field>
      </ui-form-item>
    </div>
  </ui-form>
</div>
<script>
(function() {
  var n = 0;
  function toast(msg) {
    var d = document.createElement('div');
    d.textContent = msg;
    d.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#3b82f6;color:white;padding:12px 20px;border-radius:8px;z-index:9999;font-size:14px;font-weight:500;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.5s;pointer-events:none';
    document.body.appendChild(d);
    setTimeout(function() { d.style.opacity = '0' }, 2000);
    setTimeout(function() { d.remove() }, 2500);
  }
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form || !form.closest('#auto-submit-blur-demo')) return;
    n++;
    toast('Auto-submitted on blur (' + n + ') — ' + new Date().toLocaleTimeString());
  }, true);
})();
</script>`,
      },
    ],
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
      { tag: "ui-input", props: [{ name: "type", type: "string", default: '"text"', description: "The input type (text, email, password, etc.)." }, { name: "placeholder", type: "string", default: "—", description: "Placeholder text." }, { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." }], enhancedBy: "formField behavior — auto-applies aria-invalid and disabled inside ui-form-item" },
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
  <ui-input-group-addon>
    <ui-input-group-text>https://</ui-input-group-text>
  </ui-input-group-addon>
  <ui-input-group-input placeholder="example.com"></ui-input-group-input>
  <ui-input-group-addon align="inline-end">
    <ui-input-group-text>.com</ui-input-group-text>
  </ui-input-group-addon>
</ui-input-group>`,
  },
  {
    name: "Input OTP",
    slug: "input-otp",
    description: "Accessible one-time password component with copy paste functionality.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/input-otp",
    subComponents: [
      { tag: "ui-input-otp", props: [{ name: "max-length", type: "number", default: "—", description: "Maximum number of characters." }], enhancedBy: "formField behavior — auto-applies aria-invalid and disabled inside ui-form-item" },
      { tag: "ui-input-otp-group", props: [] },
      { tag: "ui-input-otp-slot", props: [{ name: "index", type: "number", default: "—", description: "The slot index." }] },
      { tag: "ui-input-otp-separator", props: [] },
    ],
    example: `<ui-input-otp max-length="6">
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
      { tag: "ui-item", props: [{ name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkable" }], enhancedBy: "linkable behavior" },
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
      { tag: "ui-menubar-item", props: [{ name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkableClose" }, { name: "inset", type: "boolean", default: "false", description: "Indent the item to align with items that have icons." }], enhancedBy: "linkableClose behavior" },
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
      { tag: "ui-native-select", props: [{ name: "disabled", type: "boolean", default: "false", description: "Whether the select is disabled." }], enhancedBy: "formField behavior — auto-applies aria-invalid and disabled inside ui-form-item" },
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
    additionalExamples: [
      {
        title: "Multiple Selection",
        example: `<div class="max-w-sm space-y-2">
  <ui-label>Languages</ui-label>
  <ui-native-select multiple name="languages" size="sm">
    <ui-native-select-option value="javascript">JavaScript</ui-native-select-option>
    <ui-native-select-option value="typescript">TypeScript</ui-native-select-option>
    <ui-native-select-option value="python">Python</ui-native-select-option>
    <ui-native-select-option value="go">Go</ui-native-select-option>
    <ui-native-select-option value="rust">Rust</ui-native-select-option>
  </ui-native-select>
</div>`,
        readableExample: `<ui-native-select multiple name="languages">
  <ui-native-select-option value="javascript">JavaScript</ui-native-select-option>
  <ui-native-select-option value="typescript">TypeScript</ui-native-select-option>
  <ui-native-select-option value="python">Python</ui-native-select-option>
  <ui-native-select-option value="go">Go</ui-native-select-option>
  <ui-native-select-option value="rust">Rust</ui-native-select-option>
</ui-native-select>`,
      },
    ],
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
      { tag: "ui-navigation-menu-link", props: [{ name: "href", type: "string", default: "—", description: "URL the link points to.", source: "linkableClose" }], enhancedBy: "linkableClose behavior" },
      { tag: "ui-navigation-menu-indicator", props: [] },
      { tag: "ui-navigation-menu-positioner", props: [] },
    ],
    example: `<ui-navigation-menu>
  <ui-navigation-menu-list>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link href="/docs">Documentation</ui-navigation-menu-link>
    </ui-navigation-menu-item>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link href="/components">Components</ui-navigation-menu-link>
    </ui-navigation-menu-item>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link href="/examples">Examples</ui-navigation-menu-link>
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
      { tag: "ui-pagination-link", props: [{ name: "href", type: "string", default: "—", description: "URL the link points to." }, { name: "isActive", type: "boolean", default: "false", description: "Whether this page is active." }], enhancedBy: "closeClick behavior" },
      { tag: "ui-pagination-previous", props: [] },
      { tag: "ui-pagination-next", props: [] },
      { tag: "ui-pagination-ellipsis", props: [] },
    ],
    example: `<ui-pagination>
  <ui-pagination-content>
    <ui-pagination-item><ui-pagination-previous></ui-pagination-previous></ui-pagination-item>
    <ui-pagination-item><ui-pagination-link href="?page=1">1</ui-pagination-link></ui-pagination-item>
    <ui-pagination-item><ui-pagination-link href="?page=2" isActive>2</ui-pagination-link></ui-pagination-item>
    <ui-pagination-item><ui-pagination-link href="?page=3">3</ui-pagination-link></ui-pagination-item>
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
  <ui-popover-trigger>Open Popover</ui-popover-trigger>
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
      { tag: "ui-radio-group", props: [{ name: "defaultValue", type: "string", default: "—", description: "The default selected value." }, { name: "value", type: "string", default: "—", description: "Controlled selected value." }], enhancedBy: "formField behavior — auto-applies aria-invalid and disabled inside ui-form-item" },
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
      { tag: "ui-select", props: [{ name: "value", type: "string", default: "—", description: "Controlled selected value." }, { name: "default-value", type: "string", default: "—", description: "Default selected value." }, { name: "items", type: '(string | {value, label})[]', default: "—", description: "Items for the select. Use json-items in HTML. Enables initial value label display and auto-rendering in &lt;ui-select-content&gt;.", source: "selectProvider" }] },
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
  <ui-select-trigger class="max-w-[180px] w-full">
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
    additionalExamples: [
      {
        title: "Items Mode (with initial value)",
        example: `<ui-select default-value="banana" json-items='[{"value":"apple","label":"Apple"},{"value":"banana","label":"Banana"},{"value":"orange","label":"Orange"},{"value":"grape","label":"Grape"}]'>
  <ui-select-trigger class="max-w-[180px] w-full">
    <ui-select-value placeholder="Select a fruit"></ui-select-value>
  </ui-select-trigger>
  <ui-select-content></ui-select-content>
</ui-select>`,
        readableExample: `<!-- Pass json-items to enable initial value display and auto-rendering -->
<ui-select default-value="banana" json-items='[
  {"value":"apple","label":"Apple"},
  {"value":"banana","label":"Banana"},
  {"value":"orange","label":"Orange"},
  {"value":"grape","label":"Grape"}
]'>
  <ui-select-trigger class="max-w-[180px] w-full">
    <ui-select-value placeholder="Select a fruit"></ui-select-value>
  </ui-select-trigger>
  <ui-select-content></ui-select-content>
</ui-select>`,
      },
      {
        title: "Multiple Selection",
        example: `<ui-select multiple json-items='[{"value":"apple","label":"Apple"},{"value":"banana","label":"Banana"},{"value":"orange","label":"Orange"},{"value":"grape","label":"Grape"},{"value":"mango","label":"Mango"}]'>
  <ui-select-trigger class="max-w-[280px] w-full">
    <ui-select-value placeholder="Select fruits..."></ui-select-value>
  </ui-select-trigger>
  <ui-select-content></ui-select-content>
</ui-select>`,
        readableExample: `<ui-select multiple json-items='[
  {"value":"apple","label":"Apple"},
  {"value":"banana","label":"Banana"},
  {"value":"orange","label":"Orange"},
  {"value":"grape","label":"Grape"},
  {"value":"mango","label":"Mango"}
]'>
  <ui-select-trigger class="max-w-[280px] w-full">
    <ui-select-value placeholder="Select fruits..."></ui-select-value>
  </ui-select-trigger>
  <ui-select-content></ui-select-content>
</ui-select>`,
      },
      {
        title: "Multiple with Default Values",
        example: `<ui-select multiple json-default-value='["banana","grape"]' json-items='[{"value":"apple","label":"Apple"},{"value":"banana","label":"Banana"},{"value":"orange","label":"Orange"},{"value":"grape","label":"Grape"},{"value":"mango","label":"Mango"}]'>
  <ui-select-trigger class="max-w-[280px] w-full">
    <ui-select-value placeholder="Select fruits..."></ui-select-value>
  </ui-select-trigger>
  <ui-select-content></ui-select-content>
</ui-select>`,
        readableExample: `<!-- Use json-default-value for array default values -->
<ui-select multiple json-default-value='["banana","grape"]' json-items='[
  {"value":"apple","label":"Apple"},
  {"value":"banana","label":"Banana"},
  {"value":"orange","label":"Orange"},
  {"value":"grape","label":"Grape"},
  {"value":"mango","label":"Mango"}
]'>
  <ui-select-trigger class="max-w-[280px] w-full">
    <ui-select-value placeholder="Select fruits..."></ui-select-value>
  </ui-select-trigger>
  <ui-select-content></ui-select-content>
</ui-select>`,
      },
    ],
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
      { tag: "ui-sheet-content", props: [{ name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "The side the sheet slides in from." }, { name: "showCloseButton", type: "boolean", default: "true", description: "Whether to show the close button." }] },
      { tag: "ui-sheet-header", props: [] },
      { tag: "ui-sheet-title", props: [] },
      { tag: "ui-sheet-description", props: [] },
      { tag: "ui-sheet-footer", props: [] },
      { tag: "ui-sheet-close", props: [] },
    ],
    example: `<ui-sheet>
  <ui-sheet-trigger>Open Sheet</ui-sheet-trigger>
  <ui-sheet-content>
    <ui-sheet-header>
      <ui-sheet-title>Edit Profile</ui-sheet-title>
      <ui-sheet-description>Make changes to your profile. Click save when done.</ui-sheet-description>
    </ui-sheet-header>
    <div class="space-y-4 px-4 py-4">
      <div class="space-y-2">
        <ui-label>Name</ui-label>
        <ui-input placeholder="Your name"></ui-input>
      </div>
    </div>
    <ui-sheet-footer>
      <ui-sheet-close>Cancel</ui-sheet-close>
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
      { tag: "ui-sidebar-menu-button", props: [{ name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "sidebarLinkable" }, { name: "isActive", type: "boolean", default: "false", description: "Whether active." }, { name: "tooltip", type: "string | TooltipContentProps", default: "—", description: "Tooltip shown on hover when sidebar is collapsed." }, { name: "variant", type: '"default" | "outline"', default: '"default"', description: "The visual style variant." }, { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "The button size." }], enhancedBy: "sidebarLinkable wrapper" },
      { tag: "ui-sidebar-menu-action", props: [] },
      { tag: "ui-sidebar-menu-badge", props: [] },
      { tag: "ui-sidebar-menu-skeleton", props: [] },
      { tag: "ui-sidebar-menu-sub", props: [] },
      { tag: "ui-sidebar-menu-sub-item", props: [] },
      { tag: "ui-sidebar-menu-sub-button", props: [{ name: "size", type: '"sm" | "md"', default: '"md"', description: "The button size." }, { name: "isActive", type: "boolean", default: "false", description: "Whether active." }], enhancedBy: "sidebarSubLinkable wrapper" },
      { tag: "ui-sidebar-trigger", props: [] },
      { tag: "ui-sidebar-rail", props: [] },
      { tag: "ui-sidebar-inset", props: [] },
      { tag: "ui-sidebar-input", props: [] },
      { tag: "ui-sidebar-separator", props: [] },
    ],
    iframeExample: `../examples/sidebar-inset.html`,
    example: `<!-- See iframe preview above -->`,
    readableExample: `<ui-sidebar-provider>
  <ui-sidebar variant="inset" collapsible="icon">
    <ui-sidebar-header>
      <ui-sidebar-menu>
        <ui-sidebar-menu-item>
          <ui-sidebar-menu-button size="lg">
            <span>Acme Inc</span>
          </ui-sidebar-menu-button>
        </ui-sidebar-menu-item>
      </ui-sidebar-menu>
    </ui-sidebar-header>
    <ui-sidebar-content>
      <ui-sidebar-group>
        <ui-sidebar-group-label>Platform</ui-sidebar-group-label>
        <ui-sidebar-group-content>
          <ui-sidebar-menu>
            <ui-sidebar-menu-item>
              <ui-sidebar-menu-button is-active>Dashboard</ui-sidebar-menu-button>
            </ui-sidebar-menu-item>
            <ui-sidebar-menu-item>
              <ui-sidebar-menu-button>Projects</ui-sidebar-menu-button>
            </ui-sidebar-menu-item>
          </ui-sidebar-menu>
        </ui-sidebar-group-content>
      </ui-sidebar-group>
    </ui-sidebar-content>
    <ui-sidebar-footer>...</ui-sidebar-footer>
  </ui-sidebar>
  <ui-sidebar-inset>reactolith
    <header>
      <ui-sidebar-trigger></ui-sidebar-trigger>
      <ui-breadcrumb>...</ui-breadcrumb>
    </header>
    <main>Your page content</main>
  </ui-sidebar-inset>
</ui-sidebar-provider>`,
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
    description: "An input where the user selects a value from within a given range. Supports native form submission, range sliders with Symfony-compatible field names, auto-submit, and value tooltips on thumbs.",
    category: "Forms",
    shadcnUrl: "https://ui.shadcn.com/docs/components/base/slider",
    subComponents: [
      { tag: "ui-slider", props: [
        { name: "value", type: "number | number[]", default: "—", description: "Controlled value. Single number or array." },
        { name: "defaultValue", type: "number | number[]", default: "—", description: "Default value (uncontrolled). Single number or array. Component resets when this changes." },
        { name: "min", type: "number", default: "0", description: "Minimum value." },
        { name: "max", type: "number", default: "100", description: "Maximum value." },
        { name: "step", type: "number", default: "1", description: "Step increment." },
        { name: "name", type: "string", default: "—", description: "Name for form submission. Single slider: uses native Base UI form input. Range slider (2 thumbs): creates hidden inputs named {name}[from] and {name}[to] (Symfony-compatible)." },
        { name: "nameFrom", type: "string", default: "—", description: "Explicit name for the 'from' hidden input (range slider). Overrides {name}[from]." },
        { name: "nameTo", type: "string", default: "—", description: "Explicit name for the 'to' hidden input (range slider). Overrides {name}[to]." },
        { name: "showValue", type: 'boolean | "always" | "hover"', default: "false", description: "Show value indicators above each thumb. true or 'always' = always visible. 'hover' = only visible when hovering over the slider." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the slider is disabled." },
        { name: "onValueChange", type: "(value: number[], thumb: number) => void", default: "—", description: "Callback fired on every value change (during drag)." },
        { name: "onValueCommitted", type: "(value: number[], thumb: number) => void", default: "—", description: "Callback fired when the user finishes dragging." },
      ] },
    ],
    example: `<div class="space-y-4 max-w-md">
  <ui-slider json-default-value="[33]"></ui-slider>
  <ui-slider json-default-value="[25, 75]"></ui-slider>
</div>`,
    additionalExamples: [
      {
        title: "Value Display (Always)",
        example: `<div class="space-y-8 max-w-md pt-8">
  <ui-slider json-default-value="[50]" show-value></ui-slider>
  <ui-slider json-default-value="[25, 75]" show-value></ui-slider>
</div>`,
        readableExample: `<!-- Show value indicators above each thumb (always visible) -->
<ui-slider json-default-value="[50]" show-value></ui-slider>

<!-- Also works with range sliders — each thumb shows its value -->
<ui-slider json-default-value="[25, 75]" show-value></ui-slider>`,
      },
      {
        title: "Value Display (Hover Only)",
        example: `<div class="space-y-8 max-w-md pt-8">
  <ui-slider json-default-value="[50]" show-value="hover"></ui-slider>
  <ui-slider json-default-value="[25, 75]" show-value="hover"></ui-slider>
</div>`,
        readableExample: `<!-- Value indicators appear only when hovering over the slider -->
<ui-slider json-default-value="[50]" show-value="hover"></ui-slider>

<ui-slider json-default-value="[25, 75]" show-value="hover"></ui-slider>`,
      },
      {
        title: "Single Slider with Form Name",
        example: `<form method="post" action="/save" class="space-y-4 max-w-md">
  <ui-field>
    <ui-field-label>Volume</ui-field-label>
    <ui-slider name="volume" json-default-value="[50]" json-max="100"></ui-slider>
  </ui-field>
  <ui-button type="submit">Save</ui-button>
</form>`,
        readableExample: `<!-- Single slider syncs its value to a hidden input named "volume" -->
<ui-slider name="volume" json-default-value="[50]"></ui-slider>

<!-- Submitted form data: volume=50 -->`,
      },
      {
        title: "Range Slider with Symfony-Compatible Names",
        example: `<form method="get" action="/search" class="space-y-4 max-w-md">
  <ui-field>
    <ui-field-label>Price Range</ui-field-label>
    <ui-slider name="price" json-default-value="[200, 800]" json-min="0" json-max="1000" json-step="10"></ui-slider>
  </ui-field>
  <ui-button type="submit">Filter</ui-button>
</form>`,
        readableExample: `<!-- Range slider (2 thumbs) auto-creates two hidden inputs:
     price[from]=200 and price[to]=800 (Symfony-compatible) -->
<ui-slider
  name="price"
  json-default-value="[200, 800]"
  json-min="0"
  json-max="1000"
  json-step="10">
</ui-slider>`,
      },
      {
        title: "Range Slider with Custom Field Names",
        example: `<form method="get" action="/search" class="space-y-4 max-w-md">
  <ui-field>
    <ui-field-label>Age Range</ui-field-label>
    <ui-slider name-from="age_min" name-to="age_max" json-default-value="[18, 65]" json-min="0" json-max="100"></ui-slider>
  </ui-field>
  <ui-button type="submit">Search</ui-button>
</form>`,
        readableExample: `<!-- Use nameFrom/nameTo for custom hidden input names -->
<ui-slider
  name-from="age_min"
  name-to="age_max"
  json-default-value="[18, 65]"
  json-min="0"
  json-max="100">
</ui-slider>

<!-- Submitted form data: age_min=18, age_max=65 -->`,
      },
      {
        title: "Auto-Submit on Change",
        example: `<ui-form method="get" action="/filter">
  <ui-form-item name="brightness" auto-submit="onChange">
    <ui-field>
      <ui-field-label>Brightness</ui-field-label>
      <ui-slider name="brightness" json-default-value="[75]"></ui-slider>
    </ui-field>
  </ui-form-item>
</ui-form>`,
        readableExample: `<!-- Auto-submit when the user finishes dragging the thumb -->
<ui-form method="get" action="/filter">
  <ui-form-item name="brightness" auto-submit="onChange">
    <ui-slider name="brightness" json-default-value="[75]"></ui-slider>
  </ui-form-item>
</ui-form>`,
      },
      {
        title: "Range Slider with Auto-Submit and Form Validation",
        example: `<ui-form method="get" action="/products">
  <ui-form-item name="price" auto-submit="onChange">
    <ui-field>
      <ui-field-label>Price Range (€)</ui-field-label>
      <ui-slider name="price" json-default-value="[100, 500]" json-min="0" json-max="1000" json-step="10"></ui-slider>
    </ui-field>
  </ui-form-item>
</ui-form>`,
        readableExample: `<!-- Range slider with auto-submit.
     Submits price[from] and price[to] when the user stops dragging. -->
<ui-form method="get" action="/products">
  <ui-form-item name="price" auto-submit="onChange">
    <ui-slider
      name="price"
      json-default-value="[100, 500]"
      json-min="0"
      json-max="1000"
      json-step="10">
    </ui-slider>
  </ui-form-item>
</ui-form>`,
      },
      {
        title: "Server-Driven Initial Value",
        example: `<div class="space-y-4 max-w-md">
  <ui-field>
    <ui-field-label>Opacity (server value: 80)</ui-field-label>
    <ui-slider name="opacity" json-default-value="[80]"></ui-slider>
  </ui-field>
</div>`,
        readableExample: `<!-- The backend sets the initial value via defaultValue.
     When the server sends new HTML with a different defaultValue,
     the slider resets automatically. -->

<!-- Twig example: -->
<!-- <ui-slider name="opacity" json-default-value="[{{ entity.opacity }}]"></ui-slider> -->

<!-- Rails example: -->
<!-- <ui-slider name="opacity" json-default-value="[<%= @record.opacity %>]"></ui-slider> -->`,
      },
    ],
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
      { tag: "ui-switch", props: [{ name: "checked", type: "boolean", default: "—", description: "Controlled checked state." }, { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state." }, { name: "disabled", type: "boolean", default: "false", description: "Whether disabled." }, { name: "size", type: '"sm" | "default"', default: '"default"', description: "The size of the switch." }], enhancedBy: "formField behavior — auto-applies aria-invalid and disabled inside ui-form-item" },
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
    example: `<ui-table><ui-table-caption>A list of recent invoices.</ui-table-caption><ui-table-header><ui-table-row><ui-table-head class="w-[100px]">Invoice</ui-table-head><ui-table-head>Status</ui-table-head><ui-table-head>Method</ui-table-head><ui-table-head class="text-right">Amount</ui-table-head></ui-table-row></ui-table-header><ui-table-body><ui-table-row><ui-table-cell class="font-medium">INV001</ui-table-cell><ui-table-cell>Paid</ui-table-cell><ui-table-cell>Credit Card</ui-table-cell><ui-table-cell class="text-right">$250.00</ui-table-cell></ui-table-row><ui-table-row><ui-table-cell class="font-medium">INV002</ui-table-cell><ui-table-cell>Pending</ui-table-cell><ui-table-cell>PayPal</ui-table-cell><ui-table-cell class="text-right">$150.00</ui-table-cell></ui-table-row></ui-table-body></ui-table>`,
    readableExample: `<ui-table>
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
      { tag: "ui-tabs-trigger", props: [{ name: "value", type: "string", default: "—", description: "The tab value." }, { name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkableClose" }], enhancedBy: "linkableClose behavior" },
      { tag: "ui-tabs-content", props: [{ name: "value", type: "string", default: "—", description: "The content panel value." }] },
    ],
    example: `<ui-tabs defaultValue="account" class="max-w-[400px] w-full">
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
      { tag: "ui-textarea", props: [{ name: "placeholder", type: "string", default: "—", description: "Placeholder text." }, { name: "disabled", type: "boolean", default: "false", description: "Whether disabled." }, { name: "rows", type: "number", default: "—", description: "Number of visible rows." }], enhancedBy: "formField behavior — auto-applies aria-invalid and disabled inside ui-form-item" },
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
      { tag: "ui-toggle", props: [{ name: "variant", type: '"default" | "outline"', default: '"default"', description: "Visual variant." }, { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Toggle size." }, { name: "pressed", type: "boolean", default: "—", description: "Controlled pressed state." }, { name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkable" }], enhancedBy: "linkable behavior" },
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
      { tag: "ui-toggle-group-item", props: [{ name: "value", type: "string", default: "—", description: "The item value." }, { name: "href", type: "string", default: "—", description: "URL to navigate to. Renders as a link when set.", source: "linkable" }], enhancedBy: "linkable behavior" },
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
    example: `<div class="flex items-center gap-4">
  <ui-tooltip-provider>
    <ui-tooltip>
      <ui-tooltip-trigger>
            <span>
                <ui-button variant="outline">With Button</ui-button>
            </span>
      </ui-tooltip-trigger>
      <ui-tooltip-content>
        <p>Tooltip on a button</p>
      </ui-tooltip-content>
    </ui-tooltip>
  </ui-tooltip-provider>
  <ui-tooltip-provider>
    <ui-tooltip>
      <ui-tooltip-trigger>
        <span class="underline cursor-pointer">With custom element</span>
      </ui-tooltip-trigger>
      <ui-tooltip-content>
        <p>Tooltip on a span</p>
      </ui-tooltip-content>
    </ui-tooltip>
  </ui-tooltip-provider>
  <ui-tooltip-provider>
    <ui-tooltip>
      <ui-tooltip-trigger>Plain text trigger</ui-tooltip-trigger>
      <ui-tooltip-content>
        <p>Tooltip on plain text</p>
      </ui-tooltip-content>
    </ui-tooltip>
  </ui-tooltip-provider>
</div>`,
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
  {
    name: "Agent",
    slug: "ai-agent",
    description: "Displays an AI agent configuration with its header, instructions, tools, and output schema.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/agent",
    subComponents: [
      { tag: "ui-ai-agent", props: [] },
      { tag: "ui-ai-agent-header", props: [{ name: "name", type: "string", default: "—", description: "The agent name." }, { name: "model", type: "string", default: "—", description: "The model identifier." }] },
      { tag: "ui-ai-agent-content", props: [] },
      { tag: "ui-ai-agent-instructions", props: [] },
      { tag: "ui-ai-agent-tools", props: [] },
      { tag: "ui-ai-agent-tool", props: [{ name: "tool", type: "Tool", default: "—", description: "Tool object with name, description, and parameters." }] },
      { tag: "ui-ai-agent-output", props: [{ name: "schema", type: "string", default: "—", description: "The output schema definition." }] },
    ],
    example: `<ui-ai-agent>
  <ui-ai-agent-header name="Research Agent" model="gpt-4o"></ui-ai-agent-header>
  <ui-ai-agent-content>
    <ui-ai-agent-instructions>Search the web for relevant information and summarize findings.</ui-ai-agent-instructions>
    <ui-ai-agent-tools>
      <ui-ai-agent-tool tool='{"name":"web_search","description":"Search the web","parameters":[]}'></ui-ai-agent-tool>
    </ui-ai-agent-tools>
    <ui-ai-agent-output schema='{"type":"object","properties":{"summary":{"type":"string"}}}'></ui-ai-agent-output>
  </ui-ai-agent-content>
</ui-ai-agent>`,
  },
  {
    name: "Artifact",
    slug: "ai-artifact",
    description: "A panel for displaying generated artifacts such as code, documents, or previews.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/artifact",
    subComponents: [
      { tag: "ui-ai-artifact", props: [] },
      { tag: "ui-ai-artifact-header", props: [] },
      { tag: "ui-ai-artifact-close", props: [] },
      { tag: "ui-ai-artifact-title", props: [] },
      { tag: "ui-ai-artifact-description", props: [] },
      { tag: "ui-ai-artifact-actions", props: [] },
      { tag: "ui-ai-artifact-action", props: [{ name: "tooltip", type: "string", default: "—", description: "Tooltip text for the action." }, { name: "label", type: "string", default: "—", description: "Accessible label for the action." }] },
      { tag: "ui-ai-artifact-content", props: [] },
    ],
    example: `<ui-ai-artifact>
  <ui-ai-artifact-header>
    <ui-ai-artifact-title>Generated Component</ui-ai-artifact-title>
    <ui-ai-artifact-description>A React counter component</ui-ai-artifact-description>
    <ui-ai-artifact-actions>
      <ui-ai-artifact-action tooltip="Copy code" label="Copy"></ui-ai-artifact-action>
      <ui-ai-artifact-action tooltip="Download" label="Download"></ui-ai-artifact-action>
    </ui-ai-artifact-actions>
    <ui-ai-artifact-close></ui-ai-artifact-close>
  </ui-ai-artifact-header>
  <ui-ai-artifact-content>
    <p>Artifact content goes here</p>
  </ui-ai-artifact-content>
</ui-ai-artifact>`,
  },
  {
    name: "Attachments",
    slug: "ai-attachments",
    description: "Displays file attachments in grid, list, or compact layouts with previews and removal actions.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/attachments",
    subComponents: [
      { tag: "ui-ai-attachments", props: [{ name: "variant", type: '"grid" | "list" | "compact"', default: '"grid"', description: "Layout variant for the attachments." }] },
      { tag: "ui-ai-attachment", props: [{ name: "data", type: "AttachmentData", default: "—", description: "Attachment data object." }, { name: "onRemove", type: "() => void", default: "—", description: "Callback when attachment is removed." }] },
      { tag: "ui-ai-attachment-preview", props: [{ name: "fallbackIcon", type: "ReactNode", default: "—", description: "Icon to display when preview is unavailable." }] },
      { tag: "ui-ai-attachment-info", props: [{ name: "showMediaType", type: "boolean", default: "false", description: "Whether to display the media type." }] },
      { tag: "ui-ai-attachment-remove", props: [{ name: "label", type: "string", default: '"Remove"', description: "Accessible label for the remove button." }] },
      { tag: "ui-ai-attachment-hover-card", props: [] },
      { tag: "ui-ai-attachment-hover-card-trigger", props: [] },
      { tag: "ui-ai-attachment-hover-card-content", props: [] },
      { tag: "ui-ai-attachment-empty", props: [] },
    ],
    example: `<ui-ai-attachments variant="grid">
  <ui-ai-attachment data='{"name":"report.pdf","type":"application/pdf","size":1024}'>
    <ui-ai-attachment-preview></ui-ai-attachment-preview>
    <ui-ai-attachment-info showMediaType></ui-ai-attachment-info>
    <ui-ai-attachment-remove label="Remove"></ui-ai-attachment-remove>
  </ui-ai-attachment>
  <ui-ai-attachment data='{"name":"image.png","type":"image/png","size":2048}'>
    <ui-ai-attachment-preview></ui-ai-attachment-preview>
    <ui-ai-attachment-info></ui-ai-attachment-info>
    <ui-ai-attachment-remove></ui-ai-attachment-remove>
  </ui-ai-attachment>
</ui-ai-attachments>`,
  },
  {
    name: "Audio Player",
    slug: "ai-audio-player",
    description: "A media player for audio playback with controls for play, seek, volume, and time display.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/audio-player",
    subComponents: [
      { tag: "ui-ai-audio-player", props: [] },
      { tag: "ui-ai-audio-player-element", props: [{ name: "src", type: "string", default: "—", description: "URL of the audio source." }] },
      { tag: "ui-ai-audio-player-control-bar", props: [] },
      { tag: "ui-ai-audio-player-play-button", props: [] },
      { tag: "ui-ai-audio-player-seek-backward-button", props: [{ name: "seekOffset", type: "number", default: "10", description: "Number of seconds to seek backward." }] },
      { tag: "ui-ai-audio-player-seek-forward-button", props: [{ name: "seekOffset", type: "number", default: "10", description: "Number of seconds to seek forward." }] },
      { tag: "ui-ai-audio-player-time-display", props: [] },
      { tag: "ui-ai-audio-player-time-range", props: [] },
      { tag: "ui-ai-audio-player-duration-display", props: [] },
      { tag: "ui-ai-audio-player-mute-button", props: [] },
      { tag: "ui-ai-audio-player-volume-range", props: [] },
    ],
    example: `<ui-ai-audio-player>
  <ui-ai-audio-player-element src="/audio/sample.mp3"></ui-ai-audio-player-element>
  <ui-ai-audio-player-control-bar>
    <ui-ai-audio-player-seek-backward-button seekOffset="10"></ui-ai-audio-player-seek-backward-button>
    <ui-ai-audio-player-play-button></ui-ai-audio-player-play-button>
    <ui-ai-audio-player-seek-forward-button seekOffset="10"></ui-ai-audio-player-seek-forward-button>
    <ui-ai-audio-player-time-display></ui-ai-audio-player-time-display>
    <ui-ai-audio-player-time-range></ui-ai-audio-player-time-range>
    <ui-ai-audio-player-duration-display></ui-ai-audio-player-duration-display>
    <ui-ai-audio-player-mute-button></ui-ai-audio-player-mute-button>
    <ui-ai-audio-player-volume-range></ui-ai-audio-player-volume-range>
  </ui-ai-audio-player-control-bar>
</ui-ai-audio-player>`,
  },
  {
    name: "Workflow",
    slug: "ai-canvas",
    description: "A ReactFlow-based canvas for building node-based visual workflows with nodes, edges, connections, controls, and panels.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/canvas",
    subComponents: [
      { tag: "ui-ai-canvas", props: [] },
      { tag: "ui-ai-node", props: [{ name: "handles", type: "{ target: boolean; source: boolean }", default: "—", description: "Configure which connection handles to display." }] },
      { tag: "ui-ai-node-header", props: [] },
      { tag: "ui-ai-node-title", props: [] },
      { tag: "ui-ai-node-description", props: [] },
      { tag: "ui-ai-node-action", props: [] },
      { tag: "ui-ai-node-content", props: [] },
      { tag: "ui-ai-node-footer", props: [] },
      { tag: "ui-ai-edge", props: [] },
      { tag: "ui-ai-connection", props: [] },
      { tag: "ui-ai-controls", props: [] },
      { tag: "ui-ai-panel", props: [] },
    ],
    example: `<ui-ai-canvas>
  <ui-ai-node handles='{"target":true,"source":true}'>
    <ui-ai-node-header>
      <ui-ai-node-title>Transform</ui-ai-node-title>
      <ui-ai-node-description>Apply data transformation</ui-ai-node-description>
      <ui-ai-node-action>Edit</ui-ai-node-action>
    </ui-ai-node-header>
    <ui-ai-node-content>
      <p>Converts input data to JSON format</p>
    </ui-ai-node-content>
    <ui-ai-node-footer>Last run: 2 min ago</ui-ai-node-footer>
  </ui-ai-node>
  <ui-ai-edge></ui-ai-edge>
  <ui-ai-connection></ui-ai-connection>
  <ui-ai-controls></ui-ai-controls>
  <ui-ai-panel>
    <p>Panel content</p>
  </ui-ai-panel>
</ui-ai-canvas>`,
  },
  {
    name: "Chain of Thought",
    slug: "ai-chain-of-thought",
    description: "Displays an AI reasoning process with expandable steps, statuses, and search results.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/chain-of-thought",
    subComponents: [
      { tag: "ui-ai-chain-of-thought", props: [{ name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state." }, { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." }] },
      { tag: "ui-ai-chain-of-thought-header", props: [] },
      { tag: "ui-ai-chain-of-thought-step", props: [{ name: "label", type: "ReactNode", default: "—", description: "Step label text." }, { name: "description", type: "ReactNode", default: "—", description: "Step description." }, { name: "status", type: '"complete" | "active" | "pending"', default: '"complete"', description: "Current step status." }] },
      { tag: "ui-ai-chain-of-thought-search-results", props: [] },
      { tag: "ui-ai-chain-of-thought-search-result", props: [] },
      { tag: "ui-ai-chain-of-thought-content", props: [] },
      { tag: "ui-ai-chain-of-thought-image", props: [{ name: "caption", type: "string", default: "—", description: "Image caption text." }] },
    ],
    example: `<ui-ai-chain-of-thought defaultOpen>
  <ui-ai-chain-of-thought-header>Reasoning Steps</ui-ai-chain-of-thought-header>
  <ui-ai-chain-of-thought-content>
    <ui-ai-chain-of-thought-step label="Analyzing query" status="complete"></ui-ai-chain-of-thought-step>
    <ui-ai-chain-of-thought-step label="Searching knowledge base" description="Found 12 relevant documents" status="complete">
      <ui-ai-chain-of-thought-search-results>
        <ui-ai-chain-of-thought-search-result>React documentation</ui-ai-chain-of-thought-search-result>
        <ui-ai-chain-of-thought-search-result>Component patterns</ui-ai-chain-of-thought-search-result>
      </ui-ai-chain-of-thought-search-results>
    </ui-ai-chain-of-thought-step>
    <ui-ai-chain-of-thought-step label="Generating response" status="active"></ui-ai-chain-of-thought-step>
  </ui-ai-chain-of-thought-content>
</ui-ai-chain-of-thought>`,
  },
  {
    name: "Checkpoint",
    slug: "ai-checkpoint",
    description: "A checkpoint marker with an icon and trigger button for reverting or restoring states.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/checkpoint",
    subComponents: [
      { tag: "ui-ai-checkpoint", props: [] },
      { tag: "ui-ai-checkpoint-icon", props: [] },
      { tag: "ui-ai-checkpoint-trigger", props: [{ name: "tooltip", type: "string", default: "—", description: "Tooltip text for the trigger button." }] },
    ],
    example: `<ui-ai-checkpoint>
  <ui-ai-checkpoint-icon></ui-ai-checkpoint-icon>
  <ui-ai-checkpoint-trigger tooltip="Restore to this point">Restore</ui-ai-checkpoint-trigger>
</ui-ai-checkpoint>`,
  },
  {
    name: "Code Block",
    slug: "ai-code-block",
    description: "Syntax-highlighted code display with copy button, line numbers, and language selector.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/code-block",
    subComponents: [
      { tag: "ui-ai-code-block", props: [{ name: "code", type: "string", default: "—", description: "The code string to display." }, { name: "language", type: "BundledLanguage", default: "—", description: "Programming language for syntax highlighting." }, { name: "showLineNumbers", type: "boolean", default: "false", description: "Whether to show line numbers." }] },
      { tag: "ui-ai-code-block-container", props: [{ name: "language", type: "string", default: "—", description: "Language identifier." }] },
      { tag: "ui-ai-code-block-header", props: [] },
      { tag: "ui-ai-code-block-title", props: [] },
      { tag: "ui-ai-code-block-filename", props: [] },
      { tag: "ui-ai-code-block-actions", props: [] },
      { tag: "ui-ai-code-block-content", props: [{ name: "code", type: "string", default: "—", description: "The code string to display." }, { name: "language", type: "BundledLanguage", default: "—", description: "Programming language for syntax highlighting." }, { name: "showLineNumbers", type: "boolean", default: "false", description: "Whether to show line numbers." }] },
      { tag: "ui-ai-code-block-copy-button", props: [{ name: "onCopy", type: "() => void", default: "—", description: "Callback when code is copied." }, { name: "onError", type: "(error: Error) => void", default: "—", description: "Callback on copy error." }, { name: "timeout", type: "number", default: "2000", description: "Duration in ms to show success state." }] },
      { tag: "ui-ai-code-block-language-selector", props: [] },
      { tag: "ui-ai-code-block-language-selector-trigger", props: [] },
      { tag: "ui-ai-code-block-language-selector-value", props: [] },
      { tag: "ui-ai-code-block-language-selector-content", props: [] },
      { tag: "ui-ai-code-block-language-selector-item", props: [] },
    ],
    example: `<ui-ai-code-block code="const greeting = 'Hello, world!';\nconsole.log(greeting);" language="typescript" showLineNumbers>
</ui-ai-code-block>`,
  },
  {
    name: "Commit",
    slug: "ai-commit",
    description: "Displays a git commit with hash, message, author info, file changes, and diff statistics.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/commit",
    subComponents: [
      { tag: "ui-ai-commit", props: [] },
      { tag: "ui-ai-commit-header", props: [] },
      { tag: "ui-ai-commit-hash", props: [] },
      { tag: "ui-ai-commit-message", props: [] },
      { tag: "ui-ai-commit-metadata", props: [] },
      { tag: "ui-ai-commit-separator", props: [] },
      { tag: "ui-ai-commit-info", props: [] },
      { tag: "ui-ai-commit-author", props: [] },
      { tag: "ui-ai-commit-author-avatar", props: [{ name: "initials", type: "string", default: "—", description: "Author initials for the avatar." }] },
      { tag: "ui-ai-commit-timestamp", props: [{ name: "date", type: "Date", default: "—", description: "The commit date." }] },
      { tag: "ui-ai-commit-actions", props: [] },
      { tag: "ui-ai-commit-copy-button", props: [{ name: "hash", type: "string", default: "—", description: "The commit hash to copy." }, { name: "onCopy", type: "() => void", default: "—", description: "Callback on copy." }, { name: "onError", type: "(error: Error) => void", default: "—", description: "Callback on error." }, { name: "timeout", type: "number", default: "—", description: "Duration in ms to show success state." }] },
      { tag: "ui-ai-commit-content", props: [] },
      { tag: "ui-ai-commit-files", props: [] },
      { tag: "ui-ai-commit-file", props: [] },
      { tag: "ui-ai-commit-file-info", props: [] },
      { tag: "ui-ai-commit-file-status", props: [{ name: "status", type: '"added" | "modified" | "deleted" | "renamed"', default: "—", description: "The file change status." }] },
      { tag: "ui-ai-commit-file-icon", props: [] },
      { tag: "ui-ai-commit-file-path", props: [] },
      { tag: "ui-ai-commit-file-changes", props: [] },
      { tag: "ui-ai-commit-file-additions", props: [{ name: "count", type: "number", default: "—", description: "Number of added lines." }] },
      { tag: "ui-ai-commit-file-deletions", props: [{ name: "count", type: "number", default: "—", description: "Number of deleted lines." }] },
    ],
    example: `<ui-ai-commit>
  <ui-ai-commit-header>
    <ui-ai-commit-hash>a1b2c3d</ui-ai-commit-hash>
    <ui-ai-commit-message>Fix authentication flow</ui-ai-commit-message>
  </ui-ai-commit-header>
  <ui-ai-commit-metadata>
    <ui-ai-commit-info>
      <ui-ai-commit-author>
        <ui-ai-commit-author-avatar initials="JD"></ui-ai-commit-author-avatar>
        Jane Doe
      </ui-ai-commit-author>
      <ui-ai-commit-separator></ui-ai-commit-separator>
      <ui-ai-commit-timestamp date="2024-01-15T10:30:00Z"></ui-ai-commit-timestamp>
    </ui-ai-commit-info>
    <ui-ai-commit-actions>
      <ui-ai-commit-copy-button hash="a1b2c3d"></ui-ai-commit-copy-button>
    </ui-ai-commit-actions>
  </ui-ai-commit-metadata>
  <ui-ai-commit-content>
    <ui-ai-commit-files>
      <ui-ai-commit-file>
        <ui-ai-commit-file-info>
          <ui-ai-commit-file-status status="modified"></ui-ai-commit-file-status>
          <ui-ai-commit-file-path>src/auth/login.ts</ui-ai-commit-file-path>
        </ui-ai-commit-file-info>
        <ui-ai-commit-file-changes>
          <ui-ai-commit-file-additions count="12"></ui-ai-commit-file-additions>
          <ui-ai-commit-file-deletions count="3"></ui-ai-commit-file-deletions>
        </ui-ai-commit-file-changes>
      </ui-ai-commit-file>
    </ui-ai-commit-files>
  </ui-ai-commit-content>
</ui-ai-commit>`,
  },
  {
    name: "Confirmation",
    slug: "ai-confirmation",
    description: "An alert dialog for tool execution approval with accept and reject actions.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/confirmation",
    subComponents: [
      { tag: "ui-ai-confirmation", props: [{ name: "approval", type: "ToolUIPartApproval", default: "—", description: "The approval state." }, { name: "state", type: "string", default: "—", description: "The tool execution state." }] },
      { tag: "ui-ai-confirmation-title", props: [] },
      { tag: "ui-ai-confirmation-request", props: [] },
      { tag: "ui-ai-confirmation-accepted", props: [] },
      { tag: "ui-ai-confirmation-rejected", props: [] },
      { tag: "ui-ai-confirmation-actions", props: [] },
      { tag: "ui-ai-confirmation-action", props: [] },
    ],
    example: `<ui-ai-confirmation state="requires-approval">
  <ui-ai-confirmation-title>Execute Shell Command</ui-ai-confirmation-title>
  <ui-ai-confirmation-request>
    <p>The AI wants to run: <code>npm install react</code></p>
  </ui-ai-confirmation-request>
  <ui-ai-confirmation-actions>
    <ui-ai-confirmation-action>Allow</ui-ai-confirmation-action>
    <ui-ai-confirmation-action>Deny</ui-ai-confirmation-action>
  </ui-ai-confirmation-actions>
</ui-ai-confirmation>`,
  },
  {
    name: "Context",
    slug: "ai-context",
    description: "A hover card displaying token usage, model info, and context window utilization.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/context",
    subComponents: [
      { tag: "ui-ai-context", props: [{ name: "usedTokens", type: "number", default: "—", description: "Number of tokens used." }, { name: "maxTokens", type: "number", default: "—", description: "Maximum tokens available." }, { name: "usage", type: "object", default: "—", description: "Detailed usage breakdown object." }, { name: "modelId", type: "string", default: "—", description: "The model identifier." }] },
      { tag: "ui-ai-context-trigger", props: [] },
      { tag: "ui-ai-context-content", props: [] },
      { tag: "ui-ai-context-content-header", props: [] },
      { tag: "ui-ai-context-content-body", props: [] },
      { tag: "ui-ai-context-content-footer", props: [] },
      { tag: "ui-ai-context-input-usage", props: [] },
      { tag: "ui-ai-context-output-usage", props: [] },
      { tag: "ui-ai-context-reasoning-usage", props: [] },
      { tag: "ui-ai-context-cache-usage", props: [] },
    ],
    example: `<ui-ai-context usedTokens="3200" maxTokens="8192" modelId="gpt-4o">
  <ui-ai-context-trigger>3.2k / 8.1k tokens</ui-ai-context-trigger>
  <ui-ai-context-content>
    <ui-ai-context-content-header>Token Usage</ui-ai-context-content-header>
    <ui-ai-context-content-body>
      <ui-ai-context-input-usage></ui-ai-context-input-usage>
      <ui-ai-context-output-usage></ui-ai-context-output-usage>
      <ui-ai-context-reasoning-usage></ui-ai-context-reasoning-usage>
      <ui-ai-context-cache-usage></ui-ai-context-cache-usage>
    </ui-ai-context-content-body>
    <ui-ai-context-content-footer>Model: gpt-4o</ui-ai-context-content-footer>
  </ui-ai-context-content>
</ui-ai-context>`,
  },
  {
    name: "Conversation",
    slug: "ai-conversation",
    description: "A scrollable chat container with stick-to-bottom behavior, empty states, and message download.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/conversation",
    subComponents: [
      { tag: "ui-ai-conversation", props: [] },
      { tag: "ui-ai-conversation-content", props: [] },
      { tag: "ui-ai-conversation-empty-state", props: [{ name: "title", type: "string", default: "—", description: "Empty state title." }, { name: "description", type: "string", default: "—", description: "Empty state description." }, { name: "icon", type: "ReactNode", default: "—", description: "Icon to display." }] },
      { tag: "ui-ai-conversation-scroll-button", props: [] },
      { tag: "ui-ai-conversation-download", props: [{ name: "messages", type: "UIMessage[]", default: "—", description: "Messages to export." }, { name: "filename", type: "string", default: '"conversation.md"', description: "Download filename." }] },
    ],
    example: `<ui-ai-conversation>
  <ui-ai-conversation-content>
    <ui-ai-message from="user">
      <ui-ai-message-content>Hello!</ui-ai-message-content>
    </ui-ai-message>
    <ui-ai-message from="assistant">
      <ui-ai-message-content>Hi there! How can I help?</ui-ai-message-content>
    </ui-ai-message>
  </ui-ai-conversation-content>
  <ui-ai-conversation-scroll-button></ui-ai-conversation-scroll-button>
</ui-ai-conversation>`,
  },
  {
    name: "Environment Variables",
    slug: "ai-environment-variables",
    description: "Displays environment variables with toggle visibility, copy actions, and required indicators.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/environment-variables",
    subComponents: [
      { tag: "ui-ai-environment-variables", props: [{ name: "showValues", type: "boolean", default: "—", description: "Controlled visibility of values." }, { name: "defaultShowValues", type: "boolean", default: "—", description: "Initial visibility state." }, { name: "onShowValuesChange", type: "(show: boolean) => void", default: "—", description: "Callback when visibility changes." }] },
      { tag: "ui-ai-environment-variables-header", props: [] },
      { tag: "ui-ai-environment-variables-title", props: [] },
      { tag: "ui-ai-environment-variables-toggle", props: [] },
      { tag: "ui-ai-environment-variables-content", props: [] },
      { tag: "ui-ai-environment-variable", props: [{ name: "name", type: "string", default: "—", description: "Variable name." }, { name: "value", type: "string", default: "—", description: "Variable value." }] },
      { tag: "ui-ai-environment-variable-name", props: [] },
      { tag: "ui-ai-environment-variable-value", props: [] },
      { tag: "ui-ai-environment-variable-copy-button", props: [{ name: "onCopy", type: "() => void", default: "—", description: "Callback on copy." }, { name: "onError", type: "(error: Error) => void", default: "—", description: "Callback on error." }, { name: "timeout", type: "number", default: "—", description: "Duration in ms to show success state." }, { name: "copyFormat", type: '"name" | "value" | "export"', default: "—", description: "Format for the copied text." }] },
      { tag: "ui-ai-environment-variable-required", props: [] },
    ],
    example: `<ui-ai-environment-variables defaultShowValues>
  <ui-ai-environment-variables-header>
    <ui-ai-environment-variables-title>Environment Variables</ui-ai-environment-variables-title>
    <ui-ai-environment-variables-toggle></ui-ai-environment-variables-toggle>
  </ui-ai-environment-variables-header>
  <ui-ai-environment-variables-content>
    <ui-ai-environment-variable name="DATABASE_URL" value="postgres://localhost:5432/mydb">
      <ui-ai-environment-variable-name></ui-ai-environment-variable-name>
      <ui-ai-environment-variable-value></ui-ai-environment-variable-value>
      <ui-ai-environment-variable-copy-button copyFormat="export"></ui-ai-environment-variable-copy-button>
      <ui-ai-environment-variable-required></ui-ai-environment-variable-required>
    </ui-ai-environment-variable>
    <ui-ai-environment-variable name="API_KEY" value="sk-abc123">
      <ui-ai-environment-variable-name></ui-ai-environment-variable-name>
      <ui-ai-environment-variable-value></ui-ai-environment-variable-value>
      <ui-ai-environment-variable-copy-button copyFormat="value"></ui-ai-environment-variable-copy-button>
    </ui-ai-environment-variable>
  </ui-ai-environment-variables-content>
</ui-ai-environment-variables>`,
  },
  {
    name: "File Tree",
    slug: "ai-file-tree",
    description: "An interactive file tree with expandable folders, file selection, and custom actions.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/file-tree",
    subComponents: [
      { tag: "ui-ai-file-tree", props: [{ name: "selectedPath", type: "string", default: "—", description: "Currently selected file path." }, { name: "onSelect", type: "(path: string) => void", default: "—", description: "Callback when a file is selected." }] },
      { tag: "ui-ai-file-tree-icon", props: [] },
      { tag: "ui-ai-file-tree-name", props: [] },
      { tag: "ui-ai-file-tree-folder", props: [{ name: "path", type: "string", default: "—", description: "Folder path." }, { name: "name", type: "string", default: "—", description: "Display name." }] },
      { tag: "ui-ai-file-tree-file", props: [{ name: "path", type: "string", default: "—", description: "File path." }, { name: "name", type: "string", default: "—", description: "Display name." }, { name: "icon", type: "ReactNode", default: "—", description: "Custom file icon." }] },
      { tag: "ui-ai-file-tree-actions", props: [] },
    ],
    example: `<ui-ai-file-tree selectedPath="src/App.tsx">
  <ui-ai-file-tree-folder path="src" name="src">
    <ui-ai-file-tree-file path="src/App.tsx" name="App.tsx"></ui-ai-file-tree-file>
    <ui-ai-file-tree-file path="src/index.ts" name="index.ts"></ui-ai-file-tree-file>
    <ui-ai-file-tree-folder path="src/components" name="components">
      <ui-ai-file-tree-file path="src/components/Button.tsx" name="Button.tsx"></ui-ai-file-tree-file>
    </ui-ai-file-tree-folder>
  </ui-ai-file-tree-folder>
  <ui-ai-file-tree-file path="package.json" name="package.json"></ui-ai-file-tree-file>
</ui-ai-file-tree>`,
  },
  {
    name: "Image",
    slug: "ai-image",
    description: "Displays a base64-encoded AI-generated image.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/image",
    subComponents: [
      { tag: "ui-ai-image", props: [{ name: "base64", type: "string", default: "—", description: "Base64-encoded image data." }, { name: "alt", type: "string", default: "—", description: "Alt text for the image." }] },
    ],
    example: `<ui-ai-image base64="iVBORw0KGgoAAAANSUhEUg..." alt="AI generated landscape"></ui-ai-image>`,
  },
  {
    name: "Inline Citation",
    slug: "ai-inline-citation",
    description: "Inline citation badges with hover cards showing source details, carousels, and quotes.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/inline-citation",
    subComponents: [
      { tag: "ui-ai-inline-citation", props: [] },
      { tag: "ui-ai-inline-citation-text", props: [] },
      { tag: "ui-ai-inline-citation-card", props: [] },
      { tag: "ui-ai-inline-citation-card-trigger", props: [{ name: "sources", type: "string[]", default: "—", description: "Array of source URLs." }] },
      { tag: "ui-ai-inline-citation-card-body", props: [] },
      { tag: "ui-ai-inline-citation-source", props: [{ name: "title", type: "string", default: "—", description: "Source title." }, { name: "url", type: "string", default: "—", description: "Source URL." }, { name: "description", type: "string", default: "—", description: "Source description." }] },
      { tag: "ui-ai-inline-citation-quote", props: [] },
    ],
    example: `<p>
  React is a JavaScript library for building user interfaces
  <ui-ai-inline-citation>
    <ui-ai-inline-citation-card>
      <ui-ai-inline-citation-card-trigger sources='["https://react.dev"]'>[1]</ui-ai-inline-citation-card-trigger>
      <ui-ai-inline-citation-card-body>
        <ui-ai-inline-citation-source title="React Documentation" url="https://react.dev" description="Official React documentation"></ui-ai-inline-citation-source>
        <ui-ai-inline-citation-quote>React lets you build user interfaces out of individual pieces called components.</ui-ai-inline-citation-quote>
      </ui-ai-inline-citation-card-body>
    </ui-ai-inline-citation-card>
  </ui-ai-inline-citation>.
</p>`,
  },
  {
    name: "JSX Preview",
    slug: "ai-jsx-preview",
    description: "Renders JSX strings as live previews with streaming support and error handling.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/jsx-preview",
    subComponents: [
      { tag: "ui-ai-jsx-preview", props: [{ name: "jsx", type: "string", default: "—", description: "JSX string to render." }, { name: "isStreaming", type: "boolean", default: "—", description: "Whether the JSX is still streaming." }, { name: "components", type: "object", default: "—", description: "Custom components available in the JSX." }, { name: "bindings", type: "object", default: "—", description: "Variable bindings for the JSX." }, { name: "onError", type: "(error: Error) => void", default: "—", description: "Callback on render error." }] },
      { tag: "ui-ai-jsx-preview-content", props: [] },
      { tag: "ui-ai-jsx-preview-error", props: [] },
    ],
    example: `<ui-ai-jsx-preview jsx="<div className='p-4'><h1>Hello World</h1><p>This is a live preview.</p></div>">
  <ui-ai-jsx-preview-content></ui-ai-jsx-preview-content>
  <ui-ai-jsx-preview-error></ui-ai-jsx-preview-error>
</ui-ai-jsx-preview>`,
  },
  {
    name: "Message",
    slug: "ai-message",
    description: "A chat message component with role-based styling, actions, branching, and streaming response support.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/message",
    subComponents: [
      { tag: "ui-ai-message", props: [{ name: "from", type: '"user" | "assistant" | "system" | "tool"', default: "—", description: "The message sender role." }] },
      { tag: "ui-ai-message-content", props: [] },
      { tag: "ui-ai-message-actions", props: [] },
      { tag: "ui-ai-message-action", props: [{ name: "tooltip", type: "string", default: "—", description: "Tooltip text." }, { name: "label", type: "string", default: "—", description: "Accessible label." }] },
      { tag: "ui-ai-message-branch", props: [{ name: "defaultBranch", type: "number", default: "—", description: "Default branch index." }, { name: "onBranchChange", type: "(branchIndex: number) => void", default: "—", description: "Callback when branch changes." }] },
      { tag: "ui-ai-message-branch-content", props: [] },
      { tag: "ui-ai-message-branch-selector", props: [] },
      { tag: "ui-ai-message-branch-previous", props: [] },
      { tag: "ui-ai-message-branch-next", props: [] },
      { tag: "ui-ai-message-branch-page", props: [] },
      { tag: "ui-ai-message-response", props: [] },
      { tag: "ui-ai-message-toolbar", props: [] },
    ],
    example: `<ui-ai-message from="user">
  <ui-ai-message-content>What is React?</ui-ai-message-content>
</ui-ai-message>
<ui-ai-message from="assistant">
  <ui-ai-message-content>
    <ui-ai-message-response>React is a JavaScript library for building user interfaces.</ui-ai-message-response>
  </ui-ai-message-content>
  <ui-ai-message-actions>
    <ui-ai-message-action tooltip="Copy" label="Copy"></ui-ai-message-action>
    <ui-ai-message-action tooltip="Regenerate" label="Regenerate"></ui-ai-message-action>
  </ui-ai-message-actions>
</ui-ai-message>`,
  },
  {
    name: "Mic Selector",
    slug: "ai-mic-selector",
    description: "A popover-based microphone device selector.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/mic-selector",
    subComponents: [
      { tag: "ui-ai-mic-selector", props: [{ name: "value", type: "string", default: "—", description: "Controlled selected device." }, { name: "defaultValue", type: "string", default: "—", description: "Default selected device." }, { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Callback when selection changes." }] },
      { tag: "ui-ai-mic-selector-trigger", props: [] },
      { tag: "ui-ai-mic-selector-content", props: [] },
      { tag: "ui-ai-mic-selector-input", props: [] },
      { tag: "ui-ai-mic-selector-list", props: [] },
      { tag: "ui-ai-mic-selector-empty", props: [] },
      { tag: "ui-ai-mic-selector-item", props: [] },
      { tag: "ui-ai-mic-selector-label", props: [] },
      { tag: "ui-ai-mic-selector-value", props: [] },
    ],
    example: `<ui-ai-mic-selector>
  <ui-ai-mic-selector-trigger>
    <ui-ai-mic-selector-value>Select microphone</ui-ai-mic-selector-value>
  </ui-ai-mic-selector-trigger>
  <ui-ai-mic-selector-content>
    <ui-ai-mic-selector-input placeholder="Search devices..."></ui-ai-mic-selector-input>
    <ui-ai-mic-selector-list>
      <ui-ai-mic-selector-empty>No devices found.</ui-ai-mic-selector-empty>
      <ui-ai-mic-selector-item>
        <ui-ai-mic-selector-label>Built-in Microphone</ui-ai-mic-selector-label>
      </ui-ai-mic-selector-item>
      <ui-ai-mic-selector-item>
        <ui-ai-mic-selector-label>USB Microphone</ui-ai-mic-selector-label>
      </ui-ai-mic-selector-item>
    </ui-ai-mic-selector-list>
  </ui-ai-mic-selector-content>
</ui-ai-mic-selector>`,
  },
  {
    name: "Model Selector",
    slug: "ai-model-selector",
    description: "A dialog-based model picker with search, grouping, provider logos, and keyboard shortcuts.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/model-selector",
    subComponents: [
      { tag: "ui-ai-model-selector", props: [] },
      { tag: "ui-ai-model-selector-trigger", props: [] },
      { tag: "ui-ai-model-selector-content", props: [{ name: "title", type: "ReactNode", default: "—", description: "Dialog title." }] },
      { tag: "ui-ai-model-selector-dialog", props: [] },
      { tag: "ui-ai-model-selector-input", props: [] },
      { tag: "ui-ai-model-selector-list", props: [] },
      { tag: "ui-ai-model-selector-empty", props: [] },
      { tag: "ui-ai-model-selector-group", props: [] },
      { tag: "ui-ai-model-selector-item", props: [] },
      { tag: "ui-ai-model-selector-shortcut", props: [] },
      { tag: "ui-ai-model-selector-separator", props: [] },
      { tag: "ui-ai-model-selector-logo", props: [{ name: "provider", type: "string", default: "—", description: "Provider name for the logo." }] },
      { tag: "ui-ai-model-selector-logo-group", props: [] },
      { tag: "ui-ai-model-selector-name", props: [] },
    ],
    example: `<ui-ai-model-selector>
  <ui-ai-model-selector-trigger>Select Model</ui-ai-model-selector-trigger>
  <ui-ai-model-selector-content title="Choose a model">
    <ui-ai-model-selector-input placeholder="Search models..."></ui-ai-model-selector-input>
    <ui-ai-model-selector-list>
      <ui-ai-model-selector-empty>No models found.</ui-ai-model-selector-empty>
      <ui-ai-model-selector-group>
        <ui-ai-model-selector-item>
          <ui-ai-model-selector-logo provider="openai"></ui-ai-model-selector-logo>
          <ui-ai-model-selector-name>GPT-4o</ui-ai-model-selector-name>
          <ui-ai-model-selector-shortcut>⌘1</ui-ai-model-selector-shortcut>
        </ui-ai-model-selector-item>
        <ui-ai-model-selector-item>
          <ui-ai-model-selector-logo provider="anthropic"></ui-ai-model-selector-logo>
          <ui-ai-model-selector-name>Claude 3.5 Sonnet</ui-ai-model-selector-name>
          <ui-ai-model-selector-shortcut>⌘2</ui-ai-model-selector-shortcut>
        </ui-ai-model-selector-item>
      </ui-ai-model-selector-group>
    </ui-ai-model-selector-list>
  </ui-ai-model-selector-content>
</ui-ai-model-selector>`,
  },
  {
    name: "Open In Chat",
    slug: "ai-open-in-chat",
    description: "A dropdown menu with preset links to open a query in external AI chat services.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/open-in-chat",
    subComponents: [
      { tag: "ui-ai-open-in", props: [{ name: "query", type: "string", default: "—", description: "The query to pass to external services." }] },
      { tag: "ui-ai-open-in-trigger", props: [] },
      { tag: "ui-ai-open-in-content", props: [] },
      { tag: "ui-ai-open-in-item", props: [] },
      { tag: "ui-ai-open-in-label", props: [] },
      { tag: "ui-ai-open-in-separator", props: [] },
      { tag: "ui-ai-open-in-chat-gpt", props: [] },
      { tag: "ui-ai-open-in-claude", props: [] },
      { tag: "ui-ai-open-in-t3", props: [] },
      { tag: "ui-ai-open-in-scira", props: [] },
      { tag: "ui-ai-open-in-v0", props: [] },
      { tag: "ui-ai-open-in-cursor", props: [] },
    ],
    example: `<ui-ai-open-in query="How to build a React component?">
  <ui-ai-open-in-trigger>Open in...</ui-ai-open-in-trigger>
  <ui-ai-open-in-content>
    <ui-ai-open-in-label>Open in</ui-ai-open-in-label>
    <ui-ai-open-in-chat-gpt></ui-ai-open-in-chat-gpt>
    <ui-ai-open-in-claude></ui-ai-open-in-claude>
    <ui-ai-open-in-separator></ui-ai-open-in-separator>
    <ui-ai-open-in-v0></ui-ai-open-in-v0>
    <ui-ai-open-in-cursor></ui-ai-open-in-cursor>
  </ui-ai-open-in-content>
</ui-ai-open-in>`,
  },
  {
    name: "Package Info",
    slug: "ai-package-info",
    description: "Displays package metadata with version changes, change types, and dependency lists.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/package-info",
    subComponents: [
      { tag: "ui-ai-package-info", props: [{ name: "name", type: "string", default: "—", description: "Package name." }, { name: "currentVersion", type: "string", default: "—", description: "Current installed version." }, { name: "newVersion", type: "string", default: "—", description: "New available version." }, { name: "changeType", type: '"major" | "minor" | "patch" | "dev"', default: "—", description: "Type of version change." }] },
      { tag: "ui-ai-package-info-header", props: [] },
      { tag: "ui-ai-package-info-name", props: [] },
      { tag: "ui-ai-package-info-change-type", props: [] },
      { tag: "ui-ai-package-info-version", props: [] },
      { tag: "ui-ai-package-info-description", props: [] },
      { tag: "ui-ai-package-info-content", props: [] },
      { tag: "ui-ai-package-info-dependencies", props: [] },
      { tag: "ui-ai-package-info-dependency", props: [{ name: "name", type: "string", default: "—", description: "Dependency name." }, { name: "version", type: "string", default: "—", description: "Dependency version." }] },
    ],
    example: `<ui-ai-package-info name="react" currentVersion="18.2.0" newVersion="19.0.0" changeType="major">
  <ui-ai-package-info-header>
    <ui-ai-package-info-name></ui-ai-package-info-name>
    <ui-ai-package-info-change-type></ui-ai-package-info-change-type>
    <ui-ai-package-info-version></ui-ai-package-info-version>
  </ui-ai-package-info-header>
  <ui-ai-package-info-description>A JavaScript library for building user interfaces.</ui-ai-package-info-description>
  <ui-ai-package-info-content>
    <ui-ai-package-info-dependencies>
      <ui-ai-package-info-dependency name="react-dom" version="^19.0.0"></ui-ai-package-info-dependency>
      <ui-ai-package-info-dependency name="scheduler" version="^0.24.0"></ui-ai-package-info-dependency>
    </ui-ai-package-info-dependencies>
  </ui-ai-package-info-content>
</ui-ai-package-info>`,
  },
  {
    name: "Persona",
    slug: "ai-persona",
    description: "An animated AI persona avatar that reflects idle, listening, thinking, and speaking states.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/persona",
    subComponents: [
      { tag: "ui-ai-persona", props: [{ name: "state", type: '"idle" | "listening" | "thinking" | "speaking"', default: "—", description: "Current persona state." }, { name: "variant", type: "string", default: "—", description: "Visual variant of the persona." }] },
    ],
    example: `<ui-ai-persona state="thinking" variant="obsidian"></ui-ai-persona>`,
  },
  {
    name: "Plan",
    slug: "ai-plan",
    description: "A collapsible plan component with streaming support, title, description, and action items.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/plan",
    subComponents: [
      { tag: "ui-ai-plan", props: [{ name: "isStreaming", type: "boolean", default: "—", description: "Whether the plan is still streaming." }] },
      { tag: "ui-ai-plan-header", props: [] },
      { tag: "ui-ai-plan-title", props: [] },
      { tag: "ui-ai-plan-description", props: [] },
      { tag: "ui-ai-plan-action", props: [] },
      { tag: "ui-ai-plan-content", props: [] },
      { tag: "ui-ai-plan-footer", props: [] },
      { tag: "ui-ai-plan-trigger", props: [] },
    ],
    example: `<ui-ai-plan>
  <ui-ai-plan-header>
    <ui-ai-plan-title>Implementation Plan</ui-ai-plan-title>
    <ui-ai-plan-description>Steps to build the authentication system</ui-ai-plan-description>
    <ui-ai-plan-trigger></ui-ai-plan-trigger>
  </ui-ai-plan-header>
  <ui-ai-plan-content>
    <p>1. Set up OAuth provider</p>
    <p>2. Create login and signup pages</p>
    <p>3. Implement session management</p>
  </ui-ai-plan-content>
  <ui-ai-plan-footer>
    <ui-ai-plan-action>Execute Plan</ui-ai-plan-action>
  </ui-ai-plan-footer>
</ui-ai-plan>`,
  },
  {
    name: "Prompt Input",
    slug: "ai-prompt-input",
    description: "A rich prompt input form with file attachments, action menus, model selection, and submit controls.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/prompt-input",
    subComponents: [
      { tag: "ui-ai-prompt-input-provider", props: [{ name: "initialInput", type: "string", default: "—", description: "Initial input value." }] },
      { tag: "ui-ai-prompt-input", props: [{ name: "accept", type: "string", default: "—", description: "Accepted file types." }, { name: "multiple", type: "boolean", default: "—", description: "Allow multiple file uploads." }, { name: "globalDrop", type: "boolean", default: "—", description: "Enable global drag-and-drop." }, { name: "maxFiles", type: "number", default: "—", description: "Maximum number of files." }, { name: "maxFileSize", type: "number", default: "—", description: "Maximum file size in bytes." }] },
      { tag: "ui-ai-prompt-input-body", props: [] },
      { tag: "ui-ai-prompt-input-textarea", props: [] },
      { tag: "ui-ai-prompt-input-header", props: [] },
      { tag: "ui-ai-prompt-input-footer", props: [] },
      { tag: "ui-ai-prompt-input-tools", props: [] },
      { tag: "ui-ai-prompt-input-button", props: [{ name: "tooltip", type: "string", default: "—", description: "Tooltip text for the button." }] },
      { tag: "ui-ai-prompt-input-action-menu", props: [] },
      { tag: "ui-ai-prompt-input-action-menu-trigger", props: [] },
      { tag: "ui-ai-prompt-input-action-menu-content", props: [] },
      { tag: "ui-ai-prompt-input-action-menu-item", props: [] },
      { tag: "ui-ai-prompt-input-action-add-attachments", props: [{ name: "label", type: "string", default: '"Add photos or files"', description: "Button label." }] },
      { tag: "ui-ai-prompt-input-action-add-screenshot", props: [{ name: "label", type: "string", default: '"Take screenshot"', description: "Button label." }] },
      { tag: "ui-ai-prompt-input-submit", props: [{ name: "status", type: "ChatStatus", default: "—", description: "Current chat status." }, { name: "onStop", type: "() => void", default: "—", description: "Callback to stop generation." }] },
      { tag: "ui-ai-prompt-input-select", props: [] },
      { tag: "ui-ai-prompt-input-select-trigger", props: [] },
      { tag: "ui-ai-prompt-input-select-content", props: [] },
      { tag: "ui-ai-prompt-input-select-item", props: [] },
      { tag: "ui-ai-prompt-input-select-value", props: [] },
      { tag: "ui-ai-prompt-input-hover-card", props: [] },
      { tag: "ui-ai-prompt-input-hover-card-trigger", props: [] },
      { tag: "ui-ai-prompt-input-hover-card-content", props: [] },
      { tag: "ui-ai-prompt-input-tabs-list", props: [] },
      { tag: "ui-ai-prompt-input-tab", props: [] },
      { tag: "ui-ai-prompt-input-tab-label", props: [] },
      { tag: "ui-ai-prompt-input-tab-body", props: [] },
      { tag: "ui-ai-prompt-input-tab-item", props: [] },
      { tag: "ui-ai-prompt-input-command", props: [] },
      { tag: "ui-ai-prompt-input-command-input", props: [] },
      { tag: "ui-ai-prompt-input-command-list", props: [] },
      { tag: "ui-ai-prompt-input-command-empty", props: [] },
      { tag: "ui-ai-prompt-input-command-group", props: [] },
      { tag: "ui-ai-prompt-input-command-item", props: [] },
      { tag: "ui-ai-prompt-input-command-separator", props: [] },
    ],
    example: `<ui-ai-prompt-input-provider>
  <ui-ai-prompt-input>
    <ui-ai-prompt-input-body>
      <ui-ai-prompt-input-textarea placeholder="Ask anything..."></ui-ai-prompt-input-textarea>
    </ui-ai-prompt-input-body>
    <ui-ai-prompt-input-footer>
      <ui-ai-prompt-input-tools>
        <ui-ai-prompt-input-action-add-attachments label="Add photos or files"></ui-ai-prompt-input-action-add-attachments>
      </ui-ai-prompt-input-tools>
      <ui-ai-prompt-input-submit status="ready"></ui-ai-prompt-input-submit>
    </ui-ai-prompt-input-footer>
  </ui-ai-prompt-input>
</ui-ai-prompt-input-provider>`,
  },
  {
    name: "Queue",
    slug: "ai-queue",
    description: "A task queue with collapsible sections, item indicators, descriptions, and file attachments.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/queue",
    subComponents: [
      { tag: "ui-ai-queue", props: [] },
      { tag: "ui-ai-queue-list", props: [] },
      { tag: "ui-ai-queue-section", props: [] },
      { tag: "ui-ai-queue-section-trigger", props: [] },
      { tag: "ui-ai-queue-section-label", props: [{ name: "count", type: "number", default: "—", description: "Number of items in section." }, { name: "label", type: "string", default: "—", description: "Section label." }, { name: "icon", type: "ReactNode", default: "—", description: "Section icon." }] },
      { tag: "ui-ai-queue-section-content", props: [] },
      { tag: "ui-ai-queue-item", props: [] },
      { tag: "ui-ai-queue-item-indicator", props: [{ name: "completed", type: "boolean", default: "—", description: "Whether the item is completed." }] },
      { tag: "ui-ai-queue-item-content", props: [{ name: "completed", type: "boolean", default: "—", description: "Whether the item is completed." }] },
      { tag: "ui-ai-queue-item-description", props: [{ name: "completed", type: "boolean", default: "—", description: "Whether the item is completed." }] },
      { tag: "ui-ai-queue-item-actions", props: [] },
      { tag: "ui-ai-queue-item-action", props: [] },
      { tag: "ui-ai-queue-item-attachment", props: [] },
      { tag: "ui-ai-queue-item-image", props: [] },
      { tag: "ui-ai-queue-item-file", props: [] },
    ],
    example: `<ui-ai-queue>
  <ui-ai-queue-list>
    <ui-ai-queue-section>
      <ui-ai-queue-section-trigger>
        <ui-ai-queue-section-label label="In Progress" count="2"></ui-ai-queue-section-label>
      </ui-ai-queue-section-trigger>
      <ui-ai-queue-section-content>
        <ui-ai-queue-item>
          <ui-ai-queue-item-indicator></ui-ai-queue-item-indicator>
          <ui-ai-queue-item-content>Build authentication flow</ui-ai-queue-item-content>
          <ui-ai-queue-item-description>Setting up OAuth providers</ui-ai-queue-item-description>
        </ui-ai-queue-item>
      </ui-ai-queue-section-content>
    </ui-ai-queue-section>
    <ui-ai-queue-section>
      <ui-ai-queue-section-trigger>
        <ui-ai-queue-section-label label="Completed" count="1"></ui-ai-queue-section-label>
      </ui-ai-queue-section-trigger>
      <ui-ai-queue-section-content>
        <ui-ai-queue-item>
          <ui-ai-queue-item-indicator completed></ui-ai-queue-item-indicator>
          <ui-ai-queue-item-content completed>Set up project structure</ui-ai-queue-item-content>
        </ui-ai-queue-item>
      </ui-ai-queue-section-content>
    </ui-ai-queue-section>
  </ui-ai-queue-list>
</ui-ai-queue>`,
  },
  {
    name: "Reasoning",
    slug: "ai-reasoning",
    description: "A collapsible reasoning block that shows AI thinking process with streaming and duration display.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/reasoning",
    subComponents: [
      { tag: "ui-ai-reasoning", props: [{ name: "isStreaming", type: "boolean", default: "—", description: "Whether reasoning is still streaming." }, { name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "defaultOpen", type: "boolean", default: "—", description: "Initial open state." }, { name: "duration", type: "number", default: "—", description: "Thinking duration in seconds." }] },
      { tag: "ui-ai-reasoning-trigger", props: [] },
      { tag: "ui-ai-reasoning-content", props: [] },
    ],
    example: `<ui-ai-reasoning defaultOpen duration="3">
  <ui-ai-reasoning-trigger></ui-ai-reasoning-trigger>
  <ui-ai-reasoning-content>I need to analyze the user's question about React hooks. Let me consider the key points about useState and useEffect...</ui-ai-reasoning-content>
</ui-ai-reasoning>`,
  },
  {
    name: "Sandbox",
    slug: "ai-sandbox",
    description: "A collapsible sandbox environment with tabbed content for running and previewing code.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/sandbox",
    subComponents: [
      { tag: "ui-ai-sandbox", props: [] },
      { tag: "ui-ai-sandbox-header", props: [{ name: "title", type: "string", default: "—", description: "Sandbox title." }, { name: "state", type: "string", default: "—", description: "The tool execution state." }] },
      { tag: "ui-ai-sandbox-content", props: [] },
      { tag: "ui-ai-sandbox-tabs", props: [] },
      { tag: "ui-ai-sandbox-tabs-bar", props: [] },
      { tag: "ui-ai-sandbox-tabs-list", props: [] },
      { tag: "ui-ai-sandbox-tabs-trigger", props: [] },
      { tag: "ui-ai-sandbox-tab-content", props: [] },
    ],
    example: `<ui-ai-sandbox>
  <ui-ai-sandbox-header title="Code Sandbox" state="complete"></ui-ai-sandbox-header>
  <ui-ai-sandbox-content>
    <ui-ai-sandbox-tabs>
      <ui-ai-sandbox-tabs-bar>
        <ui-ai-sandbox-tabs-list>
          <ui-ai-sandbox-tabs-trigger>Code</ui-ai-sandbox-tabs-trigger>
          <ui-ai-sandbox-tabs-trigger>Preview</ui-ai-sandbox-tabs-trigger>
        </ui-ai-sandbox-tabs-list>
      </ui-ai-sandbox-tabs-bar>
      <ui-ai-sandbox-tab-content>
        <p>Code editor content</p>
      </ui-ai-sandbox-tab-content>
      <ui-ai-sandbox-tab-content>
        <p>Preview content</p>
      </ui-ai-sandbox-tab-content>
    </ui-ai-sandbox-tabs>
  </ui-ai-sandbox-content>
</ui-ai-sandbox>`,
  },
  {
    name: "Schema Display",
    slug: "ai-schema-display",
    description: "Renders API schema documentation with HTTP method badges, parameters, and request/response bodies.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/schema-display",
    subComponents: [
      { tag: "ui-ai-schema-display", props: [{ name: "method", type: "string", default: "—", description: "HTTP method (GET, POST, etc.)." }, { name: "path", type: "string", default: "—", description: "API endpoint path." }, { name: "description", type: "string", default: "—", description: "Endpoint description." }] },
      { tag: "ui-ai-schema-display-header", props: [] },
      { tag: "ui-ai-schema-display-method", props: [] },
      { tag: "ui-ai-schema-display-path", props: [] },
      { tag: "ui-ai-schema-display-description", props: [] },
      { tag: "ui-ai-schema-display-content", props: [] },
      { tag: "ui-ai-schema-display-body", props: [] },
      { tag: "ui-ai-schema-display-example", props: [] },
      { tag: "ui-ai-schema-display-parameter", props: [] },
      { tag: "ui-ai-schema-display-parameters", props: [] },
      { tag: "ui-ai-schema-display-property", props: [{ name: "depth", type: "number", default: "—", description: "Nesting depth for indentation." }] },
      { tag: "ui-ai-schema-display-request", props: [] },
      { tag: "ui-ai-schema-display-response", props: [] },
    ],
    example: `<ui-ai-schema-display method="POST" path="/api/users" description="Create a new user account">
  <ui-ai-schema-display-header>
    <ui-ai-schema-display-method></ui-ai-schema-display-method>
    <ui-ai-schema-display-path></ui-ai-schema-display-path>
  </ui-ai-schema-display-header>
  <ui-ai-schema-display-description></ui-ai-schema-display-description>
  <ui-ai-schema-display-content>
    <ui-ai-schema-display-request>
      <ui-ai-schema-display-body>
        <ui-ai-schema-display-property depth="0">name: string</ui-ai-schema-display-property>
        <ui-ai-schema-display-property depth="0">email: string</ui-ai-schema-display-property>
      </ui-ai-schema-display-body>
    </ui-ai-schema-display-request>
    <ui-ai-schema-display-response>
      <ui-ai-schema-display-body>
        <ui-ai-schema-display-property depth="0">id: number</ui-ai-schema-display-property>
        <ui-ai-schema-display-property depth="0">name: string</ui-ai-schema-display-property>
      </ui-ai-schema-display-body>
    </ui-ai-schema-display-response>
  </ui-ai-schema-display-content>
</ui-ai-schema-display>`,
  },
  {
    name: "Shimmer",
    slug: "ai-shimmer",
    description: "A text shimmer effect for highlighting AI-generated content with customizable animation.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/shimmer",
    subComponents: [
      { tag: "ui-ai-shimmer", props: [{ name: "as", type: "string", default: '"p"', description: "HTML element type to render." }, { name: "duration", type: "number", default: "2", description: "Animation duration in seconds." }, { name: "spread", type: "number", default: "2", description: "Shimmer spread width." }] },
    ],
    example: `<ui-ai-shimmer duration="2" spread="2">This text has a shimmer effect applied to it.</ui-ai-shimmer>`,
  },
  {
    name: "Snippet",
    slug: "ai-snippet",
    description: "A code snippet display with inline copy button for quick sharing of short code strings.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/snippet",
    subComponents: [
      { tag: "ui-ai-snippet", props: [{ name: "code", type: "string", default: "—", description: "The code string to display." }] },
      { tag: "ui-ai-snippet-addon", props: [] },
      { tag: "ui-ai-snippet-text", props: [] },
      { tag: "ui-ai-snippet-input", props: [] },
      { tag: "ui-ai-snippet-copy-button", props: [{ name: "onCopy", type: "() => void", default: "—", description: "Callback on copy." }, { name: "onError", type: "(error: Error) => void", default: "—", description: "Callback on error." }, { name: "timeout", type: "number", default: "—", description: "Duration in ms to show success state." }] },
    ],
    example: `<ui-ai-snippet code="npm install reactolith-ui">
  <ui-ai-snippet-addon>$</ui-ai-snippet-addon>
  <ui-ai-snippet-text></ui-ai-snippet-text>
  <ui-ai-snippet-copy-button></ui-ai-snippet-copy-button>
</ui-ai-snippet>`,
  },
  {
    name: "Sources",
    slug: "ai-sources",
    description: "A collapsible list of referenced sources with count badge and linked source items.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/sources",
    subComponents: [
      { tag: "ui-ai-sources", props: [] },
      { tag: "ui-ai-sources-trigger", props: [{ name: "count", type: "number", default: "—", description: "Number of sources." }] },
      { tag: "ui-ai-sources-content", props: [] },
      { tag: "ui-ai-source", props: [] },
    ],
    example: `<ui-ai-sources>
  <ui-ai-sources-trigger count="3">3 sources</ui-ai-sources-trigger>
  <ui-ai-sources-content>
    <ui-ai-source href="https://react.dev">React Documentation</ui-ai-source>
    <ui-ai-source href="https://nextjs.org">Next.js Documentation</ui-ai-source>
    <ui-ai-source href="https://tailwindcss.com">Tailwind CSS</ui-ai-source>
  </ui-ai-sources-content>
</ui-ai-sources>`,
  },
  {
    name: "Speech Input",
    slug: "ai-speech-input",
    description: "A microphone button for speech-to-text input with transcription callbacks.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/speech-input",
    subComponents: [
      { tag: "ui-ai-speech-input", props: [{ name: "lang", type: "string", default: '"en-US"', description: "Language for speech recognition." }] },
    ],
    example: `<ui-ai-speech-input lang="en-US"></ui-ai-speech-input>`,
  },
  {
    name: "Stack Trace",
    slug: "ai-stack-trace",
    description: "Displays error stack traces with collapsible frames, error type/message parsing, and copy actions.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/stack-trace",
    subComponents: [
      { tag: "ui-ai-stack-trace", props: [{ name: "trace", type: "string", default: "—", description: "The stack trace string." }, { name: "open", type: "boolean", default: "—", description: "Controlled open state." }, { name: "defaultOpen", type: "boolean", default: "—", description: "Initial open state." }] },
      { tag: "ui-ai-stack-trace-header", props: [] },
      { tag: "ui-ai-stack-trace-error", props: [] },
      { tag: "ui-ai-stack-trace-error-type", props: [] },
      { tag: "ui-ai-stack-trace-error-message", props: [] },
      { tag: "ui-ai-stack-trace-actions", props: [] },
      { tag: "ui-ai-stack-trace-copy-button", props: [{ name: "onCopy", type: "() => void", default: "—", description: "Callback on copy." }, { name: "onError", type: "(error: Error) => void", default: "—", description: "Callback on error." }, { name: "timeout", type: "number", default: "—", description: "Duration in ms to show success state." }] },
      { tag: "ui-ai-stack-trace-expand-button", props: [] },
      { tag: "ui-ai-stack-trace-content", props: [{ name: "maxHeight", type: "number", default: "400", description: "Maximum height in pixels." }] },
      { tag: "ui-ai-stack-trace-frames", props: [{ name: "showInternalFrames", type: "boolean", default: "true", description: "Whether to show internal frames." }] },
    ],
    example: `<ui-ai-stack-trace trace="TypeError: Cannot read property 'map' of undefined\n    at App.tsx:15:23\n    at renderWithHooks (react-dom.js:123:45)" defaultOpen>
  <ui-ai-stack-trace-header>
    <ui-ai-stack-trace-error>
      <ui-ai-stack-trace-error-type></ui-ai-stack-trace-error-type>
      <ui-ai-stack-trace-error-message></ui-ai-stack-trace-error-message>
    </ui-ai-stack-trace-error>
    <ui-ai-stack-trace-actions>
      <ui-ai-stack-trace-copy-button></ui-ai-stack-trace-copy-button>
      <ui-ai-stack-trace-expand-button></ui-ai-stack-trace-expand-button>
    </ui-ai-stack-trace-actions>
  </ui-ai-stack-trace-header>
  <ui-ai-stack-trace-content maxHeight="400">
    <ui-ai-stack-trace-frames showInternalFrames></ui-ai-stack-trace-frames>
  </ui-ai-stack-trace-content>
</ui-ai-stack-trace>`,
  },
  {
    name: "Suggestions",
    slug: "ai-suggestions",
    description: "A scrollable list of suggested prompts or follow-up questions.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/suggestions",
    subComponents: [
      { tag: "ui-ai-suggestions", props: [] },
      { tag: "ui-ai-suggestion", props: [{ name: "suggestion", type: "string", default: "—", description: "The suggestion text." }] },
    ],
    example: `<ui-ai-suggestions>
  <ui-ai-suggestion suggestion="What is React?">What is React?</ui-ai-suggestion>
  <ui-ai-suggestion suggestion="How do hooks work?">How do hooks work?</ui-ai-suggestion>
  <ui-ai-suggestion suggestion="Explain server components">Explain server components</ui-ai-suggestion>
</ui-ai-suggestions>`,
  },
  {
    name: "Task",
    slug: "ai-task",
    description: "A collapsible task container with trigger title, content area, and file item listings.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/task",
    subComponents: [
      { tag: "ui-ai-task", props: [] },
      { tag: "ui-ai-task-trigger", props: [{ name: "title", type: "string", default: "—", description: "Task title." }] },
      { tag: "ui-ai-task-content", props: [] },
      { tag: "ui-ai-task-item", props: [] },
      { tag: "ui-ai-task-item-file", props: [] },
    ],
    example: `<ui-ai-task>
  <ui-ai-task-trigger title="Refactor components"></ui-ai-task-trigger>
  <ui-ai-task-content>
    <ui-ai-task-item>
      <ui-ai-task-item-file>src/components/Button.tsx</ui-ai-task-item-file>
    </ui-ai-task-item>
    <ui-ai-task-item>
      <ui-ai-task-item-file>src/components/Input.tsx</ui-ai-task-item-file>
    </ui-ai-task-item>
  </ui-ai-task-content>
</ui-ai-task>`,
  },
  {
    name: "Terminal",
    slug: "ai-terminal",
    description: "A terminal output display with streaming support, auto-scroll, copy, and clear actions.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/terminal",
    subComponents: [
      { tag: "ui-ai-terminal", props: [{ name: "output", type: "string", default: "—", description: "Terminal output text." }, { name: "isStreaming", type: "boolean", default: "false", description: "Whether output is still streaming." }, { name: "autoScroll", type: "boolean", default: "true", description: "Auto-scroll to bottom on new output." }] },
      { tag: "ui-ai-terminal-header", props: [] },
      { tag: "ui-ai-terminal-title", props: [] },
      { tag: "ui-ai-terminal-status", props: [] },
      { tag: "ui-ai-terminal-actions", props: [] },
      { tag: "ui-ai-terminal-copy-button", props: [{ name: "onCopy", type: "() => void", default: "—", description: "Callback on copy." }, { name: "onError", type: "(error: Error) => void", default: "—", description: "Callback on error." }, { name: "timeout", type: "number", default: "—", description: "Duration in ms to show success state." }] },
      { tag: "ui-ai-terminal-clear-button", props: [] },
      { tag: "ui-ai-terminal-content", props: [] },
    ],
    example: `<ui-ai-terminal output="$ npm install react\nadded 5 packages in 2s\n\n$ npm run build\nBuild complete!" isStreaming="false" autoScroll>
  <ui-ai-terminal-header>
    <ui-ai-terminal-title>Terminal</ui-ai-terminal-title>
    <ui-ai-terminal-status></ui-ai-terminal-status>
    <ui-ai-terminal-actions>
      <ui-ai-terminal-copy-button></ui-ai-terminal-copy-button>
      <ui-ai-terminal-clear-button></ui-ai-terminal-clear-button>
    </ui-ai-terminal-actions>
  </ui-ai-terminal-header>
  <ui-ai-terminal-content></ui-ai-terminal-content>
</ui-ai-terminal>`,
  },
  {
    name: "Test Results",
    slug: "ai-test-results",
    description: "Displays test suite results with pass/fail/skip counts, progress bars, and collapsible error details.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/test-results",
    subComponents: [
      { tag: "ui-ai-test-results", props: [] },
      { tag: "ui-ai-test-results-header", props: [] },
      { tag: "ui-ai-test-results-duration", props: [] },
      { tag: "ui-ai-test-results-summary", props: [] },
      { tag: "ui-ai-test-results-progress", props: [] },
      { tag: "ui-ai-test-results-content", props: [] },
      { tag: "ui-ai-test-suite", props: [{ name: "name", type: "string", default: "—", description: "Test suite name." }, { name: "status", type: "string", default: "—", description: "Suite status (passed, failed, etc.)." }] },
      { tag: "ui-ai-test-suite-name", props: [] },
      { tag: "ui-ai-test-suite-stats", props: [{ name: "passed", type: "number", default: "—", description: "Number of passed tests." }, { name: "failed", type: "number", default: "—", description: "Number of failed tests." }, { name: "skipped", type: "number", default: "—", description: "Number of skipped tests." }] },
      { tag: "ui-ai-test-suite-content", props: [] },
      { tag: "ui-ai-test", props: [{ name: "name", type: "string", default: "—", description: "Test name." }, { name: "status", type: "string", default: "—", description: "Test status." }, { name: "duration", type: "number", default: "—", description: "Test duration in ms." }] },
      { tag: "ui-ai-test-name", props: [] },
      { tag: "ui-ai-test-duration", props: [] },
      { tag: "ui-ai-test-status", props: [] },
      { tag: "ui-ai-test-error", props: [] },
      { tag: "ui-ai-test-error-message", props: [] },
      { tag: "ui-ai-test-error-stack", props: [] },
    ],
    example: `<ui-ai-test-results>
  <ui-ai-test-results-header>
    <ui-ai-test-results-summary></ui-ai-test-results-summary>
    <ui-ai-test-results-duration>2.5s</ui-ai-test-results-duration>
  </ui-ai-test-results-header>
  <ui-ai-test-results-progress></ui-ai-test-results-progress>
  <ui-ai-test-results-content>
    <ui-ai-test-suite name="auth.test.ts" status="failed">
      <ui-ai-test-suite-name></ui-ai-test-suite-name>
      <ui-ai-test-suite-stats passed="3" failed="1" skipped="0"></ui-ai-test-suite-stats>
      <ui-ai-test-suite-content>
        <ui-ai-test name="should login successfully" status="passed" duration="120">
          <ui-ai-test-name></ui-ai-test-name>
          <ui-ai-test-status></ui-ai-test-status>
          <ui-ai-test-duration></ui-ai-test-duration>
        </ui-ai-test>
        <ui-ai-test name="should handle invalid credentials" status="failed" duration="85">
          <ui-ai-test-name></ui-ai-test-name>
          <ui-ai-test-status></ui-ai-test-status>
          <ui-ai-test-error>
            <ui-ai-test-error-message>Expected status 401 but received 500</ui-ai-test-error-message>
          </ui-ai-test-error>
        </ui-ai-test>
      </ui-ai-test-suite-content>
    </ui-ai-test-suite>
  </ui-ai-test-results-content>
</ui-ai-test-results>`,
  },
  {
    name: "Tool",
    slug: "ai-tool",
    description: "A collapsible tool invocation display showing tool type, state, input arguments, and output results.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/tool",
    subComponents: [
      { tag: "ui-ai-tool", props: [] },
      { tag: "ui-ai-tool-header", props: [{ name: "title", type: "string", default: "—", description: "Tool display title." }, { name: "type", type: "string", default: "—", description: "Tool type identifier." }, { name: "state", type: "string", default: "—", description: "Tool execution state." }, { name: "toolName", type: "string", default: "—", description: "The tool name." }] },
      { tag: "ui-ai-tool-content", props: [] },
      { tag: "ui-ai-tool-input", props: [{ name: "input", type: "object", default: "—", description: "Tool input arguments." }] },
      { tag: "ui-ai-tool-output", props: [{ name: "output", type: "object", default: "—", description: "Tool output result." }, { name: "errorText", type: "string", default: "—", description: "Error text if tool failed." }] },
    ],
    example: `<ui-ai-tool>
  <ui-ai-tool-header title="Web Search" type="function" state="complete" toolName="web_search"></ui-ai-tool-header>
  <ui-ai-tool-content>
    <ui-ai-tool-input input='{"query":"React server components"}'></ui-ai-tool-input>
    <ui-ai-tool-output output='{"results":[{"title":"React Server Components","url":"https://react.dev"}]}'></ui-ai-tool-output>
  </ui-ai-tool-content>
</ui-ai-tool>`,
  },
  {
    name: "Toolbar",
    slug: "ai-toolbar",
    description: "A ReactFlow node toolbar for attaching actions and controls to canvas nodes.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/toolbar",
    subComponents: [
      { tag: "ui-ai-toolbar", props: [] },
    ],
    example: `<ui-ai-canvas>
  <ui-ai-toolbar>
    <button>Edit</button>
    <button>Delete</button>
  </ui-ai-toolbar>
</ui-ai-canvas>`,
  },
  {
    name: "Transcription",
    slug: "ai-transcription",
    description: "Displays audio transcription segments with time-synced highlighting and seek-on-click support.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/transcription",
    subComponents: [
      { tag: "ui-ai-transcription", props: [{ name: "currentTime", type: "number", default: "—", description: "Current playback time in seconds." }] },
      { tag: "ui-ai-transcription-segment", props: [{ name: "segment", type: "TranscriptionSegment", default: "—", description: "Transcription segment data." }, { name: "index", type: "number", default: "—", description: "Segment index." }] },
    ],
    example: `<ui-ai-transcription currentTime="5.2">
  <ui-ai-transcription-segment segment='{"start":0,"end":3.5,"text":"Hello and welcome."}' index="0"></ui-ai-transcription-segment>
  <ui-ai-transcription-segment segment='{"start":3.5,"end":7.0,"text":"Today we will discuss React."}' index="1"></ui-ai-transcription-segment>
  <ui-ai-transcription-segment segment='{"start":7.0,"end":11.2,"text":"Let us get started."}' index="2"></ui-ai-transcription-segment>
</ui-ai-transcription>`,
  },
  {
    name: "Voice Selector",
    slug: "ai-voice-selector",
    description: "A dialog-based voice picker with search, filtering by gender/accent, and audio preview.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/voice-selector",
    subComponents: [
      { tag: "ui-ai-voice-selector", props: [{ name: "value", type: "string", default: "—", description: "Controlled selected voice." }, { name: "defaultValue", type: "string", default: "—", description: "Default selected voice." }, { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Callback when selection changes." }] },
      { tag: "ui-ai-voice-selector-trigger", props: [] },
      { tag: "ui-ai-voice-selector-content", props: [{ name: "title", type: "ReactNode", default: "—", description: "Dialog title." }] },
      { tag: "ui-ai-voice-selector-dialog", props: [] },
      { tag: "ui-ai-voice-selector-input", props: [] },
      { tag: "ui-ai-voice-selector-list", props: [] },
      { tag: "ui-ai-voice-selector-empty", props: [] },
      { tag: "ui-ai-voice-selector-group", props: [] },
      { tag: "ui-ai-voice-selector-item", props: [] },
      { tag: "ui-ai-voice-selector-shortcut", props: [] },
      { tag: "ui-ai-voice-selector-separator", props: [] },
      { tag: "ui-ai-voice-selector-gender", props: [{ name: "value", type: '"male" | "female" | "transgender" | "androgyne" | "non-binary" | "intersex"', default: "—", description: "Gender value for filtering." }] },
      { tag: "ui-ai-voice-selector-accent", props: [{ name: "value", type: "string", default: "—", description: "Accent value for filtering." }] },
      { tag: "ui-ai-voice-selector-age", props: [] },
      { tag: "ui-ai-voice-selector-name", props: [] },
      { tag: "ui-ai-voice-selector-description", props: [] },
      { tag: "ui-ai-voice-selector-attributes", props: [] },
      { tag: "ui-ai-voice-selector-bullet", props: [] },
      { tag: "ui-ai-voice-selector-preview", props: [{ name: "playing", type: "boolean", default: "—", description: "Whether audio is playing." }, { name: "loading", type: "boolean", default: "—", description: "Whether audio is loading." }] },
    ],
    example: `<ui-ai-voice-selector>
  <ui-ai-voice-selector-trigger>Select Voice</ui-ai-voice-selector-trigger>
  <ui-ai-voice-selector-content title="Choose a voice">
    <ui-ai-voice-selector-input placeholder="Search voices..."></ui-ai-voice-selector-input>
    <ui-ai-voice-selector-list>
      <ui-ai-voice-selector-empty>No voices found.</ui-ai-voice-selector-empty>
      <ui-ai-voice-selector-group>
        <ui-ai-voice-selector-item>
          <ui-ai-voice-selector-name>Alloy</ui-ai-voice-selector-name>
          <ui-ai-voice-selector-attributes>
            <ui-ai-voice-selector-gender value="non-binary"></ui-ai-voice-selector-gender>
            <ui-ai-voice-selector-bullet></ui-ai-voice-selector-bullet>
            <ui-ai-voice-selector-accent value="American"></ui-ai-voice-selector-accent>
          </ui-ai-voice-selector-attributes>
          <ui-ai-voice-selector-description>Warm and expressive</ui-ai-voice-selector-description>
          <ui-ai-voice-selector-preview></ui-ai-voice-selector-preview>
        </ui-ai-voice-selector-item>
        <ui-ai-voice-selector-item>
          <ui-ai-voice-selector-name>Echo</ui-ai-voice-selector-name>
          <ui-ai-voice-selector-attributes>
            <ui-ai-voice-selector-gender value="male"></ui-ai-voice-selector-gender>
            <ui-ai-voice-selector-bullet></ui-ai-voice-selector-bullet>
            <ui-ai-voice-selector-accent value="American"></ui-ai-voice-selector-accent>
          </ui-ai-voice-selector-attributes>
          <ui-ai-voice-selector-description>Deep and resonant</ui-ai-voice-selector-description>
          <ui-ai-voice-selector-preview></ui-ai-voice-selector-preview>
        </ui-ai-voice-selector-item>
      </ui-ai-voice-selector-group>
    </ui-ai-voice-selector-list>
  </ui-ai-voice-selector-content>
</ui-ai-voice-selector>`,
  },
  {
    name: "Web Preview",
    slug: "ai-web-preview",
    description: "An iframe-based web preview with navigation controls, URL bar, and developer console log display.",
    category: "AI Elements",
    shadcnUrl: "https://ai.shadcn.com/docs/components/web-preview",
    subComponents: [
      { tag: "ui-ai-web-preview", props: [{ name: "defaultUrl", type: "string", default: "—", description: "Initial URL to load." }, { name: "onUrlChange", type: "(url: string) => void", default: "—", description: "Callback when URL changes." }] },
      { tag: "ui-ai-web-preview-navigation", props: [] },
      { tag: "ui-ai-web-preview-navigation-button", props: [{ name: "tooltip", type: "string", default: "—", description: "Button tooltip text." }] },
      { tag: "ui-ai-web-preview-url", props: [] },
      { tag: "ui-ai-web-preview-body", props: [{ name: "loading", type: "ReactNode", default: "—", description: "Loading state content." }] },
      { tag: "ui-ai-web-preview-console", props: [] },
    ],
    example: `<ui-ai-web-preview defaultUrl="https://example.com">
  <ui-ai-web-preview-navigation>
    <ui-ai-web-preview-navigation-button tooltip="Back">←</ui-ai-web-preview-navigation-button>
    <ui-ai-web-preview-navigation-button tooltip="Forward">→</ui-ai-web-preview-navigation-button>
    <ui-ai-web-preview-navigation-button tooltip="Refresh">↻</ui-ai-web-preview-navigation-button>
    <ui-ai-web-preview-url></ui-ai-web-preview-url>
  </ui-ai-web-preview-navigation>
  <ui-ai-web-preview-body loading="<p>Loading...</p>"></ui-ai-web-preview-body>
  <ui-ai-web-preview-console></ui-ai-web-preview-console>
</ui-ai-web-preview>`,
  },
  // ==========================================================================
  // BUILT-IN COMPONENTS (shipped with reactolith-ui, no local install needed)
  // ==========================================================================
  {
    name: "Icon",
    slug: "icon",
    description: "Universal icon component powered by Iconify. Supports 200,000+ icons from 150+ icon sets.",
    category: "Built-in",
    subComponents: [
      { tag: "ui-icon", props: [
        { name: "icon", type: "string", default: "—", description: "Icon name in Iconify format, e.g. \"lucide:heart\" or \"mdi:home\"." },
        { name: "width", type: "string | number", default: '"1em"', description: "Icon width." },
        { name: "height", type: "string | number", default: '"1em"', description: "Icon height." },
        { name: "inline", type: "boolean", default: "false", description: "Render inline (adds vertical-align)." },
      ] },
    ],
    example: `<div class="flex items-center gap-4">
  <ui-icon icon="lucide:heart" class="size-6 text-red-500"></ui-icon>
  <ui-icon icon="lucide:star" class="size-6 text-yellow-500"></ui-icon>
  <ui-icon icon="lucide:settings" class="size-6"></ui-icon>
</div>`,
  },
  {
    name: "Route Error",
    slug: "route-error",
    description: "Displays navigation errors in a dialog overlay. Automatically listens to Reactolith router errors.",
    category: "Built-in",
    subComponents: [
      { tag: "ui-route-error", props: [] },
    ],
    example: `<!-- Place once in your layout -->
<ui-route-error></ui-route-error>`,
  },
  {
    name: "Route Progress Bar",
    slug: "route-progress-bar",
    description: "A thin progress bar at the top of the viewport that animates during Reactolith route transitions.",
    category: "Built-in",
    subComponents: [
      { tag: "ui-route-progress-bar", props: [
        { name: "className", type: "string", default: "—", description: "Additional CSS classes for the container." },
        { name: "completeDelayMs", type: "number", default: "250", description: "Milliseconds to wait before hiding after reaching 100%." },
        { name: "maxWhileLoading", type: "number", default: "85", description: "Maximum percentage to reach while still loading." },
      ] },
    ],
    example: `<!-- Place once in your layout -->
<ui-route-progress-bar></ui-route-progress-bar>`,
  },
  {
    name: "Theme Provider",
    slug: "theme-provider",
    description: "React context provider for light/dark/system theme management with localStorage persistence and cross-tab sync.",
    category: "Built-in",
    subComponents: [
      { tag: "ui-theme-provider", props: [
        { name: "defaultTheme", type: '"dark" | "light" | "system"', default: '"system"', description: "Initial theme when nothing is stored." },
        { name: "storageKey", type: "string", default: '"vite-ui-theme"', description: "LocalStorage key for persisting the theme." },
      ] },
    ],
    example: `<!-- Wrap your app -->
<ui-theme-provider defaultTheme="system">
  <!-- your app content -->
  <ui-theme-switch></ui-theme-switch>
</ui-theme-provider>`,
  },
  {
    name: "Theme Switch",
    slug: "theme-switch",
    description: "A dropdown button for toggling between light, dark, and system theme. Requires a parent Theme Provider.",
    category: "Built-in",
    subComponents: [
      { tag: "ui-theme-switch", props: [] },
    ],
    example: `<ui-theme-switch></ui-theme-switch>`,
  },
  {
    name: "Sonner",
    slug: "sonner",
    description: "An opinionated toast component for React, built by Emil Kowalski. Ships as a built-in component with themed defaults.",
    category: "Built-in",
    subComponents: [
      { tag: "ui-sonner", props: [
        { name: "position", type: '"top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"', default: '"bottom-right"', description: "Toast position." },
        { name: "richColors", type: "boolean", default: "false", description: "Use rich colors." },
        { name: "json-toasts", type: "InitialToast[]", default: "[]", description: 'Initial toasts to show on mount. Each toast: { id?, kind?: "message" | "success" | "error" | "warning" | "info", message, description? }. Toasts are deduplicated by id.' },
      ] },
    ],
    example: `<ui-sonner rich-colors json-toasts='[
  {"kind":"success","message":"Profile saved","description":"Your changes have been saved successfully."},
  {"kind":"info","message":"Welcome back!"}
]'></ui-sonner>`,
  },
  {
    name: "Editor",
    slug: "editor",
    description: `A rich text editor powered by <a href="https://platejs.org/" class="underline">Plate.js</a>. Uses standard Plate kits installed via the shadcn CLI. Reactolith provides the integration layer for form sync and HTML-attribute configuration.`,
    category: "Built-in",
    subComponents: [
      { tag: "ui-editor", props: [
        { name: "value", type: "string", default: "—", description: "Initial content (HTML string, JSON string, or Markdown string)." },
        { name: "format", type: '"html" | "json" | "markdown"', default: '"html"', description: "Content format for parsing and form sync." },
        { name: "placeholder", type: "string", default: '"Type / for commands..."', description: "Placeholder text shown when the editor is empty." },
        { name: "read-only", type: "boolean", default: "false", description: "Enables read-only mode." },
        { name: "name", type: "string", default: "—", description: "Hidden input name for form submission. Syncs editor content in the configured format." },
        { name: "form", type: "string", default: "—", description: "Form ID to associate with (like the native form= attribute)." },
        { name: "min-height", type: "string", default: '"200px"', description: "Minimum editor height (CSS value)." },
        { name: "max-height", type: "string", default: "—", description: "Maximum editor height (CSS value, enables scroll)." },
        { name: "toolbar", type: "boolean", default: "true", description: "Show or hide the fixed toolbar." },
        { name: "blocks", type: "JSON array", default: "—", description: 'JSON array of allowed block types, e.g. \'["p","h1","h2"]\'. Values: p, h1–h6, blockquote, hr, code-block, table, toggle, callout, list, media, link, mention. Paragraph is always included.' },
        { name: "marks", type: 'JSON array | "false"', default: "—", description: 'JSON array of allowed inline marks (e.g. \'["bold","italic"]\'), or "false" to disable all. Values: bold, italic, underline, strikethrough, code, highlight, subscript, superscript, kbd.' },
      ] },
    ],
    example: `<ui-editor placeholder="Type / for commands..." min-height="400px"></ui-editor>`,
    readableExample: `<!-- Basic editor -->
<ui-editor placeholder="Start writing..."></ui-editor>

<!-- With form sync (syncs content to hidden input) -->
<ui-editor name="content" format="html"></ui-editor>

<!-- JSON format (lossless, recommended for storage) -->
<ui-editor name="content" format="json"></ui-editor>

<!-- Markdown format -->
<ui-editor name="content" format="markdown"></ui-editor>

<!-- Read-only display -->
<ui-editor value="..." read-only></ui-editor>`,
    additionalExamples: [
      {
        title: "HTML format",
        example: `<ui-editor value="&lt;h2&gt;Getting Started&lt;/h2&gt;&lt;p&gt;This editor is pre-filled with &lt;strong&gt;HTML content&lt;/strong&gt;. Edit freely — on submit the form receives clean HTML.&lt;/p&gt;&lt;p&gt;Supports &lt;em&gt;italic&lt;/em&gt;, &lt;strong&gt;bold&lt;/strong&gt;, &lt;u&gt;underline&lt;/u&gt; and more.&lt;/p&gt;" format="html" name="body" min-height="220px"></ui-editor>`,
        readableExample: `<ui-editor
  value="<h2>Getting Started</h2><p>Pre-filled with <strong>HTML</strong> content.</p>"
  format="html"
  name="body">
</ui-editor>`,
      },
      {
        title: "JSON format",
        example: `<ui-editor value='[{"type":"p","children":[{"text":"This editor is pre-filled with "},{"text":"Plate.js JSON","bold":true},{"text":". Lossless — recommended for storing and reloading rich content."}]},{"type":"p","children":[{"text":"Perfect for "},{"text":"round-tripping","italic":true},{"text":" editor state without any serialization loss."}]}]' format="json" name="body" min-height="220px"></ui-editor>`,
        readableExample: `<ui-editor
  value='[{"type":"p","children":[{"text":"Pre-filled with "},{"text":"Plate.js JSON","bold":true},{"text":"."}]}]'
  format="json"
  name="body">
</ui-editor>`,
      },
      {
        title: "Markdown format",
        example: `<ui-editor value="## Markdown Format&#10;&#10;This editor is pre-filled with **Markdown** content. Edit it and the form value will be serialized back to Markdown.&#10;&#10;Supports *italic*, **bold**, and &gt; blockquotes." format="markdown" name="body" min-height="220px"></ui-editor>`,
        readableExample: `<ui-editor
  value="## Markdown Format\n\nPre-filled with **Markdown** content."
  format="markdown"
  name="body">
</ui-editor>`,
      },
      {
        title: "Restricted (headings + text only)",
        example: `<ui-editor json-blocks='["p","h1","h2"]' json-marks="false" json-toolbar="false" placeholder="Start typing..." min-height="220px"></ui-editor>`,
        readableExample: `<ui-editor
  json-blocks='["p","h1","h2"]'
  json-marks="false"
  json-toolbar="false"
  placeholder="Start typing...">
</ui-editor>`,
      },
      {
        title: "Read-only",
        example: `<ui-editor value="&lt;h2&gt;Read-only content&lt;/h2&gt;&lt;p&gt;This editor is in &lt;strong&gt;read-only mode&lt;/strong&gt;. Content is rendered but cannot be edited — useful for displaying saved rich text.&lt;/p&gt;&lt;p&gt;No toolbar is shown. No cursor or focus.&lt;/p&gt;" format="html" read-only min-height="180px"></ui-editor>`,
        readableExample: `<ui-editor
  value="<h2>Read-only content</h2><p>This is <strong>read-only</strong>.</p>"
  format="html"
  read-only>
</ui-editor>`,
      },
    ],
    afterHtml: `
            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">Setup</h2>
              <p class="text-muted-foreground mb-4">The editor uses standard <a href="https://platejs.org/" class="underline">Plate.js</a> components. Install them in your project via the shadcn CLI, then create an override file.</p>

              <h3 class="text-base font-semibold mt-6 mb-3">1. Install Plate components</h3>
              <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full">
                <pre class="p-4 text-sm"><code># Install the full editor kit (recommended)
npx shadcn@latest add @plate/editor-kit

# Or install individual feature kits
npx shadcn@latest add @plate/basic-blocks-kit
npx shadcn@latest add @plate/basic-marks-kit
npx shadcn@latest add @plate/slash-kit
npx shadcn@latest add @plate/dnd-kit
npx shadcn@latest add @plate/floating-toolbar-kit
# ... see platejs.org for all available kits</code></pre>
              </div>

              <h3 class="text-base font-semibold mt-6 mb-3">2. Create the editor override</h3>
              <p class="text-sm text-muted-foreground mb-3">Create <code class="text-xs bg-muted px-1.5 py-0.5 rounded">app/overrides/editor.tsx</code> in your project. This makes the editor available as <code class="text-xs bg-muted px-1.5 py-0.5 rounded">&lt;ui-editor&gt;</code>.</p>
              <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full">
                <pre class="p-4 text-sm"><code>import { Plate, usePlateEditor } from "platejs/react"
import { useEditorFormSync, type EditorProps } from "reactolith-ui/editor"

// Import the kits you installed
import { EditorKit } from "@/components/editor/editor-kit"
import { Editor, EditorContainer } from "@/components/ui/editor"

export default function EditorOverride({
  value, format = "html", placeholder, readOnly,
  name, form, className, minHeight, maxHeight, onChange,
}: EditorProps) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: value as string | undefined,
  })

  const { syncContent, inputProps } = useEditorFormSync({
    editor, format, name, form, onChange,
  })

  return (
    &lt;div className={className}&gt;
      &lt;Plate editor={editor} readOnly={readOnly}
        onChange={() =&gt; syncContent()}&gt;
        &lt;EditorContainer style={{ minHeight, maxHeight }}&gt;
          &lt;Editor placeholder={placeholder} /&gt;
        &lt;/EditorContainer&gt;
      &lt;/Plate&gt;
      {inputProps &amp;&amp; &lt;input {...inputProps} /&gt;}
    &lt;/div&gt;
  )
}</code></pre>
              </div>

              <h3 class="text-base font-semibold mt-6 mb-3">3. Use it</h3>
              <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full">
                <pre class="p-4 text-sm"><code>&lt;form action="/api/save" method="POST"&gt;
  &lt;ui-editor name="content" format="html"
    placeholder="Start writing..."&gt;&lt;/ui-editor&gt;
  &lt;button type="submit"&gt;Save&lt;/button&gt;
&lt;/form&gt;</code></pre>
              </div>
            </section>

            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">Features</h2>
              <p class="text-muted-foreground mb-4">This demo uses the standard Plate.js editor kit which includes:</p>
              <div class="overflow-x-auto max-w-full">
                <table class="w-full text-sm"><thead><tr class="border-b"><th class="text-left py-2 pr-4 font-medium">Feature</th><th class="text-left py-2 font-medium">Description</th></tr></thead><tbody><tr class="border-b"><td class="py-2 pr-4 font-medium">Slash commands</td><td class="py-2 text-muted-foreground">Type <code class="text-xs bg-muted px-1.5 py-0.5 rounded">/</code> to insert headings, lists, code blocks, tables, etc.</td></tr><tr class="border-b"><td class="py-2 pr-4 font-medium">Fixed toolbar</td><td class="py-2 text-muted-foreground">Formatting buttons at the top of the editor</td></tr><tr class="border-b"><td class="py-2 pr-4 font-medium">Floating toolbar</td><td class="py-2 text-muted-foreground">Context toolbar appears on text selection</td></tr><tr class="border-b"><td class="py-2 pr-4 font-medium">Drag &amp; drop</td><td class="py-2 text-muted-foreground">Drag blocks to reorder them</td></tr><tr class="border-b"><td class="py-2 pr-4 font-medium">Block selection</td><td class="py-2 text-muted-foreground">Click and drag to select multiple blocks</td></tr><tr class="border-b"><td class="py-2 pr-4 font-medium">Autoformat</td><td class="py-2 text-muted-foreground">Markdown shortcuts: <code class="text-xs bg-muted px-1.5 py-0.5 rounded"># </code> for H1, <code class="text-xs bg-muted px-1.5 py-0.5 rounded">* </code> for lists, <code class="text-xs bg-muted px-1.5 py-0.5 rounded">&gt; </code> for quotes, etc.</td></tr><tr class="border-b"><td class="py-2 pr-4 font-medium">Form sync</td><td class="py-2 text-muted-foreground">Content syncs to a hidden <code class="text-xs bg-muted px-1.5 py-0.5 rounded">&lt;input&gt;</code> in HTML, JSON, or Markdown format</td></tr></tbody></table>
              </div>
            </section>`,
  },
  {
    name: "Editor Content",
    slug: "editor-content",
    description: `Read-only renderer for Plate.js rich text content. No toolbar, no editing UI — renders HTML, JSON, or Markdown content as formatted text. Ideal for displaying saved editor content.`,
    category: "Built-in",
    subComponents: [
      { tag: "ui-editor-content", props: [
        { name: "value", type: "string", default: "—", description: "Content to render (HTML string, JSON string, or Markdown string)." },
        { name: "format", type: '"html" | "json" | "markdown"', default: '"html"', description: "Content format." },
        { name: "max-height", type: "string", default: "—", description: "Maximum height (CSS value, enables scroll)." },
      ] },
    ],
    example: `<ui-editor-content value="&lt;h2&gt;Hello World&lt;/h2&gt;&lt;p&gt;This is &lt;strong&gt;rendered&lt;/strong&gt; rich text content — no editing, just display.&lt;/p&gt;" format="html"></ui-editor-content>`,
    readableExample: `<!-- Render saved HTML content -->
<ui-editor-content value="<h2>Hello</h2><p>Rendered <strong>HTML</strong>.</p>" format="html"></ui-editor-content>

<!-- Render JSON content -->
<ui-editor-content value='[{"type":"p","children":[{"text":"Hello"}]}]' format="json"></ui-editor-content>

<!-- Render Markdown -->
<ui-editor-content value="## Hello\n\n**Bold** and *italic* text." format="markdown"></ui-editor-content>`,
    additionalExamples: [
      {
        title: "JSON format",
        example: `<ui-editor-content value='[{"type":"p","children":[{"text":"This content is rendered from "},{"text":"Plate.js JSON","bold":true},{"text":". No editing — just display."}]},{"type":"p","children":[{"text":"Perfect for "},{"text":"displaying","italic":true},{"text":" stored rich text."}]}]' format="json"></ui-editor-content>`,
        readableExample: `<ui-editor-content
  value='[{"type":"p","children":[{"text":"From "},{"text":"JSON","bold":true}]}]'
  format="json">
</ui-editor-content>`,
      },
      {
        title: "Markdown format",
        example: `<ui-editor-content value="## Markdown Content&#10;&#10;This content is rendered from **Markdown**. Supports *italic*, **bold**, and &gt; blockquotes." format="markdown"></ui-editor-content>`,
        readableExample: `<ui-editor-content
  value="## Heading\n\n**Bold** and *italic* text."
  format="markdown">
</ui-editor-content>`,
      },
    ],
  },
];

// ============================================================================
// CATEGORY ORDERING
// ============================================================================

const categoryOrder = ["Layout", "Forms", "Data Display", "Feedback", "Overlay", "Navigation", "Built-in", "AI Elements"];

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

// Build the sidebar navigation groups HTML using ui-* custom elements.
// depth: 0 = app/index.html, 1 = app/docs/*.html, 2 = app/docs/components/*.html
function sidebarGroupsHtml(activeSlug = "", depth = 0) {
  const grouped = groupByCategory(components);
  const docsPrefix = depth === 0 ? "docs/" : depth === 1 ? "" : "../";
  const compPrefix = depth === 0 ? "docs/components/" : depth === 1 ? "components/" : "";

  const gettingStarted = [
    { name: "Introduction", slug: "introduction", href: `${docsPrefix}introduction.html` },
    { name: "Installation", slug: "installation", href: `${docsPrefix}installation.html` },
    { name: "Usage", slug: "usage", href: `${docsPrefix}usage.html` },
  ];

  let html = `
          <ui-sidebar-group>
            <ui-sidebar-group-label>Getting Started</ui-sidebar-group-label>
            <ui-sidebar-group-content>
              <ui-sidebar-menu>`;
  for (const item of gettingStarted) {
    html += `
                <ui-sidebar-menu-item>
                  <ui-sidebar-menu-button ${activeSlug === item.slug ? 'is-active' : ''} size="sm" href="${item.href}">${item.name}</ui-sidebar-menu-button>
                </ui-sidebar-menu-item>`;
  }
  html += `
              </ui-sidebar-menu>
            </ui-sidebar-group-content>
          </ui-sidebar-group>`;

  for (const [category, comps] of Object.entries(grouped)) {
    if (comps.length === 0) continue;
    html += `
          <ui-sidebar-group>
            <ui-sidebar-group-label>${category}</ui-sidebar-group-label>
            <ui-sidebar-group-content>
              <ui-sidebar-menu>`;
    for (const comp of comps) {
      html += `
                <ui-sidebar-menu-item>
                  <ui-sidebar-menu-button ${activeSlug === comp.slug ? 'is-active' : ''} size="sm" href="${compPrefix}${comp.slug}.html">${comp.name}</ui-sidebar-menu-button>
                </ui-sidebar-menu-item>`;
    }
    html += `
              </ui-sidebar-menu>
            </ui-sidebar-group-content>
          </ui-sidebar-group>`;
  }

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
  const rootPrefix = depth === 0 ? "" : depth === 1 ? "../" : "../../";

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Reactolith UI</title>
    <link rel="icon" href="${rootPrefix}icon.svg" type="image/svg+xml">
    <script type="module" src="${scriptPath}"></script>
    ${themeInitScript}
</head>
<body class="style-vega">
<div id="reactolith-app">
<ui-theme-provider storage-key="theme">
  <ui-route-progress-bar></ui-route-progress-bar>
  <ui-sidebar-provider>
    <ui-sidebar>
      <ui-sidebar-header class="p-4">
        <a href="${rootPrefix}index.html" class="text-lg font-bold tracking-tight">Reactolith UI</a>
      </ui-sidebar-header>
      <ui-sidebar-content>
        ${sidebarGroupsHtml(activeSlug, depth)}
      </ui-sidebar-content>
    </ui-sidebar>
    <ui-sidebar-inset class="min-w-0 overflow-x-hidden">
      <header class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div class="flex h-14 items-center gap-2 px-4">
          <ui-sidebar-trigger></ui-sidebar-trigger>
          <div class="flex-1"></div>
          <nav class="flex items-center gap-2">
            <a href="https://github.com/reactolith/ui" class="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            <ui-theme-switch></ui-theme-switch>
          </nav>
        </div>
      </header>
      <div class="flex-1 overflow-y-auto min-w-0">
        <div class="max-w-3xl mx-auto px-6 py-8 overflow-hidden">
          ${content}
        </div>
      </div>
    </ui-sidebar-inset>
  </ui-sidebar-provider>
</ui-theme-provider>
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
              <h3 class="text-lg font-semibold mb-3"><code class="text-sm bg-muted px-2 py-1 rounded">&lt;${sub.tag}&gt;</code>${sub.enhancedBy ? ` <span class="text-xs bg-blue-500/15 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded ml-2">${sub.enhancedBy}</span>` : ""}</h3>
              <div class="overflow-x-auto max-w-full">
                <table class="w-full text-sm"><thead><tr class="border-b"><th class="text-left py-2 pr-4 font-medium">Prop</th><th class="text-left py-2 pr-4 font-medium">Type</th><th class="text-left py-2 pr-4 font-medium">Default</th><th class="text-left py-2 font-medium">Description</th></tr></thead><tbody>`;
    for (const prop of sub.props) {
      propsHtml += `<tr class="border-b"><td class="py-2 pr-4"><code class="text-xs bg-muted px-1.5 py-0.5 rounded">${prop.name}</code></td><td class="py-2 pr-4 text-muted-foreground"><code class="text-xs">${escapeHtml(prop.type)}</code></td><td class="py-2 pr-4 text-muted-foreground"><code class="text-xs">${escapeHtml(prop.default)}</code></td><td class="py-2 text-muted-foreground">${prop.description}${prop.source ? ` <span class="text-[10px] bg-blue-500/15 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded whitespace-nowrap">via ${prop.source}</span>` : ""}</td></tr>`;
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
              <div class="flex items-start justify-end gap-3">
                ${comp.shadcnUrl ? `<a href="${comp.shadcnUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-muted-foreground hover:text-foreground border rounded px-2 py-1 shrink-0">${comp.category === "AI Elements" ? "AI Elements docs" : "shadcn/ui docs"}</a>` : `<span class="text-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded shrink-0">built-in</span>`}
              </div>
              <h1 class="text-3xl font-bold tracking-tight">${comp.name}</h1>
              <p class="text-lg text-muted-foreground">${comp.description}</p>
            </div>

            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">Preview</h2>
              ${comp.iframeExample
                ? `<div class="rounded-lg border bg-background overflow-hidden max-w-full">
                    <iframe src="${comp.iframeExample}" class="w-full h-[600px] border-0"></iframe>
                  </div>`
                : `<div class="rounded-lg border p-6 bg-background overflow-x-auto max-w-full">
                    ${comp.example}
                  </div>`
              }
            </section>

            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">Usage</h2>
              <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full">
                <pre class="p-4 text-sm"><code>${escapeHtml((comp.readableExample || comp.example).trim())}</code></pre>
              </div>
            </section>

            ${(comp.additionalExamples || []).map(ex => `
            <section class="mb-10">
              <h2 class="text-xl font-semibold mb-4">${ex.title}</h2>
              <div class="rounded-lg border p-6 bg-background overflow-x-auto max-w-full mb-4">
                ${ex.example}
              </div>
              <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full">
                <pre class="p-4 text-sm"><code>${escapeHtml((ex.readableExample || ex.example).trim())}</code></pre>
              </div>
            </section>`).join('')}

            ${comp.afterHtml || ""}

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
                <li><strong>103+ component groups</strong> — 55 shadcn/ui base components and 48 AI element components</li>
                <li><strong>Standard HTML</strong> — use <code>&lt;ui-button&gt;</code> or <code>&lt;ui-ai-message&gt;</code> instead of importing React components</li>
                <li><strong>shadcn/ui + AI Elements</strong> — beautiful, accessible components for apps and AI interfaces</li>
                <li><strong>Base UI primitives</strong> — built on unstyled, accessible Base UI components</li>
                <li><strong>Tailwind CSS v4</strong> — fully styled with Tailwind utilities</li>
                <li><strong>Behavior system</strong> — props like <code>href</code> are injected by reusable behaviors (linkable, overlay, trigger, etc.)</li>
                <li><strong>Customizable</strong> — use Tailwind classes directly on any element</li>
              </ul>

              <h2>How It Works</h2>
              <p>Each shadcn/ui component is wrapped in a thin Reactolith layer that registers it as an HTML custom element. For example, the React <code>Button</code> component becomes <code>&lt;ui-button&gt;</code>.</p>
              <p>Props are passed as HTML attributes:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
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

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
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

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`# 1. Create a new project
mkdir my-app && cd my-app
npm init -y

# 2. Install dependencies
npm install reactolith reactolith-ui react react-dom
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

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
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

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<ui-button>Click me</ui-button>
<ui-input placeholder="Enter text..."></ui-input>
<ui-badge variant="secondary">New</ui-badge>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Passing Props</h2>
              <p>Props are passed as HTML attributes. String values work directly, and boolean attributes follow HTML conventions:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
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

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
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

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<ui-button class="w-full">Full Width Button</ui-button>
<ui-card class="max-w-md mx-auto">
  <ui-card-content class="p-8">Centered card</ui-card-content>
</ui-card>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Behavior System</h2>
              <p>Some components have additional props injected by the loader's <strong>behavior system</strong>. These are marked with a behavior badge (e.g. <span class="text-[10px] bg-blue-500/15 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">via linkable</span>) in the component docs.</p>
              <h3>Available Behaviors</h3>
              <ul>
                <li><strong><code>linkable</code></strong> — Adds <code>href</code> prop, renders as <code>&lt;a&gt;</code> link. Used by: Button, Accordion Trigger, Toggle, Toggle Group Item.</li>
                <li><strong><code>linkableClose</code></strong> — Adds <code>href</code> prop + closes parent overlay on navigate. Used by: Dropdown Menu Item, Context Menu Item, Menubar Item, Navigation Menu Link, Breadcrumb Link, Tabs Trigger.</li>
                <li><strong><code>trigger</code></strong> — Single-child <code>asChild</code> render prop pattern. Used by: tooltip/sheet/popover/dropdown/dialog/collapsible/alert-dialog triggers.</li>
                <li><strong><code>overlay</code></strong> — Wraps children with <code>CloseOverlayProvider</code>. Used by: Sheet, Dialog, Drawer, Popover, Command Dialog.</li>
                <li><strong><code>closeClick</code></strong> — Calls close overlay on click. Used by: Pagination Link/Next/Previous.</li>
              </ul>
              <h3>Component Wrappers</h3>
              <ul>
                <li><strong><code>commandLinkable</code></strong> — Adds <code>href</code> to Command Item with overlay close.</li>
                <li><strong><code>sidebarLinkable</code></strong> — Adds <code>href</code> to Sidebar Menu Button with mobile close.</li>
                <li><strong><code>sidebarSubLinkable</code></strong> — Adds mobile close to Sidebar Menu Sub Button.</li>
                <li><strong><code>selectProvider</code> / <code>selectRegister</code></strong> — Enables <code>items</code> prop on Select.</li>
                <li><strong><code>comboboxProvider</code> / <code>comboboxListRenderer</code></strong> — Enables <code>items</code> prop on Combobox.</li>
              </ul>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<!-- linkable behavior: Button as a link -->
<ui-button href="https://example.com">Visit Site</ui-button>

<!-- linkableClose behavior: Closes parent overlay on navigate -->
<ui-dropdown-menu-item href="/settings">Settings</ui-dropdown-menu-item>

<!-- sidebarLinkable wrapper: Link with mobile close -->
<ui-sidebar-menu-button href="/dashboard">Dashboard</ui-sidebar-menu-button>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>AI Element Components</h2>
              <p>AI-specific components use the <code>ui-ai-</code> prefix and provide building blocks for AI interfaces:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
              <pre class="p-4 text-sm"><code>${escapeHtml(`<!-- AI Message -->
<ui-ai-message from="assistant">
  <ui-ai-message-content>Hello! How can I help you?</ui-ai-message-content>
</ui-ai-message>

<!-- AI Code Block -->
<ui-ai-code-block code="console.log('hello')" language="javascript"></ui-ai-code-block>

<!-- AI Reasoning -->
<ui-ai-reasoning>
  <ui-ai-reasoning-trigger></ui-ai-reasoning-trigger>
  <ui-ai-reasoning-content>Let me think about this...</ui-ai-reasoning-content>
</ui-ai-reasoning>`)}</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Naming Convention</h2>
              <p>The HTML tag name maps directly to the component path:</p>
              <ul>
                <li><code>&lt;ui-button&gt;</code> → <code>Button</code> component (shadcn/ui)</li>
                <li><code>&lt;ui-card-header&gt;</code> → <code>CardHeader</code> component (shadcn/ui)</li>
                <li><code>&lt;ui-ai-message&gt;</code> → <code>Message</code> component (AI Elements)</li>
                <li><code>&lt;ui-ai-code-block&gt;</code> → <code>CodeBlock</code> component (AI Elements)</li>
              </ul>
              <p>The pattern is: <code>ui-</code> prefix for shadcn/ui, <code>ui-ai-</code> prefix for AI Elements, both in kebab-case.</p>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none mt-8">
              <h2>Custom Components</h2>
              <p>You can add your own components to the loader chain — they are available as <code>&lt;ui-*&gt;</code> tags just like built-in components. The chain runs top to bottom: the first loader that handles a name wins, so custom loaders placed first can override any built-in.</p>
              <h3>A few components — <code>BuiltinLoader</code></h3>
              <p>For a small number of project-specific components, create a <code>BuiltinLoader</code> with an explicit registry and add it first:</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
              <pre class="p-4 text-sm"><code>import { BuiltinLoader, createBuiltinLoader, createShadcnLoader, createCompositeLoader } from "reactolith-ui"

const loaders = [
  new BuiltinLoader({
    "editor":     () => import("./components/editor"),      // &lt;ui-editor&gt;
    "my-widget":  () => import("./components/my-widget"),   // &lt;ui-my-widget&gt;
    "sonner":     () => import("./components/my-sonner"),   // overrides built-in &lt;ui-sonner&gt;
  }),
  createBuiltinLoader(),   // library built-ins (theme-switch, sonner, …)
  createShadcnLoader(modules),
]</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <h3>A whole directory — <code>CustomLoader</code></h3>
              <p>For a larger set of custom components, use <code>CustomLoader</code> pointing at a directory. Every <code>.tsx</code> file in that directory becomes a <code>&lt;ui-*&gt;</code> tag matching its filename exactly, using its default export.</p>
            </div>

            <div class="rounded-lg border bg-muted/30 overflow-x-auto max-w-full mt-4 mb-6">
              <pre class="p-4 text-sm"><code>import { CustomLoader, createBuiltinLoader, createShadcnLoader, createCompositeLoader } from "reactolith-ui"

// components/custom/editor.tsx       → &lt;ui-editor&gt;
// components/custom/my-widget.tsx    → &lt;ui-my-widget&gt;
const customModules = import.meta.glob("./components/custom/*.tsx")

const loaders = [
  new CustomLoader({
    modules: customModules,
    dirSegment: "/components/custom/",
    dir: "components/custom",
    prefix: "ui-",
  }),
  createBuiltinLoader(),
  createShadcnLoader(modules),
]</code></pre>
            </div>

            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <p>Each file must export its component as the <strong>default export</strong>. The filename maps directly to the tag name: <code>my-widget.tsx</code> → <code>&lt;ui-my-widget&gt;</code>.</p>
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
    <link rel="icon" href="icon.svg" type="image/svg+xml">
    <script type="module" src="/app.ts"></script>
    ${themeInitScript}
</head>
<body class="style-vega">
<div id="reactolith-app">
<ui-theme-provider storage-key="theme">
  <ui-route-progress-bar></ui-route-progress-bar>
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
                ${components.length} component groups powered by Reactolith, shadcn/ui, Base UI, and AI Elements.
                Use standard HTML custom elements with world-class design — for apps and AI interfaces.
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

</ui-theme-provider>
</div>
</body>
</html>
`;
}

// ============================================================================
// GENERATE FILES
// ============================================================================

// ============================================================================
// EXAMPLE PAGES
// ============================================================================

function sidebarInsetExample() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sidebar Inset Example</title>
    <script type="module" src="../../app.ts"></script>
    ${themeInitScript}
</head>
<body class="style-vega">
<div id="reactolith-app">
<ui-theme-provider storage-key="theme">
  <ui-route-progress-bar></ui-route-progress-bar>
  <ui-sidebar-provider>
    <ui-sidebar variant="inset" collapsible="icon">
      <ui-sidebar-header>
        <ui-sidebar-menu>
          <ui-sidebar-menu-item>
            <ui-sidebar-menu-button size="lg">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Acme Inc</span>
                <span class="truncate text-xs text-muted-foreground">Enterprise</span>
              </div>
            </ui-sidebar-menu-button>
          </ui-sidebar-menu-item>
        </ui-sidebar-menu>
      </ui-sidebar-header>
      <ui-sidebar-content>
        <ui-sidebar-group>
          <ui-sidebar-group-label>Platform</ui-sidebar-group-label>
          <ui-sidebar-group-content>
            <ui-sidebar-menu>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button is-active>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                  <span>Dashboard</span>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                  <span>Projects</span>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  <span>Help Center</span>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
            </ui-sidebar-menu>
          </ui-sidebar-group-content>
        </ui-sidebar-group>
        <ui-sidebar-group>
          <ui-sidebar-group-label>Settings</ui-sidebar-group-label>
          <ui-sidebar-group-content>
            <ui-sidebar-menu>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>General</span>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span>Team</span>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  <span>Billing</span>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
            </ui-sidebar-menu>
          </ui-sidebar-group-content>
        </ui-sidebar-group>
      </ui-sidebar-content>
      <ui-sidebar-footer>
        <ui-sidebar-menu>
          <ui-sidebar-menu-item>
            <ui-sidebar-menu-button>
              <ui-avatar class="h-8 w-8 rounded-lg">
                <ui-avatar-fallback class="rounded-lg">JD</ui-avatar-fallback>
              </ui-avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">John Doe</span>
                <span class="truncate text-xs text-muted-foreground">john@acme.com</span>
              </div>
            </ui-sidebar-menu-button>
          </ui-sidebar-menu-item>
        </ui-sidebar-menu>
      </ui-sidebar-footer>
      <ui-sidebar-rail></ui-sidebar-rail>
    </ui-sidebar>
    <ui-sidebar-inset>
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <ui-sidebar-trigger></ui-sidebar-trigger>
        <ui-separator orientation="vertical" class="mr-2 h-4 data-vertical:self-auto"></ui-separator>
        <ui-breadcrumb>
          <ui-breadcrumb-list>
            <ui-breadcrumb-item>
              <ui-breadcrumb-link href="#">Acme Inc</ui-breadcrumb-link>
            </ui-breadcrumb-item>
            <ui-breadcrumb-separator></ui-breadcrumb-separator>
            <ui-breadcrumb-item>
              <ui-breadcrumb-page>Dashboard</ui-breadcrumb-page>
            </ui-breadcrumb-item>
          </ui-breadcrumb-list>
        </ui-breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <div class="aspect-video rounded-xl bg-muted/50"></div>
          <div class="aspect-video rounded-xl bg-muted/50"></div>
          <div class="aspect-video rounded-xl bg-muted/50"></div>
        </div>
        <div class="min-h-[50vh] flex-1 rounded-xl bg-muted/50"></div>
      </div>
    </ui-sidebar-inset>
  </ui-sidebar-provider>
</ui-theme-provider>
</div>
</body>
</html>`;
}

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

// Example pages
writeFile(`${BASE_DIR}/docs/examples/sidebar-inset.html`, sidebarInsetExample());

// Component pages
for (const comp of components) {
  writeFile(`${BASE_DIR}/docs/components/${comp.slug}.html`, componentPage(comp));
}

console.log(`\nGenerated ${components.length + 4} pages.`);

#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Same grouping data from restructure-registry.mjs
const groups = {
  "accordion": ["accordion", "accordion-content", "accordion-item", "accordion-trigger"],
  "alert": ["alert", "alert-action", "alert-description", "alert-title"],
  "alert-dialog": ["alert-dialog", "alert-dialog-action", "alert-dialog-cancel", "alert-dialog-content", "alert-dialog-description", "alert-dialog-footer", "alert-dialog-header", "alert-dialog-media", "alert-dialog-overlay", "alert-dialog-portal", "alert-dialog-title", "alert-dialog-trigger"],
  "aspect-ratio": ["aspect-ratio"],
  "avatar": ["avatar", "avatar-badge", "avatar-fallback", "avatar-group", "avatar-group-count", "avatar-image"],
  "badge": ["badge"],
  "breadcrumb": ["breadcrumb", "breadcrumb-ellipsis", "breadcrumb-item", "breadcrumb-link", "breadcrumb-list", "breadcrumb-page", "breadcrumb-separator"],
  "button": ["button"],
  "button-group": ["button-group", "button-group-separator", "button-group-text"],
  "calendar": ["calendar", "calendar-day-button"],
  "card": ["card", "card-action", "card-content", "card-description", "card-footer", "card-header", "card-title"],
  "carousel": ["carousel", "carousel-content", "carousel-item", "carousel-next", "carousel-previous"],
  "chart": ["chart-container", "chart-legend", "chart-legend-content", "chart-tooltip", "chart-tooltip-content"],
  "checkbox": ["checkbox"],
  "collapsible": ["collapsible", "collapsible-content", "collapsible-trigger"],
  "combobox": ["combobox", "combobox-chip", "combobox-chips", "combobox-chips-input", "combobox-collection", "combobox-content", "combobox-empty", "combobox-group", "combobox-input", "combobox-item", "combobox-label", "combobox-list", "combobox-separator", "combobox-trigger", "combobox-value"],
  "command": ["command", "command-dialog", "command-empty", "command-group", "command-input", "command-item", "command-list", "command-separator", "command-shortcut"],
  "context-menu": ["context-menu", "context-menu-checkbox-item", "context-menu-content", "context-menu-group", "context-menu-item", "context-menu-label", "context-menu-portal", "context-menu-radio-group", "context-menu-radio-item", "context-menu-separator", "context-menu-shortcut", "context-menu-sub", "context-menu-sub-content", "context-menu-sub-trigger", "context-menu-trigger"],
  "dialog": ["dialog", "dialog-close", "dialog-content", "dialog-description", "dialog-footer", "dialog-header", "dialog-overlay", "dialog-portal", "dialog-title", "dialog-trigger"],
  "direction-provider": ["direction-provider"],
  "drawer": ["drawer", "drawer-close", "drawer-content", "drawer-description", "drawer-footer", "drawer-header", "drawer-overlay", "drawer-portal", "drawer-title", "drawer-trigger"],
  "dropdown-menu": ["dropdown-menu", "dropdown-menu-checkbox-item", "dropdown-menu-content", "dropdown-menu-group", "dropdown-menu-item", "dropdown-menu-label", "dropdown-menu-portal", "dropdown-menu-radio-group", "dropdown-menu-radio-item", "dropdown-menu-separator", "dropdown-menu-shortcut", "dropdown-menu-sub", "dropdown-menu-sub-content", "dropdown-menu-sub-trigger", "dropdown-menu-trigger"],
  "empty": ["empty", "empty-content", "empty-description", "empty-header", "empty-media", "empty-title"],
  "field": ["field", "field-content", "field-description", "field-error", "field-group", "field-label", "field-legend", "field-separator", "field-set", "field-title"],
  "hover-card": ["hover-card", "hover-card-content", "hover-card-trigger"],
  "input": ["input"],
  "input-group": ["input-group", "input-group-addon", "input-group-button", "input-group-input", "input-group-text", "input-group-textarea"],
  "input-otp": ["input-otp", "input-otp-group", "input-otp-separator", "input-otp-slot"],
  "item": ["item", "item-actions", "item-content", "item-description", "item-footer", "item-group", "item-header", "item-media", "item-separator", "item-title"],
  "kbd": ["kbd", "kbd-group"],
  "label": ["label"],
  "menubar": ["menubar", "menubar-checkbox-item", "menubar-content", "menubar-group", "menubar-item", "menubar-label", "menubar-menu", "menubar-portal", "menubar-radio-group", "menubar-radio-item", "menubar-separator", "menubar-shortcut", "menubar-sub", "menubar-sub-content", "menubar-sub-trigger", "menubar-trigger"],
  "native-select": ["native-select", "native-select-opt-group", "native-select-option"],
  "navigation-menu": ["navigation-menu", "navigation-menu-content", "navigation-menu-indicator", "navigation-menu-item", "navigation-menu-link", "navigation-menu-list", "navigation-menu-positioner", "navigation-menu-trigger"],
  "pagination": ["pagination", "pagination-content", "pagination-ellipsis", "pagination-item", "pagination-link", "pagination-next", "pagination-previous"],
  "popover": ["popover", "popover-content", "popover-description", "popover-header", "popover-title", "popover-trigger"],
  "progress": ["progress", "progress-indicator", "progress-label", "progress-track", "progress-value"],
  "radio-group": ["radio-group", "radio-group-item"],
  "resizable": ["resizable-handle", "resizable-panel", "resizable-panel-group"],
  "scroll-area": ["scroll-area", "scroll-bar"],
  "select": ["select", "select-content", "select-group", "select-item", "select-label", "select-scroll-down-button", "select-scroll-up-button", "select-separator", "select-trigger", "select-value"],
  "separator": ["separator"],
  "sheet": ["sheet", "sheet-close", "sheet-content", "sheet-description", "sheet-footer", "sheet-header", "sheet-title", "sheet-trigger"],
  "sidebar": ["sidebar", "sidebar-content", "sidebar-footer", "sidebar-group", "sidebar-group-action", "sidebar-group-content", "sidebar-group-label", "sidebar-header", "sidebar-input", "sidebar-inset", "sidebar-menu", "sidebar-menu-action", "sidebar-menu-badge", "sidebar-menu-button", "sidebar-menu-item", "sidebar-menu-skeleton", "sidebar-menu-sub", "sidebar-menu-sub-button", "sidebar-menu-sub-item", "sidebar-provider", "sidebar-rail", "sidebar-separator", "sidebar-trigger"],
  "skeleton": ["skeleton"],
  "slider": ["slider"],
  "sonner": ["sonner"],
  "spinner": ["spinner"],
  "switch": ["switch"],
  "table": ["table", "table-body", "table-caption", "table-cell", "table-footer", "table-head", "table-header", "table-row"],
  "tabs": ["tabs", "tabs-content", "tabs-list", "tabs-trigger"],
  "textarea": ["textarea"],
  "toggle": ["toggle"],
  "toggle-group": ["toggle-group", "toggle-group-item"],
  "tooltip": ["tooltip", "tooltip-content", "tooltip-provider", "tooltip-trigger"],
};

// Build reverse map: component name -> group folder
const componentToGroup = {};
for (const [group, components] of Object.entries(groups)) {
  for (const component of components) {
    componentToGroup[component] = group;
  }
}

// Read registry.json
const registryPath = resolve(import.meta.dirname, "../registry.json");
const registry = JSON.parse(readFileSync(registryPath, "utf-8"));

let updated = 0;
let skipped = 0;
let notFound = 0;

for (const item of registry.items) {
  if (!item.files || item.files.length === 0) {
    skipped++;
    continue;
  }

  const filePath = item.files[0].path;
  // Extract the folder name and filename from the path
  // Pattern: registry/default/app/FOLDER/FILE.tsx
  const match = filePath.match(/^(registry\/default\/app\/)([^/]+)\/([^/]+)$/);
  if (!match) {
    console.log(`WARNING: Unexpected path format: ${filePath}`);
    skipped++;
    continue;
  }

  const prefix = match[1];    // "registry/default/app/"
  const folder = match[2];    // e.g. "accordion-content"
  const filename = match[3];  // e.g. "accordion-content.tsx"

  // Extract component name from filename (remove .tsx extension)
  const componentName = filename.replace(/\.tsx$/, "");

  // Look up the group for this component
  const group = componentToGroup[componentName];
  if (!group) {
    console.log(`WARNING: No group found for component: ${componentName}`);
    notFound++;
    continue;
  }

  // Build new path
  const newPath = `${prefix}${group}/${filename}`;

  if (newPath !== filePath) {
    console.log(`UPDATED: ${filePath} -> ${newPath}`);
    item.files[0].path = newPath;
    updated++;
  } else {
    skipped++;
  }
}

// Write back
writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n", "utf-8");

console.log(`\nDone! Updated ${updated} paths, ${skipped} unchanged, ${notFound} not found in groups.`);

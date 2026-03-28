import type { ModuleMap } from "./component-loader"
import { ComponentLoader, AiElementsLoader } from "./component-loader"
import {
  linkable, linkableClose, trigger, overlay, closeClick,
  commandLinkable, sidebarLinkable, sidebarSubLinkable,
  selectProvider, selectRegister, selectContentRenderer,
  comboboxProvider, comboboxListRenderer,
  createSmartTriggerWrapper,
  progressTransform, spinnerTransform, chartContainerTransform, chartTooltipTransform,
} from "./behaviors"

// ---------------------------------------------------------------------------
// Shadcn UI loader
// ---------------------------------------------------------------------------

export function createShadcnLoader(modules: ModuleMap): ComponentLoader {
  const loader = new ComponentLoader({
    modules,
    dirSegment: "/components/ui/",
    dir: "components/ui",
    prefix: "ui-",
    behaviors: {
      // href support via renderLinkable
      "button": linkable,
      "accordion-trigger": linkable,
      "toggle": linkable,
      "toggle-group-item": linkable,
      "item": linkable,

      // href + close parent overlay
      "dropdown-menu-item": linkableClose,
      "context-menu-item": linkableClose,
      "menubar-item": linkableClose,
      "navigation-menu-link": linkableClose,
      "breadcrumb-link": linkableClose,
      "tabs-trigger": linkableClose,

      // single-child render prop via renderTrigger
      "tooltip-trigger": trigger,
      "sheet-trigger": trigger,
      "sheet-close": trigger,
      "popover-trigger": trigger,
      "dropdown-menu-trigger": trigger,
      "dialog-trigger": trigger,
      "dialog-close": trigger,
      "collapsible-trigger": trigger,
      "alert-dialog-trigger": trigger,

      // CloseOverlayProvider wrapper
      "sheet": overlay,
      "dialog": overlay,
      "drawer": overlay,
      "popover": overlay,
      "command-dialog": overlay,

      // useCloseOverlay on click
      "pagination-link": closeClick,
      "pagination-next": closeClick,
      "pagination-previous": closeClick,
    },
    wrappers: {
      "command-item": commandLinkable,
      "sidebar-menu-button": sidebarLinkable,
      "sidebar-menu-sub-button": sidebarSubLinkable,
      "select": selectProvider,
      "select-item": selectRegister,
      "select-content": selectContentRenderer,
      "combobox": comboboxProvider,
      "combobox-list": comboboxListRenderer,
    },
    propTransforms: {
      "progress": progressTransform,
      "spinner": spinnerTransform,
      "chart-container": chartContainerTransform,
      "chart-tooltip": chartTooltipTransform,
    },
  })

  // Pre-resolve Button for smart trigger wrappers (drawer-trigger, drawer-close)
  const buttonPath = loader.findModule("button")
  if (buttonPath) {
    modules[buttonPath]().then(mod => {
      const Button = loader.findExport(mod, "button")
      const smartTrigger = createSmartTriggerWrapper(Button)
      loader.wrappers["drawer-trigger"] = smartTrigger
      loader.wrappers["drawer-close"] = smartTrigger
    })
  }

  return loader
}

// ---------------------------------------------------------------------------
// AI Elements loader
// ---------------------------------------------------------------------------

export function createAiElementsLoader(modules: ModuleMap): AiElementsLoader {
  return new AiElementsLoader({
    modules,
    dirSegment: "/ai-elements/",
    dir: "components/ai-elements",
    prefix: "ui-ai-",
  })
}


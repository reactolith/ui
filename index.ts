// Loader
export {
  createComponentLoader,
  type ModuleMap,
  type LoaderOptions,
} from "./app/loader"

// Resolution utilities
export { findExport, findModuleInDir, findOverride } from "./app/loader"

// Standard behavior HOCs
export {
  withLinkable,
  withLinkableClose,
  withTrigger,
  withOverlay,
  withCloseClick,
  type Behavior,
} from "./app/loader"

// Behavior maps (for customization)
export {
  STANDARD_BEHAVIORS,
  STANDARD_HOCS,
  RECHARTS,
} from "./app/loader"

// Component wrappers
export {
  wrapComponent,
  createSmartTriggerWrapper,
  withCommandLinkable,
  withSidebarLinkable,
  withSidebarSubLinkable,
  withSelectProvider,
  withSelectRegister,
  withComboboxProvider,
  withComboboxListRenderer,
  DEFAULT_COMPONENT_WRAPPERS,
  PROP_TRANSFORMS,
  type WrapperFn,
} from "./app/loader"

// Utilities
export { renderLinkable, renderTrigger, getSingleElement } from "./lib/render-element"
export { CloseOverlayProvider, useCloseOverlay } from "./lib/close-overlay"
export { SelectItemsProvider, useSelectItemsRegister } from "./lib/select-items"
export { cn } from "./lib/utils"

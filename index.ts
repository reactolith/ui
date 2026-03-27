// Loader classes
export {
  ComponentLoader,
  CustomLoader,
  AiElementsLoader,
  ExternalLoader,
  createCompositeLoader,
  type ModuleMap,
  type ComponentLoaderConfig,
  type AnyLoader,
} from "./lib/loader"

// Behaviors (reusable building blocks)
export {
  linkable,
  linkableClose,
  trigger,
  overlay,
  closeClick,
  type BehaviorDef,
  type WrapperDef,
  type PropTransformDef,
  type WebTypeAttribute,
} from "./lib/loader"

// Component-specific wrappers
export {
  commandLinkable,
  sidebarLinkable,
  sidebarSubLinkable,
  selectProvider,
  selectRegister,
  comboboxProvider,
  comboboxListRenderer,
  createSmartTriggerWrapper,
  HREF_ATTR,
  ITEMS_ATTR,
} from "./lib/loader"

// Prop transforms
export {
  progressTransform,
  spinnerTransform,
  chartContainerTransform,
  chartTooltipTransform,
} from "./lib/loader"

// Preset loader factories
export {
  createShadcnLoader,
  createAiElementsLoader,
} from "./lib/loader"

// Built-in components loader
export { BuiltinLoader, createBuiltinLoader } from "./lib/loader"

// Theme provider hook (for use in custom components)
export { useTheme, type UiTheme, type UiThemeProviderState } from "./lib/components/theme-context"

// Utilities
export { renderLinkable, renderTrigger, getSingleElement } from "./lib/render-element"
export { CloseOverlayProvider, useCloseOverlay } from "./lib/close-overlay"
export { SelectItemsProvider, useSelectItemsRegister } from "./lib/select-items"
export { cn } from "./lib/utils"

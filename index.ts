// Loader classes
export {
  ComponentLoader,
  OverrideLoader,
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
  createRechartsLoader,
  createOverridesLoader,
} from "./lib/loader"

// Utilities
export { renderLinkable, renderTrigger, getSingleElement } from "./lib/render-element"
export { CloseOverlayProvider, useCloseOverlay } from "./lib/close-overlay"
export { SelectItemsProvider, useSelectItemsRegister } from "./lib/select-items"
export { cn } from "./lib/utils"

// Editor (Plate.js integration utilities)
export {
  type EditorProps,
  type EditorFormat,
  useEditorFormSync,
  type UseEditorFormSyncOptions,
} from "./lib/editor"

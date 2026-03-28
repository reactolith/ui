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
} from "./component-loader"

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
} from "./behaviors"

// Component-specific wrappers
export {
  commandLinkable,
  sidebarLinkable,
  sidebarSubLinkable,
  selectProvider,
  selectRegister,
  selectContentRenderer,
  comboboxProvider,
  comboboxListRenderer,
  createSmartTriggerWrapper,
  HREF_ATTR,
  ITEMS_ATTR,
} from "./behaviors"

// Prop transforms
export {
  progressTransform,
  spinnerTransform,
  chartContainerTransform,
  chartTooltipTransform,
} from "./behaviors"

// Preset loader factories
export {
  createShadcnLoader,
  createAiElementsLoader,
} from "./presets"

// Built-in components loader
export { BuiltinLoader, createBuiltinLoader } from "./builtin-loader"

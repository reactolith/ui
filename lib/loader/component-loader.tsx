import * as React from "react"
import type { ComponentType } from "react"
import type { BehaviorDef, WrapperDef, PropTransformDef, WebTypeAttribute } from "./behaviors"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ModuleMap = Record<string, () => Promise<Record<string, any>>>

export interface ComponentLoaderConfig {
  /** Vite module map from import.meta.glob */
  modules: ModuleMap
  /** Segment in module paths to identify this loader's files (e.g. '/components/ui/') */
  dirSegment: string
  /** Directory path relative to project root (for web-types generation) */
  dir: string
  /** Tag name prefix (e.g. 'ui-') */
  prefix: string
  /** Standard behaviors per component name */
  behaviors?: Record<string, BehaviorDef>
  /** Custom wrappers per component name (takes priority over behaviors) */
  wrappers?: Record<string, WrapperDef>
  /** Prop transforms per component name (applied on top of behaviors/wrappers) */
  propTransforms?: Record<string, PropTransformDef>
}

// ---------------------------------------------------------------------------
// ComponentLoader — base class for module-based component resolution
// ---------------------------------------------------------------------------

export class ComponentLoader {
  modules: ModuleMap
  dirSegment: string
  dir: string
  prefix: string
  behaviors: Record<string, BehaviorDef>
  wrappers: Record<string, WrapperDef>
  propTransforms: Record<string, PropTransformDef>

  constructor(config: ComponentLoaderConfig) {
    this.modules = config.modules
    this.dirSegment = config.dirSegment
    this.dir = config.dir
    this.prefix = config.prefix
    this.behaviors = config.behaviors ?? {}
    this.wrappers = config.wrappers ?? {}
    this.propTransforms = config.propTransforms ?? {}
  }

  /** Find module by progressively removing trailing kebab segments */
  findModule(name: string): string | null {
    const parts = name.split("-")
    for (let i = parts.length; i >= 1; i--) {
      const moduleKey = parts.slice(0, i).join("-")
      // Exact match: field-label → field-label.tsx
      const exact = Object.keys(this.modules).find(k =>
        k.includes(this.dirSegment) && k.endsWith(`/${moduleKey}.tsx`),
      )
      if (exact) return exact
      // Prefix match: attachment → attachments.tsx, environment-variable → environment-variables.tsx
      const prefix = Object.keys(this.modules).find(k => {
        if (!k.includes(this.dirSegment) || !k.endsWith(".tsx")) return false
        const fileName = k.slice(k.lastIndexOf("/") + 1, -4) // strip path + .tsx
        return fileName.startsWith(moduleKey) && fileName !== moduleKey
      })
      if (prefix) return prefix
    }
    return null
  }

  /** Case-insensitive export lookup: "field-label" matches "FieldLabel" */
  findExport(mod: Record<string, any>, kebabName: string): ComponentType<any> | null {
    const normalized = kebabName.replace(/-/g, "").toLowerCase()
    for (const key of Object.keys(mod)) {
      if (key.toLowerCase() === normalized) return mod[key]
    }
    return null
  }

  /** Check if this loader can resolve the given component name */
  canHandle(name: string): boolean {
    return this.findModule(name) !== null
  }

  /** Resolve a component by name, apply wrappers, return loadable module */
  async load(name: string): Promise<{ default: ComponentType<any> }> {
    const path = this.findModule(name)
    if (!path) throw new Error(`Component not found: ${name}`)
    const mod = await this.modules[path]()
    const Component = this.findExport(mod, name)
    if (!Component) throw new Error(`Export "${name}" not found in ${path}`)
    return { default: this.applyWrappers(name, Component, mod) }
  }

  /** Apply wrapper/behavior + prop transform to a component */
  applyWrappers(name: string, C: ComponentType<any>, mod: Record<string, any>): ComponentType<any> {
    let result = C

    // Custom wrapper takes priority over standard behavior
    const wrapper = this.wrappers[name]
    if (wrapper) {
      result = wrapper.fn(result, mod)
    } else {
      const behavior = this.behaviors[name]
      if (behavior) result = behavior.hoc(result)
    }

    // Prop transform on top
    const transformDef = this.propTransforms[name]
    if (transformDef) {
      const Inner = result
      result = React.forwardRef((props: any, ref: any) =>
        <Inner {...transformDef.transform(props)} ref={ref} />,
      )
    }

    return result
  }

  /** Get additional web-type attributes added by behaviors/wrappers */
  getAdditionalAttributes(componentName: string): WebTypeAttribute[] {
    const wrapper = this.wrappers[componentName]
    if (wrapper?.additionalAttributes) return wrapper.additionalAttributes
    const behavior = this.behaviors[componentName]
    return behavior?.additionalAttributes ?? []
  }
}

// ---------------------------------------------------------------------------
// CustomLoader — exact file name match, returns default export unmodified
// ---------------------------------------------------------------------------

export class CustomLoader extends ComponentLoader {
  canHandle(name: string): boolean {
    return !!Object.keys(this.modules).find(k =>
      k.includes(this.dirSegment) && k.endsWith(`/${name}.tsx`),
    )
  }

  async load(name: string): Promise<{ default: ComponentType<any> }> {
    const path = Object.keys(this.modules).find(k =>
      k.includes(this.dirSegment) && k.endsWith(`/${name}.tsx`),
    )
    if (!path) throw new Error(`Override not found: ${name}`)
    return this.modules[path]() as Promise<{ default: ComponentType<any> }>
  }
}

// ---------------------------------------------------------------------------
// AiElementsLoader — strips 'ai-' prefix before resolving
// ---------------------------------------------------------------------------

export class AiElementsLoader extends ComponentLoader {
  canHandle(name: string): boolean {
    if (!name.startsWith("ai-")) return false
    return super.canHandle(name.substring(3))
  }

  async load(name: string): Promise<{ default: ComponentType<any> }> {
    return super.load(name.substring(3))
  }
}

// ---------------------------------------------------------------------------
// ExternalLoader — components from external packages (e.g. recharts)
// ---------------------------------------------------------------------------

export class ExternalLoader {
  prefix: string
  knownComponents: Set<string>
  private importFn: () => Promise<Record<string, any>>

  constructor(config: {
    prefix: string
    components: string[]
    importFn: () => Promise<Record<string, any>>
  }) {
    this.prefix = config.prefix
    this.knownComponents = new Set(config.components)
    this.importFn = config.importFn
  }

  canHandle(name: string): boolean {
    return this.knownComponents.has(name)
  }

  async load(name: string): Promise<{ default: ComponentType<any> }> {
    const mod = await this.importFn()
    const normalized = name.replace(/-/g, "").toLowerCase()
    for (const key of Object.keys(mod)) {
      if (key.toLowerCase() === normalized) return { default: mod[key] }
    }
    throw new Error(`Export not found in external package: ${name}`)
  }

  getAdditionalAttributes(): WebTypeAttribute[] {
    return []
  }
}

// ---------------------------------------------------------------------------
// Composite loader — chains multiple loaders in priority order
// ---------------------------------------------------------------------------

import type { BuiltinLoader } from "./builtin-loader"

export type AnyLoader = ComponentLoader | ExternalLoader | BuiltinLoader

export function createCompositeLoader(
  loaders: AnyLoader[],
  prefix = "ui-",
): (props: { is: string }) => Promise<{ default: ComponentType<any> }> {
  return ({ is }) => {
    const name = is.substring(prefix.length)
    for (const loader of loaders) {
      if (loader.canHandle(name)) return loader.load(name)
    }
    throw new Error(`No loader found for: ${is}`)
  }
}

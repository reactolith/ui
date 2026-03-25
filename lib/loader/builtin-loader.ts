import type { ComponentType } from "react"
import type { WebTypeAttribute } from "./behaviors"

// ---------------------------------------------------------------------------
// Registry of built-in components shipped with the library.
// Each entry maps a component name to a dynamic import so the component
// (and its dependencies) are only loaded when actually used.
// ---------------------------------------------------------------------------

const BUILTIN_COMPONENTS: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  "sonner": () => import("../components/sonner"),
  "theme-switch": () => import("../components/theme-switch"),
}

// ---------------------------------------------------------------------------
// BuiltinLoader — resolves components bundled with reactolith-ui
// ---------------------------------------------------------------------------

export class BuiltinLoader {
  private registry: Record<string, () => Promise<{ default: ComponentType<any> }>>

  constructor(registry = BUILTIN_COMPONENTS) {
    this.registry = registry
  }

  canHandle(name: string): boolean {
    return name in this.registry
  }

  async load(name: string): Promise<{ default: ComponentType<any> }> {
    const importFn = this.registry[name]
    if (!importFn) throw new Error(`Built-in component not found: ${name}`)
    return importFn()
  }

  getAdditionalAttributes(): WebTypeAttribute[] {
    return []
  }

  /** List all registered component names (for web-types generation) */
  get componentNames(): string[] {
    return Object.keys(this.registry)
  }
}

export function createBuiltinLoader(): BuiltinLoader {
  return new BuiltinLoader()
}

import * as React from "react"
import { type ComponentType } from "react"
import { renderLinkable, renderTrigger } from "@/registry/default/lib/render-element"
import { CloseOverlayProvider, useCloseOverlay } from "@/registry/default/lib/close-overlay"

type ModuleMap = Record<string, () => Promise<Record<string, any>>>

// ---------------------------------------------------------------------------
// Behavior configuration
// ---------------------------------------------------------------------------

type Behavior = 'linkable' | 'linkable-close' | 'trigger' | 'overlay' | 'close-click'

const BEHAVIORS: Record<string, Behavior> = {
  // href support via renderLinkable
  'button': 'linkable',
  'accordion-trigger': 'linkable',
  'toggle': 'linkable',
  'toggle-group-item': 'linkable',

  // href + close parent overlay
  'dropdown-menu-item': 'linkable-close',
  'context-menu-item': 'linkable-close',
  'menubar-item': 'linkable-close',
  'navigation-menu-link': 'linkable-close',
  'breadcrumb-link': 'linkable-close',
  'tabs-trigger': 'linkable-close',

  // single-child render prop via renderTrigger
  'tooltip-trigger': 'trigger',
  'sheet-trigger': 'trigger',
  'sheet-close': 'trigger',
  'popover-trigger': 'trigger',
  'dropdown-menu-trigger': 'trigger',
  'dialog-trigger': 'trigger',
  'dialog-close': 'trigger',
  'collapsible-trigger': 'trigger',
  'alert-dialog-trigger': 'trigger',

  // CloseOverlayProvider wrapper
  'sheet': 'overlay',
  'dialog': 'overlay',
  'drawer': 'overlay',
  'popover': 'overlay',
  'command-dialog': 'overlay',

  // useCloseOverlay on click
  'pagination-link': 'close-click',
  'pagination-next': 'close-click',
  'pagination-previous': 'close-click',
}

// ---------------------------------------------------------------------------
// Recharts components (re-exported from external package)
// ---------------------------------------------------------------------------

const RECHARTS = new Set([
  'area-chart', 'area', 'bar-chart', 'bar', 'cartesian-grid', 'cell',
  'label-list', 'line-chart', 'line', 'pie-chart', 'pie',
  'polar-angle-axis', 'polar-grid', 'polar-radius-axis',
  'radar-chart', 'radar', 'radial-bar-chart', 'radial-bar',
  'x-axis', 'y-axis',
])

// ---------------------------------------------------------------------------
// Resolution utilities
// ---------------------------------------------------------------------------

/** Case-insensitive export lookup: "field-label" matches "FieldLabel" */
function findExport(mod: Record<string, any>, kebabName: string): ComponentType<any> | null {
  const normalized = kebabName.replace(/-/g, '').toLowerCase()
  for (const key of Object.keys(mod)) {
    if (key.toLowerCase() === normalized) return mod[key]
  }
  return null
}

/**
 * Resolve a kebab-name to a module file by progressively removing trailing
 * segments.  E.g. "dropdown-menu-item" tries:
 *   dropdown-menu-item.tsx → dropdown-menu.tsx → dropdown.tsx
 */
function findModule(name: string, modules: ModuleMap): string | null {
  const parts = name.split('-')
  for (let i = parts.length; i >= 1; i--) {
    const moduleKey = parts.slice(0, i).join('-')
    const path = Object.keys(modules).find(k => k.endsWith(`/${moduleKey}.tsx`))
    if (path) return path
  }
  return null
}

// ---------------------------------------------------------------------------
// Behavior HOCs
// ---------------------------------------------------------------------------

function withLinkable(C: ComponentType<any>): ComponentType<any> {
  const W = React.forwardRef(({ href, children, is, ...props }: any, ref: any) =>
    renderLinkable(C, props, { href, ref, children })
  )
  W.displayName = `withLinkable(${C.displayName || C.name})`
  return W
}

function withLinkableClose(C: ComponentType<any>): ComponentType<any> {
  const W = React.forwardRef(({ href, children, is, ...props }: any, ref: any) => {
    const closeOverlay = useCloseOverlay()
    return renderLinkable(C, props, { href, ref, children, onNavigate: closeOverlay })
  })
  W.displayName = `withLinkableClose(${C.displayName || C.name})`
  return W
}

function withTrigger(C: ComponentType<any>): ComponentType<any> {
  const W = ({ children, is, ...props }: any) => renderTrigger(C, props, children)
  W.displayName = `withTrigger(${C.displayName || C.name})`
  return W
}

function withOverlay(C: ComponentType<any>): ComponentType<any> {
  const W = ({ onOpenChange, children, is, ...props }: any) => {
    const handleClose = React.useCallback(() => onOpenChange?.(false), [onOpenChange])
    return (
      <C onOpenChange={onOpenChange} {...props}>
        <CloseOverlayProvider onClose={handleClose}>
          {children}
        </CloseOverlayProvider>
      </C>
    )
  }
  W.displayName = `withOverlay(${C.displayName || C.name})`
  return W
}

function withCloseClick(C: ComponentType<any>): ComponentType<any> {
  const W = React.forwardRef(({ onClick, is, ...props }: any, ref: any) => {
    const closeOverlay = useCloseOverlay()
    const handleClick = React.useCallback(
      (e: any) => { closeOverlay?.(); onClick?.(e) },
      [closeOverlay, onClick]
    )
    return <C ref={ref} onClick={handleClick} {...props} />
  })
  W.displayName = `withCloseClick(${C.displayName || C.name})`
  return W
}

const BEHAVIOR_HOCS: Record<Behavior, (C: ComponentType<any>) => ComponentType<any>> = {
  'linkable': withLinkable,
  'linkable-close': withLinkableClose,
  'trigger': withTrigger,
  'overlay': withOverlay,
  'close-click': withCloseClick,
}

function applyBehavior(name: string, Component: ComponentType<any>): ComponentType<any> {
  const behavior = BEHAVIORS[name]
  if (!behavior) return Component
  return BEHAVIOR_HOCS[behavior](Component)
}

// ---------------------------------------------------------------------------
// Main loader factory
// ---------------------------------------------------------------------------

export function createComponentLoader(
  uiModules: ModuleMap,
  aiModules: ModuleMap,
  overrideModules: ModuleMap,
) {
  return ({ is }: { is: string }): Promise<{ default: ComponentType<any> }> => {
    const name = is.substring(3) // strip "ui-"

    // 1. Override files take priority (custom logic components)
    const overrideMatch = Object.keys(overrideModules).find(k => k.endsWith(`/${name}.tsx`))
    if (overrideMatch) {
      return overrideModules[overrideMatch]() as Promise<{ default: ComponentType }>
    }

    // 2. AI components: ui-ai-* → components/ai-elements/
    if (name.startsWith('ai-')) {
      const aiName = name.substring(3) // strip "ai-"
      const path = findModule(aiName, aiModules)
      if (!path) throw new Error(`AI component not found: ${is}`)
      return aiModules[path]().then(mod => {
        const Component = findExport(mod, aiName)
        if (!Component) throw new Error(`Export "${aiName}" not found in ${path}`)
        return { default: Component }
      })
    }

    // 3. Recharts components (external package)
    if (RECHARTS.has(name)) {
      return import('recharts').then(mod => {
        const Component = findExport(mod as any, name)
        if (!Component) throw new Error(`Recharts export not found: ${name}`)
        return { default: Component }
      })
    }

    // 4. UI components: components/ui/*.tsx
    const path = findModule(name, uiModules)
    if (!path) throw new Error(`Component not found: ${is}`)
    return uiModules[path]().then(mod => {
      const Component = findExport(mod, name)
      if (!Component) throw new Error(`Export "${name}" not found in ${path}`)
      return { default: applyBehavior(name, Component) }
    })
  }
}

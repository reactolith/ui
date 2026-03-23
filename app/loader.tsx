import * as React from "react"
import { type ComponentType } from "react"
import { renderLinkable, renderTrigger, getSingleElement } from "@/lib/render-element"
import { CloseOverlayProvider, useCloseOverlay } from "@/lib/close-overlay"
import { SelectItemsProvider, useSelectItemsRegister } from "@/lib/select-items"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ModuleMap = Record<string, () => Promise<Record<string, any>>>

// ---------------------------------------------------------------------------
// Contexts (shared between provider/consumer behaviors)
// ---------------------------------------------------------------------------

type ComboboxItemShape = string | { value: string; label: string }
const ComboboxItemsContext = React.createContext<ComboboxItemShape[] | null>(null)

// ---------------------------------------------------------------------------
// Recharts components (external package)
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

/** Find module in a specific directory within the module map */
function findModuleInDir(name: string, modules: ModuleMap, dirSegment: string): string | null {
  const parts = name.split('-')
  for (let i = parts.length; i >= 1; i--) {
    const moduleKey = parts.slice(0, i).join('-')
    const path = Object.keys(modules).find(k =>
      k.includes(dirSegment) && k.endsWith(`/${moduleKey}.tsx`)
    )
    if (path) return path
  }
  return null
}

/** Find override file in registry/default/app/ */
function findOverride(name: string, modules: ModuleMap): string | null {
  return Object.keys(modules).find(k =>
    k.includes('/app/overrides/') && k.endsWith(`/${name}.tsx`)
  ) || null
}

// ---------------------------------------------------------------------------
// Standard behavior HOCs
// ---------------------------------------------------------------------------

type Behavior = 'linkable' | 'linkable-close' | 'trigger' | 'overlay' | 'close-click'

const STANDARD_BEHAVIORS: Record<string, Behavior> = {
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

function withLinkable(C: ComponentType<any>): ComponentType<any> {
  return React.forwardRef(({ href, children, is, ...props }: any, ref: any) =>
    renderLinkable(C, props, { href, ref, children })
  )
}

function withLinkableClose(C: ComponentType<any>): ComponentType<any> {
  return React.forwardRef(({ href, children, is, ...props }: any, ref: any) => {
    const closeOverlay = useCloseOverlay()
    return renderLinkable(C, props, { href, ref, children, onNavigate: closeOverlay })
  })
}

function withTrigger(C: ComponentType<any>): ComponentType<any> {
  return ({ children, is, ...props }: any) => renderTrigger(C, props, children)
}

function withOverlay(C: ComponentType<any>): ComponentType<any> {
  return ({ onOpenChange, children, is, ...props }: any) => {
    const handleClose = React.useCallback(() => onOpenChange?.(false), [onOpenChange])
    return (
      <C onOpenChange={onOpenChange} {...props}>
        <CloseOverlayProvider onClose={handleClose}>
          {children}
        </CloseOverlayProvider>
      </C>
    )
  }
}

function withCloseClick(C: ComponentType<any>): ComponentType<any> {
  return React.forwardRef(({ onClick, is, ...props }: any, ref: any) => {
    const closeOverlay = useCloseOverlay()
    const handleClick = React.useCallback(
      (e: any) => { closeOverlay?.(); onClick?.(e) },
      [closeOverlay, onClick]
    )
    return <C ref={ref} onClick={handleClick} {...props} />
  })
}

const STANDARD_HOCS: Record<Behavior, (C: ComponentType<any>) => ComponentType<any>> = {
  'linkable': withLinkable,
  'linkable-close': withLinkableClose,
  'trigger': withTrigger,
  'overlay': withOverlay,
  'close-click': withCloseClick,
}

// ---------------------------------------------------------------------------
// Component-specific wrappers (need custom logic or module access)
// ---------------------------------------------------------------------------

type WrapperFn = (C: ComponentType<any>, mod: Record<string, any>) => ComponentType<any>

function withSmartTrigger(C: ComponentType<any>): ComponentType<any> {
  return ({ children, is, ...props }: any) => {
    const singleChild = getSingleElement(children)
    if (singleChild) return <C asChild {...props}>{singleChild}</C>
    return <C asChild {...props}><Button variant="outline">{children}</Button></C>
  }
}

function withCommandLinkable(C: ComponentType<any>): ComponentType<any> {
  return React.forwardRef(({ href, children, is, ...props }: any, ref: any) => {
    const closeOverlay = useCloseOverlay()
    if (href) {
      return (
        <C ref={ref} {...props}>
          <a href={href} data-slot="command-item-link" className="cn-command-item-link contents"
            onClick={() => closeOverlay?.()}>{children}</a>
        </C>
      )
    }
    return <C ref={ref} {...props}>{children}</C>
  })
}

function withSidebarLinkable(C: ComponentType<any>, mod: Record<string, any>): ComponentType<any> {
  const useSidebar = mod.useSidebar as () => { isMobile: boolean; setOpenMobile: (v: boolean) => void }
  return ({ href, onClick, children, ref, is, ...props }: any) => {
    const { isMobile, setOpenMobile } = useSidebar()
    const closeOverlay = useCloseOverlay()
    const handleClick = React.useCallback(
      (e: any) => {
        if (isMobile) setOpenMobile(false)
        closeOverlay?.()
        onClick?.(e)
      },
      [isMobile, setOpenMobile, closeOverlay, onClick]
    )
    return renderLinkable(C, { ...props, onClick: handleClick }, { href, ref, children })
  }
}

function withSidebarSubLinkable(C: ComponentType<any>, mod: Record<string, any>): ComponentType<any> {
  const useSidebar = mod.useSidebar as () => { isMobile: boolean; setOpenMobile: (v: boolean) => void }
  return React.forwardRef(({ onClick, is, ...props }: any, ref: any) => {
    const { isMobile, setOpenMobile } = useSidebar()
    const closeOverlay = useCloseOverlay()
    const handleClick = React.useCallback(
      (e: any) => {
        if (isMobile) setOpenMobile(false)
        closeOverlay?.()
        onClick?.(e)
      },
      [isMobile, setOpenMobile, closeOverlay, onClick]
    )
    return <C ref={ref} onClick={handleClick} {...props} />
  })
}

function withSelectProvider(C: ComponentType<any>): ComponentType<any> {
  return React.forwardRef(({ children, is, ...props }: any, ref: any) => {
    const [items, setItems] = React.useState<Record<string, string> | undefined>(undefined)
    const handleItemsChange = React.useCallback((next: Record<string, string>) => {
      setItems(Object.keys(next).length > 0 ? next : undefined)
    }, [])
    return (
      <SelectItemsProvider onItemsChange={handleItemsChange}>
        <C ref={ref} items={items} {...props}>{children}</C>
      </SelectItemsProvider>
    )
  })
}

function withSelectRegister(C: ComponentType<any>): ComponentType<any> {
  return React.forwardRef(({ value, children, is, ...props }: any, ref: any) => {
    const register = useSelectItemsRegister()
    React.useEffect(() => {
      if (register && value != null) {
        const label =
          typeof children === "string" ? children
            : typeof children === "number" ? String(children)
              : String(value)
        register.registerItem(String(value), label)
        return () => register.unregisterItem(String(value))
      }
    }, [register, value, children])
    return <C ref={ref} value={value} {...props}>{children}</C>
  })
}

function withComboboxProvider(C: ComponentType<any>): ComponentType<any> {
  return ({ items, children, is, ...props }: any) => {
    if (!items) return <C {...props}>{children}</C>
    const hasObjects = items.length > 0 && typeof items[0] === "object"
    return (
      <ComboboxItemsContext.Provider value={items}>
        <C
          items={items}
          {...(hasObjects
            ? { getOptionAsString: (item: ComboboxItemShape) => typeof item === "string" ? item : item.label }
            : {})}
          {...props}
        >
          {children}
        </C>
      </ComboboxItemsContext.Provider>
    )
  }
}

function withComboboxListRenderer(C: ComponentType<any>, mod: Record<string, any>): ComponentType<any> {
  const ComboboxItem = mod.ComboboxItem as ComponentType<any>
  return ({ children, is, ...props }: any) => {
    const items = React.useContext(ComboboxItemsContext)
    if (!items || !ComboboxItem) return <C {...props}>{children}</C>
    return (
      <C {...props}>
        {(item: ComboboxItemShape) => {
          const value = typeof item === "string" ? item : item.value
          const label = typeof item === "string" ? item : item.label
          return <ComboboxItem key={value} value={item}>{label}</ComboboxItem>
        }}
      </C>
    )
  }
}

const COMPONENT_WRAPPERS: Record<string, WrapperFn> = {
  'drawer-trigger': withSmartTrigger,
  'drawer-close': withSmartTrigger,
  'command-item': withCommandLinkable,
  'sidebar-menu-button': withSidebarLinkable,
  'sidebar-menu-sub-button': withSidebarSubLinkable,
  'select': withSelectProvider,
  'select-item': withSelectRegister,
  'combobox': withComboboxProvider,
  'combobox-list': withComboboxListRenderer,
}

// ---------------------------------------------------------------------------
// Prop transforms (simple prop rewriting, no component tree changes)
// ---------------------------------------------------------------------------

const SPINNER_SIZES: Record<string, string> = {
  sm: "size-3", default: "size-4", lg: "size-6",
}

const PROP_TRANSFORMS: Record<string, (props: any) => any> = {
  'progress': ({ value, is, ...rest }: any) => ({
    ...rest,
    value: value != null ? Number(value) : undefined,
  }),
  'spinner': ({ size, className, is, ...rest }: any) => ({
    ...rest,
    className: [size && SPINNER_SIZES[size], className].filter(Boolean).join(' ') || undefined,
  }),
  'chart-container': ({ className, is, ...rest }: any) => ({
    ...rest,
    className: cn(
      "relative [&>.recharts-responsive-container]:absolute [&>.recharts-responsive-container]:inset-0",
      className,
    ),
  }),
  'chart-tooltip': ({ children, is, ...rest }: any) => ({
    ...rest,
    content: children,
  }),
}

// ---------------------------------------------------------------------------
// Wrap component: apply behavior + prop transform
// ---------------------------------------------------------------------------

function wrapComponent(name: string, C: ComponentType<any>, mod: Record<string, any>): ComponentType<any> {
  let result = C

  // Component-specific wrapper (takes priority over standard behaviors)
  const wrapper = COMPONENT_WRAPPERS[name]
  if (wrapper) {
    result = wrapper(result, mod)
  } else {
    // Standard behavior
    const behavior = STANDARD_BEHAVIORS[name]
    if (behavior) result = STANDARD_HOCS[behavior](result)
  }

  // Prop transform (applied on top of behavior)
  const transform = PROP_TRANSFORMS[name]
  if (transform) {
    const Inner = result
    result = React.forwardRef((props: any, ref: any) => <Inner {...transform(props)} ref={ref} />)
  }

  return result
}

// ---------------------------------------------------------------------------
// Main loader factory
// ---------------------------------------------------------------------------

export function createComponentLoader(modules: ModuleMap) {
  return ({ is }: { is: string }): Promise<{ default: ComponentType<any> }> => {
    const name = is.substring(3) // strip "ui-"

    // 1. Override files take priority (sonner, theme-switch)
    const override = findOverride(name, modules)
    if (override) return modules[override]() as Promise<{ default: ComponentType }>

    // 2. AI components: ui-ai-* → components/ai-elements/
    if (name.startsWith('ai-')) {
      const aiName = name.substring(3)
      const path = findModuleInDir(aiName, modules, '/ai-elements/')
      if (!path) throw new Error(`AI component not found: ${is}`)
      return modules[path]().then(mod => {
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
    const path = findModuleInDir(name, modules, '/components/ui/')
    if (!path) throw new Error(`Component not found: ${is}`)
    return modules[path]().then(mod => {
      const Component = findExport(mod, name)
      if (!Component) throw new Error(`Export "${name}" not found in ${path}`)
      return { default: wrapComponent(name, Component, mod) }
    })
  }
}

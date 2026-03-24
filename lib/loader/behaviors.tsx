import * as React from "react"
import type { ComponentType } from "react"
import { renderLinkable, renderTrigger, getSingleElement } from "../render-element"
import { CloseOverlayProvider, useCloseOverlay } from "../close-overlay"
import { SelectItemsProvider, useSelectItemsRegister } from "../select-items"
import { cn } from "../utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WebTypeAttribute {
  name: string
  required: boolean
  value: { kind: "plain" | "expression" | "no-value"; type: string }
  description?: string
}

/** A reusable behavior: runtime HOC + web-type metadata */
export interface BehaviorDef {
  hoc: (C: ComponentType<any>) => ComponentType<any>
  additionalAttributes?: WebTypeAttribute[]
}

/** A component-specific wrapper that may need sibling exports from the module */
export interface WrapperDef {
  fn: (C: ComponentType<any>, mod: Record<string, any>) => ComponentType<any>
  additionalAttributes?: WebTypeAttribute[]
}

/** Prop transform applied on top of behaviors/wrappers */
export interface PropTransformDef {
  transform: (props: any) => any
}

// ---------------------------------------------------------------------------
// Common web-type attributes
// ---------------------------------------------------------------------------

export const HREF_ATTR: WebTypeAttribute = {
  name: "href",
  required: false,
  value: { kind: "plain", type: "string" },
  description: "Navigation URL. Renders the component as a link.",
}

export const ITEMS_ATTR: WebTypeAttribute = {
  name: "items",
  required: false,
  value: { kind: "expression", type: '(string | { value: string; label: string })[]' },
  description: "Items to render in the list.",
}

// ---------------------------------------------------------------------------
// Standard behaviors (reusable across loaders)
// ---------------------------------------------------------------------------

/** Adds `href` prop — renders as `<a>` link when href is provided */
export const linkable: BehaviorDef = {
  hoc: (C) => React.forwardRef(({ href, children, is, ...props }: any, ref: any) =>
    renderLinkable(C, props, { href, ref, children }),
  ),
  additionalAttributes: [HREF_ATTR],
}

/** Adds `href` prop + closes parent overlay on navigation */
export const linkableClose: BehaviorDef = {
  hoc: (C) => React.forwardRef(({ href, children, is, ...props }: any, ref: any) => {
    const closeOverlay = useCloseOverlay()
    return renderLinkable(C, props, { href, ref, children, onNavigate: closeOverlay })
  }),
  additionalAttributes: [HREF_ATTR],
}

/** Wraps single-child in asChild render prop pattern */
export const trigger: BehaviorDef = {
  hoc: (C) => ({ children, is, ...props }: any) => renderTrigger(C, props, children),
}

/** Wraps children with CloseOverlayProvider for close-on-navigate */
export const overlay: BehaviorDef = {
  hoc: (C) => ({ onOpenChange, children, is, ...props }: any) => {
    const handleClose = React.useCallback(() => onOpenChange?.(false), [onOpenChange])
    return (
      <C onOpenChange={onOpenChange} {...props}>
        <CloseOverlayProvider onClose={handleClose}>
          {children}
        </CloseOverlayProvider>
      </C>
    )
  },
}

/** Calls useCloseOverlay() on click */
export const closeClick: BehaviorDef = {
  hoc: (C) => React.forwardRef(({ onClick, is, ...props }: any, ref: any) => {
    const closeOverlay = useCloseOverlay()
    const handleClick = React.useCallback(
      (e: any) => { closeOverlay?.(); onClick?.(e) },
      [closeOverlay, onClick],
    )
    return <C ref={ref} onClick={handleClick} {...props} />
  }),
}

// ---------------------------------------------------------------------------
// Component-specific wrappers
// ---------------------------------------------------------------------------

type ComboboxItemShape = string | { value: string; label: string }
const ComboboxItemsContext = React.createContext<ComboboxItemShape[] | null>(null)

/** Command item with href → wraps children in <a> + closes overlay */
export const commandLinkable: WrapperDef = {
  fn: (C) => React.forwardRef(({ href, children, is, ...props }: any, ref: any) => {
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
  }),
  additionalAttributes: [HREF_ATTR],
}

/** Sidebar menu button with href + mobile close */
export const sidebarLinkable: WrapperDef = {
  fn: (C, mod) => {
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
        [isMobile, setOpenMobile, closeOverlay, onClick],
      )
      return renderLinkable(C, { ...props, onClick: handleClick }, { href, ref, children })
    }
  },
  additionalAttributes: [HREF_ATTR],
}

/** Sidebar sub-button with mobile close */
export const sidebarSubLinkable: WrapperDef = {
  fn: (C, mod) => {
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
        [isMobile, setOpenMobile, closeOverlay, onClick],
      )
      return <C ref={ref} onClick={handleClick} {...props} />
    })
  },
}

/** Select root with SelectItemsProvider context */
export const selectProvider: WrapperDef = {
  fn: (C) => React.forwardRef(({ children, is, ...props }: any, ref: any) => {
    const [items, setItems] = React.useState<Record<string, string> | undefined>(undefined)
    const handleItemsChange = React.useCallback((next: Record<string, string>) => {
      setItems(Object.keys(next).length > 0 ? next : undefined)
    }, [])
    return (
      <SelectItemsProvider onItemsChange={handleItemsChange}>
        <C ref={ref} items={items} {...props}>{children}</C>
      </SelectItemsProvider>
    )
  }),
}

/** Select item that registers its value/label with the provider */
export const selectRegister: WrapperDef = {
  fn: (C) => React.forwardRef(({ value, children, is, ...props }: any, ref: any) => {
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
  }),
}

/** Combobox root with items context provider */
export const comboboxProvider: WrapperDef = {
  fn: (C) => ({ items, children, is, ...props }: any) => {
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
  },
  additionalAttributes: [ITEMS_ATTR],
}

/** Combobox list that auto-renders items from context */
export const comboboxListRenderer: WrapperDef = {
  fn: (C, mod) => {
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
  },
}

// ---------------------------------------------------------------------------
// Smart trigger wrapper factory (wraps in Button when no single child)
// ---------------------------------------------------------------------------

export function createSmartTriggerWrapper(ButtonComponent: ComponentType<any> | null): WrapperDef {
  return {
    fn: (C) => ({ children, is, ...props }: any) => {
      const singleChild = getSingleElement(children)
      if (singleChild) return <C asChild {...props}>{singleChild}</C>
      if (ButtonComponent) {
        return <C asChild {...props}><ButtonComponent variant="outline">{children}</ButtonComponent></C>
      }
      return <C asChild {...props}><button type="button">{children}</button></C>
    },
  }
}

// ---------------------------------------------------------------------------
// Prop transforms
// ---------------------------------------------------------------------------

const SPINNER_SIZES: Record<string, string> = {
  sm: "size-3", default: "size-4", lg: "size-6",
}

export const progressTransform: PropTransformDef = {
  transform: ({ value, is, ...rest }: any) => ({
    ...rest,
    value: value != null ? Number(value) : undefined,
  }),
}

export const spinnerTransform: PropTransformDef = {
  transform: ({ size, className, is, ...rest }: any) => ({
    ...rest,
    className: [size && SPINNER_SIZES[size], className].filter(Boolean).join(" ") || undefined,
  }),
}

export const chartContainerTransform: PropTransformDef = {
  transform: ({ className, is, ...rest }: any) => ({
    ...rest,
    className: cn(
      "relative [&>.recharts-responsive-container]:absolute [&>.recharts-responsive-container]:inset-0",
      className,
    ),
  }),
}

export const chartTooltipTransform: PropTransformDef = {
  transform: ({ children, is, ...rest }: any) => ({
    ...rest,
    content: children,
  }),
}

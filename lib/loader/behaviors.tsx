import * as React from "react"
import type { ComponentType } from "react"
import { renderLinkable, renderTrigger, getSingleElement } from "../render-element"
import { CloseOverlayProvider, useCloseOverlay } from "../close-overlay"
import { SelectItemsProvider, useSelectItemsRegister } from "../select-items"
import { cn } from "../utils"
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item"
import { FormItemContext, FormSubmittingContext } from "@/components/ui/form"

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

/** Reads FormItemContext to apply aria-invalid and disabled when submitting */
export const formField: BehaviorDef = {
  hoc: (C) => React.forwardRef(({ is, ...props }: any, ref: any) => {
    const formItem = React.useContext(FormItemContext)
    const submitting = React.useContext(FormSubmittingContext)
    if (!formItem) return <C ref={ref} {...props} />
    return (
      <C
        ref={ref}
        {...props}
        aria-invalid={formItem.invalid || undefined}
        disabled={props.disabled || submitting || undefined}
      />
    )
  }),
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

type SelectItemShape = string | { value: string; label: string }
const SelectItemsDataContext = React.createContext<SelectItemShape[] | null>(null)

type ComboboxItemShape = string | { value: string; label: string; description?: string; suffix?: string }
const ComboboxItemsContext = React.createContext<ComboboxItemShape[] | null>(null)

/** Resolve a string value/defaultValue to the matching item object */
function resolveItemValue<T extends { value: string }>(
  val: any,
  items: (string | T)[] | undefined,
  hasObjects: boolean,
): any {
  if (val === undefined || val === null || !hasObjects || !items) return val
  if (typeof val === "string") {
    return items.find(i => typeof i === "object" && i.value === val) ?? val
  }
  if (Array.isArray(val)) {
    return val.map(v =>
      typeof v === "string"
        ? items.find(i => typeof i === "object" && i.value === v) ?? v
        : v,
    )
  }
  return val
}

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

/** Convert SelectItemShape[] to Record<string,string> for Base UI items prop */
function selectItemsToRecord(items: SelectItemShape[]): Record<string, string> {
  const record: Record<string, string> = {}
  for (const item of items) {
    if (typeof item === "string") record[item] = item
    else record[item.value] = item.label
  }
  return record
}

/** Select root with SelectItemsProvider context + items prop support */
export const selectProvider: WrapperDef = {
  fn: (C) => React.forwardRef(({ children, is, items: userItems, ...props }: any, ref: any) => {
    // Parse user-provided items (from json-items attribute)
    const parsedRecord = React.useMemo(() => {
      if (!userItems) return undefined
      if (Array.isArray(userItems)) return selectItemsToRecord(userItems)
      if (typeof userItems === "object") return userItems as Record<string, string>
      return undefined
    }, [userItems])

    const [registeredItems, setRegisteredItems] = React.useState<Record<string, string> | undefined>(undefined)
    const handleItemsChange = React.useCallback((next: Record<string, string>) => {
      setRegisteredItems(Object.keys(next).length > 0 ? next : undefined)
    }, [])

    // Merge: user-provided items as base, registered items override
    const mergedItems = React.useMemo(() => {
      if (!parsedRecord && !registeredItems) return undefined
      return { ...parsedRecord, ...registeredItems }
    }, [parsedRecord, registeredItems])

    return (
      <SelectItemsProvider onItemsChange={handleItemsChange}>
        <SelectItemsDataContext.Provider value={userItems ?? null}>
          <C ref={ref} items={mergedItems} {...props}>{children}</C>
        </SelectItemsDataContext.Provider>
      </SelectItemsProvider>
    )
  }),
  additionalAttributes: [ITEMS_ATTR],
}

/** Select content that auto-renders items from context when no children provided */
export const selectContentRenderer: WrapperDef = {
  fn: (C, mod) => {
    const SelectItem = mod.SelectItem as ComponentType<any>
    return ({ children, is, ...props }: any) => {
      const items = React.useContext(SelectItemsDataContext)
      if (!items || !SelectItem || children) return <C {...props}>{children}</C>
      return (
        <C {...props}>
          {items.map(item => {
            const value = typeof item === "string" ? item : item.value
            const label = typeof item === "string" ? item : item.label
            return <SelectItem key={value} value={value}>{label}</SelectItem>
          })}
        </C>
      )
    }
  },
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

/** Inner component for async combobox (src prop) — needs hooks */
function AsyncCombobox({
  C, src, debounce: debounceMs = 300, "min-length": minLen = 2,
  ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty,
  placeholder, showClear, showTrigger, userChildren,
  initialItems,
  value, defaultValue,
  ...props
}: any) {
  const delay = typeof debounceMs === "string" ? Number(debounceMs) : debounceMs
  const minLength = typeof minLen === "string" ? Number(minLen) : minLen

  const [items, setItems] = React.useState<ComboboxItemShape[]>(initialItems ?? [])
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = React.useRef<AbortController | null>(null)

  // Resolve initial value using initialItems
  const allKnownItems = initialItems ?? []
  const hasObjects = allKnownItems.length > 0 && typeof allKnownItems[0] === "object"
  const resolvedValue = resolveItemValue(value, allKnownItems, hasObjects)
  const resolvedDefault = resolveItemValue(defaultValue, allKnownItems, hasObjects)

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (timerRef.current) clearTimeout(timerRef.current)
      if (abortRef.current) abortRef.current.abort()

      if (value.length < minLength) {
        setItems([])
        return
      }

      timerRef.current = setTimeout(async () => {
        const controller = new AbortController()
        abortRef.current = controller
        try {
          const res = await fetch(`${src}?q=${encodeURIComponent(value)}`, { signal: controller.signal })
          if (res.ok) setItems(await res.json())
        } catch {
          // aborted or network error — ignore
        }
      }, delay)
    },
    [src, delay, minLength],
  )

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  const resolvedChildren = userChildren ?? (
    ComboboxInput && ComboboxContent && ComboboxList ? (
      <>
        <ComboboxInput
          placeholder={placeholder}
          showClear={showClear}
          showTrigger={showTrigger}
          onChange={handleChange}
        />
        <ComboboxContent>
          <ComboboxList>
            {items.map((item: ComboboxItemShape) => {
              const value = typeof item === "string" ? item : item.value
              const label = typeof item === "string" ? item : item.label
              const description = typeof item === "object" ? item.description : undefined
              const suffix = typeof item === "object" ? item.suffix : undefined
              return (
                <ComboboxItem key={value} value={item}>
                  {description ? (
                    <Item size="xs" className="p-0">
                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap">{label}</ItemTitle>
                        <ItemDescription>{description}</ItemDescription>
                      </ItemContent>
                      {suffix && <span className="ml-auto text-xs text-muted-foreground tabular-nums">{suffix}</span>}
                    </Item>
                  ) : suffix ? (
                    <>{label}<span className="ml-auto text-xs text-muted-foreground tabular-nums">{suffix}</span></>
                  ) : label}
                </ComboboxItem>
              )
            })}
            {items.length === 0 && ComboboxEmpty && <ComboboxEmpty>No results found.</ComboboxEmpty>}
          </ComboboxList>
        </ComboboxContent>
      </>
    ) : undefined
  )

  return (
    <C
      value={resolvedValue}
      defaultValue={resolvedDefault}
      {...(hasObjects
        ? { itemToStringLabel: (item: ComboboxItemShape) => typeof item === "string" ? item : item.label }
        : {})}
      {...props}
    >
      {resolvedChildren}
    </C>
  )
}

const SRC_ATTR: WebTypeAttribute = {
  name: "src",
  required: false,
  value: { kind: "plain", type: "string" },
  description: "URL to fetch items from. Appends ?q={query} on input change.",
}

const DEBOUNCE_ATTR: WebTypeAttribute = {
  name: "debounce",
  required: false,
  value: { kind: "plain", type: "number" },
  description: "Debounce delay in ms (default: 300).",
}

const MIN_LENGTH_ATTR: WebTypeAttribute = {
  name: "min-length",
  required: false,
  value: { kind: "plain", type: "number" },
  description: "Minimum input length before fetching (default: 2).",
}

const PLACEHOLDER_ATTR: WebTypeAttribute = {
  name: "placeholder",
  required: false,
  value: { kind: "plain", type: "string" },
  description: "Placeholder text for the input (self-contained mode).",
}

const SHOW_CLEAR_ATTR: WebTypeAttribute = {
  name: "show-clear",
  required: false,
  value: { kind: "plain", type: "boolean" },
  description: "Show clear button in the input (self-contained mode).",
}

const SHOW_TRIGGER_ATTR: WebTypeAttribute = {
  name: "show-trigger",
  required: false,
  value: { kind: "plain", type: "boolean" },
  description: "Show dropdown trigger button in the input (self-contained mode, default: true).",
}

function parseBoolAttr(val: any, defaultVal: boolean): boolean {
  if (val === undefined || val === null) return defaultVal
  if (typeof val === "boolean") return val
  return val !== "false"
}

const INITIAL_ITEMS_ATTR: WebTypeAttribute = {
  name: "initial-items",
  required: false,
  value: { kind: "expression", type: '(string | { value: string; label: string })[]' },
  description: "Initial items for async combobox, used to display labels for pre-set values.",
}

/** Combobox root with items context provider (static items or async src) */
export const comboboxProvider: WrapperDef = {
  fn: (C, mod) => {
    const ComboboxInput = mod.ComboboxInput as ComponentType<any>
    const ComboboxContent = mod.ComboboxContent as ComponentType<any>
    const ComboboxList = mod.ComboboxList as ComponentType<any>
    const ComboboxItem = mod.ComboboxItem as ComponentType<any>
    const ComboboxEmpty = mod.ComboboxEmpty as ComponentType<any>

    return ({
      items, src, debounce, "min-length": minLength, children, is,
      placeholder, "show-clear": showClearAttr, "show-trigger": showTriggerAttr,
      "initial-items": initialItems,
      value, defaultValue,
      ...props
    }: any) => {
      const resolvedChildren = children ?? (
        ComboboxInput && ComboboxContent && ComboboxList ? (
          <>
            <ComboboxInput
              placeholder={placeholder}
              showClear={parseBoolAttr(showClearAttr, false)}
              showTrigger={parseBoolAttr(showTriggerAttr, true)}
            />
            <ComboboxContent>
              {ComboboxEmpty && <ComboboxEmpty>No results found.</ComboboxEmpty>}
              <ComboboxList />
            </ComboboxContent>
          </>
        ) : undefined
      )

      if (src) {
        return (
          <AsyncCombobox
            C={C} src={src} debounce={debounce} min-length={minLength}
            ComboboxInput={ComboboxInput}
            ComboboxContent={ComboboxContent}
            ComboboxList={ComboboxList}
            ComboboxItem={ComboboxItem}
            ComboboxEmpty={ComboboxEmpty}
            placeholder={placeholder}
            showClear={parseBoolAttr(showClearAttr, false)}
            showTrigger={parseBoolAttr(showTriggerAttr, true)}
            userChildren={children}
            initialItems={initialItems}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
        )
      }
      if (!items) return <C value={value} defaultValue={defaultValue} {...props}>{resolvedChildren}</C>
      const hasObjects = items.length > 0 && typeof items[0] === "object"
      const resolvedValue = resolveItemValue(value, items, hasObjects)
      const resolvedDefault = resolveItemValue(defaultValue, items, hasObjects)
      return (
        <ComboboxItemsContext.Provider value={items}>
          <C
            items={items}
            value={resolvedValue}
            defaultValue={resolvedDefault}
            {...(hasObjects
              ? { itemToStringLabel: (item: ComboboxItemShape) => typeof item === "string" ? item : item.label }
              : {})}
            {...props}
          >
            {resolvedChildren}
          </C>
        </ComboboxItemsContext.Provider>
      )
    }
  },
  additionalAttributes: [ITEMS_ATTR, SRC_ATTR, DEBOUNCE_ATTR, MIN_LENGTH_ATTR, PLACEHOLDER_ATTR, SHOW_CLEAR_ATTR, SHOW_TRIGGER_ATTR, INITIAL_ITEMS_ATTR],
}

/** Combobox list that auto-renders items from context */
function renderComboboxItem(ComboboxItem: ComponentType<any>, item: ComboboxItemShape) {
  const value = typeof item === "string" ? item : item.value
  const label = typeof item === "string" ? item : item.label
  const description = typeof item === "object" ? item.description : undefined
  const suffix = typeof item === "object" ? item.suffix : undefined
  return (
    <ComboboxItem key={value} value={item}>
      {description ? (
        <Item size="xs" className="p-0">
          <ItemContent>
            <ItemTitle className="whitespace-nowrap">{label}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
          </ItemContent>
          {suffix && <span className="ml-auto text-xs text-muted-foreground tabular-nums">{suffix}</span>}
        </Item>
      ) : suffix ? (
        <>
          {label}
          <span className="ml-auto text-xs text-muted-foreground tabular-nums">{suffix}</span>
        </>
      ) : label}
    </ComboboxItem>
  )
}

export const comboboxListRenderer: WrapperDef = {
  fn: (C, mod) => {
    const ComboboxItem = mod.ComboboxItem as ComponentType<any>
    return ({ children, is, ...props }: any) => {
      const items = React.useContext(ComboboxItemsContext)
      if (!items || !ComboboxItem) return <C {...props}>{children}</C>
      return (
        <C {...props}>
          {(item: ComboboxItemShape) => renderComboboxItem(ComboboxItem, item)}
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

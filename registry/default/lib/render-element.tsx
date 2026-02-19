import { Children, isValidElement, type ReactNode, type ReactElement, type ElementType, type Ref, type MouseEvent } from "react"

export function getSingleElement(children: ReactNode): ReactElement | null {
  const childArray = Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim() === "")
  )
  if (childArray.length === 1 && isValidElement(childArray[0])) {
    return childArray[0] as ReactElement
  }
  return null
}

export function renderTrigger(
  Component: ElementType,
  props: any,
  children: ReactNode
) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
    return <Component {...props} render={singleChild} />
  }
  return <Component {...props}>{children}</Component>
}

export function renderLinkable(
  Component: ElementType,
  props: any,
  { href, ref, children, onNavigate }: {
    href?: string | null
    ref?: Ref<any>
    children: ReactNode
    onNavigate?: (() => void) | null
  }
) {
  if (href) {
    return (
      <Component
        {...props}
        render={(itemProps: any) => (
          <a
            {...itemProps}
            ref={ref}
            href={href}
            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
              itemProps.onClick?.(e)
              onNavigate?.()
            }}
          >
            {children}
          </a>
        )}
      />
    )
  }
  return <Component ref={ref} {...props}>{children}</Component>
}

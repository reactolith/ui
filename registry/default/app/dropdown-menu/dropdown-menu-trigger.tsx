import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { getSingleElement } from "@/registry/default/lib/render-element"

export default function DropdownMenuTrigger({
  children,
  is,
  ...props
}: MenuPrimitive.Trigger.Props & { is?: string }) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
    return (
      <MenuPrimitive.Trigger
        data-slot="dropdown-menu-trigger"
        {...props}
        render={singleChild}
      />
    )
  }
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    >
      {children}
    </MenuPrimitive.Trigger>
  )
}

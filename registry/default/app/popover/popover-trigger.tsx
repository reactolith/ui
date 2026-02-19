import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { useSingleElement } from "@/registry/default/lib/render-element"

export default function PopoverTrigger({
  children,
  is,
  ...props
}: PopoverPrimitive.Trigger.Props & { is?: string }) {
  const singleChild = useSingleElement(children)
  if (singleChild) {
    return (
      <PopoverPrimitive.Trigger
        data-slot="popover-trigger"
        {...props}
        render={singleChild}
      />
    )
  }
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    >
      {children}
    </PopoverPrimitive.Trigger>
  )
}

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { useSingleElement } from "@/registry/default/lib/render-element"

export default function SheetTrigger({
  children,
  is,
  ...props
}: SheetPrimitive.Trigger.Props & { is?: string }) {
  const singleChild = useSingleElement(children)
  if (singleChild) {
    return (
      <SheetPrimitive.Trigger
        data-slot="sheet-trigger"
        {...props}
        render={singleChild}
      />
    )
  }
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      {...props}
    >
      {children}
    </SheetPrimitive.Trigger>
  )
}

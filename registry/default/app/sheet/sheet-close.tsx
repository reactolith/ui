import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { getSingleElement } from "@/registry/default/lib/render-element"

export default function SheetClose({
  children,
  is,
  ...props
}: SheetPrimitive.Close.Props & { is?: string }) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
    return (
      <SheetPrimitive.Close
        data-slot="sheet-close"
        {...props}
        render={singleChild}
      />
    )
  }
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      {...props}
    >
      {children}
    </SheetPrimitive.Close>
  )
}

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { getSingleElement } from "@/registry/default/lib/render-element"

export default function DialogTrigger({
  children,
  is,
  ...props
}: DialogPrimitive.Trigger.Props & { is?: string }) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
    return (
      <DialogPrimitive.Trigger
        data-slot="dialog-trigger"
        {...props}
        render={singleChild}
      />
    )
  }
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...props}
    >
      {children}
    </DialogPrimitive.Trigger>
  )
}

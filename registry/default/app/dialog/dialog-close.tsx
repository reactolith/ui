import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { useSingleElement } from "@/registry/default/lib/render-element"

export default function DialogClose({
  children,
  is,
  ...props
}: DialogPrimitive.Close.Props & { is?: string }) {
  const singleChild = useSingleElement(children)
  if (singleChild) {
    return (
      <DialogPrimitive.Close
        data-slot="dialog-close"
        {...props}
        render={singleChild}
      />
    )
  }
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  )
}

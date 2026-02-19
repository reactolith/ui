import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { getSingleElement } from "@/registry/default/lib/render-element"

export default function AlertDialogTrigger({
  children,
  is,
  ...props
}: AlertDialogPrimitive.Trigger.Props & { is?: string }) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
    return (
      <AlertDialogPrimitive.Trigger
        data-slot="alert-dialog-trigger"
        {...props}
        render={singleChild}
      />
    )
  }
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Trigger>
  )
}

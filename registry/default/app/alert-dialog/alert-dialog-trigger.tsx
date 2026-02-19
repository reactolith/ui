import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AlertDialogTrigger({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogPrimitive.Trigger.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

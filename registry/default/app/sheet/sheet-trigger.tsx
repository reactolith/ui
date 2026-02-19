import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SheetTrigger({
  className,
  variant = "outline",
  size = "default",
  ...props
}: SheetPrimitive.Trigger.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PopoverTrigger({
  className,
  variant = "outline",
  size = "default",
  ...props
}: PopoverPrimitive.Trigger.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function TooltipTrigger({
  className,
  variant = "outline",
  size = "default",
  ...props
}: TooltipPrimitive.Trigger.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DropdownMenuTrigger({
  className,
  variant = "outline",
  size = "default",
  ...props
}: MenuPrimitive.Trigger.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

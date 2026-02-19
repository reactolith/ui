import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { renderTrigger } from "@/registry/default/lib/render-element"

export default function PopoverTrigger({
  children,
  is,
  ...props
}: PopoverPrimitive.Trigger.Props & { is?: string }) {
  return renderTrigger(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props }, children)
}

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { renderTrigger } from "@/registry/default/lib/render-element"

export default function SheetTrigger({
  children,
  is,
  ...props
}: SheetPrimitive.Trigger.Props & { is?: string }) {
  return renderTrigger(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props }, children)
}

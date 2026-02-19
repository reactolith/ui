import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { renderTrigger } from "@/registry/default/lib/render-element"

export default function SheetClose({
  children,
  is,
  ...props
}: SheetPrimitive.Close.Props & { is?: string }) {
  return renderTrigger(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props }, children)
}

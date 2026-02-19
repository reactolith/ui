import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { TooltipTrigger } from "@/components/ui/tooltip"
import { renderTrigger } from "@/registry/default/lib/render-element"

export default function TooltipTriggerWrapper({
  children,
  is,
  ...props
}: TooltipPrimitive.Trigger.Props & { is?: string }) {
  return renderTrigger(TooltipTrigger, props, children)
}

import { type ComponentProps, type ReactNode } from "react"
import { CollapsibleTrigger } from "@/components/ui/collapsible"
import { renderTrigger } from "@/registry/default/lib/render-element"

export default function CollapsibleTriggerWrapper({
  children,
  is,
  ...props
}: ComponentProps<typeof CollapsibleTrigger> & { children?: ReactNode; is?: string }) {
  return renderTrigger(CollapsibleTrigger, props, children)
}

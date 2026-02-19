import { type ComponentProps, type ReactNode } from "react"
import { CollapsibleTrigger } from "@/components/ui/collapsible"
import { useSingleElement } from "@/registry/default/lib/render-element"

export default function CollapsibleTriggerWrapper({
  children,
  is,
  ...props
}: ComponentProps<typeof CollapsibleTrigger> & { children?: ReactNode; is?: string }) {
  const singleChild = useSingleElement(children)
  if (singleChild) {
    return <CollapsibleTrigger {...props} render={singleChild} />
  }
  return <CollapsibleTrigger {...props}>{children}</CollapsibleTrigger>
}

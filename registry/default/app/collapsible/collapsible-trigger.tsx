import { CollapsibleTrigger } from "@/components/ui/collapsible"
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react"

export default function CollapsibleTriggerWrapper({
  children,
  is,
  ...props
}: ComponentProps<typeof CollapsibleTrigger> & { children?: ReactNode; is?: string }) {
  const childArray = Children.toArray(children)
  if (childArray.length === 1 && isValidElement(childArray[0])) {
    return <CollapsibleTrigger {...props} render={childArray[0]} />
  }
  return <CollapsibleTrigger {...props}>{children}</CollapsibleTrigger>
}

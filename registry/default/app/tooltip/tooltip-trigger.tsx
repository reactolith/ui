import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { TooltipTrigger } from '@/components/ui/tooltip'
import {getSingleElement} from "@/registry/default/lib/render-element"

export default function TooltipTriggerWrapper({
  children,
  is,
  ...props
}: TooltipPrimitive.Trigger.Props & { is?: string }) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
      return <TooltipTrigger {...props} render={singleChild} />
  }
  return <TooltipTrigger {...props}>{children}</TooltipTrigger>
}

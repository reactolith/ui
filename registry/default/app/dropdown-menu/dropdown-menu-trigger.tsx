import { type ComponentProps, type ReactNode } from "react"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { renderTrigger } from "@/registry/default/lib/render-element"

export default function DropdownMenuTriggerWrapper({
  children,
  is,
  ...props
}: ComponentProps<typeof DropdownMenuTrigger> & { children?: ReactNode; is?: string }) {
    return renderTrigger(DropdownMenuTrigger, props, children)
}

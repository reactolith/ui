import { type ComponentProps, type ReactNode, type Ref } from "react"
import { ToggleGroupItem } from "@/components/ui/toggle-group"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function ToggleGroupItemWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof ToggleGroupItem> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>
  is?: string
}) {
  return renderLinkable(ToggleGroupItem, props, { href, ref, children })
}

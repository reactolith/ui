import { type ComponentProps, type ReactNode, type Ref } from "react"
import { Toggle } from "@/components/ui/toggle"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function ToggleWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof Toggle> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>
  is?: string
}) {
  return renderLinkable(Toggle, props, { href, ref, children })
}

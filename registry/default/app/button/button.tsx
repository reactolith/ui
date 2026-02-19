import { type ComponentProps, type ReactNode, type Ref } from "react"
import { Button } from "@/components/ui/button"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function ButtonWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof Button> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>
  is?: string
}) {
  return renderLinkable(Button, props, { href, ref, children })
}

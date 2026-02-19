import { type ComponentProps, type ReactNode, type Ref } from "react"
import { AccordionTrigger } from "@/components/ui/accordion"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function AccordionTriggerWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof AccordionTrigger> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>
  is?: string
}) {
  return renderLinkable(AccordionTrigger, props, { href, ref, children })
}

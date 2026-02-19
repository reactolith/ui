import { type ComponentProps, type ReactNode, type Ref } from "react"
import { TabsTrigger } from "@/components/ui/tabs"
import { useCloseOverlay } from "@/registry/default/lib/close-overlay"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function TabsTriggerWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof TabsTrigger> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>
  is?: string
}) {
  const closeOverlay = useCloseOverlay()
  return renderLinkable(TabsTrigger, props, { href, ref, children, onNavigate: closeOverlay })
}

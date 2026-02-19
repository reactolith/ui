import { type ComponentProps, type ReactNode, type Ref } from "react"
import { ContextMenuItem } from "@/components/ui/context-menu"
import { useCloseOverlay } from "@/registry/default/lib/close-overlay"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function ContextMenuItemWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof ContextMenuItem> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLDivElement>
  is?: string
}) {
  const closeOverlay = useCloseOverlay()
  return renderLinkable(ContextMenuItem, props, { href, ref, children, onNavigate: closeOverlay })
}

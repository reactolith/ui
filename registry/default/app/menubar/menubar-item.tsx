import { type ComponentProps, type ReactNode, type Ref } from "react"
import { MenubarItem } from "@/components/ui/menubar"
import { useCloseOverlay } from "@/registry/default/lib/close-overlay"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function MenubarItemWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof MenubarItem> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLDivElement>
  is?: string
}) {
  const closeOverlay = useCloseOverlay()
  return renderLinkable(MenubarItem, props, { href, ref, children, onNavigate: closeOverlay })
}

import { type ComponentProps, type ReactNode, type Ref } from "react"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { useCloseOverlay } from "@/registry/default/lib/close-overlay"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function NavigationMenuLinkWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof NavigationMenuLink> & {
  href?: string
  children: ReactNode
  ref?: Ref<HTMLAnchorElement>
  is?: string
}) {
  const closeOverlay = useCloseOverlay()
  return renderLinkable(NavigationMenuLink, props, { href, ref, children, onNavigate: closeOverlay })
}

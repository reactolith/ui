import { type ComponentProps, type ReactNode, type Ref } from "react"
import { BreadcrumbLink } from "@/components/ui/breadcrumb"
import { useCloseOverlay } from "@/registry/default/lib/close-overlay"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function BreadcrumbLinkWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof BreadcrumbLink> & {
  href?: string
  children?: ReactNode
  ref?: Ref<HTMLAnchorElement>
  is?: string
}) {
  const closeOverlay = useCloseOverlay()
  return renderLinkable(BreadcrumbLink, props, { href, ref, children, onNavigate: closeOverlay })
}

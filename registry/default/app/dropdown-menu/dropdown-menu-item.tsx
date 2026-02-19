import { type ComponentProps, type ReactNode, type Ref } from "react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useCloseOverlay } from "@/registry/default/lib/close-overlay"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function DropdownMenuItemWrapper({
  href,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof DropdownMenuItem> & {
  href?: string | null
  children: ReactNode
  ref?: Ref<HTMLAnchorElement | HTMLDivElement>
  is?: string
}) {
  const closeOverlay = useCloseOverlay()
  return renderLinkable(DropdownMenuItem, props, { href, ref, children, onNavigate: closeOverlay })
}

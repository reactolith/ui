import { type ComponentProps, type ReactNode, type Ref, type MouseEvent, useCallback } from "react"
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { useCloseOverlay } from "@/registry/default/lib/close-overlay"
import { renderLinkable } from "@/registry/default/lib/render-element"

export default function SidebarMenuButtonWrapper({
  href,
  onClick,
  children,
  ref,
  is,
  ...props
}: ComponentProps<typeof SidebarMenuButton> & {
  href?: string | null
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>
  is?: string
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  const closeOverlay = useCloseOverlay()

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (isMobile) setOpenMobile(false)
      closeOverlay?.()
      onClick?.(e)
    },
    [isMobile, setOpenMobile, closeOverlay, onClick]
  )

  return renderLinkable(SidebarMenuButton, { ...props, onClick: handleClick }, { href, ref, children })
}

import type { ReactNode } from "react"
import { DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { getSingleElement } from "@/registry/default/lib/render-element"

export default function UiDrawerClose({
  children,
  is,
  ...props
}: React.ComponentProps<typeof DrawerClose> & { is?: string; children: ReactNode }) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
    return <DrawerClose asChild {...props}>{singleChild}</DrawerClose>
  }
  return (
    <DrawerClose asChild {...props}>
      <Button variant="outline">{children}</Button>
    </DrawerClose>
  )
}

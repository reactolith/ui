import type { ReactNode } from "react"
import { DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { getSingleElement } from "@/registry/default/lib/render-element"

export default function UiDrawerTrigger({
  children,
  is,
  ...props
}: React.ComponentProps<typeof DrawerTrigger> & { is?: string; children: ReactNode }) {
  const singleChild = getSingleElement(children)
  if (singleChild) {
    return <DrawerTrigger asChild {...props}>{singleChild}</DrawerTrigger>
  }
  return (
    <DrawerTrigger asChild {...props}>
      <Button variant="outline">{children}</Button>
    </DrawerTrigger>
  )
}

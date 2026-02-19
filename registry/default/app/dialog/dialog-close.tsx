import { DialogClose } from "@/components/ui/dialog"
import { renderTrigger } from "@/registry/default/lib/render-element"
import type {ComponentProps, ReactNode} from "react";

export default function DialogCloseWrapper({
  children,
  is,
  ...props
}: ComponentProps<typeof DialogClose> & { children?: ReactNode; is?: string }) {
  return renderTrigger(DialogClose, props, children)
}

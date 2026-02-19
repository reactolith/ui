import { DialogTrigger } from "@/components/ui/dialog"
import { renderTrigger } from "@/registry/default/lib/render-element"
import type {ComponentProps, ReactNode} from "react";

export default function DialogTriggerWrapper({
  children,
  is,
  ...props
}: ComponentProps<typeof DialogTrigger> & { children?: ReactNode; is?: string }) {
  return renderTrigger(DialogTrigger, props, children)
}

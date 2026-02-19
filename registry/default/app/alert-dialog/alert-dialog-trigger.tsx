import { AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { renderTrigger } from "@/registry/default/lib/render-element"
import type {ComponentProps, ReactNode} from "react";

export default function AlertDialogTriggerWrapper({
  children,
  is,
  ...props
}: ComponentProps<typeof AlertDialogTrigger> & { children?: ReactNode; is?: string }) {
  return renderTrigger(AlertDialogTrigger, props, children)
}

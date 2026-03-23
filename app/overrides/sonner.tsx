import { useEffect, useRef } from "react"
import { toast, type ExternalToast, type ToasterProps } from "sonner"
import { Toaster as ShadToaster } from "@/components/ui/sonner"

type ToastKind = "message" | "success" | "error" | "warning" | "info"

export type InitialToast = {
  id?: string | number
  kind?: ToastKind
  message: string
  description?: string
} & Omit<ExternalToast, "id" | "description">

export type SonnerProps = ToasterProps & {
  toasts?: InitialToast[]
}

function showToast({ id, kind = "message", message, description, ...options }: InitialToast) {
  const key = id ?? `initial-${kind}-${message}`
  const payload: ExternalToast = { ...options, id: key, description }

  switch (kind) {
    case "success":
      toast.success(message, payload)
      break
    case "error":
      toast.error(message, payload)
      break
    case "warning":
      toast.warning(message, payload)
      break
    case "info":
      toast.info(message, payload)
      break
    default:
      toast(message, payload)
  }
}

export default function Toaster({ toasts, ...props }: SonnerProps) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (!toasts?.length || firedRef.current) return
    firedRef.current = true
    toasts.forEach(showToast)
  }, [toasts])

  return <ShadToaster {...props} />
}

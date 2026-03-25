import { useEffect, useRef } from "react"
import { Toaster as SonnerToaster, toast, type ExternalToast, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

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

function getTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export default function Toaster({ toasts, theme, ...props }: SonnerProps) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (!toasts?.length || firedRef.current) return
    firedRef.current = true
    toasts.forEach(showToast)
  }, [toasts])

  return (
    <SonnerToaster
      theme={theme ?? getTheme()}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

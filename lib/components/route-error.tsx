import React from "react"
import { useRouter } from "reactolith"
import { Dialog } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

interface RouterError {
  response?: {
    status: number
  }
  finalUrl?: string
  html?: string
}

const UiRouterError: React.FC = () => {
  const { lastError, clearError } = useRouter()
  const error = lastError as RouterError | null | undefined
  const open = !!error

  return (
    <Dialog.Root open={open} onOpenChange={clearError}>
      <Dialog.Portal>
        <Dialog.Backdrop className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50" />
        <Dialog.Popup className="bg-background ring-foreground/10 grid rounded-xl p-1 text-sm ring-1 duration-100 fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none w-[calc(100%-2rem)] sm:max-w-[96rem] h-full max-h-[calc(100vh-8rem)] flex flex-col gap-0 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95">
          <div className="gap-2 flex flex-col p-4">
            <Dialog.Title className="leading-none font-medium">
              <span>Error {error?.response?.status}</span>{" "}
              <span className="text-muted-foreground">{error?.finalUrl}</span>
            </Dialog.Title>
          </div>
          <Dialog.Close className="absolute top-4 right-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground size-7 cursor-pointer [&_svg]:size-4 [&_svg]:shrink-0">
            <XIcon />
            <span className="sr-only">Close</span>
          </Dialog.Close>
          <div className="rounded-md overflow-hidden flex-1">
            {error?.html && (
              <iframe className="w-full h-full" srcDoc={error.html}></iframe>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default UiRouterError

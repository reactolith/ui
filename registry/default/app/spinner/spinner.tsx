import * as React from "react"
import { Spinner } from "@/components/ui/spinner"

const sizeMap: Record<string, string> = {
  sm: "size-3",
  default: "size-4",
  lg: "size-6",
}

type UiSpinnerProps = Omit<React.ComponentProps<typeof Spinner>, "width" | "height"> & {
  size?: string
}

const UiSpinner = React.forwardRef<SVGSVGElement, UiSpinnerProps>(
  ({ size, className, ...props }, ref) => {
    const sizeClass = size ? sizeMap[size] || undefined : undefined
    return <Spinner ref={ref} className={[sizeClass, className].filter(Boolean).join(" ")} {...props} />
  }
)

UiSpinner.displayName = "UiSpinner"
export default UiSpinner

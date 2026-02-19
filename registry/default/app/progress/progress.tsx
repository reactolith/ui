import * as React from "react"
import { Progress } from "@/components/ui/progress"

type UiProgressProps = Omit<React.ComponentProps<typeof Progress>, "value"> & {
  value?: number | string
}

const UiProgress = React.forwardRef<HTMLDivElement, UiProgressProps>(
  ({ value, ...props }, ref) => {
    const numValue = value != null ? Number(value) : undefined
    return <Progress ref={ref} value={numValue} {...props} />
  }
)

UiProgress.displayName = "UiProgress"
export default UiProgress

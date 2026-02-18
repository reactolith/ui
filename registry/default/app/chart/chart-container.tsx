import { ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export default function ChartContainerWrapper({
  is,
  className,
  ...props
}: ComponentProps<typeof ChartContainer> & { is?: string }) {
  return (
    <ChartContainer
      {...props}
      className={cn(
        "relative [&>.recharts-responsive-container]:absolute [&>.recharts-responsive-container]:inset-0",
        className,
      )}
    />
  )
}

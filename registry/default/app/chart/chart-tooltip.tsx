import { ChartTooltip } from "@/components/ui/chart"
import type { ComponentProps, ReactNode } from "react"

export default function ChartTooltipWrapper({
  children,
  ...props
}: ComponentProps<typeof ChartTooltip> & { children?: ReactNode }) {
  return <ChartTooltip {...props} content={children as any} />
}

import React, { useEffect, useRef, useState } from "react"
import { cn } from "../utils"
import { useRouter } from "reactolith"

export type UiRouterProgressBarProps = {
  className?: string
  completeDelayMs?: number
  maxWhileLoading?: number
}

const UiRouterProgressBar: React.FC<UiRouterProgressBarProps> = ({
  className,
  completeDelayMs = 250,
  maxWhileLoading = 85,
}) => {
  const { loading } = useRouter()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (loading) {
      setVisible(true)
      setProgress(0)

      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const next = Math.min(
          maxWhileLoading,
          100 * (1 - Math.exp(-elapsed / 800)),
        )
        setProgress(next)
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setProgress(100)
      const t = window.setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, completeDelayMs)
      return () => window.clearTimeout(t)
    }
  }, [loading, completeDelayMs, maxWhileLoading])

  if (!visible) return null

  return (
    <div
      aria-hidden
      className={cn(
        "fixed left-0 right-0 top-0 h-0.5 z-100 pointer-events-none",
        className,
      )}
    >
      <div
        className={cn(
          "h-full w-full origin-left transform-gpu bg-primary transition-transform duration-300",
          "shadow-[0_0_8px_0_rgba(0,0,0,0.15)] dark:shadow-[0_0_8px_0_rgba(0,0,0,0.4)]",
        )}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}

export default UiRouterProgressBar

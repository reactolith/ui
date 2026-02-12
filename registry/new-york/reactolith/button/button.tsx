import React from "react"
import { Button as ShadcnButton, type buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

export interface ReactolithButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ReactolithButtonProps>(
  ({ href, children, ...props }, ref) => {
    if (href) {
      return (
        <ShadcnButton asChild ref={ref} {...props}>
          <a href={href}>{children}</a>
        </ShadcnButton>
      )
    }
    return <ShadcnButton ref={ref} {...props}>{children}</ShadcnButton>
  }
)
Button.displayName = "Button"

export default Button

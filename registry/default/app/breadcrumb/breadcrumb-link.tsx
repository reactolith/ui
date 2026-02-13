import * as React from "react"
import { BreadcrumbLink } from "@/components/ui/breadcrumb"

type UiBreadcrumbLinkProps =
    React.ComponentProps<typeof BreadcrumbLink> & {
    href?: string
    children?: React.ReactNode
}

const UiBreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    UiBreadcrumbLinkProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <BreadcrumbLink
                {...props}
                render={
                    <a ref={ref} href={href} />
                }
            >
                {children}
            </BreadcrumbLink>
        )
    }

    return (
        <BreadcrumbLink ref={ref} {...props}>
            {children}
        </BreadcrumbLink>
    )
})

UiBreadcrumbLink.displayName = "UiBreadcrumbLink"
export default UiBreadcrumbLink

import * as React from "react";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiBreadcrumbLinkProps =
    React.ComponentProps<typeof BreadcrumbLink> & {
    href?: string;
    children?: React.ReactNode;
};

const UiBreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    UiBreadcrumbLinkProps
>(({ href, children, ...props }, ref) => {
    const closeOverlay = useCloseOverlay();

    if (href) {
        return (
            <BreadcrumbLink
                {...props}
                render={
                    <a
                        ref={ref}
                        href={href}
                        onClick={() => closeOverlay?.()}
                    />
                }
            >
                {children}
            </BreadcrumbLink>
        );
    }

    return (
        <BreadcrumbLink ref={ref} {...props}>
            {children}
        </BreadcrumbLink>
    );
})

UiBreadcrumbLink.displayName = "UiBreadcrumbLink"
export default UiBreadcrumbLink

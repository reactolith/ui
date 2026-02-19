import * as React from "react";
import { PaginationLink } from "@/components/ui/pagination";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiPaginationLinkProps = React.ComponentProps<typeof PaginationLink> & {
    href?: string;
};

const UiPaginationLink = React.forwardRef<
    HTMLAnchorElement,
    UiPaginationLinkProps
>(({ href, onClick, ...props }, ref) => {
    const closeOverlay = useCloseOverlay();

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            closeOverlay?.();
            onClick?.(e);
        },
        [closeOverlay, onClick]
    );

    return (
        <PaginationLink
            ref={ref}
            href={href}
            onClick={handleClick}
            {...props}
        />
    );
});

UiPaginationLink.displayName = "UiPaginationLink";
export default UiPaginationLink;

import * as React from "react";
import { PaginationLink } from "@/components/ui/pagination";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiPaginationLinkProps = React.ComponentProps<typeof PaginationLink>;

const UiPaginationLink = React.forwardRef<
    HTMLAnchorElement,
    UiPaginationLinkProps
>(({ onClick, ...props }, ref) => {
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
            onClick={handleClick}
            {...props}
        />
    );
});

UiPaginationLink.displayName = "UiPaginationLink";
export default UiPaginationLink;

import * as React from "react";
import { PaginationNext } from "@/components/ui/pagination";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiPaginationNextProps = React.ComponentProps<typeof PaginationNext>;

const UiPaginationNext = React.forwardRef<
    HTMLAnchorElement,
    UiPaginationNextProps
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
        <PaginationNext
            ref={ref}
            onClick={handleClick}
            {...props}
        />
    );
});

UiPaginationNext.displayName = "UiPaginationNext";
export default UiPaginationNext;

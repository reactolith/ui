import * as React from "react";
import { PaginationPrevious } from "@/components/ui/pagination";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiPaginationPreviousProps = React.ComponentProps<typeof PaginationPrevious>;

const UiPaginationPrevious = React.forwardRef<
    HTMLAnchorElement,
    UiPaginationPreviousProps
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
        <PaginationPrevious
            ref={ref}
            onClick={handleClick}
            {...props}
        />
    );
});

UiPaginationPrevious.displayName = "UiPaginationPrevious";
export default UiPaginationPrevious;

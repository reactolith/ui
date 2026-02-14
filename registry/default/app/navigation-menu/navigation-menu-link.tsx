import * as React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiNavigationMenuLinkProps = React.ComponentProps<typeof NavigationMenuLink>;

const UiNavigationMenuLink = React.forwardRef<
    HTMLAnchorElement,
    UiNavigationMenuLinkProps
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
        <NavigationMenuLink
            ref={ref}
            onClick={handleClick}
            {...props}
        />
    );
});

UiNavigationMenuLink.displayName = "UiNavigationMenuLink";
export default UiNavigationMenuLink;

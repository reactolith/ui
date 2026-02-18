import * as React from "react";
import { SidebarMenuSubButton, useSidebar } from "@/components/ui/sidebar";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiSidebarMenuSubButtonProps = React.ComponentProps<typeof SidebarMenuSubButton>;

const UiSidebarMenuSubButton = React.forwardRef<
    HTMLAnchorElement,
    UiSidebarMenuSubButtonProps
>(({ onClick, ...props }, ref) => {
    const { isMobile, setOpenMobile } = useSidebar();
    const closeOverlay = useCloseOverlay();

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (isMobile) setOpenMobile(false);
            closeOverlay?.();
            onClick?.(e);
        },
        [isMobile, setOpenMobile, closeOverlay, onClick]
    );

    return (
        <SidebarMenuSubButton
            ref={ref}
            onClick={handleClick}
            {...props}
        />
    );
});

UiSidebarMenuSubButton.displayName = "UiSidebarMenuSubButton";
export default UiSidebarMenuSubButton;

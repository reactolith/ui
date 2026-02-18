import * as React from "react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiSidebarMenuButtonProps = React.ComponentProps<typeof SidebarMenuButton>;

const UiSidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    UiSidebarMenuButtonProps
>(({ onClick, ...props }, ref) => {
    const { isMobile, setOpenMobile } = useSidebar();
    const closeOverlay = useCloseOverlay();

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (isMobile) setOpenMobile(false);
            closeOverlay?.();
            onClick?.(e);
        },
        [isMobile, setOpenMobile, closeOverlay, onClick]
    );

    return (
        <SidebarMenuButton
            ref={ref}
            onClick={handleClick}
            {...props}
        />
    );
});

UiSidebarMenuButton.displayName = "UiSidebarMenuButton";
export default UiSidebarMenuButton;

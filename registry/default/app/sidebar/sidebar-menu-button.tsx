import * as React from "react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";

type UiSidebarMenuButtonProps = React.ComponentProps<typeof SidebarMenuButton>;

const UiSidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    UiSidebarMenuButtonProps
>(({ onClick, ...props }, ref) => {
    const { isMobile, setOpenMobile } = useSidebar();

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (isMobile) setOpenMobile(false);
            onClick?.(e);
        },
        [isMobile, setOpenMobile, onClick]
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

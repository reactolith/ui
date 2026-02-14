import * as React from "react";
import { SidebarMenuSubButton, useSidebar } from "@/components/ui/sidebar";

type UiSidebarMenuSubButtonProps = React.ComponentProps<typeof SidebarMenuSubButton>;

const UiSidebarMenuSubButton = React.forwardRef<
    HTMLAnchorElement,
    UiSidebarMenuSubButtonProps
>(({ onClick, ...props }, ref) => {
    const { isMobile, setOpenMobile } = useSidebar();

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (isMobile) setOpenMobile(false);
            onClick?.(e);
        },
        [isMobile, setOpenMobile, onClick]
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

import * as React from "react";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiSidebarMenuButtonProps =
    Omit<React.ComponentProps<typeof SidebarMenuButton>, "render"> & {
    href?: string | null;
};

const UiSidebarMenuButton = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    UiSidebarMenuButtonProps
>(({ href, onClick, children, ...props }, ref) => {
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

    if (href) {
        return (
            <SidebarMenuButton
                {...props}
                onClick={handleClick}
                render={(buttonProps) => (
                    <a
                        {...buttonProps}
                        ref={ref as React.Ref<HTMLAnchorElement>}
                        href={href}
                    >
                        {children}
                    </a>
                )}
            />
        );
    }

    return (
        <SidebarMenuButton
            ref={ref as React.Ref<HTMLButtonElement>}
            onClick={handleClick}
            {...props}
        >
            {children}
        </SidebarMenuButton>
    );
});

UiSidebarMenuButton.displayName = "UiSidebarMenuButton";
export default UiSidebarMenuButton;

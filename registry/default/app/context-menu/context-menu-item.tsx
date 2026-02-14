import * as React from "react";
import { ContextMenuItem } from "@/components/ui/context-menu";

type UiContextMenuItemProps =
    Omit<React.ComponentProps<typeof ContextMenuItem>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiContextMenuItem = React.forwardRef<
    HTMLAnchorElement | HTMLDivElement,
    UiContextMenuItemProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <ContextMenuItem
                {...props}
                render={(itemProps) => (
                    <a
                        {...itemProps}
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
        <ContextMenuItem ref={ref as React.Ref<HTMLDivElement>} {...props}>
            {children}
        </ContextMenuItem>
    );
});

UiContextMenuItem.displayName = "UiContextMenuItem";
export default UiContextMenuItem;

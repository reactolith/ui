import * as React from "react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiContextMenuItemProps =
    Omit<React.ComponentProps<typeof ContextMenuItem>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiContextMenuItem = React.forwardRef<
    HTMLAnchorElement | HTMLDivElement,
    UiContextMenuItemProps
>(({ href, children, ...props }, ref) => {
    const closeOverlay = useCloseOverlay();

    if (href) {
        return (
            <ContextMenuItem
                {...props}
                render={(itemProps) => (
                    <a
                        {...itemProps}
                        ref={ref as React.Ref<HTMLAnchorElement>}
                        href={href}
                        onClick={(e) => {
                            (itemProps as Record<string, unknown>).onClick?.(e);
                            closeOverlay?.();
                        }}
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

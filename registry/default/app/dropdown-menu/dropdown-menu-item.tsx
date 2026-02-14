import * as React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiDropdownMenuItemProps =
    Omit<React.ComponentProps<typeof DropdownMenuItem>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiDropdownMenuItem = React.forwardRef<
    HTMLAnchorElement | HTMLDivElement,
    UiDropdownMenuItemProps
>(({ href, children, ...props }, ref) => {
    const closeOverlay = useCloseOverlay();

    if (href) {
        return (
            <DropdownMenuItem
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
        <DropdownMenuItem ref={ref as React.Ref<HTMLDivElement>} {...props}>
            {children}
        </DropdownMenuItem>
    );
});

UiDropdownMenuItem.displayName = "UiDropdownMenuItem";
export default UiDropdownMenuItem;

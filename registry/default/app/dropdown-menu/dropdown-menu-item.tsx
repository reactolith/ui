import * as React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type UiDropdownMenuItemProps =
    Omit<React.ComponentProps<typeof DropdownMenuItem>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiDropdownMenuItem = React.forwardRef<
    HTMLAnchorElement | HTMLDivElement,
    UiDropdownMenuItemProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <DropdownMenuItem
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
        <DropdownMenuItem ref={ref as React.Ref<HTMLDivElement>} {...props}>
            {children}
        </DropdownMenuItem>
    );
});

UiDropdownMenuItem.displayName = "UiDropdownMenuItem";
export default UiDropdownMenuItem;

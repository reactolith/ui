import * as React from "react";
import { MenubarItem } from "@/components/ui/menubar";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiMenubarItemProps =
    Omit<React.ComponentProps<typeof MenubarItem>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiMenubarItem = React.forwardRef<
    HTMLAnchorElement | HTMLDivElement,
    UiMenubarItemProps
>(({ href, children, ...props }, ref) => {
    const closeOverlay = useCloseOverlay();

    if (href) {
        return (
            <MenubarItem
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
        <MenubarItem ref={ref as React.Ref<HTMLDivElement>} {...props}>
            {children}
        </MenubarItem>
    );
});

UiMenubarItem.displayName = "UiMenubarItem";
export default UiMenubarItem;

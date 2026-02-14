import * as React from "react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";

type UiToggleGroupItemProps =
    Omit<React.ComponentProps<typeof ToggleGroupItem>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiToggleGroupItem = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    UiToggleGroupItemProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <ToggleGroupItem
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
        <ToggleGroupItem ref={ref as React.Ref<HTMLButtonElement>} {...props}>
            {children}
        </ToggleGroupItem>
    );
});

UiToggleGroupItem.displayName = "UiToggleGroupItem";
export default UiToggleGroupItem;

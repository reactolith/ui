import * as React from "react";
import { CommandItem } from "@/components/ui/command";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiCommandItemProps =
    React.ComponentProps<typeof CommandItem> & {
    href?: string | null;
};

const UiCommandItem = React.forwardRef<
    HTMLDivElement,
    UiCommandItemProps
>(({ href, children, ...props }, ref) => {
    const closeOverlay = useCloseOverlay();

    if (href) {
        return (
            <CommandItem ref={ref} {...props}>
                <a
                    href={href}
                    data-slot="command-item-link"
                    className="cn-command-item-link contents"
                    onClick={() => closeOverlay?.()}
                >
                    {children}
                </a>
            </CommandItem>
        );
    }

    return (
        <CommandItem ref={ref} {...props}>
            {children}
        </CommandItem>
    );
});

UiCommandItem.displayName = "UiCommandItem";
export default UiCommandItem;

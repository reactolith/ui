import * as React from "react";
import { CommandItem } from "@/components/ui/command";

type UiCommandItemProps =
    React.ComponentProps<typeof CommandItem> & {
    href?: string | null;
};

const UiCommandItem = React.forwardRef<
    HTMLDivElement,
    UiCommandItemProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <CommandItem ref={ref} {...props}>
                <a href={href} data-slot="command-item-link" className="cn-command-item-link contents">
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

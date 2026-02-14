import * as React from "react";
import { Toggle } from "@/components/ui/toggle";

type UiToggleProps =
    Omit<React.ComponentProps<typeof Toggle>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiToggle = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    UiToggleProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <Toggle
                {...props}
                render={(toggleProps) => (
                    <a
                        {...toggleProps}
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
        <Toggle ref={ref as React.Ref<HTMLButtonElement>} {...props}>
            {children}
        </Toggle>
    );
});

UiToggle.displayName = "UiToggle";
export default UiToggle;

import * as React from "react";
import { Button } from "@/components/ui/button";

type UiButtonProps =
    Omit<React.ComponentProps<typeof Button>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiButton = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    UiButtonProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <Button
                {...props}
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
        <Button ref={ref as React.Ref<HTMLButtonElement>} {...props}>
            {children}
        </Button>
    );
});

UiButton.displayName = "UiButton";
export default UiButton;

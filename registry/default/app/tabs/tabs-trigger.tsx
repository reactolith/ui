import * as React from "react";
import { TabsTrigger } from "@/components/ui/tabs";

type UiTabsTriggerProps =
    Omit<React.ComponentProps<typeof TabsTrigger>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiTabsTrigger = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    UiTabsTriggerProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <TabsTrigger
                {...props}
                render={(triggerProps) => (
                    <a
                        {...triggerProps}
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
        <TabsTrigger ref={ref as React.Ref<HTMLButtonElement>} {...props}>
            {children}
        </TabsTrigger>
    );
});

UiTabsTrigger.displayName = "UiTabsTrigger";
export default UiTabsTrigger;

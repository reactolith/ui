import * as React from "react";
import { AccordionTrigger } from "@/components/ui/accordion";

type UiAccordionTriggerProps =
    Omit<React.ComponentProps<typeof AccordionTrigger>, "render"> & {
    href?: string | null;
    children: React.ReactNode;
};

const UiAccordionTrigger = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    UiAccordionTriggerProps
>(({ href, children, ...props }, ref) => {
    if (href) {
        return (
            <AccordionTrigger
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
        <AccordionTrigger ref={ref as React.Ref<HTMLButtonElement>} {...props}>
            {children}
        </AccordionTrigger>
    );
});

UiAccordionTrigger.displayName = "UiAccordionTrigger";
export default UiAccordionTrigger;

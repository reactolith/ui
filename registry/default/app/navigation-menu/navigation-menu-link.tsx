import * as React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useCloseOverlay } from "@/registry/default/lib/close-overlay";

type UiNavigationMenuLinkProps =
    Omit<React.ComponentProps<typeof NavigationMenuLink>, "render"> & {
    href?: string;
    children: React.ReactNode;
};

const UiNavigationMenuLink = React.forwardRef<
    HTMLAnchorElement,
    UiNavigationMenuLinkProps
>(({ href, children, ...props }, ref) => {
    const closeOverlay = useCloseOverlay();

    if (href) {
        return (
            <NavigationMenuLink
                {...props}
                render={(linkProps) => (
                    <a
                        {...linkProps}
                        ref={ref}
                        href={href}
                        onClick={(e) => {
                            (linkProps as Record<string, unknown>).onClick?.(e);
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
        <NavigationMenuLink ref={ref} {...props}>
            {children}
        </NavigationMenuLink>
    );
});

UiNavigationMenuLink.displayName = "UiNavigationMenuLink";
export default UiNavigationMenuLink;

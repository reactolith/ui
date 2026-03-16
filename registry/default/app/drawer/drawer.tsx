import * as React from "react";
import { Drawer } from "@/components/ui/drawer";
import { CloseOverlayProvider } from "@/registry/default/lib/close-overlay";

type UiDrawerProps = React.ComponentProps<typeof Drawer>;

export default function UiDrawer({
    onOpenChange,
    children,
    ...props
}: UiDrawerProps) {
    const handleClose = React.useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    return (
        <Drawer onOpenChange={onOpenChange} {...props}>
            <CloseOverlayProvider onClose={handleClose}>
                {children}
            </CloseOverlayProvider>
        </Drawer>
    );
}

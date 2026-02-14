import * as React from "react";
import { Popover } from "@/components/ui/popover";
import { CloseOverlayProvider } from "@/registry/default/lib/close-overlay";

type UiPopoverProps = React.ComponentProps<typeof Popover>;

export default function UiPopover({
    onOpenChange,
    children,
    ...props
}: UiPopoverProps) {
    const handleClose = React.useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    return (
        <Popover onOpenChange={onOpenChange} {...props}>
            <CloseOverlayProvider onClose={handleClose}>
                {children}
            </CloseOverlayProvider>
        </Popover>
    );
}

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import { CloseOverlayProvider } from "@/registry/default/lib/close-overlay";

type UiSheetProps = React.ComponentProps<typeof Sheet>;

export default function UiSheet({
    onOpenChange,
    children,
    ...props
}: UiSheetProps) {
    const handleClose = React.useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    return (
        <Sheet onOpenChange={onOpenChange} {...props}>
            <CloseOverlayProvider onClose={handleClose}>
                {children}
            </CloseOverlayProvider>
        </Sheet>
    );
}

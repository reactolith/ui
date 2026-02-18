import * as React from "react";
import { Dialog } from "@/components/ui/dialog";
import { CloseOverlayProvider } from "@/registry/default/lib/close-overlay";

type UiDialogProps = React.ComponentProps<typeof Dialog>;

export default function UiDialog({
    onOpenChange,
    children,
    ...props
}: UiDialogProps) {
    const handleClose = React.useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    return (
        <Dialog onOpenChange={onOpenChange} {...props}>
            <CloseOverlayProvider onClose={handleClose}>
                {children}
            </CloseOverlayProvider>
        </Dialog>
    );
}

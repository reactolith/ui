import * as React from "react";
import { CommandDialog } from "@/components/ui/command";
import { CloseOverlayProvider } from "@/registry/default/lib/close-overlay";

type UiCommandDialogProps = React.ComponentProps<typeof CommandDialog>;

export default function UiCommandDialog({
    onOpenChange,
    children,
    ...props
}: UiCommandDialogProps) {
    const handleClose = React.useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    return (
        <CommandDialog onOpenChange={onOpenChange} {...props}>
            <CloseOverlayProvider onClose={handleClose}>
                {children}
            </CloseOverlayProvider>
        </CommandDialog>
    );
}

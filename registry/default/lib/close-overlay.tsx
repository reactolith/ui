import * as React from "react";

type CloseOverlayContextType = (() => void) | null;

const CloseOverlayContext = React.createContext<CloseOverlayContextType>(null);

function CloseOverlayProvider({
    onClose,
    children,
}: {
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <CloseOverlayContext.Provider value={onClose}>
            {children}
        </CloseOverlayContext.Provider>
    );
}

function useCloseOverlay() {
    return React.useContext(CloseOverlayContext);
}

export { CloseOverlayProvider, useCloseOverlay };

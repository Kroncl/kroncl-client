'use client';

import { createContext, useContext, useState } from 'react';

interface DocsSidebarContextType {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    open: () => void;
}

const DocsSidebarContext = createContext<DocsSidebarContextType | undefined>(undefined);

export function DocsSidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(prev => !prev);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    return (
        <DocsSidebarContext.Provider value={{ isOpen, toggle, close, open }}>
            {children}
        </DocsSidebarContext.Provider>
    );
}

export function useDocsSidebar() {
    const context = useContext(DocsSidebarContext);
    if (context === undefined) {
        throw new Error('useDocsSidebar must be used within a DocsSidebarProvider');
    }
    return context;
}
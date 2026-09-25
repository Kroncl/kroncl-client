import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';

export type TreeScale = 75 | 90 | 100 | 125;
export type CategoryStatus = 'active' | 'inactive';
export type StatusValue = 'active' | 'inactive';

export type StatusUpdate = (id: string, status: StatusValue) => void;

export type DragPayload =
    | { kind: 'category'; id: string; parentId: string | null }
    | { kind: 'unit'; id: string; categoryId: string };

export type CatalogTreeItemProps = {
    className?: string;
    activeId: string | null;
    setActiveId: (id: string | null, persist: boolean) => void;
    initialActivePath?: string[];
    onStatusUpdated?: StatusUpdate;

    dragPayload: DragPayload | null;
    setDragPayload: (p: DragPayload | null) => void;
    dropTargetId: string | null;
    setDropTargetId: (id: string | null) => void;
    registerReload: (id: string, fn: () => Promise<void>) => void;
    unregisterReload: (id: string) => void;
    onDrop?: (targetId: string) => void; // ← вот это
} & (
    | { type: 'category'; category: CatalogCategory }
    | { type: 'unit'; unit: CatalogUnit }
);
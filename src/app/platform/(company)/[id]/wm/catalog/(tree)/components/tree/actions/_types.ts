import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';

export type CreateMode = 'none' | 'choose' | 'category' | 'unit';

export type CatalogTreeItemActionsProps = {
    className?: string;
    onCreated: () => void;
} & (
    | { type: 'category'; category: CatalogCategory }
    | { type: 'unit'; unit: CatalogUnit }
    | { type: 'root' }
);

export type CategoryFormData = {
    name: string;
    comment: string;
};

export type UnitFormData = {
    name: string;
    comment: string;
    type: 'product' | 'service';
    inventory_type: 'tracked' | 'untracked';
    tracking_detail: 'batch' | 'serial' | undefined;
    tracked_type: 'fifo' | 'lifo' | undefined;
    unit: string;
    sale_price: string;
    purchase_price: string;
};
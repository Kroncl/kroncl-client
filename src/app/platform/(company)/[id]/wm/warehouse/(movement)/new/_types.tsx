import { CatalogUnit } from "@/apps/company/modules/wm/types";

export type DraftPosition = {
    key: string;
    unit: CatalogUnit;
    quantity: string;
    unit_price: string;
    maker: string;
    barcode: string;
};
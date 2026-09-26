import { PaginationMeta } from "@/apps/shared/pagination/types";
import { Doc } from "../docs/types";

// ============================================
// CATEGORIES
// ============================================

export type CategoryStatus = 'active' | 'inactive';

export interface CatalogCategory {
    id: string;
    name: string;
    comment: string | null;
    status: CategoryStatus;
    parent_id: string | null;
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
}

export interface CreateCategoryRequest {
    name: string;
    comment?: string | null;
    parent_id?: string | null;
    metadata?: Record<string, any>;
}

export interface UpdateCategoryRequest {
    name?: string;
    comment?: string | null;
    parent_id?: string | null;
    status?: CategoryStatus;
    metadata?: Record<string, any>;
}

export interface GetCategoriesParams {
    page?: number;
    limit?: number;
    status?: CategoryStatus;
    parent_id?: string | null;
    search?: string;
}

export interface CategoriesResponse {
    categories: CatalogCategory[];
    pagination: PaginationMeta;
}

// ============================================
// UNITS
// ============================================

export type UnitType = 'product' | 'service';
export type UnitStatus = 'active' | 'inactive';
export type InventoryType = 'tracked' | 'untracked';
export type TrackingDetail = 'batch' | 'serial';
export type TrackedType = 'fifo' | 'lifo';
export type CurrencyType = 'RUB';

export interface CatalogUnit {
    id: string;
    name: string;
    comment: string | null;
    type: UnitType;
    status: UnitStatus;
    inventory_type: InventoryType;
    tracking_detail?: TrackingDetail | null;
    tracked_type: TrackedType | null;
    unit: string;
    sale_price: number;
    purchase_price: number | null;
    currency: CurrencyType;
    category_id: string;
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
}

export interface CreateUnitRequest {
    name: string;
    comment?: string | null;
    type: UnitType;
    status?: UnitStatus;
    inventory_type: InventoryType;
    tracking_detail?: TrackingDetail | null;
    tracked_type?: TrackedType | null;
    unit: string;
    sale_price: number;
    purchase_price?: number | null;
    currency: CurrencyType;
    category_id: string;
    metadata?: Record<string, any>;
}

export interface UpdateUnitRequest {
    name?: string;
    comment?: string | null;
    type?: UnitType;
    status?: UnitStatus;
    inventory_type?: InventoryType;
    tracking_detail?: TrackingDetail | null;
    tracked_type?: TrackedType | null;
    unit?: string;
    sale_price?: number;
    purchase_price?: number | null;
    currency?: CurrencyType;
    category_id?: string | null;
    metadata?: Record<string, any>;
}

export interface GetUnitsParams {
    page?: number;
    limit?: number;
    type?: UnitType;
    status?: UnitStatus;
    inventory_type?: InventoryType;
    tracking_detail?: TrackingDetail;
    category_id?: string;
    search?: string;
}

export interface UnitsResponse {
    units: CatalogUnit[];
    pagination: PaginationMeta;
}

// ============================================
// STOCKS — ENUMS
// ============================================

export type StockDirection = 'income' | 'outcome';
export type StockPositionType = 'batch' | 'serial';
export type StockBatchStatus = 'draft' | 'labeled' | 'confirmed' | 'cancelled';
export type StockMovementType = 'write_off' | 'return' | 'transfer' | 'adjustment';

// ============================================
// STOCKS — MODELS
// ============================================

export interface StockBatch {
    id: string;
    direction: StockDirection;
    status: StockBatchStatus;
    comment: string | null;
    positions?: StockBatchPosition[];
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
}

export interface StockPosition {
    id: string;
    type: StockPositionType;
    income_batch_id: string;
    unit_id: string;
    quantity: number;
    unit_price: number;
    maker: string | null;
    barcode_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface PositionWithUnit {
    id: string;
    type: StockPositionType;
    income_batch_id: string;
    unit_id: string;
    quantity: number;
    unit_price: number;
    maker: string | null;
    barcode_id: string | null;
    remaining: number;
    created_at: string;
    updated_at: string;
    unit: CatalogUnit;
}

export interface StockPositionMovement {
    outcome_batch_id: string;
    position_id: string;
    type: StockMovementType;
    quantity: number;
    comment: string | null;
    metadata: Record<string, any> | null;
    created_at: string;
}

// ============================================
// STOCKS — BARCODES
// ============================================

export interface Barcode {
    id: string;
    barcode: string;
    maker: string | null;
    catalog_unit_id: string | null;
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
}

export interface CreateBarcodeRequest {
    barcode: string;
    maker?: string | null;
    catalog_unit_id?: string | null;
    metadata?: Record<string, any>;
}

export interface UpdateBarcodeRequest {
    barcode?: string;
    maker?: string | null;
    catalog_unit_id?: string | null;
    metadata?: Record<string, any>;
}

export interface GetBarcodesParams {
    page?: number;
    limit?: number;
    catalog_unit_id?: string;
    search?: string;
}

export interface BarcodesResponse {
    barcodes: Barcode[];
    pagination: PaginationMeta;
}

// ============================================
// STOCKS — REQUESTS
// ============================================

export interface StockBatchPosition {
    unit_id: string;
    quantity: number;
    unit_price: number;
    maker?: string | null;
    barcode?: string | null;
    unit: CatalogUnit;
}

export interface CreateStockBatchRequest {
    direction: StockDirection;
    comment?: string | null;
    positions: StockBatchPosition[];
    metadata?: Record<string, any>;
}

export interface CreateStockBatchOnlyRequest {
    direction: StockDirection;
    comment?: string | null;
    metadata?: Record<string, any>;
}

export interface UpdateStockBatchStatusRequest {
    status: StockBatchStatus;
}

export interface CreateStockMovementRequest {
    outcome_batch_id: string;
    position_id: string;
    type: StockMovementType;
    quantity: number;
    comment?: string | null;
    metadata?: Record<string, any>;
}


// ============================================
// STOCKS — FILTERS
// ============================================

export interface GetStockBatchesParams {
    page?: number;
    limit?: number;
    direction?: StockDirection;
    status?: StockBatchStatus;
    unit_id?: string;
    search?: string;
}

export interface GetStockPositionsParams {
    page?: number;
    limit?: number;
    type?: StockPositionType;
    unit_id?: string;
    income_batch_id?: string;
    in_stock?: boolean;
    search?: string;
}

export interface GetMovementsParams {
    page?: number;
    limit?: number;
    type?: StockMovementType;
    outcome_batch_id?: string;
    position_id?: string;
}

// ============================================
// STOCKS — PAGINATED RESPONSES
// ============================================

export interface StockBatchesResponse {
    batches: StockBatch[];
    pagination: PaginationMeta;
}

export interface StockPositionsResponse {
    positions: PositionWithUnit[];
    pagination: PaginationMeta;
}

export interface StockMovementsResponse {
    movements: StockPositionMovement[];
    pagination: PaginationMeta;
}

// ============================================
// STOCK BALANCE
// ============================================

export interface StockBalanceItem {
    unit_id: string;
    unit_name: string;
    quantity: number;
    reserved: number;
    available: number;
}

// ============================================
// REPORTS
// ============================================

export interface GenerateWMReportRequest {
    types: string[];
    comment?: string;
}

export interface GenerateWMReportResponse {
    download_url: string;
    doc: Doc;
}
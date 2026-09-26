import { CompanyApi } from "../../api";
import {
    // Categories
    CatalogCategory,
    CategoriesResponse,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    GetCategoriesParams,
    // Units
    CatalogUnit,
    UnitsResponse,
    CreateUnitRequest,
    UpdateUnitRequest,
    GetUnitsParams,
    // Stocks — Batches
    CreateStockBatchRequest,
    CreateStockBatchOnlyRequest,
    UpdateStockBatchStatusRequest,
    GetStockBatchesParams,
    StockBatchesResponse,
    StockBatch,
    // Stocks — Positions
    PositionWithUnit,
    GetStockPositionsParams,
    StockPositionsResponse,
    // Stocks — Movements
    StockPositionMovement,
    CreateStockMovementRequest,
    GetMovementsParams,
    StockMovementsResponse,
    // Stocks — Balance
    StockBalanceItem,
    // Barcodes
    Barcode,
    CreateBarcodeRequest,
    UpdateBarcodeRequest,
    GetBarcodesParams,
    BarcodesResponse,
    // Reports
    GenerateWMReportRequest,
    GenerateWMReportResponse,
} from "./types";

export const wmModule = (companyApi: CompanyApi) => ({
    // --------
    // CATEGORIES
    // --------

    async getCategories(params?: GetCategoriesParams) {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        if (params) {
            if (params.page !== undefined) queryParams.page = params.page;
            if (params.limit !== undefined) queryParams.limit = params.limit;
            if (params.status !== undefined) queryParams.status = params.status;
            if (params.parent_id !== undefined) {
                queryParams.parent_id = params.parent_id === null ? 'null' : params.parent_id;
            }
            if (params.search !== undefined) queryParams.search = params.search;
        }

        return companyApi.get<CategoriesResponse>("/modules/wm/catalog/categories", {
            params: queryParams
        });
    },

    async getCategory(id: string) {
        return companyApi.get<CatalogCategory>(`/modules/wm/catalog/categories/${id}`);
    },

    async createCategory(data: CreateCategoryRequest) {
        return companyApi.post<CatalogCategory>("/modules/wm/catalog/categories", data);
    },

    async updateCategory(id: string, data: UpdateCategoryRequest) {
        return companyApi.patch<CatalogCategory>(`/modules/wm/catalog/categories/${id}`, data);
    },

    async activateCategory(id: string) {
        return companyApi.post<CatalogCategory>(`/modules/wm/catalog/categories/${id}/activate`);
    },

    async deactivateCategory(id: string) {
        return companyApi.post<CatalogCategory>(`/modules/wm/catalog/categories/${id}/deactivate`);
    },

    // --------
    // UNITS
    // --------

    async getUnits(params?: GetUnitsParams) {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        if (params) {
            if (params.page !== undefined) queryParams.page = params.page;
            if (params.limit !== undefined) queryParams.limit = params.limit;
            if (params.type !== undefined) queryParams.type = params.type;
            if (params.status !== undefined) queryParams.status = params.status;
            if (params.inventory_type !== undefined) queryParams.inventory_type = params.inventory_type;
            if (params.tracking_detail !== undefined) queryParams.tracking_detail = params.tracking_detail;
            if (params.category_id !== undefined) {
                queryParams.category_id = params.category_id === null ? undefined : params.category_id;
            }
            if (params.search !== undefined) queryParams.search = params.search;
        }

        return companyApi.get<UnitsResponse>("/modules/wm/catalog/units", {
            params: queryParams
        });
    },

    async getUnit(id: string) {
        return companyApi.get<CatalogUnit>(`/modules/wm/catalog/units/${id}`);
    },

    async createUnit(data: CreateUnitRequest) {
        return companyApi.post<CatalogUnit>("/modules/wm/catalog/units", data);
    },

    async updateUnit(id: string, data: UpdateUnitRequest) {
        return companyApi.patch<CatalogUnit>(`/modules/wm/catalog/units/${id}`, data);
    },

    async activateUnit(id: string) {
        return companyApi.post<CatalogUnit>(`/modules/wm/catalog/units/${id}/activate`);
    },

    async deactivateUnit(id: string) {
        return companyApi.post<CatalogUnit>(`/modules/wm/catalog/units/${id}/deactivate`);
    },

    // --------
    // STOCKS — BATCHES
    // --------

    async getStockBatches(params?: GetStockBatchesParams) {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        if (params) {
            if (params.page !== undefined) queryParams.page = params.page;
            if (params.limit !== undefined) queryParams.limit = params.limit;
            if (params.direction !== undefined) queryParams.direction = params.direction;
            if (params.status !== undefined) queryParams.status = params.status;
            if (params.unit_id !== undefined) queryParams.unit_id = params.unit_id;
            if (params.search !== undefined) queryParams.search = params.search;
        }

        return companyApi.get<StockBatchesResponse>("/modules/wm/stocks/batches", {
            params: queryParams
        });
    },

    async getStockBatch(id: string) {
        return companyApi.get<StockBatch>(`/modules/wm/stocks/batches/${id}`);
    },

    async createStockBatch(data: CreateStockBatchRequest) {
        return companyApi.post<StockBatch>("/modules/wm/stocks/batches", data);
    },

    async createStockBatchOnly(data: CreateStockBatchOnlyRequest) {
        return companyApi.post<StockBatch>("/modules/wm/stocks/batches/only", data);
    },

    async updateStockBatchStatus(id: string, data: UpdateStockBatchStatusRequest) {
        return companyApi.patch<StockBatch>(`/modules/wm/stocks/batches/${id}/status`, data);
    },

    // --------
    // STOCKS — POSITIONS
    // --------

    async getStockPositions(params?: GetStockPositionsParams) {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        if (params) {
            if (params.page !== undefined) queryParams.page = params.page;
            if (params.limit !== undefined) queryParams.limit = params.limit;
            if (params.type !== undefined) queryParams.type = params.type;
            if (params.unit_id !== undefined) queryParams.unit_id = params.unit_id;
            if (params.income_batch_id !== undefined) queryParams.income_batch_id = params.income_batch_id;
            if (params.in_stock !== undefined) queryParams.in_stock = params.in_stock;
            if (params.search !== undefined) queryParams.search = params.search;
        }

        return companyApi.get<StockPositionsResponse>("/modules/wm/stocks/positions", {
            params: queryParams
        });
    },

    async getStockPosition(id: string) {
        return companyApi.get<PositionWithUnit>(`/modules/wm/stocks/positions/${id}`);
    },

    // --------
    // STOCKS — MOVEMENTS
    // --------

    async getMovements(params?: GetMovementsParams) {
        const queryParams: Record<string, string | number | undefined> = {};

        if (params) {
            if (params.page !== undefined) queryParams.page = params.page;
            if (params.limit !== undefined) queryParams.limit = params.limit;
            if (params.type !== undefined) queryParams.type = params.type;
            if (params.outcome_batch_id !== undefined) queryParams.outcome_batch_id = params.outcome_batch_id;
            if (params.position_id !== undefined) queryParams.position_id = params.position_id;
        }

        return companyApi.get<StockMovementsResponse>("/modules/wm/stocks/movements", {
            params: queryParams
        });
    },

    async createStockMovement(data: CreateStockMovementRequest) {
        return companyApi.post<StockPositionMovement>("/modules/wm/stocks/movements", data);
    },

    async createStockMovementsBatch(data: CreateStockMovementRequest[]) {
        return companyApi.post<StockPositionMovement[]>("/modules/wm/stocks/movements/batch", data);
    },

    // --------
    // STOCKS — BALANCE
    // --------

    async getStockBalance(unitId?: string) {
        const queryParams: Record<string, string | undefined> = {};
        if (unitId) queryParams.unit_id = unitId;

        return companyApi.get<StockBalanceItem[]>("/modules/wm/stocks/balance", {
            params: queryParams
        });
    },

    // --------
    // BARCODES
    // --------

    async getBarcodes(params?: GetBarcodesParams) {
        const queryParams: Record<string, string | number | undefined> = {};

        if (params) {
            if (params.page !== undefined) queryParams.page = params.page;
            if (params.limit !== undefined) queryParams.limit = params.limit;
            if (params.catalog_unit_id !== undefined) queryParams.catalog_unit_id = params.catalog_unit_id;
            if (params.search !== undefined) queryParams.search = params.search;
        }

        return companyApi.get<BarcodesResponse>("/modules/wm/barcodes", {
            params: queryParams
        });
    },

    async getBarcodeByValue(barcode: string) {
        return companyApi.get<Barcode>("/modules/wm/barcodes/lookup", {
            params: { barcode }
        });
    },

    async getBarcodeById(id: string) {
        return companyApi.get<Barcode>(`/modules/wm/barcodes/${id}`);
    },

    async createBarcode(data: CreateBarcodeRequest) {
        return companyApi.post<Barcode>("/modules/wm/barcodes", data);
    },

    async updateBarcode(id: string, data: UpdateBarcodeRequest) {
        return companyApi.patch<Barcode>(`/modules/wm/barcodes/${id}`, data);
    },

    async deleteBarcode(id: string) {
        return companyApi.delete<void>(`/modules/wm/barcodes/${id}`);
    },

    // --------
    // REPORTS
    // --------

    async generateReport(data: GenerateWMReportRequest) {
        return companyApi.post<GenerateWMReportResponse>("/modules/wm/report", data);
    }
});
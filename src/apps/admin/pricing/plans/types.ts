import { PricingPlan, PricingPlansResponse } from '@/apps/pricing/types';
import { PaginationParams } from '@/apps/shared/pagination/types';

export type { PricingPlan, PricingPlansResponse };

export interface GetPlansParams extends PaginationParams {
    search?: string;
}

export interface UpdatePlanRequest {
    name?: string;
    description?: string;
    price_per_month?: number;
    price_per_year?: number;
    limit_db_mb?: number;
    limit_objects_mb?: number;
    limit_objects_count?: number;
}
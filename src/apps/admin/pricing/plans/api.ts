import { api } from '@/apps/shared/bridge/api';
import { ApiResponse } from '@/apps/shared/bridge/types';
import { PricingPlan, PricingPlansResponse, UpdatePlanRequest, GetPlansParams } from './types';

export class AdminPricingPlansApi {
    private basePath = '/admin/pricing';

    async getPlans(params?: GetPlansParams): Promise<ApiResponse<PricingPlansResponse>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.search) queryParams.append('search', params.search);
        
        const url = queryParams.toString() 
            ? `${this.basePath}/plans?${queryParams.toString()}`
            : `${this.basePath}/plans`;
        
        return api.get<PricingPlansResponse>(url);
    }

    async getPlan(code: string): Promise<ApiResponse<PricingPlan>> {
        return api.get<PricingPlan>(`${this.basePath}/plans/${code}`);
    }

    async updatePlan(code: string, data: UpdatePlanRequest, keyword: string): Promise<ApiResponse<PricingPlan>> {
        return api.patch<PricingPlan>(`${this.basePath}/plans/${code}`, data, {
            headers: {
                'X-Admin-Keyword': keyword,
            },
        });
    }
}

export const adminPricingPlansApi = new AdminPricingPlansApi();
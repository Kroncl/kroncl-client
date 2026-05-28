import { api } from '@/apps/shared/bridge/api';
import { ApiResponse } from '@/apps/shared/bridge/types';
import { BillingStatus, SystemStatusResponse } from './types';

export class StatusApi {
    private basePath = '/status';

    async getSystemStatus(days?: number): Promise<ApiResponse<SystemStatusResponse>> {
        const queryParams = new URLSearchParams();
        if (days && days > 0) {
            queryParams.append('days', String(days));
        }
        
        const url = queryParams.toString() 
            ? `${this.basePath}?${queryParams.toString()}`
            : this.basePath;
        
        return api.get<SystemStatusResponse>(url);
    }

    async getBillingStatus(): Promise<ApiResponse<BillingStatus>> {
        return api.get<BillingStatus>(`${this.basePath}/billing`)
    }
}

export const statusApi = new StatusApi();
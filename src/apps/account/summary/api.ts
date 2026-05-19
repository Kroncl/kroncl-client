import { api } from '@/apps/shared/bridge/api';
import { ApiResponse } from '@/apps/shared/bridge/types';
import { GetSummaryResponse } from './types';

export class SummaryApi {
    private endpoints = {
        summary: '/account/summary',
    };

    /**
     * Получить сводную информацию по аккаунту
     */
    async getSummary(): Promise<ApiResponse<GetSummaryResponse>> {
        return api.get<GetSummaryResponse>(this.endpoints.summary);
    }
}

export const summaryApi = new SummaryApi();
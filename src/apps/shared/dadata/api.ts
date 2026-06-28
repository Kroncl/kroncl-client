import { api } from '@/apps/shared/bridge/api';
import { ApiResponse } from '@/apps/shared/bridge/types';
import { CounterpartyPreview } from './types';

export class DaDataApi {
    private endpoints = {
        suggest: '/dadata/orgs',
    };

    async suggestParties(query: string): Promise<ApiResponse<CounterpartyPreview[]>> {
        return api.get<CounterpartyPreview[]>(`${this.endpoints.suggest}?q=${encodeURIComponent(query)}`);
    }
}

export const dadataApi = new DaDataApi();
// apps/currency/api.ts
import { api } from '@/apps/shared/bridge/api';
import { ApiResponse } from '@/apps/shared/bridge/types';
import { Currency } from './types';

export class CurrencyApi {
    private endpoints = {
        currencies: '/currency',
    };

    async getAll(codes?: string[]): Promise<ApiResponse<Currency[]>> {
        const params = codes?.length ? `?ids=${codes.join(',')}` : '';
        return api.get<Currency[]>(`${this.endpoints.currencies}${params}`);
    }

    async getByCode(code: string): Promise<ApiResponse<Currency>> {
        return api.get<Currency>(`${this.endpoints.currencies}/${code}`);
    }
}

export const currencyApi = new CurrencyApi();
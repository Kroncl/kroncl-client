import { api } from '@/apps/shared/bridge/api';
import { ApiResponse } from '@/apps/shared/bridge/types';
import {
    ApiKey,
    ApiKeyWithRaw,
    ApiKeysResponse,
    CreateApiKeyRequest,
    GetApiKeysParams
} from './types';

export class ApiKeysApi {
    private endpoints = {
        keys: '/account/api-keys',
        key: (id: string) => `/account/api-keys/${id}`,
        revoke: (id: string) => `/account/api-keys/${id}/revoke`,
    };

    async getApiKeys(
        params?: GetApiKeysParams
    ): Promise<ApiResponse<ApiKeysResponse>> {
        const queryParams: Record<string, string> = {};

        if (params?.page) queryParams.page = params.page.toString();
        if (params?.limit) queryParams.limit = params.limit.toString();
        if (params?.status) queryParams.status = params.status;
        if (params?.search) queryParams.search = params.search;

        return api.get<ApiKeysResponse>(this.endpoints.keys, {
            params: queryParams
        });
    }

    async getApiKey(id: string): Promise<ApiResponse<ApiKey>> {
        return api.get<ApiKey>(this.endpoints.key(id));
    }

    async createApiKey(
        data: CreateApiKeyRequest
    ): Promise<ApiResponse<ApiKeyWithRaw>> {
        return api.post<ApiKeyWithRaw>(this.endpoints.keys, data);
    }

    async revokeApiKey(id: string): Promise<ApiResponse<Record<string, never>>> {
        return api.post<Record<string, never>>(this.endpoints.revoke(id));
    }
}

export const apiKeysApi = new ApiKeysApi();
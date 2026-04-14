import { cookies } from 'next/headers';
import { ApiResponse } from '@/apps/shared/bridge/types';
import { AccountCompany } from './types';

const ACCESS_TOKEN_COOKIE = 'auth_access_token';

export class CompaniesApiSSR {
    private baseUrl: string;
    private endpoints = {
        company: (id: string) => `/companies/${id}`,
    };

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    }

    private async getAccessToken(): Promise<string | null> {
        try {
            const cookieStore = await cookies();
            return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || null;
        } catch {
            return null;
        }
    }

    private async makeRequest<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        try {
            const accessToken = await this.getAccessToken();
            
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
                    ...options?.headers,
                },
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as ApiResponse<T>;
        } catch (error) {
            throw error;
        }
    }

    async getCompany(companyId: string): Promise<AccountCompany | null> {
        try {
            const response = await this.makeRequest<AccountCompany>(
                this.endpoints.company(companyId)
            );
            
            if (response.status && response.data) {
                return response.data;
            }
            return null;
        } catch {
            return null;
        }
    }
}

export const companiesApiSSR = new CompaniesApiSSR();
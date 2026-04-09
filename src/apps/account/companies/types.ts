import { PaginationParams, PaginationMeta } from '@/apps/shared/pagination/types';

export interface AccountCompany {
    id: string;
    name: string;
    avatar_url: string | null;
    description: string;
    slug: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
    joined_at: string;
    role_code: string;
}

export interface GetAccountCompaniesParams extends PaginationParams {
    role?: string;
    search?: string;
}

export interface AccountCompaniesResponse {
    companies: AccountCompany[];
    pagination: PaginationMeta;
}
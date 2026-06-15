import { PaginationMeta, PaginationParams } from "@/apps/shared/pagination/types";

// ----------
// API KEY TYPES
// ----------

export interface ApiKey {
    id: string;
    account_id: string;
    name: string;
    key_prefix: string;
    daily_requests: number;
    last_used_at?: string | null;
    expires_at?: string | null;
    revoked_at?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ApiKeyListItem {
    id: string;
    name: string;
    key_prefix: string;
    daily_requests: number;
    last_used_at?: string | null;
    expires_at?: string | null;
    revoked_at?: string | null;
    created_at: string;
}

export interface ApiKeyWithRaw extends ApiKey {
    raw_key: string;
}

// ----------
// GET LIST
// ----------

export interface GetApiKeysParams extends PaginationParams {
    status?: 'active' | 'revoked';
    search?: string;
}

export interface ApiKeysResponse {
    api_keys: ApiKeyListItem[];
    pagination: PaginationMeta;
}

// ----------
// CREATE
// ----------

export interface CreateApiKeyRequest {
    name: string;
    expires_in?: string;
    daily_requests?: number;
}
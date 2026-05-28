import { PaginationMeta } from "@/apps/shared/pagination/types";

export interface Doc {
    id: string;
    object_path: string;
    module: string | null;
    type: string | null;
    comment: string | null;
    created_at: string;
    updated_at: string;
}

export interface DocsResponse {
    docs: Doc[];
    pagination: PaginationMeta;
}

export interface GetDocsParams {
    page?: number;
    limit?: number;
    module?: string;
    type?: string;
    search?: string;
}

// Настройки документов
export interface DocsSettings {
    legal_name: string | null;
    legal_address: string | null;
    inn: string | null;
    ogrn: string | null;
    bank_name: string | null;
    bank_bic: string | null;
    bank_account: string | null;
    director_name: string | null;
    accountant_name: string | null;
    warranty_terms: string | null;
    additional_terms: string | null;
    created_at: string;
    updated_at: string;
}

export interface UpdateDocsSettingsRequest {
    legal_name?: string | null;
    legal_address?: string | null;
    inn?: string | null;
    ogrn?: string | null;
    bank_name?: string | null;
    bank_bic?: string | null;
    bank_account?: string | null;
    director_name?: string | null;
    accountant_name?: string | null;
    warranty_terms?: string | null;
    additional_terms?: string | null;
}
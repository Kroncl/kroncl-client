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
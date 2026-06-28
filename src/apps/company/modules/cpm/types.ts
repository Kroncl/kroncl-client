import { PaginationMeta } from "@/apps/shared/pagination/types";

export type CounterpartyType = 'bank' | 'organization' | 'person';
export type CounterpartyStatus = 'active' | 'inactive';

export interface Counterparty {
    id: string;
    name: string;
    comment: string | null;
    type: CounterpartyType;
    status: CounterpartyStatus;
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
}

export interface CreateCounterpartyRequest {
    name: string;
    comment?: string;
    type: CounterpartyType;
    status?: CounterpartyStatus;
    metadata?: Record<string, any>;
}

export interface UpdateCounterpartyRequest {
    name?: string;
    comment?: string | null;
    type?: CounterpartyType;
    metadata?: Record<string, any> | null;
}

export interface GetCounterpartiesParams {
    page?: number;
    limit?: number;
    type?: CounterpartyType;
    status?: CounterpartyStatus;
    search?: string;
}

export interface CounterpartiesResponse {
    counterparties: Counterparty[];
    pagination: PaginationMeta;
}
import { PaginationMeta } from "@/apps/shared/pagination/types";

export type CounterpartyType = 'bank' | 'legal' | 'person';
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


// utils

const COUNTERPARTY_TYPE_LABELS: Record<CounterpartyType, string> = {
    bank: 'Банк',
    legal: 'Юрлицо',
    person: 'Физлицо',
};

export function getCounterpartyTypeLabel(type: CounterpartyType): string {
    return COUNTERPARTY_TYPE_LABELS[type] || type;
}
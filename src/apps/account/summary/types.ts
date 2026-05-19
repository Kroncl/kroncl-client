import { ApiResponse } from '@/apps/shared/bridge/types';

export interface SummaryCounters {
    organizations_count: number;
    invitations_count: number;
    fingerprints_count: number;
}

export type GetSummaryResponse = SummaryCounters;
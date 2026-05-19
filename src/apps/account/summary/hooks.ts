import { useQuery } from '@tanstack/react-query';
import { summaryApi } from './api';
import { GetSummaryResponse } from './types';

export const summaryKeys = {
    all: ['account-summary'] as const,
    summary: () => [...summaryKeys.all, 'counters'] as const,
};

export const useGetSummary = () => {
    return useQuery({
        queryKey: summaryKeys.summary(),
        queryFn: async () => {
            const response = await summaryApi.getSummary();
            if (!response.status) {
                throw new Error(response.message || 'Failed to fetch summary');
            }
            return response.data;
        },
    });
};
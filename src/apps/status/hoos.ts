import { useQuery } from '@tanstack/react-query';
import { statusApi } from '@/apps/status/api';
import { BillingStatus } from '@/apps/status/types';

export const billingKeys = {
    status: () => ['billing-status'] as const,
};

export const useBillingStatus = () => {
    return useQuery({
        queryKey: billingKeys.status(),
        queryFn: async () => {
            const response = await statusApi.getBillingStatus();
            if (!response.status) {
                throw new Error(response.message || 'Failed to fetch billing status');
            }
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};
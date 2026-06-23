'use client';

import { useQuery } from '@tanstack/react-query';
import { currencyApi } from './api';
import { Currency } from './types';

const ALL_CURRENCIES_KEY = ['currencies', 'all'] as const;
const CURRENCY_BY_CODE_KEY = (code: string) => ['currencies', code] as const;

export function useCurrencies(codes?: string[]) {
    return useQuery({
        queryKey: codes?.length ? ['currencies', ...codes] : ALL_CURRENCIES_KEY,
        queryFn: async () => {
            const response = await currencyApi.getAll(codes);
            if (response.status && response.data) {
                return response.data;
            }
            return [] as Currency[];
        },
        staleTime: 5 * 60 * 1000, // 5 минут — курсы могут меняться
        gcTime: 30 * 60 * 1000,
    });
}

export function useCurrency(code: string) {
    return useQuery({
        queryKey: CURRENCY_BY_CODE_KEY(code),
        queryFn: async () => {
            const response = await currencyApi.getByCode(code);
            if (response.status && response.data) {
                return response.data;
            }
            throw new Error('Currency not found');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        enabled: !!code,
    });
}
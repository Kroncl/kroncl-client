export type CurrencyType = 'fiat' | 'crypto';
export type RateSource = 'cbr' | 'coingecko' | 'manual';

export interface CurrencyRate {
    rate: number;
    source: RateSource;
    updated_at: string;
}

export interface Currency {
    id: string;
    name: string;
    type: CurrencyType;
    symbol: string;
    rate: CurrencyRate;
}

// utils

const RATE_SOURCE_LABELS: Record<RateSource, string> = {
    cbr: 'Центральный Банк РФ',
    coingecko: 'CoinGecko',
    manual: 'Ручной ввод',
};

export function getRateSourceLabel(source: RateSource): string {
    return RATE_SOURCE_LABELS[source] || source;
}
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

const RATE_SOURCE_SHORT_LABELS: Record<RateSource, string> = {
    cbr: 'ЦБ РФ',
    coingecko: 'CoinGecko',
    manual: 'Ручной ввод',
};


export function getRateSourceLabel(source: RateSource, short?: boolean): string {
    if (short) {
        return RATE_SOURCE_SHORT_LABELS[source] || source;
    }
    return RATE_SOURCE_LABELS[source] || source;
}

export const formatRate = (currency: Currency): string => {
    if (currency.type === 'crypto') {
        return currency.rate.rate.toLocaleString('ru-RU', {
            maximumFractionDigits: 2,
        }) + ' ₽';
    }
    return currency.rate.rate.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + ' ₽';
};
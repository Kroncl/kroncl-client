'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './block.module.scss';
import { PlatformFormVariants } from '@/app/platform/components/lib/form';
import { useCurrencies } from '@/apps/currency/hooks';
import { Currency, formatRate, getRateSourceLabel } from '@/apps/currency/types';
import { formatDateTime } from '@/assets/utils/date';

const LAST_CURRENCY_KEY = 'kroncl_last_currency';

function getLastUsedCurrency(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(LAST_CURRENCY_KEY);
}

function saveLastUsedCurrency(code: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LAST_CURRENCY_KEY, code);
}

export interface ChooseCurrencyBlockProps {
    className?: string;
    value: string;
    onChange: (code: string, currency: Currency) => void; // ← добавили Currency
    disabled?: boolean;
    filter?: 'all' | 'fiat' | 'crypto';
}

export function ChooseCurrencyBlock({
    className,
    value,
    onChange,
    disabled = false,
    filter = 'all',
}: ChooseCurrencyBlockProps) {
    const { data: currencies = [], isLoading } = useCurrencies();
    const [initialized, setInitialized] = useState(false);

    // Автовыбор RUB или последней использованной
    useEffect(() => {
        if (initialized || isLoading || currencies.length === 0) return;

        // Если value уже задан извне — не трогаем
        if (value && value !== 'RUB') {
            setInitialized(true);
            return;
        }

        const last = getLastUsedCurrency();
        const exists = currencies.some(c => c.id === last);

        if (last && exists) {
            handleChange(last)
        } else if (!value || value === 'RUB') {
            // RUB уже есть или будет выбран по умолчанию
            if (!currencies.some(c => c.id === value)) {
                handleChange('RUB')
            }
        }

        setInitialized(true);
    }, [currencies, isLoading, value, onChange, initialized]);

    const handleChange = (newValue: string) => {
        saveLastUsedCurrency(newValue);
        const selected = currencies.find(c => c.id === newValue);
        onChange(newValue, selected!);
    };

    const last = getLastUsedCurrency();
    const sorted = [...currencies].sort((a, b) => {
        // Последняя использованная — выше всех
        if (a.id === last) return -1;
        if (b.id === last) return 1;
        // RUB — следующий
        if (a.id === 'RUB') return -1;
        if (b.id === 'RUB') return 1;
        // Fiat перед crypto
        if (a.type === 'fiat' && b.type === 'crypto') return -1;
        if (a.type === 'crypto' && b.type === 'fiat') return 1;
        // Алфавит
        return a.id.localeCompare(b.id);
    });

    const filteredCurrencies = filter === 'all'
        ? sorted
        : sorted.filter(c => c.type === filter);

    const options = filteredCurrencies.map((c: Currency) => ({
        value: c.id,
        label: `${c.id} ${c.symbol}`,
        description: (
            <>
                {c.name}<br />
                <span className={styles.accent}>
                    {formatRate(c)}
                </span>{' '}
                на {formatDateTime(c.rate.updated_at)}
                {c.id !== 'RUB' && (
                    <div className={styles.source}>
                        {getRateSourceLabel(c.rate.source)}
                    </div>
                )}
                {c.type === 'crypto' && (
                    <span className={styles.crypto}>crypto</span>
                )}
            </>
        ),
    }));

    return (
        <PlatformFormVariants
            className={clsx(styles.block, className)}
            options={options}
            value={value}
            onChange={handleChange}
            disabled={disabled || isLoading}
            defaultCount={3}
        />
    );
}
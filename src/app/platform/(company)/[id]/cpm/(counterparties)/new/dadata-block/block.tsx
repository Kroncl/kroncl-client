'use client';

import clsx from 'clsx';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './block.module.scss';
import { CounterpartyPreview } from '@/apps/shared/dadata/types';
import { PlatformFormInput } from '@/app/platform/components/lib/form';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { getCounterpartyTypeLabel } from '@/apps/company/modules/cpm/types';
import { dadataApi } from '@/apps/shared/dadata/api';

export interface DaDataBlockProps {
    className?: string;
    onSelect?: (counterparty: CounterpartyPreview) => void;
}

interface ItemProps {
    counterparty: CounterpartyPreview;
    onClick?: () => void;
}

function Item({ counterparty, onClick }: ItemProps) {
    return (
        <motion.div
            className={styles.item}
            onClick={onClick}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
        >
            <div className={styles.name}>{counterparty.name}</div>
            <div className={styles.reqs}>
                <div className={styles.req}>ИНН: {counterparty.inn}</div>
                <div className={styles.req}>ОГРН/ОГРНИП: {counterparty.ogrn}</div>
                {counterparty.kpp && <div className={styles.req}>КПП: {counterparty.kpp}</div>}
                <div className={styles.req}>{counterparty.address}</div>
            </div>
            <span className={styles.type}>{getCounterpartyTypeLabel(counterparty.type)}</span>
        </motion.div>
    );
}

export function DaDataBlock({ className, onSelect }: DaDataBlockProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CounterpartyPreview[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState(false);
    const cachedResults = useRef<CounterpartyPreview[]>([]);

    const fetchSuggestions = useCallback(async (q: string) => {
        if (q.trim().length < 2) {
            setResults([]);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);
        setSelected(false);
        try {
            const response = await dadataApi.suggestParties(q);
            if (response.status && response.data) {
                setResults(response.data);
                cachedResults.current = response.data;
            } else {
                setError(response.message || 'Ошибка запроса');
                setResults([]);
                cachedResults.current = [];
            }
        } catch {
            setError('Не удалось загрузить подсказки');
            setResults([]);
            cachedResults.current = [];
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => fetchSuggestions(query), 400);
        return () => clearTimeout(timer);
    }, [query, fetchSuggestions]);

    const handleSelect = (counterparty: CounterpartyPreview) => {
        setSelected(true);
        onSelect?.(counterparty);

        // Сначала анимация скрытия, потом удаление из DOM
        setTimeout(() => {
            setResults([]);
        }, 300);
    };

    return (
        <div className={clsx(styles.container, className)}>
            <PlatformFormInput
                placeholder="ИНН / Наименование"
                value={query}
                onChange={setQuery}
            />
            <div className={styles.grid}>
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            key="loading"
                            className={styles.loading}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Spinner size="md" variant="accent" />
                        </motion.div>
                    )}

                    {!loading && error && (
                        <motion.div
                            key="error"
                            className={styles.error}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {!loading && !error && results.length === 0 && query.length >= 2 && !selected && (
                        <motion.div
                            key="empty"
                            className={styles.empty}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Ничего не найдено
                        </motion.div>
                    )}

                    {results.map((cp, index) => (
                        <Item
                            key={index}
                            counterparty={cp}
                            onClick={() => handleSelect(cp)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
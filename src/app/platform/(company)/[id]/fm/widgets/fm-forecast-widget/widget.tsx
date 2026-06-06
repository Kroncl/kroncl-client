'use client';

import clsx from 'clsx';
import styles from './widget.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFm } from '@/apps/company/modules';
import { ForecastSummaryResponse } from '@/apps/company/modules/fm/types';

export interface FMForecastWidgetProps {
    className?: string;
    variant?: 'compact' | 'default';
}

export function FMForecastWidget({
    className,
    variant = 'default'
}: FMForecastWidgetProps) {
    const params = useParams();
    const companyId = params.id;
    const fmModule = useFm();

    const [forecast, setForecast] = useState<ForecastSummaryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const forecastRes = await fmModule.getForecastSummary({});
            
            if (forecastRes.status) {
                setForecast(forecastRes.data);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ошибка загрузки");
            console.error('Error loading forecast:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Link href={`/platform/${companyId}/fm/forecast`} className={clsx(styles.widget, styles[variant], className, loading && styles.loading)}>
            {error && (
                <div className={styles.error}>
                    Не хватает данных для <span className={styles.accent}>прогноза финансов </span> - минимум <span className={styles.accent}>2 дня</span> учёта трат и доходов
                </div>
            )}
            {variant === 'default' && !error && (
                <>
                <div className={styles.title}>
                    Прогноз финансов
                </div>
                <div className={styles.description}>
                    На {forecast?.horizon || 30} дн. вперёд
                    {forecast?.confidence === 'low' ? (
                        <span className={styles.accent}> · мало данных</span>
                    ) : forecast?.confidence === 'medium' ? (
                        <span className={styles.accent}> · достаточно данных</span>
                    ) : (
                        <span className={styles.accent}> · высокая точность</span>
                    ) }
                </div>
                <div className={styles.counters}>
                    <div className={styles.item}>
                        {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                            <div className={styles.value}>
                                {forecast?.predicted_balance.toLocaleString('ru-RU') || 0} &#8381;
                            </div>
                        )}
                        <div className={styles.label}>Баланс к концу периода</div>
                    </div>
                    <div className={styles.item}>
                        {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                            <div className={clsx(
                                styles.value,
                                forecast && forecast.predicted_net_flow >= 0 ? styles.positive : styles.negative
                            )}>
                                {forecast ? (forecast.predicted_net_flow >= 0 ? '+' : '') + forecast.predicted_net_flow.toLocaleString('ru-RU') : 0} &#8381;
                            </div>
                        )}
                        <div className={styles.label}>Чистый поток</div>
                    </div>
                    <div className={styles.item}>
                        {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                            <div className={styles.value}>
                                {forecast?.predicted_income.toLocaleString('ru-RU') || 0} &#8381;
                            </div>
                        )}
                        <div className={styles.label}>Доходы</div>
                    </div>
                    <div className={styles.item}>
                        {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                            <div className={styles.value}>
                                {forecast?.predicted_expense.toLocaleString('ru-RU') || 0} &#8381;
                            </div>
                        )}
                        <div className={styles.label}>Расходы</div>
                    </div>
                </div>
                </>
            )}
        </Link>
    )
}
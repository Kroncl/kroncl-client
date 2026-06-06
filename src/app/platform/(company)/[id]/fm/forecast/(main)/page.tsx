'use client';

import styles from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { useFm } from '@/apps/company/modules';
import { useEffect, useState } from 'react';
import { ForecastSummaryResponse, ForecastResponse } from '@/apps/company/modules/fm/types';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import { PlatformEmptyCanvas } from '@/app/platform/components/lib/empty-canvas/canvas';
import Wallet from '@/assets/ui-kit/icons/wallet';
import { IndicatorWidget } from '../../(main)/components/indicator-widget/widget';
import { TimelineChart } from '../components/timeline-chart/chart';

export default function Page() {
    const fmModule = useFm();
    const searchParams = useSearchParams();

    const [summary, setSummary] = useState<ForecastSummaryResponse | null>(null);
    const [timeline, setTimeline] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, [searchParams]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const startDate = searchParams.get('start_date') || undefined;
            const endDate = searchParams.get('end_date') || undefined;
            const horizon = searchParams.get('horizon')
                ? parseInt(searchParams.get('horizon')!)
                : undefined;

            const [summaryRes, timelineRes] = await Promise.all([
                fmModule.getForecastSummary({ start_date: startDate, end_date: endDate, horizon }),
                fmModule.getForecastTimeline({ start_date: startDate, end_date: endDate, horizon }),
            ]);

            if (summaryRes.status) setSummary(summaryRes.data);
            if (timelineRes.status) setTimeline(timelineRes.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка загрузки');
            console.error('Error loading forecast:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <PlatformLoading />;
    if (error) return <PlatformError error={error} />;

    if (!summary || !timeline || timeline.data_points < 2) {
        return (
            <PlatformEmptyCanvas
                title="Недостаточно данных для прогноза."
                description="Нужно минимум 2 дня с операциями. Продолжайте вести учёт — прогноз появится автоматически."
                icon={<Wallet />}
            />
        );
    }

    return (
        <div className={styles.grid}>
            <section className={clsx(styles.section, styles.counters)}>
                <IndicatorWidget
                    value={{ amount: summary.predicted_balance, unit: '₽', icon: <Wallet /> }}
                    legend="Прогноз баланса"
                    about={`Ожидаемый баланс через ${summary.horizon} дн.`}
                    variant="accent"
                    className={styles.indicator}
                />
                <IndicatorWidget
                    value={{ amount: summary.predicted_net_flow, unit: '₽' }}
                    legend="Чистый поток"
                    about={`Ожидаемое изменение за ${summary.horizon} дн.`}
                    size="sm"
                    className={styles.indicator}
                />
                <IndicatorWidget
                    value={{ amount: summary.predicted_income, unit: '₽' }}
                    legend="Доходы"
                    about={`Прогноз доходов за ${summary.horizon} дн.`}
                    size="sm"
                    className={styles.indicator}
                />
                <IndicatorWidget
                    value={{ amount: summary.predicted_expense, unit: '₽' }}
                    legend="Расходы"
                    about={`Прогноз расходов за ${summary.horizon} дн.`}
                    size="sm"
                    className={styles.indicator}
                />
                <IndicatorWidget
                    value={{ amount: summary.predicted_tx_count }}
                    legend="Операций"
                    about={`Прогноз количества операций за ${summary.horizon} дн.`}
                    size="sm"
                    className={styles.indicator}
                />
                <IndicatorWidget
                    value={{ amount: summary.current_balance, unit: '₽' }}
                    legend="Текущий баланс"
                    about="Баланс на сейчас для сравнения"
                    size="sm"
                    className={styles.indicator}
                />
            </section>
            <section className={clsx(styles.section, styles.graph)}>
                <TimelineChart data={timeline.points} loading={loading} />
            </section>
        </div>
    );
}
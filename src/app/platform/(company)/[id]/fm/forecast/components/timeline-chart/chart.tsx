'use client';

import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceLine,
} from 'recharts';
import { ForecastDataPoint } from '@/apps/company/modules/fm/types';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import styles from './chart.module.scss';
import clsx from 'clsx';

interface TimelineChartProps {
    data: ForecastDataPoint[];
    loading?: boolean;
    className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div style={{
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-stroke-primary)',
            borderRadius: '6px',
            fontSize: '13px',
            padding: '10px 10px',
        }}>
            <div style={{ marginBottom: '4px', color: 'var(--color-text-description)', fontSize: '11px' }}>
                Дата: {label}
            </div>
            {payload.map((entry: any, index: number) => {
                if (entry.value === null || entry.value === undefined) return null;
                const isForecast = entry.dataKey === 'forecastBalance';
                return (
                    <div key={index} style={{ color: 'var(--color-accent)', marginTop: '2px' }}>
                        {isForecast ? 'Прогноз' : 'Факт'}: {entry.value.toLocaleString('ru-RU')} ₽
                    </div>
                );
            })}
        </div>
    );
};

export function TimelineChart({ data, loading, className }: TimelineChartProps) {
    if (loading) {
        return (
            <div className={styles.loading}>
                <Spinner />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className={styles.empty}>
                <span>Нет данных для отображения</span>
            </div>
        );
    }

    const lastActualIndex = data.findIndex(p => !p.is_actual) - 1;
    const splitDate = lastActualIndex >= 0 ? data[lastActualIndex].date : null;

    const chartData = data.map((point, index) => {
        const isConnectionPoint = index === lastActualIndex;
        return {
            date: point.date,
            actualBalance: point.is_actual ? point.balance : null,
            forecastBalance: (!point.is_actual || isConnectionPoint) ? point.balance : null,
        };
    });

    const forecastPoints = chartData.filter(p => p.forecastBalance !== null);
    const forecastValues = forecastPoints.map(p => p.forecastBalance);
    const allSame = forecastValues.length > 0 && forecastValues.every(v => v === forecastValues[0]);

    return (
        <div className={clsx(styles.chart, className)}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-stroke-secondary)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: 'var(--color-text-description)', fontSize: 11 }}
                        axisLine={{ stroke: 'var(--color-stroke-primary)' }}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-primary)' }}
                    />

                    {splitDate && (
                        <ReferenceLine
                            x={splitDate}
                            stroke="var(--color-text-description)"
                            strokeDasharray="4 4"
                            strokeWidth={1}
                            label={{
                                value: 'Сейчас',
                                position: 'top',
                                fill: 'var(--color-text-description)',
                                fontSize: 10,
                            }}
                        />
                    )}

                    <Area
                        type="monotone"
                        dataKey="actualBalance"
                        name="Факт"
                        stroke="var(--color-accent)"
                        strokeWidth={2}
                        fill="url(#actualGradient)"
                        connectNulls={false}
                        dot={false}
                    />

                    <Area
                        type={allSame ? undefined : "monotone"}
                        dataKey="forecastBalance"
                        name="Прогноз"
                        stroke="var(--color-accent)"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        fill="url(#forecastGradient)"
                        connectNulls={false}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
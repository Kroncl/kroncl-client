'use client';

import { useEffect, useState, useRef } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis
} from 'recharts';
import { adminMediaApi } from '@/apps/admin/media/api';
import { MediaMetricsHistoryItem } from '@/apps/admin/media/types';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import clsx from 'clsx';
import styles from './chart.module.scss';

interface MediaHistoryChartProps {
    className?: string;
    days?: number;
    limit?: number;
    snapshots?: MediaMetricsHistoryItem[];
    refreshInterval?: number;
}

interface ChartData {
    time: string;
    total_buckets: number;
    total_objects: number;
    total_size_mb: number;
    tenant_buckets_count: number;
    tenant_total_objects: number;
    tenant_total_size_mb: number;
    public_bucket_objects: number;
    public_bucket_size_mb: number;
    temp_bucket_objects: number;
    temp_bucket_size_mb: number;
}

export function MediaHistoryChart({ 
    className, 
    days = 7, 
    limit = 100, 
    snapshots,
    refreshInterval = 60000
}: MediaHistoryChartProps) {
    const [data, setData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchHistory = async () => {
        if (snapshots) {
            const formattedData = formatSnapshots(snapshots);
            setData(formattedData);
            setLoading(false);
            return;
        }

        setError(null);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);

        try {
            const response = await adminMediaApi.getMetricsHistory({
                start_date: startDate.toISOString(),
                limit: limit,
            });

            if (response.status && response.data) {
                const formattedData = formatSnapshots(response.data);
                setData(formattedData);
            } else {
                setError('Не удалось загрузить историю медиа-хранилища');
            }
        } catch (err) {
            setError('Ошибка при загрузке данных');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();

        if (refreshInterval > 0 && !snapshots) {
            intervalRef.current = setInterval(fetchHistory, refreshInterval);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [days, limit, snapshots, refreshInterval]);

    const formatSnapshots = (snapshotsData: MediaMetricsHistoryItem[]): ChartData[] => {
        const reversedData = [...snapshotsData].reverse();
        
        return reversedData.map((item) => ({
            time: new Date(item.recorded_at).toLocaleString(),
            total_buckets: item.total_buckets,
            total_objects: item.total_objects,
            total_size_mb: item.total_size_mb,
            tenant_buckets_count: item.tenant_buckets_count,
            tenant_total_objects: item.tenant_total_objects,
            tenant_total_size_mb: item.tenant_total_size_mb,
            public_bucket_objects: item.public_bucket_objects,
            public_bucket_size_mb: item.public_bucket_size_mb,
            temp_bucket_objects: item.temp_bucket_objects,
            temp_bucket_size_mb: item.temp_bucket_size_mb,
        }));
    };

    if (loading && data.length === 0) {
        return (
            <div className={styles.loading}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.empty}>
                {error}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className={styles.empty}>
                Нет данных за выбранный период
            </div>
        );
    }

    return (
        <div className={clsx(styles.chart, className)}>
            {/* Общая статистика */}
            <div className={styles.chartWrapper}>
                <h4 className={styles.title}>Общая статистика</h4>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="bucketsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2560ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2560ff" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="objectsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="sizeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f63939" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#f63939" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-stroke-secondary)" vertical={false} />
                        <XAxis dataKey="time" tick={{ fill: 'var(--color-text-description)', fontSize: 11 }} axisLine={{ stroke: 'var(--color-stroke-primary)' }} tickLine={false} />
                        <YAxis yAxisId="left" tick={{ fill: 'var(--color-text-description)', fontSize: 11 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--color-text-description)', fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-stroke-primary)', borderRadius: '6px', fontSize: '13px' }} />
                        
                        <Area yAxisId="left" type="monotone" dataKey="total_buckets" name="Бакетов" stroke="#2560ff" strokeWidth={2} fill="url(#bucketsGradient)" />
                        <Area yAxisId="right" type="monotone" dataKey="total_objects" name="Объектов" stroke="#34d399" strokeWidth={2} fill="url(#objectsGradient)" />
                        <Area yAxisId="right" type="monotone" dataKey="total_size_mb" name="Объём (MB)" stroke="#f63939" strokeWidth={2} fill="url(#sizeGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Арендные бакеты */}
            <div className={styles.chartWrapper}>
                <h4 className={styles.title}>Арендные бакеты</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="tenantBucketsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4e20c3" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4e20c3" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="tenantObjectsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-stroke-secondary)" vertical={false} />
                        <XAxis dataKey="time" tick={{ fill: 'var(--color-text-description)', fontSize: 11 }} axisLine={{ stroke: 'var(--color-stroke-primary)' }} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-stroke-primary)', borderRadius: '6px', fontSize: '13px' }} />
                        
                        <Area type="monotone" dataKey="tenant_buckets_count" name="Арендных бакетов" stroke="#4e20c3" strokeWidth={2} fill="url(#tenantBucketsGradient)" />
                        <Area type="monotone" dataKey="tenant_total_objects" name="Объектов в арендных бакетах" stroke="#f472b6" strokeWidth={2} fill="url(#tenantObjectsGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Публичный бакет */}
            <div className={styles.chartWrapper}>
                <h4 className={styles.title}>Публичный бакет</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="publicObjectsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="publicSizeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-stroke-secondary)" vertical={false} />
                        <XAxis dataKey="time" tick={{ fill: 'var(--color-text-description)', fontSize: 11 }} axisLine={{ stroke: 'var(--color-stroke-primary)' }} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-stroke-primary)', borderRadius: '6px', fontSize: '13px' }} />
                        
                        <Area type="monotone" dataKey="public_bucket_objects" name="Объектов" stroke="#22d3ee" strokeWidth={2} fill="url(#publicObjectsGradient)" />
                        <Area type="monotone" dataKey="public_bucket_size_mb" name="Объём (MB)" stroke="#facc15" strokeWidth={2} fill="url(#publicSizeGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Временный бакет */}
            <div className={styles.chartWrapper}>
                <h4 className={styles.title}>Временный бакет</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="tempObjectsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-stroke-secondary)" vertical={false} />
                        <XAxis dataKey="time" tick={{ fill: 'var(--color-text-description)', fontSize: 11 }} axisLine={{ stroke: 'var(--color-stroke-primary)' }} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-stroke-primary)', borderRadius: '6px', fontSize: '13px' }} />
                        
                        <Area type="monotone" dataKey="temp_bucket_objects" name="Объектов" stroke="#fb923c" strokeWidth={2} fill="url(#tempObjectsGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
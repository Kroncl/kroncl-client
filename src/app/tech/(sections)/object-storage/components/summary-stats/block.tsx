'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './block.module.scss';
import { Counter } from '../../../overview/counter';
import { adminMediaApi } from '@/apps/admin/media/api';
import { SystemMediaStats } from '@/apps/admin/media/types';

export interface MediaStatsBlockProps {
    className?: string;
}

export function MediaStatsBlock({ className }: MediaStatsBlockProps) {
    const [stats, setStats] = useState<SystemMediaStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await adminMediaApi.getSystemStats();
                if (response.status && response.data) {
                    setStats(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch media stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className={clsx(styles.container, className)}>
                <Counter value="..." legend="Загрузка..." className={styles.col} />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className={clsx(styles.container, className)}>
                <Counter value="0" legend="Нет данных" className={styles.col} />
            </div>
        );
    }

    return (
        <div className={clsx(styles.container, className)}>
            <Counter 
                value={stats.total_buckets} 
                legend="Всего бакетов" 
                className={styles.col} 
            />
            <Counter 
                value={stats.total_objects} 
                legend="Всего объектов" 
                className={styles.col} 
                variant={stats.total_objects < 10000 ? 'good' : 'critical'}
            />
            <Counter 
                value={stats.total_size_mb} 
                legend="Общий объём (MB)" 
                className={styles.col} 
                format={(v) => typeof v === 'number' ? v.toLocaleString() : String(v)}
                variant={stats.total_size_mb < 10240 ? 'good' : 'critical'}
            />

            <Counter 
                value={stats.public_bucket_objects} 
                legend="Публичный бакет (объекты)" 
                className={styles.col} 
            />
            <Counter 
                value={stats.public_bucket_size_mb} 
                legend="Публичный бакет (MB)" 
                className={styles.col} 
            />

            <Counter 
                value={stats.temp_bucket_objects} 
                legend="Временный бакет (объекты)" 
                className={styles.col} 
            />
            <Counter 
                value={stats.temp_bucket_size_mb} 
                legend="Временный бакет (MB)" 
                className={styles.col} 
            />

            <Counter 
                value={stats.tenant_buckets_count} 
                legend="Арендных бакетов" 
                className={styles.col} 
            />
            <Counter 
                value={stats.tenant_total_objects} 
                legend="Арендные бакеты (объекты)" 
                className={styles.col} 
            />
            <Counter 
                value={stats.tenant_total_size_mb} 
                legend="Арендные бакеты (MB)" 
                className={styles.col} 
            />

            <Counter 
                value={stats.avg_tenant_objects} 
                legend="Среднее объектов в арендном бакете" 
                className={styles.col} 
                format={(v) => typeof v === 'number' ? v.toFixed(1) : String(v)}
            />
            <Counter 
                value={stats.avg_tenant_size_mb} 
                legend="Средний объём арендного бакета (MB)" 
                className={styles.col} 
                format={(v) => typeof v === 'number' ? v.toFixed(1) : String(v)}
            />
            <Counter 
                value={stats.largest_bucket_size_mb} 
                legend="Самый большой бакет (MB)" 
                className={styles.col} 
                variant={stats.largest_bucket_size_mb < 1024 ? 'good' : 'critical'}
            />
        </div>
    );
}
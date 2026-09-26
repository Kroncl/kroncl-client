'use client';

import { useMemo } from 'react';
import { StockBatch, StockBatchPosition } from '@/apps/company/modules/wm/types';
import styles from './card.module.scss';
import clsx from 'clsx';
import { getUnitRu } from '../../../../catalog/units/new/_units';
import { formatDate, formatDateTime } from '@/assets/utils/date';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export interface BatchCardProps {
    className?: string;
    batch: StockBatch;
}

interface GroupedItem {
    key: string;
    name: string;
    unit: string;
    type: 'batch' | 'serial';
    totalQuantity: number;
    partiesCount: number;
    avgPrice: number;
    totalSum: number;
    maker: string | null;
}

const STATUS_LABELS: Record<string, string> = {
    draft: 'Черновик',
    labeled: 'Этикетки напечатаны',
    confirmed: 'Проведено',
    cancelled: 'Отменено',
};

export function BatchCard({ className, batch }: BatchCardProps) {
    const params = useParams();
    const companyId = params.id as string;
    
    const grouped = useMemo<GroupedItem[]>(() => {
        if (!batch.positions || batch.positions.length === 0) return [];

        const map = new Map<string, GroupedItem>();

        for (const pos of batch.positions) {
            const key = `${pos.unit.id}-${pos.unit.tracking_detail ?? 'batch'}`;
            const existing = map.get(key);
            const sum = pos.unit_price * pos.quantity;

            if (existing) {
                existing.totalQuantity += pos.quantity;
                existing.partiesCount += 1;
                existing.totalSum += sum;
                existing.avgPrice = existing.totalSum / existing.totalQuantity;
            } else {
                map.set(key, {
                    key,
                    name: pos.unit.name,
                    unit: pos.unit.unit,
                    type: pos.unit.tracking_detail === 'serial' ? 'serial' : 'batch',
                    totalQuantity: pos.quantity,
                    partiesCount: 1,
                    avgPrice: pos.unit_price,
                    totalSum: sum,
                    maker: pos.maker ?? null,
                });
            }
        }

        return Array.from(map.values());
    }, [batch.positions]);

    const totalSum = useMemo(
        () => grouped.reduce((acc, item) => acc + item.totalSum, 0),
        [grouped]
    );

    const totalPositions = batch.positions?.length ?? 0;

    return (
        <Link href={`/platform/${companyId}/wm/warehouse/${batch.id}`} className={clsx(styles.card, className)}>
            <div className={clsx(styles.col, styles.info)}>
                <div className={clsx(
                    styles.type,
                    batch.direction === 'income' ? styles.income : styles.outcome
                )}>
                    {batch.direction === 'income' ? 'Поставка' : 'Отгрузка'}
                </div>
                <div className={clsx(styles.status, styles[batch.status])}>
                    {STATUS_LABELS[batch.status] ?? batch.status}
                </div>
                <div className={styles.time}>
                    {formatDateTime(batch.created_at)}
                </div>
            </div>

            <div className={clsx(styles.col, styles.positions)}>
                {grouped.length > 0 ? (
                    grouped.map((item) => (
                        <div key={item.key} className={styles.pos}>
                            <span className={styles.name}>{item.name}</span>
                            <span className={styles.quantity}>
                                {item.type === 'serial' ? (
                                    <>
                                        {item.totalQuantity} {getUnitRu(item.unit)}
                                        {item.partiesCount > 0 && (
                                            <span className={styles.muted}>
                                                {' '}· {item.partiesCount} экз.
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {item.partiesCount} парт. · {item.totalQuantity} {getUnitRu(item.unit)}
                                    </>
                                )}
                            </span>
                            <span className={styles.price}>
                                {item.avgPrice.toLocaleString('ru-RU')} ₽/{getUnitRu(item.unit)}
                            </span>
                            <span className={styles.sum}>
                                {item.totalSum.toLocaleString('ru-RU')} ₽
                            </span>
                        </div>
                    ))
                ) : (
                    <div className={styles.empty}>Без позиций</div>
                )}
            </div>

            <div className={clsx(styles.col, styles.meta)}>
                {batch.comment && (
                    <div className={styles.comment}>
                        {batch.comment}
                    </div>
                )}
                <div className={styles.total}>
                    <div className={styles.accent}>Итого: {totalSum.toLocaleString('ru-RU')} ₽</div>
                    <div>{totalPositions} позиций</div>
                </div>
            </div>
        </Link>
    );
}
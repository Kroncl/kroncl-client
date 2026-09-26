'use client';

import { useMemo } from 'react';
import { Barcode, StockBatch, StockBatchPosition } from '@/apps/company/modules/wm/types';
import styles from './card.module.scss';
import clsx from 'clsx';
import { getUnitRu } from '../../../units/new/_units';
import { formatDate, formatDateTime } from '@/assets/utils/date';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';
import { shortenId } from '@/assets/utils/ids';
import Button from '@/assets/ui-kit/button/button';

export interface BarcodeCardProps {
    className?: string;
    barcode: Barcode;
}

export function BarcodeCard({ className, barcode }: BarcodeCardProps) {
    const params = useParams();
    const companyId = params.id as string;

    return (
        <div className={clsx(styles.card, className)}>
            <div className={clsx(styles.col, styles.code)}>
                <span>{barcode.barcode}</span>
            </div>

            <div className={clsx(styles.col, styles.maker)}>
                {barcode.maker || <span className={styles.empty}>Без производителя</span>}
            </div>

            <div className={clsx(styles.col, styles.unit)}>
                {barcode.catalog_unit_id ? (
                    <ModalTooltip content='При создании поставки код производителя автоматически определит товарную позицию из каталога'>
                        <div className={styles.underline}>Привязан к позиции: <Link href={`/platform/${companyId}/wm/catalog/units/${barcode.catalog_unit_id}`}>{shortenId(barcode.catalog_unit_id)}</Link></div>
                    </ModalTooltip>
                ) : (
                    <ModalTooltip content='Необходимо определить товарную позицию каталога'>
                        <div className={styles.underline}>Не привязан к позиции</div>
                    </ModalTooltip>
                )}
            </div>

            <div className={clsx(styles.col, styles.meta)}>
                {/* <div>Обновлен {formatDate(barcode.updated_at)}</div> */}
                <div>Добавлен {formatDate(barcode.created_at)}</div>
            </div>

            <div className={clsx(styles.col, styles.actions)}>
                <Button
                    className={styles.action}
                    children='Открыть'
                    href={`/platform/${companyId}/wm/catalog/barcodes/${barcode.id}`}
                    as='link'
                    variant='contrast'
                />
            </div>
        </div>
    );
}
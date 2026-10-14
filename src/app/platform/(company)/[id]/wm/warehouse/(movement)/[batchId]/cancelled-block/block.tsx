'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import Button from "@/assets/ui-kit/button/button";
import { BarcodePreview } from "@/app/components/BarCode/block";
import { formatDate, formatDateTime } from "@/assets/utils/date";
import { getUnitRu } from "../../../../catalog/units/new/_units";
import { PositionWithUnit, StockBatch } from "@/apps/company/modules/wm/types";
import { useCallback, useState } from "react";
import { useMessage } from "@/app/platform/components/lib/message/provider";
import { PositionsBlock } from "../positions-block/block";
import { StatusBlock } from "../../new/components/status-block/block";

export interface CancelledBlockProps {
    className?: string;
    batch: StockBatch;
}

export function CancelledBlock({
    className,
    batch
}: CancelledBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.head}>
                <div className={styles.title}>{batch.direction === 'income' ? 'Поставка' : 'Отгрузка'} отменена</div>
                <div className={styles.description}>
                    Документ был отменён до подтверждения завершения. Изменить это действие нельзя.
                </div>
                <br />
                <div className={styles.description}>{batch.comment ? batch.comment : 'Документ не имеет комментария'}</div>
            </div>
            <div className={styles.head}>
                <StatusBlock
                    status={batch.status}
                />
            </div>
            <PositionsBlock
                className={styles.positions}
                positions={batch.positions}
            />
            <div className={styles.warning}>
                Последнее обновление {formatDateTime(batch.updated_at)}, документ создан {formatDateTime(batch.created_at)}
            </div>
        </div>
    );
}
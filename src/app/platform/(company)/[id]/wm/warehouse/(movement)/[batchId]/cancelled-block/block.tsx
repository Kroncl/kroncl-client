'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import Button from "@/assets/ui-kit/button/button";
import { BarcodePreview } from "@/app/components/BarCode/block";
import { formatDate } from "@/assets/utils/date";
import { getUnitRu } from "../../../../catalog/units/new/_units";
import { PositionWithUnit, StockBatch } from "@/apps/company/modules/wm/types";
import { useCallback, useState } from "react";
import { useMessage } from "@/app/platform/components/lib/message/provider";

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
                    Напечатайте этикетки для товаров и подтвердите завершение этапа.
                </div>
            </div>
            <div className={styles.warning}>
                Убедитесь, что состав поставки соответствует реальному поступлению.
                На каждую отдельную партию или серийный товар — отдельная этикетка.
            </div>
        </div>
    );
}
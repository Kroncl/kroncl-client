'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import Input from "@/assets/ui-kit/input/input";
import Close from "@/assets/ui-kit/icons/close";
import { PositionWithUnit } from "@/apps/company/modules/wm/types";
import { BarcodePreview } from "@/app/components/BarCode/block";
import { getUnitRu } from "../../../../catalog/units/new/_units";
import { formatDate } from "@/assets/utils/date";

export interface PositionsBlockProps {
    className?: string;
    positions: PositionWithUnit[];
}

export function PositionsBlock({
    className,
    positions
}: PositionsBlockProps) {
    return (
        <div className={clsx(styles.positions, className)}>
            <div className={styles.title}>Состав</div>
            <div className={styles.items}>
                {positions.map(pos => (
                    <div key={pos.short_code} className={styles.item}>
                        <div className={styles.preview}>
                            <BarcodePreview
                                className={styles.canvas}
                                value={pos.short_code}
                                format='CODE128'
                            />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.code}><span>{pos.short_code}</span></div>
                            <div className={styles.name}>
                                {pos.unit.name}{' '}
                                <span>
                                    {pos.quantity}{getUnitRu(pos.unit.unit)}
                                    {pos.type === 'batch' && <> в партии</>}
                                </span>
                            </div>
                            <div className={styles.meta}>{formatDate(pos.created_at)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
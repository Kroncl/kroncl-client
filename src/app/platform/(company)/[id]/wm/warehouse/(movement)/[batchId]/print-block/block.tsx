'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import Input from "@/assets/ui-kit/input/input";
import Close from "@/assets/ui-kit/icons/close";
import { PositionWithUnit } from "@/apps/company/modules/wm/types";
import Button from "@/assets/ui-kit/button/button";
import { BarcodePreview } from "@/app/components/BarCode/block";
import { formatDate } from "@/assets/utils/date";
import { getUnitRu } from "../../../../catalog/units/new/_units";

export interface PrintBlockProps {
    className?: string;
    positions: PositionWithUnit[];
}

export function PrintBlock({
    className,
    positions
}: PrintBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.head}>
                <div className={styles.title}>Печать этикеток</div>
                <div className={styles.description}>
                    Напечайте этикетки на товарах и подтвердите заверешение этапа.
                </div>
            </div>
            <div className={styles.positions}>
                <div className={styles.title}>Состав поставки</div>
                <div className={styles.items}>
                    {positions.map((pos, index) => (
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
                                <div className={styles.name}>{pos.unit.name} <span>{pos.quantity}{getUnitRu(pos.unit.unit)} {pos.type === 'batch' && (<>в партии</>)}</span></div>
                                <div className={styles.meta}>{formatDate(pos.created_at)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.settings}>
                <div className={styles.title}>Настройки печати</div>
            </div>
            <div className={styles.warning}>
                Убедитесь, что состав поставки соответсвует реальному поступлению товаров на склад. 
                Этикетки размещаются на упаковке товара или партии. На каждую отдельную партию (пакет болтов) или серийный товар (шестерня) - отдельная этикетка.
            </div>
            <div className={styles.actions}>
                <Button
                    variant="contrast"
                    children='Начать печать' 
                    className={styles.action} />
            </div>
        </div>
    );
}
'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import Input from "@/assets/ui-kit/input/input";
import Close from "@/assets/ui-kit/icons/close";
import { DraftPosition } from "../../_types";

export interface PositionsConstructorBlockProps {
    className?: string;
    positions: DraftPosition[];
    onChange: (key: string, patch: Partial<DraftPosition>) => void;
    onRemove: (key: string) => void;
}

export function PositionsConstructorBlock({
    className,
    positions,
    onChange,
    onRemove,
}: PositionsConstructorBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.head}>
                <div className={styles.col}>Тип</div>
                <div className={styles.col}>Название</div>
                <div className={styles.col}>Кол-во</div>
                <div className={styles.col}>Цена за ед.</div>
                <div className={styles.col}></div>
            </div>

            <div className={styles.grid}>
                {positions.length === 0 ? (
                    <div className={styles.empty}>
                        Позиции не добавлены
                    </div>
                ) : (
                    positions.map(pos => {
                        const isSerial = pos.unit.tracking_detail === 'serial';

                        return (
                            <div key={pos.key} className={styles.item}>
                                <div className={styles.col}>
                                    {isSerial ? 'Серийный' : 'Партия'}
                                </div>

                                <div className={styles.col}>
                                    {pos.unit.name}
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        fullWidth
                                        className={styles.input}
                                        type="text"
                                        inputMode="decimal"
                                        value={pos.quantity}
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(/[^\d.]/g, '');
                                            onChange(pos.key, { quantity: raw });
                                        }}
                                    />
                                </div>

                                <div className={styles.col}>
                                    <Input
                                        fullWidth
                                        className={styles.input}
                                        type="text"
                                        inputMode="decimal"
                                        value={pos.unit_price}
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(/[^\d.]/g, '');
                                            onChange(pos.key, { unit_price: raw });
                                        }}
                                    />
                                </div>

                                <div onClick={() => onRemove(pos.key)} className={styles.col}>
                                    <Close />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
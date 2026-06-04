'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import Input from "@/assets/ui-kit/input/input";
import Minus from "@/assets/ui-kit/icons/minus";

export interface PositionCardProps {
    className?: string;
    name: string;
    quantity: number;
    price: number;
    onUpdate: (field: 'name' | 'quantity' | 'price', value: string | number) => void;
    onRemove: () => void;
    dragHandle?: boolean;
}

export function PositionCard({
    className,
    name,
    quantity,
    price,
    onUpdate,
    onRemove,
    dragHandle
}: PositionCardProps) {
    return (
        <div className={clsx(styles.container, className, dragHandle && styles[styles.dragged])}>
            <div className={styles.col}>
                <Input
                    placeholder='Наименование'
                    className={styles.input}
                    value={name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                />
            </div>
            <div className={styles.col}>
                <Input
                    placeholder='Кол-во'
                    type='number'
                    min={0}
                    step={0.01}
                    className={styles.input}
                    value={quantity}
                    onChange={(e) => onUpdate('quantity', parseFloat(e.target.value) || 0)}
                />
            </div>
            <div className={styles.col}>
                <Input
                    placeholder='Цена за ед.'
                    min={0}
                    type='number'
                    step={0.01}
                    className={styles.input}
                    value={price}
                    onChange={(e) => onUpdate('price', parseFloat(e.target.value) || 0)}
                />
            </div>
            <div className={styles.action} onClick={onRemove}>
                <Minus className={styles.svg} />
            </div>
        </div>
    );
}
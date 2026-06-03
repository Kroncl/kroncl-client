'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import Input from "@/assets/ui-kit/input/input";
import Minus from "@/assets/ui-kit/icons/minus";

export interface PositionCardProps {
    className?: string;
}

export function PositionCard({
    className
}: PositionCardProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.col}>
                <Input
                    placeholder='Полное название'
                    className={styles.input}
                />
            </div>
            <div className={styles.col}>
                <Input
                    placeholder='Кол-во'
                    type='number'
                    min={0}
                    className={styles.input}
                />
            </div>
            <div className={styles.col}>
                <Input
                    placeholder='Сумма'
                    min={0}
                    type='number'
                    className={styles.input}
                />
            </div>
            <div className={styles.action}>
                <Minus className={styles.svg} />
            </div>
        </div>
    )
}
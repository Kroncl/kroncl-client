'use client';

import clsx from 'clsx';
import styles from './block.module.scss';

export interface BillingOffBlockProps {
    className?: string;
}

export function BillingOffBlock({
    className
}: BillingOffBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.info}>
                <div className={styles.name}>Бесплатный Beta-режим</div>
                <div className={styles.description}>Платформа временно работает в бесплатном режиме. Мы продлим тестовый период организации по истечению.</div>
            </div>
        </div>
    )
}
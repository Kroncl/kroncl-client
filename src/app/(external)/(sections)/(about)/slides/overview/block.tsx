'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './block.module.scss';
import clsx from 'clsx';

export function OverviewBlock({className}: PageBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <img src='/images/promo/light-company-workspace-cut.png' className={styles.mockUp} />
        </div>
    )
}
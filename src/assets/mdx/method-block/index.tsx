'use client';

import clsx from 'clsx';
import styles from './block.module.scss';

export interface MDXMethodBlock {
    className?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
}

export function MDXMethodBlock({
    className,
    method = 'GET',
    path
}: MDXMethodBlock) {
    return (
        <div className={clsx(styles.container, className)}>
            <span className={clsx(styles.tag, styles[method])}>{method}</span>
            <div className={styles.path}><span>{path}</span></div>
            {/* <span className={styles.secondary}>{process.env.NEXT_PUBLIC_API_URL || ''}</span> */}
        </div>
    )
}
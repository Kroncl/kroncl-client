'use client';

import clsx from "clsx";
import styles from './block.module.scss';

export interface MDXUrlBlockProps {
    className?: string;
    url: string;
    label?: string;
}

export function MDXUrlBlock({
    className,
    url,
    label
}: MDXUrlBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.url}>{url}</div>
            {label && (<span className={styles.label}>{label}</span>)}
        </div>
    )
}
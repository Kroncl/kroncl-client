import clsx from 'clsx';
import styles from './canvas.module.scss';
import React from 'react';
import Collection from '@/assets/ui-kit/icons/collection';

export interface PlatformEmptyCanvasProps {
    className?: string;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
}

export function PlatformEmptyCanvas({
    className,
    title = 'Здесь пока пусто.',
    description = 'Пора это исправить.',
    icon = <Collection className={styles.svg} />
}: PlatformEmptyCanvasProps) {
    return (
        <div className={clsx(styles.canvas, className)}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
        </div>
    )
}
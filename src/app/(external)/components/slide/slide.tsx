'use client'

import clsx from 'clsx';
import styles from './slide.module.scss';

export interface SlideProps {
    className?: string;
    children: React.ReactNode;
}

export function Slide({
    className,
    children
}: SlideProps) {
    return (
        <div className={clsx(styles.slide, className)}>
            {children}
        </div>
    )
}

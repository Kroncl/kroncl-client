'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Link from 'next/link';

export default function TarifficationSlide({
    className
}: PageBlockProps) {
    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.capture}>Гибкая тарификация.<br /> Постепенное внедрение.</div>
            <div className={styles.description}>Начните с базового набора модулей и внедряйте остальные по мере развития предприятия.</div>
            <div className={styles.actions}>
                <Button
                    text='bold'
                    href='/pricing'
                    as='link'
                    variant='contrast'
                    children='Подробнее'
                    border='round'
                />
            </div>
            <div className={styles.grid}>
                <div className={styles.col}></div>
                <div className={styles.col}></div>
                <div className={styles.col}></div>
            </div>
        </div>
        </>
    )
}
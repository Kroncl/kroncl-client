'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Link from 'next/link';
import ArchitectureBlock from './architecture-block/block';

export default function DesignSlide({
    className
}: PageBlockProps) {
    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.capture}>Спроектировано<br />для малого бизнеса</div>
            <div className={styles.description}>От внешнего вида до архитектуры модулей - чтобы малому бизнесу было удобно.</div>
            <div className={styles.architectureVisual}>
                <ArchitectureBlock className={styles.block} />
            </div>
        </div>
        </>
    )
}
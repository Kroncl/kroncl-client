'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Link from 'next/link';
import { linksConfig } from '@/config/links.config';

export default function CommunitySlide({
    className
}: PageBlockProps) {
    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.info}>
                <div className={styles.capture}>Сообщество</div>
                <div className={styles.description}>Код Kroncl открыт для всех. Мы развиваем систему каждый день. Предложите идею, внесите изменение и станьте частью команды.</div>
            </div>
            <div className={styles.actions}>
                <Button
                    text='bold'
                    border='round'
                    className={styles.action}
                    href={linksConfig.developerGithub}
                    as='link'
                    variant='leader'
                    children='Github'
                />
            </div>
        </div>
        </>
    )
}
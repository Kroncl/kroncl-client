'use client';

import Link from 'next/link';
import styles from './card.module.scss';
import clsx from 'clsx';
import { DOCS_LINK_ACCOUNT } from '@/app/docs/(v1)/internal.config';
import OutLink from '@/assets/ui-kit/icons/out-link';

export interface MessageCardProps {
    className?: string;
}

export function MessageCard({
    className
}: MessageCardProps) {
    return (
        <div className={clsx(styles.card, className)}>
            <div className={styles.date}>2 апреля, 2026</div>
            <div className={styles.text}>
                Переводчик — это специалист, который переносит смысл текстов или высказываний с одного языка на другой, сохраняя при этом содержание, стиль и цель текста, а также делает его понятным и близким для носителей языка. 
                <br />
                Переводчики требуются в сфере бизнеса, ИТ, финансов, медицины, юриспруденции, маркетинга, промышленности, массовой культуры. 
            </div>
            <div className={styles.media}>
                <Link href='/images/docs/company-logs.png' target='_blank' className={styles.item} style={{backgroundImage: 'url(/images/docs/company-logs.png)'}}/>
                <Link href='/images/docs/company-logs.png' target='_blank' className={styles.item} style={{backgroundImage: 'url(/images/docs/company-logs.png)'}}/>
                <Link href='/images/docs/company-logs.png' target='_blank' className={styles.item} style={{backgroundImage: 'url(/images/docs/company-logs.png)'}}/>
            </div>
            <div className={styles.links}>
                <Link href={DOCS_LINK_ACCOUNT} target='_blank' className={styles.link}>
                    <span className={styles.icon}><OutLink /> </span>
                    <span className={styles.name}>База знаний: аккаунт</span>
                </Link>
                <Link href={DOCS_LINK_ACCOUNT} target='_blank' className={styles.link}>
                    <span className={styles.icon}><OutLink /> </span>
                    <span className={styles.name}>База знаний: аккаунт</span>
                </Link>
            </div>
        </div>
    )
}
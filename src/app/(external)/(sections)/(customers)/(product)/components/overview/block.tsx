'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './block.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Question from '@/assets/ui-kit/icons/question';
import Wallet from '@/assets/ui-kit/icons/wallet';
import { authLinks } from '@/config/links.config';
import React from 'react';

export interface OverviewBlockProps extends PageBlockProps {
    title: string;
    description: React.ReactNode;
    img: string;
}

export function OverviewBlock({
    className,
    title,
    description,
    img
}: OverviewBlockProps) {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.focus)}>
                <div className={clsx(styles.area, className)}>
                    <div className={styles.capture}>{title}</div>
                    <div className={styles.description}>
                        {description}
                    </div>
                    <div className={styles.actions}>
                        <Button as='link' href={authLinks.registration} className={styles.action} variant='empty'>Начать сейчас</Button>
                        <Button as='link' href='/pricing' className={styles.action} variant='leader'>Тарифы</Button>
                    </div>
                </div>
            </div>
            <img src={img} className={styles.mockUp} />
        </div>
    )
}
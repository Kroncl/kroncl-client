'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './block.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Link from 'next/link';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';


export interface ArchitectureBlockProps {
    className?: string;
}

export default function ArchitectureBlock({
    className
}: ArchitectureBlockProps) {
    return (
        <div className={clsx(styles.block, className)}>
            <div className={clsx(styles.layer)}></div>
            <div className={clsx(styles.layer)}></div>
            <div className={clsx(styles.layer)}>
                <div className={clsx(styles.sector)}></div>
                <div className={clsx(styles.sector)}></div>
                <div className={clsx(styles.sector)}></div>
                <div className={clsx(styles.sector)}></div>
                <div className={clsx(styles.sector)}></div>
                <div className={clsx(styles.sector)}></div>
            </div>
            <ModalTooltip content='Ядро Kroncl написано на производительном языке Golang и содержит базовую логику взаимодействия модулей, обеспечения безопасности компаний и многое другое.'>
                <div className={clsx(styles.layer)}></div>
            </ModalTooltip>

            <ModalTooltip content='Один аккаунт может состоять во множестве организаций, со своими настройками и содержимым модулей.'>
                <div className={clsx(styles.line, styles.line1)}></div>
            </ModalTooltip>
        </div>
    )
}
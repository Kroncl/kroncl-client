import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import { style } from 'framer-motion/client';
import Puzzle from '@/assets/ui-kit/icons/puzzle';
import Book from '@/assets/ui-kit/icons/book';
import Code from '@/assets/ui-kit/icons/code';
import Link from 'next/link';
import { authLinks } from '@/config/links.config';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';

export default function ForkSlide({
    className
}: PageBlockProps) {
    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.grid}>
                <div className={styles.col}>
                    <span className={styles.icon}><Code /></span>
                    <span className={styles.title}>Модули</span>
                </div>
                <div className={styles.col}>
                    <span className={styles.icon}><Book /></span>
                    <span className={styles.title}>Документация</span>
                </div>
                <div className={styles.col}>
                    <span className={styles.icon}><Puzzle /></span>
                    <span className={styles.title}>Интеграции</span>
                </div>
            </div>
            <ModalTooltip content='6 модулей в бесплатном тарифном плане на 30 дней'>
            <div className={styles.text}>
                <Link href={authLinks.login} className={styles.accent}>Начните сейчас</Link> управлять своей организацией в бесплатном облаке Kroncl.
            </div>
            </ModalTooltip>
        </div>    
        </>
    )
}
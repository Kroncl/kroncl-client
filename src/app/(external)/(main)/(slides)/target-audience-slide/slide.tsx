'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Link from 'next/link';

export default function TargetAudienceSlide({
    className
}: PageBlockProps) {
    return (
        <div className={clsx(styles.slide, className)}>
            <div className={styles.col}>
                <div className={styles.subTitle}>МИКРОБИЗНЕСУ</div>
                <div className={styles.title}>Оптимизируйте учёт, готовьтесь к масштабированию</div>
                <div className={styles.description}>
                    Микробизнес — это самое маленькое официальное предприятие или ИП. В России по закону к нему относят компании, где работают не больше 15 человек, а годовой доход не превышает 120 миллионов рублей. Такой статус дают автоматически и вносят в специальный реестр.
                </div>
                <div className={styles.tip}>*Микробизнес = годовой доход до 120млн. рублей</div>
            </div>
            <Link href='/sad' className={styles.col}>
                <div className={styles.subTitle}>ИП & Физ. лицам</div>
                <div className={styles.title}>Не теряйте деньги на кассовых разрывах</div>
                <div className={styles.description}>
                    Kroncl — это в первую очередь операционная система управления предприятиями малого и среднего бизнеса (МСБ). Мы предоставляем предпринимателям этого сегмента ключевые модули и инструменты для ведения дела в России.
                    <br /><br />
                    Важно понимать: наш приоритет — не бухгалтерский учёт. Kroncl не ориентирован на ведение налоговой отчётности.
                </div>
                <div className={styles.actions}>
                    <Button
                        children='Больше о фин. модуле'
                        border='round'
                        text='bold'
                        variant='empty'
                        className={styles.action}
                    />
                </div>
            </Link>
        </div>
    )
}
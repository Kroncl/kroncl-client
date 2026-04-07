import { PageBlockProps } from '@/app/(external)/_types';
import styles from './block.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';

export function ForPartnersBlock({
    className
}: PageBlockProps) {
    return (
        <div className={clsx(styles.block)}>
            <div className={clsx(styles.col, className)}>
                <div className={styles.capture}>Партнёрам</div>
                <div className={styles.description}>
                    Станьте партнёром, внесите вклад в развитие Kroncl и получите
                    бессрочный доступ ко всем возможностям для своей организации.
                </div>
                <Button className={styles.action} variant='contrast' as='link' href='/become-partner'>Стать партнёром</Button>
            </div>
            <div className={clsx(styles.col)}>
                <div className={styles.box}>
                    <div className={styles.value}>24/7</div>
                    <div className={styles.legend}>Техническая поддержка</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>∞</div>
                    <div className={styles.legend}>Кастомизация системы</div>
                </div>
            </div>
        </div>
    )
}
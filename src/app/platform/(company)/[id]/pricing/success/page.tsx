'use client';

import SuccessStatus from '@/assets/ui-kit/icons/success-status';
import styles from './page.module.scss';
import Button from '@/assets/ui-kit/button/button';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.icon}>
                    <SuccessStatus className={styles.svg} />
                </div>
                <div className={styles.title}>Благодарим за покупку!</div>
                <div className={styles.description}>
                    Оплата подписки проходит процесс обработки. Обычно это занимает до 2 минут (в редких случаях до 5). 
                    Учётная система компании обновится за указанное время.
                </div>
                <div className={styles.actions}>
                    <Button
                        children='На главную'
                        href={`/platform/${companyId}`}
                        as='link'
                        className={styles.action}
                        variant='contrast'
                    />
                </div>
            </div>
            <div className={styles.underText}>
                Kroncl | Оплата подписки
            </div>
        </div>
    )
}
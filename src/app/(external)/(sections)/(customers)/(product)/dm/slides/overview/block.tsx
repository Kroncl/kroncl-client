'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './block.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Question from '@/assets/ui-kit/icons/question';
import Wallet from '@/assets/ui-kit/icons/wallet';
import { authLinks } from '@/config/links.config';

export function OverviewBlock({className}: PageBlockProps) {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.focus)}>
                <div className={clsx(styles.area, className)}>
                    <div className={styles.capture}>Управление сделками</div>
                    <div className={styles.description}>
                        Создание сделок с автоматическим созданием/привязкой клиентов, загрузкой ассортимента услуг и товаров в состав сделки.
                        <br />
                        Гибкое планирование будущих продаж, интеграция с модулем финансов.
                    </div>
                    <div className={styles.actions}>
                        <Button as='link' href={authLinks.registration} className={styles.action} variant='empty'>Начать сейчас</Button>
                        <Button as='link' href='/pricing' className={styles.action} variant='leader'>Тарифы</Button>
                    </div>
                </div>
            </div>
            <img src='/images/promo/dark-company-deals-cut.png' className={styles.mockUp} />
        </div>
    )
}
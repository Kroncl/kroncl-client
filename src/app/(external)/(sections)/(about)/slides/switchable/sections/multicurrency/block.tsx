import Keyhole from '@/assets/ui-kit/icons/keyhole';
import styles from './block.module.scss';
import Button from '@/assets/ui-kit/button/button';
import { DOCS_LINK_COMPANIES_LOGS } from '@/app/docs/(v1)/internal.config';
import Wallet from '@/assets/ui-kit/icons/wallet';
import { linksConfig } from '@/config/links.config';
import { Currency, formatRate, getRateSourceLabel } from '@/apps/currency/types';
import { useCurrencies } from '@/apps/currency/hooks';
import clsx from 'clsx';
import { formatDate, formatDateTime } from '@/assets/utils/date';

interface CurrencyItemProps {
    currency: Currency;
}

export function CurrencyItem({
    currency
}: CurrencyItemProps) {
    return (
        <div className={clsx(styles.item, currency.type === 'crypto' && styles.crypto)}>
            <div className={styles.id}>{currency.id}</div>
            <div className={styles.name}>{currency.name}</div>
            {currency.id !== 'RUB' && (<div className={styles.rate}>{formatRate(currency)}</div>)}

            {currency.id !== 'RUB' && (<div className={styles.source}>{getRateSourceLabel(currency.rate.source, true)}</div>)}
        </div>
    )
}

export function MulticurrencyBlock() {
    const { data: currencies = [], isLoading } = useCurrencies();
    const rub = currencies.find(c => c.id === 'RUB');
    const others = currencies.filter(c => c.id !== 'RUB');

    const shuffled = [...others].sort(() => Math.random() - 0.5);
    const mixed = rub ? [rub, ...shuffled] : shuffled;

    return (
        <>
        <div className={styles.preview}>
            <div className={styles.icon}><Wallet /></div>
            <div className={styles.info}>
                <div className={styles.capture}>
                    {currencies.length} валют
                </div>
                <div className={styles.description}>
                    Поддерживает финансовый модуль платформы.
                </div>
            </div>
            <div className={styles.actions}>
                <Button 
                    children='Попробовать'
                    variant='contrast'
                    as='link'
                    href={linksConfig.login}
                    className={styles.action} />
            </div>
        </div>
        <div className={styles.currencies}>
            {mixed.map((cur, index) => (
                <CurrencyItem key={index} currency={cur} />
            ))}
        </div>
        </>
    )
}
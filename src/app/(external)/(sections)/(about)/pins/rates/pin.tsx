'use client';

import { PageBlockProps } from "@/app/(external)/_types";
import clsx from "clsx";
import styles from './pin.module.scss';
import Button from "@/assets/ui-kit/button/button";
import Link from "next/link";
import { DOCS_LINK } from "@/app/docs/(v1)/internal.config";
import { useCurrencies } from "@/apps/currency/hooks";
import { linksConfig } from "@/config/links.config";
import Spinner from "@/assets/ui-kit/spinner/spinner";
import { formatRate } from "@/apps/currency/types";

export function Pin({className}: PageBlockProps) {
    const { data: currencies = [], isLoading } = useCurrencies();
    const rub = currencies.find(c => c.id === 'RUB');
    const others = currencies.filter(c => c.id !== 'RUB');

    const shuffled = [...others].sort(() => Math.random() - 0.5);
    const mixed = rub ? [rub, ...shuffled] : shuffled;

    return (
        <Link target="_blank" href={linksConfig.login} className={clsx(styles.container, className)}>
            {isLoading ? (
                <div className={styles.plug}>
                    <Spinner size="sm" variant="contrast" />
                </div>
            ) : (
            <div className={styles.grid}>
                <div className={styles.info}>
                    <div className={styles.text}>
                        Мы поддерживаем учёт в {currencies.length} валютах
                    </div>
                </div>
                <div className={styles.rates}>
                    <div className={styles.lines}>
                        {mixed.slice(0,4).map((currency, index) => (
                            <div key={index} className={styles.item}>
                                <div className={styles.id}>{currency.id}</div>
                                {currency.id !== 'RUB' && (<div className={styles.rate}>{formatRate(currency)}</div>)}
                            </div>
                        ))}
                        <div className={styles.item}>
                            + {currencies.length - 4}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </Link>
    )
}
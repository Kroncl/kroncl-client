'use client';

import { Counterparty, getCounterpartyTypeLabel } from '@/apps/company/modules/cpm/types';
import styles from './card.module.scss';
import clsx from 'clsx';
import { formatDate } from '@/assets/utils/date';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export interface CounterpartyCardProps {
    className?: string;
    counterparty: Counterparty;
    variant?: 'default' | 'compact';
    isSelected?: boolean;
    onSelect?: (counterparty: Counterparty) => void;
    selectable?: boolean;
    disableLink?: boolean;
}

export function CounterpartyCard({
    className,
    counterparty,
    variant = 'default',
    isSelected,
    onSelect,
    selectable,
    disableLink,
}: CounterpartyCardProps) {
    const params = useParams();
    const companyId = params.id as string;

    const content = (
        <>
            <div className={clsx(styles.col, styles.info)}>
                <div className={clsx(styles.name)}>{counterparty.name}</div>
                <div className={styles.tags}>
                    <div className={clsx(styles.tag, styles.accent)}>{getCounterpartyTypeLabel(counterparty.type)}</div>
                    <div className={clsx(styles.tag, counterparty.status === 'active' ? styles.green : styles.red)}>
                        {counterparty.status === 'active' ? 'Активен' : 'Деактивирован'}
                    </div>
                </div>
                <div className={styles.meta}>
                    <div className={styles.line}>
                        Обновлен: {counterparty.created_at === counterparty.updated_at ? '-' : formatDate(counterparty.updated_at)}
                    </div>
                    <div className={styles.line}>Создан: {formatDate(counterparty.created_at)}</div>
                </div>
            </div>
            <div className={clsx(styles.col, styles.reqs)}>
                <div className={styles.title}>Реквизиты</div>
                {counterparty.inn && (<div className={clsx(styles.req)}>ИНН: {counterparty.inn}</div>)}
                {counterparty.ogrn && (<div className={clsx(styles.req)}>ОГРН/ИП: {counterparty.ogrn}</div>)}
                {counterparty.kpp && (<div className={clsx(styles.req)}>КПП: {counterparty.kpp}</div>)}
                {counterparty.address && (<div className={clsx(styles.req)}>Адрес: {counterparty.address}</div>)}
                {counterparty.comment && (<>
                <br />
                <div className={styles.title}>Примечание</div>
                <div className={clsx(styles.req)}>{counterparty.comment}</div>
                </>)}
            </div>
        </>
    );

    const classNameStr = clsx(
        styles.container,
        className,
        styles[variant],
        isSelected && styles.selected,
        selectable && styles.selectable,
    );

    // Кликабельный div с onSelect (без ссылки)
    if (selectable && onSelect) {
        return (
            <div className={classNameStr} onClick={() => onSelect(counterparty)}>
                {content}
            </div>
        );
    }

    // Обычная ссылка
    if (!disableLink) {
        return (
            <Link href={`/platform/${companyId}/cpm/${counterparty.id}`} className={classNameStr}>
                {content}
            </Link>
        );
    }

    // Статичный div (ни ссылки, ни select)
    return <div className={classNameStr}>{content}</div>;
}
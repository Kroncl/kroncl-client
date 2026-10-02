'use client';

import { StockBatchStatus } from "@/apps/company/modules/wm/types";
import clsx from "clsx";
import styles from './block.module.scss';
import Edit from "@/assets/ui-kit/icons/edit";
import TwoCards from "@/assets/ui-kit/icons/two-cards";
import SuccessStatus from "@/assets/ui-kit/icons/success-status";
import ErrorStatus from "@/assets/ui-kit/icons/error-status";
import Input from "@/assets/ui-kit/input/input";
import Book from "@/assets/ui-kit/icons/book";
import { useParams } from "next/navigation";
import Spinner from "@/assets/ui-kit/spinner/spinner";
import { CatalogUnit } from "@/apps/company/modules/wm/types";
import { useWm } from "@/apps/company/modules";
import { useEffect, useRef, useState } from "react";
import { shortenId } from "@/assets/utils/ids";

export interface SearchBlockProps {
    className?: string;
    onSelect: (unit: CatalogUnit) => void;
}

export function SearchBlock({
    className,
    onSelect,
}: SearchBlockProps) {
    const params = useParams();
    const companyId = params.id as string;

    const wmModule = useWm();

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [results, setResults] = useState<CatalogUnit[]>([]);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);

    // debounce 400мс
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    // загрузка
    useEffect(() => {
        if (!debouncedSearch) {
            setResults([]);
            setTouched(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setTouched(true);

        wmModule.getUnits({
            search: debouncedSearch,
            status: 'active',
            type: 'product',
            limit: 30,
            inventory_type: 'tracked'
        })
            .then(res => {
                if (cancelled) return;
                if (res.status) setResults(res.data.units);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [debouncedSearch]);

    const hasSearch = debouncedSearch.length > 0;
    const isEmpty = hasSearch && !loading && !results;

    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.search}>
                <Input
                    fullWidth
                    placeholder="Название товара / Код производителя"
                    className={styles.input}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className={styles.tip}>
                    <div><Book className={styles.icon} /></div>
                    <div className={styles.info}>
                        Отсканируйте штрихкод производителя товара на упаковке (предварительно активировав поле ввода) — если баркод уже сохранён в <a href={`/platform/${companyId}/wm/catalog/barcodes`} target="_blank">словаре кодов</a>, товарная позиция автоматически добавится в состав поставки.
                    </div>
                </div>
            </div>

            <div className={styles.result}>
                {!touched ? null : loading ? (
                    <div className={styles.loading}>
                        <Spinner variant="accent" size='lg' />
                    </div>
                ) : isEmpty ? (
                    <div className={styles.empty}>Товарных позиций не найдено</div>
                ) : (
                    <div className={styles.grid}>
                        <div className={styles.summary}>Выберите товар. Всего {results ? results.length : 0}</div>
                        {results && results.map(unit => (
                            <div
                                key={unit.id}
                                className={styles.item}
                                onClick={() => onSelect(unit)}
                            >
                                <div className={styles.info}>
                                    <div className={styles.name}>{unit.name}</div>
                                    <div className={styles.params}>
                                        <div className={styles.line}>
                                            <span>Тип учёта</span>: {unit.inventory_type === 'tracked' ? 'Складской' : 'Без учёта'}
                                        </div>
                                        {unit.inventory_type === 'tracked' && (
                                            <div className={styles.line}>
                                                <span>Детализация</span>: {unit.tracking_detail === 'serial' ? 'Поштучный' : 'Партионный'}
                                            </div>
                                        )}
                                        <div className={styles.line}>
                                            <span>Валюта</span>: {unit.currency}
                                        </div>
                                        <div className={styles.line}>
                                            <span>Цена продажи</span>: {unit.sale_price.toLocaleString('ru-RU')} ₽
                                        </div>
                                        {unit.purchase_price != null && (
                                            <div className={styles.line}>
                                                <span>Цена закупки</span>: {unit.purchase_price.toLocaleString('ru-RU')} ₽
                                            </div>
                                )}
                                    </div>
                                </div>
                                <div className={styles.id}>#{shortenId(unit.id)}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
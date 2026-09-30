'use client';

import { useEffect, useState } from 'react';
import { useWm } from '@/apps/company/modules';
import { CatalogUnit } from '@/apps/company/modules/wm/types';
import styles from './block.module.scss';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import Input from '@/assets/ui-kit/input/input';
import { UnitCard } from '../../../components/unit-card/card';

interface ChooseUnitBlockProps {
    onSelectUnit: (unit: CatalogUnit) => void;
}

export function ChooseUnitBlock({ onSelectUnit }: ChooseUnitBlockProps) {
    const wmModule = useWm();

    const [units, setUnits] = useState<CatalogUnit[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        loadUnits();
    }, [debouncedSearch]);

    async function loadUnits() {
        setLoading(true);
        try {
            const res = await wmModule.getUnits({
                search: debouncedSearch.trim() || undefined,
                status: 'active',
                limit: 50,
                type: 'product'
            });
            if (res.status) setUnits(res.data.units);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <Input
                    placeholder='Поиск товаров...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.input}
                    fullWidth
                />
            </div>

            <div className={styles.body}>
                {loading ? (
                    <div className={styles.plug}>
                        <Spinner size='md' variant='contrast' />
                    </div>
                ) : !units ? (
                    <div className={styles.empty}>
                        Ничего не найдено
                    </div>
                ) : (
                    units.map(u => (
                        <UnitCard
                            key={u.id}
                            unit={u}
                            compact
                            showDefaultActions={false}
                            onClick={() => onSelectUnit(u)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
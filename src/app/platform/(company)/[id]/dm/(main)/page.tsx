'use client';

import PlatformContent from '@/app/platform/components/content/content';
import styles from './page.module.scss';
import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { useParams } from 'next/navigation';
import { sectionsList } from '../_sections';
import Plus from '@/assets/ui-kit/icons/plus';
import { DealCard } from '../components/deal-card/card';
import { useEffect, useState } from 'react';
import { useDm } from '@/apps/company/modules';
import { DealGroup } from '@/apps/company/modules/dm/types';
import Spinner from '@/assets/ui-kit/spinner/spinner';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const dmModule = useDm();
    
    const [data, setData] = useState<DealGroup[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await dmModule.getDeals({
                group_by: 'status'
            });
            
            if (response.status) {
                // Явно указываем тип, так как getDeals может возвращать разные типы
                setData(response.data as DealGroup[]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка загрузки");
            console.error('Error loading deals:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div style={{
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: ".7em", 
            color: "var(--color-text-description)", 
            minHeight: "10rem"
        }}>
            <Spinner />
        </div>
    );
    
    if (error) return (
        <div style={{
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: ".7em", 
            color: "var(--color-text-description)", 
            minHeight: "10rem"
        }}>
            {error}
        </div>
    );

    // Сортируем группы по sort_order
    const sortedGroups = data?.sort((a, b) => a.sort_order - b.sort_order) || [];

    return (
        <>
        <PlatformHead
            title='Сделки'
            description='Управление текущими сделками.'
            sections={sectionsList(companyId)}
            actions={[
                {
                    children: 'Новая сделка',
                    icon: <Plus />,
                    variant: 'accent',
                    as: 'link',
                    href: `/platform/${companyId}/dm/new`
                }
            ]}
        />
        <div className={styles.canvas}>
            <div className={styles.grid}>
                {sortedGroups.map((group) => (
                    <div key={group.status_id} className={styles.col}>
                        <div className={styles.head}>
                            <span className={styles.title}>
                                {group.status_name} <span className={styles.secondary}>{group.count}</span>
                            </span>
                            <span className={styles.mark} style={{backgroundColor: `${group.status_color}`}} />
                        </div>
                        {group.deals?.map((deal) => (
                            <DealCard 
                                key={deal.id} 
                                deal={deal} 
                                className={styles.item} 
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
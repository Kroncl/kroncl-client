'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import { PlatformEmptyCanvas } from '@/app/platform/components/lib/empty-canvas/canvas';
import styles from './page.module.scss';
import { isAdminAllowed, useAdminLevel } from '@/apps/admin/auth/hook';
import { ADMIN_LEVEL_5 } from '@/apps/admin/auth/types';
import { PricingPlan } from '@/apps/pricing/types';
import { PricingPlan as PricingPlanComponent } from '@/app/platform/(manage)/(home)/companies/new/components/pricing-plan/card';
import { adminPricingPlansApi } from '@/apps/admin/pricing/plans/api';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ALLOW_PAGE = useAdminLevel(ADMIN_LEVEL_5);
    
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        if (!ALLOW_PAGE.allowed) return;
        loadPlans();
    }, [ALLOW_PAGE.allowed, search]);

    const loadPlans = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminPricingPlansApi.getPlans({
                search: search || undefined,
                page: 1,
                limit: 100
            });
            if (response.status && response.data) {
                let sortedPlans: PricingPlan[] = [];
                if (response.data.plans && response.data.plans.length > 0) {
                    sortedPlans = [...response.data.plans].sort((a, b) => b.lvl - a.lvl);
                }
                setPlans(sortedPlans);
            } else {
                setError(response.message || 'Не удалось загрузить тарифные планы');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка загрузки");
            console.error('Error loading plans:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchValue: string) => {
        setSearch(searchValue);
        const params = new URLSearchParams(searchParams.toString());
        if (searchValue.trim()) {
            params.set('search', searchValue);
        } else {
            params.delete('search');
        }
        router.push(`/tech/tariffs?${params.toString()}`);
    };

    const handlePlanClick = (planCode: string) => {
        router.push(`/tech/tariffs/${planCode}`);
    };

    if (ALLOW_PAGE.isLoading || loading) return <PlatformLoading />;
    
    if (error) return <PlatformError error={error} />;

    if (!isAdminAllowed(ALLOW_PAGE)) return <PlatformError error="Доступ запрещён" />;

    return (
        <>
            <PlatformHead 
                title='Тарифы'
                description='Управление тарифными планами.'
                searchProps={{
                    placeholder: 'Поиск по названию или коду',
                    defaultValue: search,
                    onSearch: handleSearch
                }}
                showSearch={true}
            />
            {plans.length === 0 ? (
                <PlatformEmptyCanvas 
                    title='Тарифы не найдены'
                    description={search ? 'Попробуйте изменить поисковый запрос' : 'Тарифные планы отсутствуют'}
                />
            ) : (
                <div className={styles.grid}>
                    {plans.map((plan, index) => (
                        <PricingPlanComponent onClick={() => handlePlanClick(plan.code)} className={styles.item} plan={plan} key={index} />
                    ))}
                </div>
            )}
        </>
    );
}
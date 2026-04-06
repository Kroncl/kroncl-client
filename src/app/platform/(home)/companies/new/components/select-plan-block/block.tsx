'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './block.module.scss';
import { PricingPlan as PricingPlanComponent } from '../pricing-plan/card';
import { pricingApi } from '@/apps/pricing/api';
import type { PricingPlan } from '@/apps/pricing/types';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { useSearchParams } from 'next/navigation';

export interface SelectPlanBlockProps {
    className?: string;
    onSelect?: (planCode: string) => void;
    initialPlanCode?: string;
}

export function SelectPlanBlock({
    className,
    onSelect,
    initialPlanCode
}: SelectPlanBlockProps) {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    
    const searchParams = useSearchParams();
    const urlPlanCode = searchParams.get('plan');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await pricingApi.getPlans();
                if (response.status && response.data) {
                    const plansData = response.data.plans;
                    setPlans(plansData);
                    
                    // Приоритет выбора плана:
                    // 1. URL параметр code
                    // 2. initialPlanCode из пропсов
                    // 3. Первый план в списке
                    let planToSelect = null;
                    
                    if (urlPlanCode && plansData.some((plan: PricingPlan) => plan.code === urlPlanCode)) {
                        planToSelect = urlPlanCode;
                    } else if (initialPlanCode && plansData.some((plan: PricingPlan) => plan.code === initialPlanCode)) {
                        planToSelect = initialPlanCode;
                    } else if (plansData.length > 0) {
                        planToSelect = plansData[0].code;
                    }
                    
                    if (planToSelect) {
                        setSelectedCode(planToSelect);
                        onSelect?.(planToSelect);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, [urlPlanCode, initialPlanCode, onSelect]);

    const handleSelect = (code: string) => {
        setSelectedCode(code);
        onSelect?.(code);
        
        // Опционально: обновляем URL без перезагрузки страницы
        const url = new URL(window.location.href);
        url.searchParams.set('plan', code);
        window.history.pushState({}, '', url.toString());
    };

    if (loading) {
        return <div className={clsx(styles.empty, className)}><Spinner variant='accent' /></div>;
    }

    return (
        <div className={clsx(styles.block, className)}>
            {plans.map((plan) => (
                <PricingPlanComponent
                    key={plan.code}
                    plan={plan}
                    className={clsx(
                        styles.item,
                        selectedCode === plan.code && styles.selected
                    )}
                    onClick={() => handleSelect(plan.code)}
                />
            ))}
        </div>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './page.module.scss';
import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { DOCS_LINK_COMPANIES_PRICING } from "@/app/docs/(v1)/internal.config";
import { PricingPlan as PricingPlanComponent } from "@/app/platform/(home)/companies/new/components/pricing-plan/card";
import { pricingApi } from '@/apps/pricing/api';
import { usePricing } from '@/apps/company/modules';
import type { PricingPlan } from '@/apps/pricing/types';
import type { CompanyPricingPlan } from '@/apps/company/modules/pricing/types';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { Remained } from '@/assets/ui-kit/remained/remained';
import { pluralizeDays } from '@/assets/utils/date';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;

    const pricingModule = usePricing();

    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [companyPlan, setCompanyPlan] = useState<CompanyPricingPlan | null>(null);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingPlans(true);
            setLoadingCompany(true);
            setError(null);

            try {
                const [plansResponse, companyPlanResponse] = await Promise.all([
                    pricingApi.getPlans(),
                    pricingModule.getPlan()
                ]);

                if (plansResponse.status && plansResponse.data) {
                    setPlans(plansResponse.data.plans);
                } else {
                    setError('Не удалось загрузить тарифные планы');
                }

                if (companyPlanResponse.status && companyPlanResponse.data) {
                    setCompanyPlan(companyPlanResponse.data);
                } else {
                    setError('Не удалось загрузить текущий тариф компании');
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Ошибка загрузки данных');
                console.error('Error loading pricing data:', error);
            } finally {
                setLoadingPlans(false);
                setLoadingCompany(false);
            }
        };

        fetchData();
    }, [companyId]);

    const isLoading = loadingPlans || loadingCompany;
    const currentPlanCode = companyPlan?.current_plan.code;
    const daysLeft = companyPlan?.days_left || 0;
    const daysWord = pluralizeDays(daysLeft);

    return (
        <>
            <PlatformHead
                title="Тарификация организации"
                description="Смена тарифного плана. Просмотр остатка дней."
                docsEscort={{
                    href: DOCS_LINK_COMPANIES_PRICING,
                    title: 'Подробнее о тарификации организации.'
                }}
            />
            {isLoading && (
                <div className={styles.loading}>
                    <Spinner variant="accent" />
                </div>
            )}
            {error && (
                <div className={styles.error}>
                    <span className={styles.text}>{error}</span>
                </div>
            )}
            {!isLoading && !error && (
                <>
                <Remained
                    className={styles.remained} 
                    value={companyPlan?.days_left}
                    limit={companyPlan?.days_total}
                    >
                    {daysLeft} {daysWord} осталось до окончания тарифа <span className={styles.accent}>«{companyPlan?.current_plan.name}»</span>
                </Remained>
                <div className={styles.grid}>
                    {plans.map((plan) => (
                        <PricingPlanComponent
                            key={plan.code}
                            plan={plan}
                            isTrial={(currentPlanCode === plan.code && companyPlan?.is_trial ? true : false)}
                            className={clsx(
                                styles.item,
                                currentPlanCode === plan.code && styles.selected
                            )}
                            onClick={() => {
                                console.log('Select plan:', plan.code);
                            }}
                        />
                    ))}
                </div>
                </>
            )}
        </>
    );
}
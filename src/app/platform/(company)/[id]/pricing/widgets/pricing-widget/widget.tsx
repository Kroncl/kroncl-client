'use client';

import clsx from 'clsx';
import styles from './widget.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Remained } from '@/assets/ui-kit/remained/remained';
import { usePricing } from '@/apps/company/modules';
import { useEffect, useState } from 'react';
import { CompanyPricingPlan } from '@/apps/company/modules/pricing/types';
import { pluralizeDays } from '@/assets/utils/date';
import Button from '@/assets/ui-kit/button/button';

export interface PricingWidgetProps {
    className?: string;
}

export function PricingWidget({
    className
}: PricingWidgetProps) {
    const params = useParams();
    const companyId = params.id as string;

    const pricingModule = usePricing();

    const [companyPlan, setCompanyPlan] = useState<CompanyPricingPlan | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [companyPlan] = await Promise.all([
                pricingModule.getPlan()
            ]);
            
            if (companyPlan.status) {
                setCompanyPlan(companyPlan.data);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ошибка загрузки");
            console.error('Error loading analysis:', error);
        } finally {
            setLoading(false);
        }
    };

    const daysLeft = companyPlan?.days_left || 0;
    const daysWord = pluralizeDays(daysLeft);

    return (
        <Link href={`/platform/${companyId}/pricing`} className={clsx(styles.widget, className)}>
            {error ? (
                <div className={styles.error}>
                    С виджетом <span className={styles.accent}>тарификации</span> что-то пошло не так...
                </div>
            ) : (
                <>
                {companyPlan ? (
                    <div className={styles.title}>{companyPlan?.is_trial ? 'Тестовый период' : `«${companyPlan?.current_plan.name}»`}</div>
                ) : (
                    <div className={styles.title}><span className={styles.shimmer} /></div>
                )}
                <div className={styles.description}>Тарификация организации</div>
                <Remained 
                    loading={loading}
                    value={companyPlan?.days_left}
                    limit={companyPlan?.days_total}
                    className={styles.remained}
                >
                    {companyPlan && (
                        <>
                        <span className={styles.primary}>{daysLeft} {daysWord}</span> осталось
                        </>
                    )}
                </Remained>
                {daysLeft === 0 && (
                    <div className={styles.actions}>
                        <Button variant='accent' className={styles.action}>
                            Продлить
                        </Button>
                    </div>
                )}
                <span className={styles.mark} />
                </>
            )}
        </Link>
    )
}
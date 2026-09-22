'use client';

import { useEffect, useState } from 'react';
import { useCompany } from "@/apps/company/provider";
import { useParams } from "next/navigation";
import { PLAN_MAX_LVL, sectionsList } from "./sections.config";
import ClientPanel from "@/app/platform/components/panel/client-panel";
import styles from './panel.module.scss';
import { isAllowed, usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { StorageWidget } from "../../storage/widgets/storage-widget/widget";
import { useGeneral } from "@/apps/company/modules";
import { CompanySummary } from "@/apps/company/modules/general/types";

export function PlatformInjectedPanel() {
    const params = useParams();
    const companyId = params.id as string;
    const generalModule = useGeneral();

    const ALLOW_STORAGE = usePermission(PERMISSIONS.STORAGE);
    const ALLOW_SUMMARY = usePermission(PERMISSIONS.COMPANY_SUMMARY);

    const companyPlan = useCompany().companyPlan;
    const companyCurrentPlan = companyPlan?.current_plan;
    const companyLvl = companyCurrentPlan?.lvl || PLAN_MAX_LVL;

    const [summary, setSummary] = useState<CompanySummary | null>(null);

    useEffect(() => {
        if (ALLOW_SUMMARY.isLoading || !ALLOW_SUMMARY.allowed) return;

        let cancelled = false;

        generalModule.getSummary('RUB')
            .then(res => {
                if (!cancelled && res.status) setSummary(res.data);
            })
            .catch(() => {
            });

        return () => { cancelled = true; };
    }, [ALLOW_SUMMARY.isLoading, ALLOW_SUMMARY.allowed]);

    const sections = sectionsList(companyId, companyLvl).map(section => {
        if (!section.key || !summary) return section;

        const value = summary[section.key as keyof CompanySummary];
        if (typeof value !== 'number') return section;

        return {
            ...section,
            tags: [{ value, variant: 'default' as const }],
        };
    });

    return (
        <ClientPanel
            sections={sections}
            head={[
                {
                    name: 'Сводка',
                    href: `/platform/${companyId}`,
                    exact: true,
                    icon: 'home'
                },
                {
                    name: 'Управление',
                    href: `/platform/${companyId}/manage`,
                    exact: true,
                    icon: 'settings'
                }
            ]}
        >
            {isAllowed(ALLOW_STORAGE) && (
                <StorageWidget className={styles.widget} variant="compact" />
            )}
        </ClientPanel>
    )
}
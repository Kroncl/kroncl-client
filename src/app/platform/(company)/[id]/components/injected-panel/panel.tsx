'use client';

import { useCompany } from "@/apps/company/provider";
import { useParams } from "next/navigation";
import { PLAN_MAX_LVL, sections } from "./sections.config";
import ClientPanel from "@/app/platform/components/panel/client-panel";
import { actions } from "./actions.config";
import styles from './panel.module.scss';
import Home from "@/assets/ui-kit/icons/home";
import Settings from "@/assets/ui-kit/icons/settings";
import Link from "next/link";

export function PlatformInjectedPanel() {
    const params = useParams();
    const companyId = params.id as string;
    const company = useCompany().company;
    const companyPlan = useCompany().companyPlan;
    const companyCurrentPlan = companyPlan?.current_plan;
    const companyLvl = companyCurrentPlan?.lvl || PLAN_MAX_LVL;

    return (
        <ClientPanel
            sections={sections(companyId, companyLvl)}
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
            />
    )
}
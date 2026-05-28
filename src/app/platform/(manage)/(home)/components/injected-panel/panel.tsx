'use client';

import ClientPanel from "@/app/platform/components/panel/client-panel";
import { useGetSummary } from "@/apps/account/summary/hooks";
import { actionsList } from "./actions.config";
import { sectionsList } from "./sections.config";
import styles from './panel.module.scss';
import Button from "@/assets/ui-kit/button/button";
import Business from "@/assets/ui-kit/icons/business";
import TeamLeaders from "@/assets/ui-kit/icons/team-leaders";

export interface PlatformInjectedPanelProps {
    className?: string;
}

export function PlatformInjectedPanel({
    className
}: PlatformInjectedPanelProps) {
    const title = "Рабочая область";
    const { data: summary, isLoading } = useGetSummary();

    const sections = sectionsList().map(section => {
        const updatedSection = { ...section };
        
        if (summary && summary[section.key as keyof typeof summary] !== undefined) {
            const count = summary[section.key as keyof typeof summary] as number;
            const variant = section.key === 'invitations_count' && count > 0 ? 'accent' : 'default';
            updatedSection.tags = [{ value: count, variant }];
        }
        
        return updatedSection;
    });

    return (
        <ClientPanel
            sections={sections}
            title={title}
            children={<>
            <div className={styles.head}>
                <TeamLeaders className={styles.icon} />
                <div className={styles.actions}>
                    <Button
                        children="Создать компанию"
                        variant="light"
                        className={styles.action}
                        as='link'
                        href='/platform/companies/new'
                    />
                </div>
                <div className={styles.about}>
                    Новое пространство учётной системы
                </div>
            </div>
            </>}
        />
    )
}
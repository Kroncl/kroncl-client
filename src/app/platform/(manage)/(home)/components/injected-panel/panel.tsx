'use client';

import ClientPanel from "@/app/platform/components/panel/client-panel";
import { useGetSummary } from "@/apps/account/summary/hooks";
import { actionsList } from "./actions.config";
import { sectionsList } from "./sections.config";

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
            actions={actionsList()}
            sections={sections}
            title={title}
        />
    )
}
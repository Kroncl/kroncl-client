'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { useParams } from "next/navigation";
import { sectionsList } from "../_sections";
import { isAllowed, usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;

    // perms
    const ALLOW_PAGE = usePermission(PERMISSIONS.CPM);
    const ALLOW_CREATE = usePermission(PERMISSIONS.CPM_COUNTERPARTIES_CREATE);
    
    if (!ALLOW_PAGE.isLoading && !ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.CPM} />
    )
    
    return (
        <>
        <PlatformHead
            title='Контрагенты'
            description="Управление контрагентами - ИП, банки, физические лица."
            sections={sectionsList(companyId)}
            actions={isAllowed(ALLOW_CREATE) ? [
                {
                    children: 'Создать',
                    variant: 'accent',
                    as: 'link',
                    href: `/platform/${companyId}/cpm/new`
                }
            ] : undefined}
        />
        </>
    )
}
'use client';

import { PlatformFormBody, PlatformFormSection } from "@/app/platform/components/lib/form";
import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { usePermission } from "@/apps/permissions/hooks";
import { DaDataBlock } from "./dadata-block/block";

export default function Page() {
    // perms
    const ALLOW_PAGE = usePermission(PERMISSIONS.CPM_COUNTERPARTIES_CREATE);

    if (!ALLOW_PAGE.isLoading && !ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.CPM_COUNTERPARTIES_CREATE} />
    )

    return (
        <>
        <PlatformHead
            title='Создание контрагента'
            description="Автоматическая подстановка реквизитов из базы DaData."
        />
        <PlatformFormBody>
            <PlatformFormSection title='Поиск контрагента'>
                <DaDataBlock />
            </PlatformFormSection>
        </PlatformFormBody>
        </>
    )
}
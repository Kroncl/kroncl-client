'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import styles from './page.module.scss';
import Package from '@/assets/ui-kit/icons/package';
import { isAdminAllowed, useAdminLevel } from '@/apps/admin/auth/hook';
import { ADMIN_LEVEL_5 } from '@/apps/admin/auth/types';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const tariffCode = params.code as string;
    
    const ALLOW_PAGE = useAdminLevel(ADMIN_LEVEL_5);

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;
    
    if (!isAdminAllowed(ALLOW_PAGE)) return <PlatformError error="Доступ запрещён" />;

    return (
        <>
            <PlatformHead 
                title='Тариф'
                description={`Тарифный план [code: ${tariffCode}]`}
            />
            <div className={styles.grid}>

            </div>
        </>
    );
}
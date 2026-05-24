'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import styles from './page.module.scss';
import Package from '@/assets/ui-kit/icons/package';
import { isAdminAllowed, useAdminLevel } from '@/apps/admin/auth/hook';
import { ADMIN_LEVEL_1 } from '@/apps/admin/auth/types';
import { MediaHistoryChart } from './components/history-chart/chart';
import { MediaStatsBlock } from './components/summary-stats/block';

export default function Page() {
    const ALLOW_PAGE = useAdminLevel(ADMIN_LEVEL_1);

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;
    
    if (!isAdminAllowed(ALLOW_PAGE)) return <PlatformError error="Доступ запрещён" />;

    return (
        <>
            <PlatformHead 
                title='Объектное хранилище'
                description='Состояние объектного хранилища MinIO. Распределение по бакетам.'
                actions={[
                    {
                        children: 'Бакеты',
                        variant: 'light',
                        icon: <Package />,
                        as: 'link',
                        href: '/tech/object-storage/buckets'
                    }
                ]}
            />
            <div className={styles.grid}>
                <MediaStatsBlock className={styles.summaryBlock} />
                <MediaHistoryChart className={styles.historyBlock} />
            </div>
        </>
    );
}
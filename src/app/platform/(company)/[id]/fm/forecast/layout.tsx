'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import styles from './layout.module.scss';
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePermission } from '@/apps/permissions/hooks';
import { PERMISSIONS } from '@/apps/permissions/codes.config';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformNotAllowed } from '@/app/platform/components/lib/not-allowed/block';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import { DOCS_LINK_FM_FORECAST } from '@/app/docs/(v1)/internal.config';

export interface PlatformLayoutProps {
    children: React.ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
    const params = useParams();
    const companyId = params.id as string;
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const ALLOW_PAGE = usePermission(PERMISSIONS.FM_FORECAST);

    const [localStartDate, setLocalStartDate] = useState(searchParams.get('start_date') || '');
    const [localEndDate, setLocalEndDate] = useState(searchParams.get('end_date') || '');
    const [localHorizon, setLocalHorizon] = useState(searchParams.get('horizon') || '30');

    useEffect(() => {
        setLocalStartDate(searchParams.get('start_date') || '');
        setLocalEndDate(searchParams.get('end_date') || '');
        setLocalHorizon(searchParams.get('horizon') || '30');
    }, [searchParams]);

    const handleApply = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (localStartDate) {
            params.set('start_date', localStartDate);
        } else {
            params.delete('start_date');
        }
        if (localEndDate) {
            params.set('end_date', localEndDate);
        } else {
            params.delete('end_date');
        }
        if (localHorizon && localHorizon !== '30') {
            params.set('horizon', localHorizon);
        } else {
            params.delete('horizon');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;

    if (!ALLOW_PAGE.isLoading && !ALLOW_PAGE.allowed) {
        return <PlatformNotAllowed permission={PERMISSIONS.FM_FORECAST} />;
    }

    return (
        <>
            <PlatformHead
                title="Прогнозирование финансов"
                description="Прогноз состояния финансов на основании истории операций компании."
                docsEscort={{
                    href: DOCS_LINK_FM_FORECAST,
                    title: 'Подробнее о прогнозировании финансов'
                }}
            >
                <div className={styles.control}>
                    <Input
                        className={styles.input}
                        type="date"
                        placeholder="Начало периода"
                        value={localStartDate}
                        onChange={(e) => setLocalStartDate(e.target.value)}
                    />
                    <Input
                        className={styles.input}
                        type="date"
                        placeholder="Конец периода"
                        value={localEndDate}
                        onChange={(e) => setLocalEndDate(e.target.value)}
                    />
                    <Input
                        className={styles.input}
                        placeholder="Горизонт (дней)"
                        value={localHorizon}
                        onChange={(e) => setLocalHorizon(e.target.value)}
                    />
                    <Button className={styles.action} variant="accent" onClick={handleApply}>
                        Применить
                    </Button>
                </div>
            </PlatformHead>
            <div className={styles.grid}>{children}</div>
        </>
    );
}
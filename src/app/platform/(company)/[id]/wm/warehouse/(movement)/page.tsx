'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import Plus from "@/assets/ui-kit/icons/plus";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { sectionsList } from "../_sections";
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { StockBatch } from "@/apps/company/modules/wm/types";
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { PlatformPagination } from '@/app/platform/components/lib/pagination/pagination';
import { usePagination } from '@/apps/shared/pagination/hooks/usePagination';
import { useWm } from "@/apps/company/modules";
import clsx from "clsx";
import { PlatformEmptyCanvas } from "@/app/platform/components/lib/empty-canvas/canvas";
import TwoCards from "@/assets/ui-kit/icons/two-cards";
import { isAllowed, usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformError } from "@/app/platform/components/lib/error/block";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { DOCS_LINK_WM } from "@/app/docs/(v1)/internal.config";
import { BatchCard } from "./components/batch-card/card";

export default function MovementPage() {
    const params = useParams();
    const companyId = params.id as string;

    const wmModule = useWm();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_STOCKS_BATCHES);

    const [batches, setBatches] = useState<StockBatch[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { handlePageChange } = usePagination({
        baseUrl: pathname,
        defaultLimit: 20,
    });

    useEffect(() => {
        if (ALLOW_PAGE.isLoading || !ALLOW_PAGE.allowed) return;
        loadData();
    }, [searchParams, ALLOW_PAGE.isLoading, ALLOW_PAGE.allowed]);

    async function loadData() {
        setLoading(true);
        setError(null);
        try {
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '20');
            const search = searchParams.get('search') || undefined;
            const direction = searchParams.get('direction') as any;
            const status = searchParams.get('status') as any;

            const res = await wmModule.getStockBatches({
                page,
                limit,
                search,
                direction,
                status,
            });

            if (res.status) {
                setBatches(res.data.batches);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        } finally {
            setLoading(false);
        }
    }

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;

    if (!isAllowed(ALLOW_PAGE)) return (
        <PlatformNotAllowed permission={PERMISSIONS.WM_STOCKS_BATCHES} />
    );

    if (loading) return <PlatformLoading />;

    if (error) return <PlatformError error={error} />;

    const queryParams: Record<string, string> = {};
    const limitParam = searchParams.get('limit');
    if (limitParam) queryParams.limit = limitParam;
    const searchParam = searchParams.get('search');
    if (searchParam) queryParams.search = searchParam;
    const directionParam = searchParams.get('direction');
    if (directionParam) queryParams.direction = directionParam;
    const statusParam = searchParams.get('status');
    if (statusParam) queryParams.status = statusParam;

    return (
        <>
            <PlatformHead
                title='Поставки & Отгрузки'
                description="Управление поставками и отгрузками. Движение товаров."
                sections={sectionsList(companyId)}
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе'
                }}
                actions={[
                    {
                        children: 'Поставка',
                        variant: 'accent',
                        as: 'link',
                        href: `/platform/${companyId}/wm/new?type=supply`
                    },
                    {
                        children: 'Отгрузка',
                        variant: 'contrast',
                        as: 'link',
                        href: `/platform/${companyId}/wm/new?type=shipment`
                    }
                ]}
                showSearch={true}
            />

            {batches.length === 0 ? (
                <PlatformEmptyCanvas
                    title='Поставок и отгрузок пока нет.'
                    icon={<TwoCards />}
                />
            ) : (
                <>
                    <div className={styles.grid}>
                        {batches.map(b => (
                            <BatchCard
                                key={b.id}
                                batch={b}
                                className={styles.item}
                            />
                        ))}
                    </div>

                    {pagination && pagination.pages > 1 && (
                        <div className={styles.pagination}>
                            <PlatformPagination
                                meta={pagination}
                                baseUrl={pathname}
                                queryParams={queryParams}
                                onPageChange={(page) => handlePageChange(page)}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
}
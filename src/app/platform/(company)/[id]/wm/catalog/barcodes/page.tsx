'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import Plus from "@/assets/ui-kit/icons/plus";
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation";
import { sectionsList } from "../_sections";
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { Barcode } from "@/apps/company/modules/wm/types";
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
import { BarcodeCard } from "./components/barcode-card/card";

export default function BarcodesPage() {
    const params = useParams();
    const companyId = params.id as string;

    const wmModule = useWm();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_BARCODES);
    const ALLOW_BARCODE_CREATE = usePermission(PERMISSIONS.WM_BARCODES_CREATE);

    const [barcodes, setBarcodes] = useState<Barcode[]>([]);
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

    const handleSearch = (searchValue: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (searchValue.trim()) {
            params.set('search', searchValue);
            params.set('page', '1');
        } else {
            params.delete('search');
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    async function loadData() {
        setLoading(true);
        setError(null);
        try {
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '20');
            const search = searchParams.get('search') || undefined;
            const catalogUnitId = searchParams.get('catalog_unit_id') || undefined;

            const res = await wmModule.getBarcodes({
                page,
                limit,
                search,
                catalog_unit_id: catalogUnitId,
            });

            if (res.status) {
                setBarcodes(res.data.barcodes);
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
        <PlatformNotAllowed permission={PERMISSIONS.WM_BARCODES} />
    );

    if (loading) return <PlatformLoading />;

    if (error) return <PlatformError error={error} />;

    const queryParams: Record<string, string> = {};
    const limitParam = searchParams.get('limit');
    if (limitParam) queryParams.limit = limitParam;
    const searchParam = searchParams.get('search');
    if (searchParam) queryParams.search = searchParam;
    const catalogUnitIdParam = searchParams.get('catalog_unit_id');
    if (catalogUnitIdParam) queryParams.catalog_unit_id = catalogUnitIdParam;

    return (
        <>
            <PlatformHead
                title='Баркоды'
                description="Словарь штрихкодов. Связь внешних кодов с товарными позициями."
                sections={sectionsList(companyId)}
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе'
                }}
                actions={isAllowed(ALLOW_BARCODE_CREATE) ? [
                    {
                        children: 'Новый баркод',
                        icon: <Plus />,
                        variant: 'accent',
                        as: 'link',
                        href: `/platform/${companyId}/wm/catalog/barcodes/new`
                    }
                ] : undefined}
                showSearch={true}
                searchProps={{
                    placeholder: 'Поиск по баркоду или производителю...',
                    defaultValue: searchParams.get('search') || '',
                    onSearch: handleSearch,
                }}
            />

            {!barcodes ? (
                <PlatformEmptyCanvas
                    title='Баркодов пока нет.'
                    icon={<TwoCards />}
                />
            ) : (
                <>
                    <div className={styles.grid}>
                        {barcodes.map(b => (
                            <BarcodeCard
                                key={b.id}
                                barcode={b}
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
'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation";
import { sectionsList } from "../_sections";
import { isAllowed, usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import styles from './page.module.scss';
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { CounterpartyCard } from "../components/counterparty-card/card";
import { PlatformEmptyCanvas } from "@/app/platform/components/lib/empty-canvas/canvas";
import { PlatformPagination } from "@/app/platform/components/lib/pagination/pagination";
import { usePagination } from "@/apps/shared/pagination/hooks/usePagination";
import { useCpm } from "@/apps/company/modules";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformError } from "@/app/platform/components/lib/error/block";
import { CounterpartiesResponse, Counterparty } from "@/apps/company/modules/cpm/types";
import { useEffect, useState } from "react";
import Plus from "@/assets/ui-kit/icons/plus";

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const cpmModule = useCpm();
    const { handlePageChange } = usePagination({ baseUrl: pathname, defaultLimit: 20 });

    const ALLOW_PAGE = usePermission(PERMISSIONS.CPM);
    const ALLOW_CREATE = usePermission(PERMISSIONS.CPM_COUNTERPARTIES_CREATE);

    const [data, setData] = useState<CounterpartiesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        loadData();
    }, [searchParams]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '20');
            const search = searchParams.get('search') || undefined;
            const type = searchParams.get('type') as any;
            const status = searchParams.get('status') as any;

            const response = await cpmModule.getCounterparties({ page, limit, search, type, status });
            if (response.status) {
                setData(response.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка загрузки");
            console.error('Error loading counterparties:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || ALLOW_PAGE.isLoading) return <PlatformLoading />;
    if (error) return <PlatformError error={error} />;
    if (!ALLOW_PAGE.isLoading && !ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.CPM} />
    );

    const counterparties = data?.counterparties || [];
    const pagination = data?.pagination;

    const queryParams: Record<string, string> = {};
    const limitParam = searchParams.get('limit');
    if (limitParam) queryParams.limit = limitParam;
    const searchParam = searchParams.get('search');
    if (searchParam) queryParams.search = searchParam;
    const typeParam = searchParams.get('type');
    if (typeParam) queryParams.type = typeParam;
    const statusParam = searchParams.get('status');
    if (statusParam) queryParams.status = statusParam;

    return (
        <>
        <PlatformHead
            title='Контрагенты'
            description="Управление контрагентами — ИП, банки, физические лица."
            sections={sectionsList(companyId)}
            actions={isAllowed(ALLOW_CREATE) ? [
                {
                    icon: <Plus />,
                    children: 'Создать',
                    variant: 'accent',
                    as: 'link',
                    href: `/platform/${companyId}/cpm/new`
                }
            ] : undefined}
            searchProps={{
                placeholder: 'Поиск по контрагентам',
                defaultValue: searchParams.get('search') || '',
                onSearch: handleSearch
            }}
            showSearch
        />
        {counterparties.length === 0 ? (
            <PlatformEmptyCanvas title='Список контрагентов пуст.' />
        ) : (
            <>
            <div className={styles.grid}>
                {counterparties.map((cp: Counterparty) => (
                    <CounterpartyCard
                        key={cp.id}
                        className={styles.item}
                        counterparty={cp}
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
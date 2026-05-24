'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import styles from './page.module.scss';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isAllowed, usePermission } from '@/apps/permissions/hooks';
import { PERMISSIONS } from '@/apps/permissions/codes.config';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformNotAllowed } from '@/app/platform/components/lib/not-allowed/block';
import { DocCard } from '../../docs/components/doc-card/card';
import { PlatformPagination } from '@/app/platform/components/lib/pagination/pagination';
import { usePagination } from '@/apps/shared/pagination/hooks/usePagination';
import { PlatformEmptyCanvas } from '@/app/platform/components/lib/empty-canvas/canvas';
import { useEffect, useState } from 'react';
import { CompanyApi } from '@/apps/company/api';
import { docsModule } from '@/apps/company/modules/docs/api';
import { Doc, DocsResponse } from '@/apps/company/modules/docs/types';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import Folder from '@/assets/ui-kit/icons/folder';
import { sectionsList } from '../_sections';
import { DOCS_LINK_DM_INVOICES } from '@/app/docs/(v1)/internal.config';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    const docs = docsModule(companyApi);
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { handlePageChange } = usePagination({
        baseUrl: pathname,
        defaultLimit: 20
    });

    const ALLOW_PAGE = usePermission(PERMISSIONS.DOCS);
    
    const [data, setData] = useState<DocsResponse | null>(null);
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

            // Фильтр по модулю dm
            const response = await docs.getDocs({
                page,
                limit,
                search,
                module: 'dm'
            });
            
            if (response.status) {
                setData(response.data);
            } else {
                setError(response.message || 'Ошибка загрузки');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка загрузки");
            console.error('Error loading docs:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || ALLOW_PAGE.isLoading) return (
        <PlatformLoading />
    );
    
    if (error) return (
        <PlatformError error={error} />
    );

    if (!isAllowed(ALLOW_PAGE)) return (
        <PlatformNotAllowed permission={PERMISSIONS.DOCS} />
    )

    const docsList = data?.docs || [];
    const pagination = data?.pagination;

    const queryParams: Record<string, string> = {};
    const limitParam = searchParams.get('limit');
    if (limitParam) queryParams.limit = limitParam;
    const searchParam = searchParams.get('search');
    if (searchParam) queryParams.search = searchParam;

    return (
        <>
            <PlatformHead
                title='Документы сделок'
                description='Накладные, счета и другие документы по сделкам.'
                searchProps={{
                    placeholder: 'Поиск по документам',
                    defaultValue: searchParams.get('search') || '',
                    onSearch: handleSearch
                }}
                sections={sectionsList(companyId)}
                showSearch={true}
                docsEscort={{
                    href: DOCS_LINK_DM_INVOICES,
                    title: 'Подробнее о накладных'
                }}
            />
            {docsList.length === 0 ? (
                <PlatformEmptyCanvas 
                    title='Документов пока нет'
                    description='Здесь будут появляться сгенерированные документы по сделкам.'
                    icon={<Folder />}
                />
            ) : (
                <>
                    <div className={styles.grid}>
                        {docsList.map((doc: Doc) => (
                            <DocCard key={doc.id} doc={doc} className={styles.item} />
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
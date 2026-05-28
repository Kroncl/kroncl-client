'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformPagination } from '@/app/platform/components/lib/pagination/pagination';
import { PlatformEmptyCanvas } from '@/app/platform/components/lib/empty-canvas/canvas';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import { usePagination } from '@/apps/shared/pagination/hooks/usePagination';
import { adminMediaApi } from '@/apps/admin/media/api';
import { BucketInfo, GetBucketsResponse } from '@/apps/admin/media/types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { BucketCard } from '../components/bucket-card/card';
import { isAdminAllowed, useAdminLevel } from '@/apps/admin/auth/hook';
import { ADMIN_LEVEL_1 } from '@/apps/admin/auth/types';

export default function BucketsPage() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { handlePageChange } = usePagination({
        baseUrl: pathname,
        defaultLimit: 20
    });

    const { allowed: isAdmin, isLoading: adminLoading } = useAdminLevel(ADMIN_LEVEL_1);
    const [data, setData] = useState<GetBucketsResponse | null>(null);
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
        if (!isAdmin) return;
        loadBuckets();
    }, [searchParams, isAdmin]);

    const loadBuckets = async () => {
        setLoading(true);
        setError(null);
        try {
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '20');
            const search = searchParams.get('search') || undefined;

            const response = await adminMediaApi.getBuckets({
                page,
                limit,
                search,
            });
            
            if (response.status && response.data) {
                setData(response.data);
            } else {
                setError('Не удалось загрузить список бакетов');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка загрузки");
            console.error('Error loading buckets:', err);
        } finally {
            setLoading(false);
        }
    };

    if (adminLoading || loading) return <PlatformLoading />;
    
    if (error) return <PlatformError error={error} />;

    if (!isAdmin) return <PlatformError error="Доступ запрещён" />;

    const buckets = data?.buckets || [];
    const pagination = data?.pagination;

    const queryParams: Record<string, string> = {};
    const limitParam = searchParams.get('limit');
    if (limitParam) queryParams.limit = limitParam;
    const searchParam = searchParams.get('search');
    if (searchParam) queryParams.search = searchParam;

    return (
        <>
            <PlatformHead
                title='Бакеты'
                description='Бакеты объектного хранилища MinIO.'
                searchProps={{
                    placeholder: 'Поиск по названию бакета',
                    defaultValue: searchParams.get('search') || '',
                    onSearch: handleSearch
                }}
                showSearch
            />
            {buckets.length === 0 ? (
                <PlatformEmptyCanvas 
                    title='Бакеты не найдены'
                    description={searchParams.get('search') ? 'Попробуйте изменить поисковый запрос' : 'Бакетов пока нет'}
                />
            ) : (
                <>
                    <div className={styles.container}>
                        {buckets.map((bucket: BucketInfo) => (
                            <BucketCard 
                                key={bucket.name} 
                                bucket={bucket} 
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
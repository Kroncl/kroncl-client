'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import styles from './page.module.scss';
import { isAdminAllowed, useAdminLevel } from '@/apps/admin/auth/hook';
import { ADMIN_LEVEL_1 } from '@/apps/admin/auth/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminMediaApi } from '@/apps/admin/media/api';
import { BucketInfo } from '@/apps/admin/media/types';
import { ActionsBlock } from '@/app/tech/components/actions-block/block';
import { FieldsBlock } from '@/app/tech/components/fields-block/block';
import { formatDateTime } from '@/assets/utils/date';

export default function Page() {
    const params = useParams();
    const bucketId = params.id as string;
    
    const ALLOW_PAGE = useAdminLevel(ADMIN_LEVEL_1);
    const [bucket, setBucket] = useState<BucketInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!ALLOW_PAGE.allowed) return;
        
        const loadBucket = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await adminMediaApi.getBucket(bucketId);
                if (response.status && response.data) {
                    setBucket(response.data);
                } else {
                    setError(response.message || 'Не удалось загрузить информацию о бакете');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Ошибка загрузки");
                console.error('Error loading bucket:', err);
            } finally {
                setLoading(false);
            }
        };

        loadBucket();
    }, [bucketId, ALLOW_PAGE.allowed]);

    if (ALLOW_PAGE.isLoading || loading) return <PlatformLoading />;
    
    if (error) return <PlatformError error={error} />;

    if (!ALLOW_PAGE.allowed) return <PlatformError error="Доступ запрещён" />;

    if (!bucket) return <PlatformError error="Бакет не найден" />;

    const formatSize = (sizeMb: number): string => {
        if (sizeMb >= 1024) {
            return `${(sizeMb / 1024).toFixed(2)} ГБ`;
        }
        return `${sizeMb.toFixed(2)} МБ`;
    };

    const bucketType = bucket.is_public ? 'Публичный' : bucket.is_temp ? 'Временный' : bucket.is_tenant ? 'Арендный' : 'Другое';

    const bucketFields = [
        { label: 'ID бакета', value: bucket.name },
        { label: 'Тип', value: bucketType },
        { label: 'Размер', value: formatSize(bucket.size_mb) },
        { label: 'Количество объектов', value: bucket.objects_count.toLocaleString() },
        { label: 'Дата создания', value: formatDateTime(bucket.creation_date) },
        ...(bucket.is_tenant && bucket.tenant_id ? [{ label: 'ID тенанта', value: bucket.tenant_id }] : [])
    ];

    return (
        <>
            <PlatformHead 
                title={`Бакет ${bucketId}`}
                description='Состояние бакета объектного хранилища.'
            />
            <div className={styles.container}>
                <FieldsBlock
                    className={styles.fields}
                    fields={bucketFields}
                />
            </div>
        </>
    );
}
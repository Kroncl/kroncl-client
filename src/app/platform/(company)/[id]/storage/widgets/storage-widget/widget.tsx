'use client';

import clsx from 'clsx';
import styles from './widget.module.scss';
import { Remained } from '@/assets/ui-kit/remained/remained';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { storageDbModule } from '@/apps/company/modules/storage/db/api';
import { storageMediaModule } from '@/apps/company/modules/storage/media/api';
import { formatSize } from '@/assets/utils/size';
import { useCompany } from '@/apps/company/provider';
import { PERMISSIONS } from '@/apps/permissions/codes.config';
import { usePermission } from '@/apps/permissions/hooks';
import { CompanyApi } from '@/apps/company/api';
import { MixedRemained } from '@/assets/ui-kit/mixed-remained/remained';

export interface StorageWidgetProps {
    className?: string;
    variant?: 'compact' | 'default';
}

export function StorageWidget({
    className,
    variant = 'default'
}: StorageWidgetProps) {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    
    const storageDb = storageDbModule(companyApi);
    const storageMedia = storageMediaModule(companyApi);
    
    const companyContext = useCompany();

    const ALLOW_DB = usePermission(PERMISSIONS.STORAGE_DB_SOURCES);
    const ALLOW_MEDIA = usePermission(PERMISSIONS.STORAGE_MEDIA);
    
    const { data: sourcesData, isLoading: dbLoading } = storageDb.useSources(companyId);
    const { data: mediaData, isLoading: mediaLoading } = storageMedia.useBucketStats(companyId);
    
    const sources = sourcesData?.status ? sourcesData.data : null;
    const mediaStats = mediaData?.status ? mediaData.data : null;
    
    const loading = dbLoading || mediaLoading;
    
    // DB лимиты
    const limitDbMb = companyContext.companyPlan?.current_plan.limit_db_mb || 0;
    const usedDbMb = sources?.total_size_mb || 0;
    const isExceedLimitDb = limitDbMb < usedDbMb;
    const usagePercent = limitDbMb > 0 ? (usedDbMb / limitDbMb) * 100 : 0;
    
    // Media лимиты
    const limitMediaMb = companyContext.companyPlan?.current_plan.limit_objects_mb || 0;
    const usedMediaMb = mediaStats?.size_mb || 0;
    const isExceedMediaMb = limitMediaMb < usedMediaMb;
    const mediaMbUsagePercent = limitMediaMb > 0 ? (usedMediaMb / limitMediaMb) * 100 : 0;
    
    // Objects лимиты
    const limitObjects = companyContext.companyPlan?.current_plan.limit_objects_count || 0;
    const usedObjects = mediaStats?.object_count || 0;
    const isExceedObjects = limitObjects < usedObjects;
    const objectsUsagePercent = limitObjects > 0 ? (usedObjects / limitObjects) * 100 : 0;
    
    return (
        <Link href={`/platform/${companyId}/storage`} className={clsx(styles.widget, styles[variant], className)}>
            {variant === 'default' && (
                <>
                    <div className={styles.title}>
                        Использование хранилища
                    </div>
                    {isExceedLimitDb && (<div className={styles.exceed}>Превышение лимита БД</div>)}
                    {isExceedMediaMb && (<div className={styles.exceed}>Превышение лимита объёма файлов</div>)}
                    {isExceedObjects && (<div className={styles.exceed}>Превышение лимита количества файлов</div>)}
                    
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>База данных</div>
                        <Remained value={usagePercent} limit={100} loading={loading}>
                            {loading ? '-- из -- МБ' : `${formatSize(usedDbMb)} из ${formatSize(limitDbMb)}`}
                        </Remained>
                        <div className={styles.counters}>
                            <div className={styles.item}>
                                {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                                    <div className={styles.value}>
                                        {sources?.total_size_mb.toFixed(0) || 0} <span className={styles.secondary}>МБ</span>
                                    </div>
                                )}
                                <div className={styles.label}>Размер БД</div>
                            </div>
                            <div className={styles.item}>
                                {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                                    <div className={styles.value}>
                                        {sources?.total_rows?.toLocaleString('ru-RU') || 0}
                                    </div>
                                )}
                                <div className={styles.label}>Всего строк</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.divider} />
                    
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Файловое хранилище</div>
                        <Remained value={mediaMbUsagePercent} limit={100} loading={loading}>
                            {loading ? '-- из -- МБ' : `${formatSize(usedMediaMb)} из ${formatSize(limitMediaMb)}`}
                        </Remained>
                        <br />
                        <Remained value={objectsUsagePercent} limit={100} loading={loading}>
                            {loading ? '-- из -- шт' : `${usedObjects.toLocaleString('ru-RU')} из ${limitObjects.toLocaleString('ru-RU')} шт`}
                        </Remained>
                        <div className={styles.counters}>
                            <div className={styles.item}>
                                {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                                    <div className={styles.value}>
                                        {mediaStats?.size_mb.toFixed(0) || 0} <span className={styles.secondary}>МБ</span>
                                    </div>
                                )}
                                <div className={styles.label}>Объём файлов</div>
                            </div>
                            <div className={styles.item}>
                                {loading ? (<div className={clsx(styles.value, styles.loading)} />) : (
                                    <div className={styles.value}>
                                        {mediaStats?.object_count?.toLocaleString('ru-RU') || 0}
                                    </div>
                                )}
                                <div className={styles.label}>Количество файлов</div>
                            </div>
                        </div>
                    </div>
                    
                    <span className={styles.mark} />
                </>
            )}
            {variant === 'compact' && (
                <>
                    {(isExceedLimitDb || isExceedMediaMb || isExceedObjects) && (<div className={styles.exceed}>Превышение лимита</div>)}
                    <MixedRemained
                        segments={[
                            {
                                value: usedDbMb,
                                limit: limitDbMb,
                                label: 'База данных',
                                color: 'var(--color-accent)'
                            },
                            {
                                value: usedMediaMb,
                                limit: limitMediaMb,
                                label: 'Объём файлов',
                                color: 'var(--color-accent)'
                            },
                            {
                                value: usedObjects,
                                limit: limitObjects,
                                label: 'Количество файлов',
                                color: 'var(--color-accent)'
                            }
                        ]}
                        loading={loading}
                    >
                        {loading ? '' : `Использование диска`}
                    </MixedRemained>
                </>
            )}
        </Link>
    );
}
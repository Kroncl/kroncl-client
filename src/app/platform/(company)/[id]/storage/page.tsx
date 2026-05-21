'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import styles from './page.module.scss';
import { isAllowed, usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { DOCS_LINK_COMPANIES_STORAGE } from "@/app/docs/(v1)/internal.config";
import { useCompany } from "@/apps/company/provider";
import { Remained } from "@/assets/ui-kit/remained/remained";
import clsx from "clsx";
import { PlatformError } from "@/app/platform/components/lib/error/block";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/assets/ui-kit/button/button";
import { ModulesChart } from "./components/modules-chart/chart";
import { CompanyApi } from "@/apps/company/api";
import { storageDbModule } from "@/apps/company/modules/storage/db/api";
import { storageMediaModule } from "@/apps/company/modules/storage/media/api";
import { formatSize } from "@/assets/utils/size";

export default function StoragePage() {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    const storageDb = storageDbModule(companyApi);
    const storageMedia = storageMediaModule(companyApi);

    const ALLOW_STORAGE = usePermission(PERMISSIONS.STORAGE);
    const ALLOW_DB = usePermission(PERMISSIONS.STORAGE_DB_SOURCES);
    const ALLOW_MEDIA = usePermission(PERMISSIONS.STORAGE_MEDIA);
    const companyContext = useCompany();
    
    const { data: sourcesData, isLoading: sourcesLoading, error: sourcesError } = storageDb.useSources(companyId);
    const { data: modulesData, isLoading: modulesLoading, error: modulesError } = storageDb.useModules(companyId);
    const { data: mediaData, isLoading: mediaLoading, error: mediaError } = storageMedia.useBucketStats(companyId);
    
    const sources = sourcesData?.status ? sourcesData.data : null;
    const modules = modulesData?.status ? modulesData.data : null;
    const mediaStats = mediaData?.status ? mediaData.data : null;
    
    const loading = sourcesLoading || modulesLoading || mediaLoading;
    const error = sourcesError?.message || modulesError?.message || mediaError?.message || null;

    if (loading) {
        return <PlatformLoading />;
    }

    if (error) {
        return <PlatformError error={error} />;
    }

    if (!isAllowed(ALLOW_STORAGE)) {
        return <PlatformNotAllowed permission={PERMISSIONS.STORAGE} />;
    }
    
    const showDb = isAllowed(ALLOW_DB);
    const showMedia = isAllowed(ALLOW_MEDIA);

    if (!showDb && !showMedia) {
        return <PlatformNotAllowed permission={PERMISSIONS.STORAGE_DB_SOURCES} />;
    }
    
    // DB лимиты
    const limitDbMb = companyContext.companyPlan?.current_plan.limit_db_mb || 0;
    const usedDbMb = sources?.total_size_mb || 0;
    const isExceedLimitDb = limitDbMb < usedDbMb;
    const usagePercent = limitDbMb > 0 ? (usedDbMb / limitDbMb) * 100 : 0;
    
    // Media лимиты
    const limitMediaMb = companyContext.companyPlan?.current_plan.limit_objects_mb || 0;
    const usedMediaMb = mediaStats?.size_mb || 0;
    const isExceedMediaMb = limitMediaMb < usedMediaMb;
    const mediaUsagePercent = limitMediaMb > 0 ? (usedMediaMb / limitMediaMb) * 100 : 0;
    
    // Objects лимиты
    const limitObjects = companyContext.companyPlan?.current_plan.limit_objects_count || 0;
    const usedObjects = mediaStats?.object_count || 0;
    const isExceedObjects = limitObjects < usedObjects;
    const objectsUsagePercent = limitObjects > 0 ? (usedObjects / limitObjects) * 100 : 0;
    
    const modulesList = modules?.modules ? Object.values(modules.modules) : [];
    
    return (
        <>
            <PlatformHead
                title='Ресурсы хранилища'
                description="Системная информация о ресурсах хранилища организации."
                docsEscort={{
                    href: DOCS_LINK_COMPANIES_STORAGE,
                    title: 'Подробнее о хранилище организации'
                }}
            />
            <div className={styles.grid}>
                {/* Объектное хранилище */}
                {showMedia && (
                    <>
                        <div className={styles.head}>
                            <div className={styles.title}>Объектное хранилище</div>
                            <div className={styles.description}>Файлы организации, включая отчёты модулей.</div>
                        </div>
                        
                        {limitMediaMb > 0 && (
                            <Remained 
                                className={styles.remained} 
                                value={mediaUsagePercent} 
                                limit={100}
                            >
                                {formatSize(usedMediaMb)} из {formatSize(limitMediaMb)}{' '}
                                <Link href={`/platform/${companyId}/pricing`} className={styles.hint}>лимит текущего тарифа</Link>
                            </Remained>
                        )}
                        
                        {limitObjects > 0 && (
                            <Remained 
                                className={styles.remained} 
                                value={objectsUsagePercent} 
                                limit={100}
                            >
                                {usedObjects.toLocaleString('ru-RU')} из {limitObjects.toLocaleString('ru-RU')} шт{' '}
                                <Link href={`/platform/${companyId}/pricing`} className={styles.hint}>лимит текущего тарифа</Link>
                            </Remained>
                        )}

                        {(isExceedMediaMb || isExceedObjects) && (
                            <div className={styles.exceed}>
                                <div className={styles.info}>
                                    <div className={styles.title}>Превышение лимита</div>
                                    <div className={styles.description}>Превышение лимита объектного хранилища организации. Для предотвращения блокировки организации рекомендуем выполнить одно из предложенных действий.</div>
                                    <Link href={`/platform/${companyId}/pricing`} className={styles.item}>Улучшите тарифный план</Link>
                                </div>
                                <div className={styles.actions}>
                                    <Button
                                        href={`/platform/${companyId}/pricing`}
                                        as='link'
                                        variant="accent" 
                                        children='Сменить тариф'
                                        className={styles.action} />
                                </div>
                            </div>
                        )}
                        
                        <div className={styles.counters}>
                            <section className={clsx(styles.item, styles.lg)}>
                                <div className={styles.value}>
                                    {mediaStats?.size_mb.toFixed(2)} <span className={styles.secondary}>МБ</span>
                                </div>
                                <div className={styles.label}>Общий объём файлов</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {mediaStats?.object_count.toLocaleString('ru-RU') || 0}
                                </div>
                                <div className={styles.label}>Количество файлов</div>
                            </section>
                        </div>

                        <div className={styles.divider} />
                    </>
                )}

                {/* База данных */}
                {showDb && (
                    <>
                        <div className={styles.head}>
                            <div className={styles.title}>База данных</div>
                            <div className={styles.description}>Хранилище данных (база данных организации) используется для хранения текстовых данных модулей.</div>
                        </div>
                        
                        {limitDbMb > 0 && (
                            <Remained 
                                className={styles.remained} 
                                value={usagePercent} 
                                limit={100}
                            >
                                {formatSize(usedDbMb)} из {formatSize(limitDbMb)}{' '}
                                <Link href={`/platform/${companyId}/pricing`} className={styles.hint}>лимит текущего тарифа</Link>
                            </Remained>
                        )}

                        {isExceedLimitDb && (
                            <div className={styles.exceed}>
                                <div className={styles.info}>
                                    <div className={styles.title}>Превышение лимита</div>
                                    <div className={styles.description}>Превышение лимита хранилища данных организации. Для предотвращения блокировки организации рекомендуем выполнить одно из предложенных действий.</div>
                                    <Link href={`/platform/${companyId}/activity`} className={styles.item}>Оптимизируйте логи действий</Link>
                                    <Link href={`/platform/${companyId}/pricing`} className={styles.item}>Улучшите тарифный план</Link>
                                </div>
                                <div className={styles.actions}>
                                    <Button
                                        href={`/platform/${companyId}/pricing`}
                                        as='link'
                                        variant="accent" 
                                        children='Сменить тариф'
                                        className={styles.action} />
                                </div>
                            </div>
                        )}
                        
                        <div className={styles.counters}>
                            <section className={clsx(styles.item, styles.lg)}>
                                <div className={styles.value}>
                                    {sources?.total_size_mb.toFixed(2)} <span className={styles.secondary}>МБ</span>
                                </div>
                                <div className={styles.label}>Общий размер базы данных</div>
                            </section>
                            <section className={clsx(styles.item)}>
                                <div className={styles.value}>
                                    {sources?.table_size_mb.toFixed(2)} <span className={styles.secondary}>МБ</span>
                                </div>
                                <div className={styles.label}>Данные таблиц</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {sources?.index_size_mb.toFixed(2)} <span className={styles.secondary}>МБ</span>
                                </div>
                                <div className={styles.label}>Индексы</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {sources?.toast_size_mb.toFixed(2)} <span className={styles.secondary}>МБ</span>
                                </div>
                                <div className={styles.label}>TOAST</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {sources?.total_rows.toLocaleString('ru-RU')}
                                </div>
                                <div className={styles.label}>Всего строк</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {sources?.dead_rows.toLocaleString('ru-RU')}
                                </div>
                                <div className={styles.label}>Мёртвых строк</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {sources?.table_count}
                                </div>
                                <div className={styles.label}>Таблиц</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {sources?.index_count}
                                </div>
                                <div className={styles.label}>Индексов</div>
                            </section>
                            <section className={styles.item}>
                                <div className={styles.value}>
                                    {sources?.active_connections}
                                </div>
                                <div className={styles.label}>Активных соединений</div>
                            </section>
                        </div>

                        <div className={styles.head}>
                            <div className={styles.title}>Использование хранилища данных по модулям</div>
                            <div className={styles.description}>Распределение хранилища между модулями платформы.</div>
                        </div>

                        <div className={styles.chart}>
                            <div className={styles.container}>
                                <ModulesChart modules={modulesList} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { useParams } from "next/navigation";
import styles from './page.module.scss';
import { usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { PlatformError } from "@/app/platform/components/lib/error/block";
import { DOCS_LINK_WM } from "@/app/docs/(v1)/internal.config";
import { useCallback, useEffect, useState } from "react";
import { useWm } from "@/apps/company/modules";
import { StockBatch, StockBatchStatus } from "@/apps/company/modules/wm/types";
import { StatusBlock } from "../new/components/status-block/block";
import { BatchInfoBlock } from "../new/components/batch-info/block";
import { shortenId } from "@/assets/utils/ids";
import { useMessage } from "@/app/platform/components/lib/message/provider";
import { PlatformModal } from "@/app/platform/components/lib/modal/modal";
import { PlatformModalConfirmation } from "@/app/platform/components/lib/modal/confirmation/confirmation";
import { PositionsBlock } from "./positions-block/block";
import { PrintBlock } from "./print-block/block";

export default function BatchPage() {
    const params = useParams();
    const companyId = params.id as string;
    const batchId = params.batchId as string;

    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_STOCKS_BATCHES);
    const ALLOW_UPDATE = usePermission(PERMISSIONS.WM_STOCKS_BATCHES_CREATE);

    const wmModule = useWm();
    const { showMessage } = useMessage();

    const [batch, setBatch] = useState<StockBatch | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState<StockBatchStatus | null>(null);

    useEffect(() => {
        if (!batchId) return;

        let cancelled = false;
        setLoading(true);
        setError(null);
        setNotFound(false);

        wmModule.getStockBatch(batchId)
            .then(res => {
                if (cancelled) return;
                if (res.status) {
                    setBatch(res.data);
                } else {
                    setNotFound(true);
                }
            })
            .catch(err => {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : 'Ошибка загрузки');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [batchId]);

    const handleUpdateStatus = useCallback(async (status: StockBatchStatus) => {
        setIsUpdating(true);
        try {
            const response = await wmModule.updateStockBatchStatus(batchId, { status });

            if (response.status) {
                setBatch(response.data);
                showMessage({
                    label: status === 'labeled'
                        ? 'Этикетки отмечены как наклеенные'
                        : status === 'confirmed'
                            ? 'Документ подтверждён'
                            : 'Документ отменён',
                    variant: 'success',
                });
                setConfirmStatus(null);
            } else {
                throw new Error(response.message || 'Ошибка обновления');
            }
        } catch (err: any) {
            showMessage({
                label: err.message || 'Не удалось обновить статус',
                variant: 'error',
            });
        } finally {
            setIsUpdating(false);
        }
    }, [batchId, wmModule, showMessage]);

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;

    if (!ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.WM_STOCKS_BATCHES} />
    );

    if (loading) return <PlatformLoading />;

    if (notFound) return <PlatformError error='Документ не найден' />;

    if (error || !batch) return (
        <PlatformError error={error || 'Не удалось загрузить документ'} />
    );

    const isIncome = batch.direction === 'income';

    // действия по статусу
    const actions = [];

    if (ALLOW_UPDATE.allowed) {
        // основной шаг
        if (batch.status === 'draft') {
            if (isIncome) {
                actions.push({
                    children: 'Этикетки наклеены',
                    variant: 'accent' as const,
                    onClick: () => setConfirmStatus('labeled'),
                    disabled: isUpdating,
                });
            } else {
                actions.push({
                    children: 'Подтвердить отгрузку',
                    variant: 'accent' as const,
                    onClick: () => setConfirmStatus('confirmed'),
                    disabled: isUpdating,
                });
            }
        }

        if (batch.status === 'labeled') {
            actions.push({
                children: 'Подтвердить поставку',
                variant: 'accent' as const,
                onClick: () => setConfirmStatus('confirmed'),
                disabled: isUpdating,
            });
        }

        // отмена — доступна везде, кроме confirmed и cancelled
        if (batch.status !== 'confirmed' && batch.status !== 'cancelled') {
            actions.push({
                children: 'Отменить документ',
                variant: 'light' as const,
                onClick: () => setConfirmStatus('cancelled'),
                disabled: isUpdating,
            });
        }
    }

    // тексты модалки
    const confirmTitle =
        confirmStatus === 'labeled'
            ? 'Этикетки наклеены?'
            : confirmStatus === 'confirmed'
                ? (isIncome ? 'Подтвердить поставку?' : 'Подтвердить отгрузку?')
                : confirmStatus === 'cancelled'
                    ? 'Отменить документ?'
                    : '';

    const confirmDescription =
        confirmStatus === 'labeled'
            ? 'Все этикетки товарных позиций напечатаны и наклеены. После этого шага можно подтвердить поставку.'
            : confirmStatus === 'confirmed'
                ? (isIncome
                    ? 'Товары будут приняты на склад. Отменить это действие нельзя.'
                    : 'Товары будут списаны со склада. Отменить это действие нельзя.')
                : confirmStatus === 'cancelled'
                    ? 'Документ будет отменён. Отменить это действие нельзя.'
                    : '';

    return (
        <>
            <PlatformHead
                title={isIncome ? `Поставка #${shortenId(batch.id)}` : `Отгрузка #${shortenId(batch.id)}`}
                description={isIncome ? `Документ поступления товаров на склад` : `Документ отгрузки товаров со склада`}
                actions={actions}
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе'
                }}
            />
            {batch.status === 'draft' && batch.direction === 'income' ? (
                <div className={styles.centerGrid}>
                    <PrintBlock
                        className={styles.print}
                        positions={batch.positions}
                    />
                </div>
            ) : (
                <div className={styles.grid}>
                    <div className={styles.control}>
                        <StatusBlock
                            status={batch.status}
                            className={styles.status}
                        />
                        <BatchInfoBlock
                            className={styles.info}
                            readonly
                            comment={batch.comment || ""}
                        />
                    </div>
                    <div className={styles.positions}>
                        <PositionsBlock
                            positions={batch.positions}
                            className={styles.positions}
                        />
                    </div>
                </div>  
            )}

            <PlatformModal
                isOpen={confirmStatus !== null}
                onClose={() => setConfirmStatus(null)}
            >
                <PlatformModalConfirmation
                    title={confirmTitle}
                    description={confirmDescription}
                    actions={[
                        {
                            children: 'Отмена',
                            variant: 'light',
                            onClick: () => setConfirmStatus(null),
                            disabled: isUpdating,
                        },
                        {
                            children: isUpdating ? 'Обновление...' : 'Подтвердить',
                            variant: 'accent',
                            onClick: () => confirmStatus && handleUpdateStatus(confirmStatus),
                            disabled: isUpdating,
                        },
                    ]}
                />
            </PlatformModal>
        </>
    );
}
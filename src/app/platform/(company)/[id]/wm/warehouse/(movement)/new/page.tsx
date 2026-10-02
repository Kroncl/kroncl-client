'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styles from './page.module.scss';
import { CatalogUnit, StockDirection } from "@/apps/company/modules/wm/types";
import { usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { DOCS_LINK_WM } from "@/app/docs/(v1)/internal.config";
import { StatusBlock } from "./components/status-block/block";
import { SearchBlock } from "./components/search-unit-block/block";
import { PositionsConstructorBlock } from "./components/positions-block/block";
import { DraftPosition } from "./_types";
import { useCallback, useMemo, useState } from "react";
import { BatchInfoBlock } from "./components/batch-info/block";
import { useWm } from "@/apps/company/modules";
import { useMessage } from "@/app/platform/components/lib/message/provider";
import { PlatformModal } from "@/app/platform/components/lib/modal/modal";
import { PlatformModalConfirmation } from "@/app/platform/components/lib/modal/confirmation/confirmation";

export default function CreateBatchPage() {
    const params = useParams();
    const router = useRouter();
    const companyId = params.id as string;

    const searchParams = useSearchParams();
    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_STOCKS_BATCHES_CREATE);

    const wmModule = useWm();
    const { showMessage } = useMessage();

    const directionParam = searchParams.get('direction');
    const direction: StockDirection =
        directionParam === 'outcome' ? 'outcome' : 'income';
    const isIncome = direction === 'income';

    const [positions, setPositions] = useState<DraftPosition[]>([]);
    const [comment, setComment] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectUnit = useCallback((unit: CatalogUnit) => {
        const isSerial = unit.tracking_detail === 'serial';

        setPositions(prev => {
            if (isSerial) {
                const existing = prev.find(p => p.unit.id === unit.id);
                if (existing) return prev;
            }

            return [
                ...prev,
                {
                    key: `${unit.id}-${Date.now()}-${Math.random()}`,
                    unit,
                    quantity: '1',
                    unit_price: String(unit.purchase_price ?? unit.sale_price ?? 0),
                    maker: '',
                    barcode: '',
                },
            ];
        });
    }, []);

    const handleChange = useCallback(
        (key: string, patch: Partial<DraftPosition>) => {
            setPositions(prev =>
                prev.map(p => (p.key === key ? { ...p, ...patch } : p))
            );
        },
        []
    );

    const handleRemove = useCallback((key: string) => {
        setPositions(prev => prev.filter(p => p.key !== key));
    }, []);

    // валидация формы
    const isFormValid = useMemo(() => {
        if (positions.length === 0) return false;

        for (const p of positions) {
            const q = parseFloat(p.quantity);
            const price = parseFloat(p.unit_price);

            if (isNaN(q) || q <= 0) return false;
            if (isNaN(price) || price < 0) return false;
        }

        return true;
    }, [positions]);

    const handleCreate = async () => {
        setIsCreating(true);
        try {
            const response = await wmModule.createStockBatch({
                direction,
                comment: comment.trim() || null,
                positions: positions.map(p => ({
                    unit_id: p.unit.id,
                    quantity: parseFloat(p.quantity) || 0,
                    unit_price: parseFloat(p.unit_price) || 0,
                    maker: p.maker.trim() || null,
                    barcode: p.barcode.trim() || null,
                })),
            });

            if (response.status) {
                showMessage({
                    label: isIncome ? 'Поставка создана' : 'Отгрузка создана',
                    variant: 'success',
                });
                setIsModalOpen(false);
                router.push(`/platform/${companyId}/wm/warehouse/${response.data.id}`);
            } else {
                throw new Error(response.message || 'Ошибка создания');
            }
        } catch (err: any) {
            showMessage({
                label: err.message || 'Не удалось создать',
                variant: 'error',
            });
        } finally {
            setIsCreating(false);
        }
    };

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;

    if (!ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.WM_STOCKS_BATCHES_CREATE} />
    );

    const totalSum = positions.reduce((acc, p) => {
        const q = parseFloat(p.quantity) || 0;
        const price = parseFloat(p.unit_price) || 0;
        return acc + q * price;
    }, 0);

    return (
        <>
            <PlatformHead
                title={isIncome ? 'Новая поставка' : 'Новая отгрузка'}
                description={
                    isIncome
                        ? 'Создание нового поступления товаров на склад.'
                        : 'Создание нового списания товаров со склада.'
                }
                actions={[
                    {
                        children: isIncome ? 'Создать поставку' : 'Создать отгрузку',
                        variant: 'accent',
                        onClick: () => setIsModalOpen(true),
                        disabled: !isFormValid || isCreating,
                    },
                ]}
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе'
                }}
            />
            <div className={styles.grid}>
                <div className={styles.control}>
                    <StatusBlock status='draft' className={styles.status} />
                    <SearchBlock
                        onSelect={handleSelectUnit}
                        className={styles.search}
                    />
                    <BatchInfoBlock
                        className={styles.info}
                        comment={comment}
                        onCommentChange={setComment}
                    />
                </div>
                <div className={styles.positions}>
                    <PositionsConstructorBlock
                        className={styles.structure}
                        positions={positions}
                        onChange={handleChange}
                        onRemove={handleRemove}
                    />
                </div>
            </div>

            <PlatformModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <PlatformModalConfirmation
                    title={isIncome ? 'Создать поставку?' : 'Создать отгрузку?'}
                    description={
                        `Позиций: ${positions.length}. ` +
                        `Итого: ${totalSum.toLocaleString('ru-RU')} ₽. ` +
                        (comment.trim() ? `Комментарий: «${comment.trim()}». ` : '') +
                        'После создания документ будет сохранён как черновик.'
                    }
                    actions={[
                        {
                            children: 'Отмена',
                            variant: 'light',
                            onClick: () => setIsModalOpen(false),
                            disabled: isCreating,
                        },
                        {
                            children: isCreating ? 'Создание...' : 'Создать',
                            variant: 'accent',
                            onClick: handleCreate,
                            disabled: isCreating,
                        },
                    ]}
                />
            </PlatformModal>
        </>
    );
}
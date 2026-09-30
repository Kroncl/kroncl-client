'use client';

import { PlatformFormBody, PlatformFormInput, PlatformFormSection } from "@/app/platform/components/lib/form";
import { PlatformHead } from "@/app/platform/components/lib/head/head";
import Button from "@/assets/ui-kit/button/button";
import { useEffect, useState } from 'react';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { useWm } from '@/apps/company/modules';
import { useParams, useRouter } from 'next/navigation';
import { PlatformModal } from '@/app/platform/components/lib/modal/modal';
import { PlatformModalConfirmation } from '@/app/platform/components/lib/modal/confirmation/confirmation';
import { ChooseUnitBlock } from "../../units/components/choose-unit-block/block";
import { Barcode, CatalogUnit } from '@/apps/company/modules/wm/types';
import styles from './page.module.scss';
import { usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { PlatformError } from "@/app/platform/components/lib/error/block";
import { DOCS_LINK_WM } from "@/app/docs/(v1)/internal.config";
import Link from "next/link";
import { shortenId } from "@/assets/utils/ids";
import Exit from "@/assets/ui-kit/icons/exit";
import { BarcodePreview } from "@/app/components/BarCode/block";

export default function BarcodePage() {
    const params = useParams();
    const companyId = params.id as string;
    const barcodeId = params.barcodeId as string;

    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_BARCODES);
    const ALLOW_UPDATE = usePermission(PERMISSIONS.WM_BARCODES_UPDATE);
    const ALLOW_DELETE = usePermission(PERMISSIONS.WM_BARCODES_DELETE);

    const wmModule = useWm();
    const { showMessage } = useMessage();
    const router = useRouter();

    const [barcode, setBarcode] = useState<Barcode | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<CatalogUnit | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [formData, setFormData] = useState({
        barcode: '',
        maker: '',
    });

    // загрузка баркода + подтягивание unit
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            if (!barcodeId) return;

            setLoading(true);
            setError(null);
            try {
                const response = await wmModule.getBarcodeById(barcodeId);

                if (!isMounted) return;

                if (response.status) {
                    setBarcode(response.data);
                    setFormData({
                        barcode: response.data.barcode,
                        maker: response.data.maker ?? '',
                    });

                    // подтягиваем unit, если привязан
                    if (response.data.catalog_unit_id) {
                        try {
                            const unitRes = await wmModule.getUnit(response.data.catalog_unit_id);
                            if (isMounted && unitRes.status) {
                                setSelectedUnit(unitRes.data);
                            }
                        } catch (unitErr) {
                            console.warn('Failed to load linked unit:', unitErr);
                        }
                    }
                } else {
                    setError('Не удалось загрузить баркод');
                }
            } catch (err) {
                if (!isMounted) return;
                setError(err instanceof Error ? err.message : 'Ошибка загрузки');
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchData();
        return () => { isMounted = false; };
    }, [barcodeId]);

    const handleBarcodeChange = (value: string) => {
        const cleaned = value.replace(/[^\dA-Za-z\-_.]/g, '');
        setFormData(prev => ({ ...prev, barcode: cleaned }));
    };

    const handleMakerChange = (value: string) => {
        setFormData(prev => ({ ...prev, maker: value }));
    };

    const handleUnitSelect = (unit: CatalogUnit) => {
        setSelectedUnit(unit);
    };

    const handleRemoveUnit = () => {
        setSelectedUnit(null);
    };

    const handleSave = async () => {
        if (!formData.barcode.trim()) {
            showMessage({ label: 'Укажите штрихкод', variant: 'error' });
            return;
        }

        setIsSaving(true);
        try {
            const response = await wmModule.updateBarcode(barcodeId, {
                barcode: formData.barcode.trim(),
                maker: formData.maker.trim() || null,
                catalog_unit_id: selectedUnit?.id ?? undefined,
            });

            if (response.status) {
                showMessage({ label: 'Баркод сохранён', variant: 'success' });
                setBarcode(response.data);
            } else {
                throw new Error(response.message || 'Ошибка сохранения');
            }
        } catch (err: any) {
            showMessage({
                label: err.message || 'Не удалось сохранить баркод',
                variant: 'error',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await wmModule.deleteBarcode(barcodeId);
            showMessage({ label: 'Баркод удалён', variant: 'success' });
            setIsModalDeleteOpen(false);
            router.back();
        } catch (err: any) {
            showMessage({
                label: err.message || 'Не удалось удалить баркод',
                variant: 'error',
            });
        }
    };

    const isDirty =
        barcode !== null &&
        (formData.barcode !== barcode.barcode ||
         (formData.maker || null) !== barcode.maker ||
         (selectedUnit?.id ?? null) !== barcode.catalog_unit_id);

    if (loading || ALLOW_PAGE.isLoading) return <PlatformLoading />;

    if (error || !barcode) return (
        <PlatformError error={error || 'Баркод не найден'} />
    );

    if (!ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.WM_BARCODES} />
    );

    const actions = [];
    if (ALLOW_DELETE.allowed) {
        actions.push({
            children: 'Удалить',
            icon: <Exit />,
            variant: 'light' as const,
            onClick: () => setIsModalDeleteOpen(true),
        });
    }

    return (
        <>
            <PlatformHead
                title={`Баркод ${barcode.barcode}`}
                description="Редактирование штрихкода. При создании поставки код автоматически определит товарную позицию."
                actions={actions}
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе',
                }}
            />
            
            <BarcodePreview 
                showFormatSwitcher
                className={styles.barcodePreview} 
                value={barcode.barcode} />

            <PlatformFormBody>
                <PlatformFormSection
                    title='Штрихкод'
                    description='Код производителя товара. Чаще всего в формате EAN-13 и состоит только из цифр.'
                >
                    <PlatformFormInput
                        placeholder="4601234567890"
                        value={formData.barcode}
                        onChange={handleBarcodeChange}
                        disabled={!ALLOW_UPDATE.allowed || isSaving}
                    />
                </PlatformFormSection>

                <PlatformFormSection title='Производитель (опционально)'>
                    <PlatformFormInput
                        placeholder="Например: Bosch"
                        value={formData.maker}
                        onChange={handleMakerChange}
                        disabled={!ALLOW_UPDATE.allowed || isSaving}
                    />
                </PlatformFormSection>

                <PlatformFormSection title='Товарная позиция (опционально)'>
                    {selectedUnit ? (
                        <div className={styles.selectedUnit}>
                            <div className={styles.tip}>Выбранная позиция</div>
                            <div className={styles.tip}>
                                Товар <Link href={`/platform/${companyId}/wm/catalog/units/${selectedUnit.id}`}>
                                    #{shortenId(selectedUnit.id)}
                                </Link>
                            </div>
                            <div className={styles.name}>{selectedUnit.name}</div>
                            <div className={styles.info}>
                                <div className={styles.line}>
                                    <span>Тип учёта</span>: {selectedUnit.inventory_type === 'tracked' ? 'Складской' : 'Без учёта'}
                                </div>
                                {selectedUnit.inventory_type === 'tracked' && (
                                    <div className={styles.line}>
                                        <span>Детализация</span>: {selectedUnit.tracking_detail === 'serial' ? 'Поштучный (serial)' : 'Партионный (batch)'}
                                    </div>
                                )}
                                <div className={styles.line}>
                                    <span>Метод учёта партий</span>: {selectedUnit.tracked_type}
                                </div>
                                <div className={styles.line}>
                                    <span>Валюта</span>: {selectedUnit.currency}
                                </div>
                                <div className={styles.line}>
                                    <span>Цена продажи</span>: {selectedUnit.sale_price.toLocaleString('ru-RU')} ₽
                                </div>
                                {selectedUnit.purchase_price != null && (
                                    <div className={styles.line}>
                                        <span>Цена закупки</span>: {selectedUnit.purchase_price.toLocaleString('ru-RU')} ₽
                                    </div>
                                )}
                            </div>
                            {ALLOW_UPDATE.allowed && (
                                <div className={styles.actions}>
                                    <Button
                                        children='Убрать'
                                        variant='accent'
                                        onClick={handleRemoveUnit}
                                        disabled={isSaving}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.emptyParent}>
                            Позиция не выбрана — код будет работать как словарная запись без авто-привязки
                        </div>
                    )}

                    {ALLOW_UPDATE.allowed && (
                        <ChooseUnitBlock onSelectUnit={handleUnitSelect} />
                    )}
                </PlatformFormSection>

                {ALLOW_UPDATE.allowed && (
                    <section>
                        <Button
                            variant="accent"
                            onClick={handleSave}
                            disabled={!isDirty || isSaving}
                        >
                            {isSaving ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                    </section>
                )}
            </PlatformFormBody>

            <PlatformModal
                isOpen={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
            >
                <PlatformModalConfirmation
                    title='Удалить баркод?'
                    description='Баркод будет удалён из словаря. Если он используется в существующих поставках — связь сохранится в истории.'
                    actions={[
                        {
                            children: 'Отмена',
                            variant: 'light',
                            onClick: () => setIsModalDeleteOpen(false),
                        },
                        {
                            variant: 'accent',
                            onClick: handleDelete,
                            children: 'Удалить',
                        },
                    ]}
                />
            </PlatformModal>
        </>
    );
}
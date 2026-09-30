'use client';

import { PlatformFormBody, PlatformFormInput, PlatformFormSection } from "@/app/platform/components/lib/form";
import { PlatformHead } from "@/app/platform/components/lib/head/head";
import Button from "@/assets/ui-kit/button/button";
import { useState } from 'react';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { useWm } from '@/apps/company/modules';
import { useParams, useRouter } from 'next/navigation';
import { PlatformModal } from '@/app/platform/components/lib/modal/modal';
import { ChooseUnitBlock } from "../../units/components/choose-unit-block/block";
import { CatalogUnit } from '@/apps/company/modules/wm/types';
import styles from './page.module.scss';
import { UnitCard } from "../../components/unit-card/card";
import { usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { DOCS_LINK_WM } from "@/app/docs/(v1)/internal.config";
import { select } from "framer-motion/client";
import Link from "next/link";
import { shortenId } from "@/assets/utils/ids";

export default function NewBarcodePage() {
    const params = useParams();
    const companyId = params.id as string;
    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_BARCODES_CREATE);

    const wmModule = useWm();
    const { showMessage } = useMessage();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isModalChooseUnitOpen, setIsModalChooseUnitOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<CatalogUnit | null>(null);

    const [formData, setFormData] = useState({
        barcode: '',
        maker: '',
    });

    const handleBarcodeChange = (value: string) => {
        // только цифры и допустимые символы для штрихкода
        const cleaned = value.replace(/[^\dA-Za-z\-_.]/g, '');
        setFormData(prev => ({ ...prev, barcode: cleaned }));
    };

    const handleMakerChange = (value: string) => {
        setFormData(prev => ({ ...prev, maker: value }));
    };

    const handleUnitSelect = (unit: CatalogUnit) => {
        setSelectedUnit(unit);
        setIsModalChooseUnitOpen(false);
    };

    const handleRemoveUnit = () => {
        setSelectedUnit(null);
    };

    const handleSubmit = async () => {
        if (!formData.barcode.trim()) {
            showMessage({ label: 'Укажите штрихкод', variant: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await wmModule.createBarcode({
                barcode: formData.barcode.trim(),
                maker: formData.maker.trim() || null,
                catalog_unit_id: selectedUnit?.id ?? null,
            });

            if (response.status) {
                showMessage({
                    label: 'Баркод успешно создан',
                    variant: 'success'
                });
                router.back();
            } else {
                throw new Error(response.message || 'Ошибка создания');
            }
        } catch (error: any) {
            showMessage({
                label: error.message || 'Не удалось создать баркод',
                variant: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = () => {
        return formData.barcode.trim().length > 0;
    };

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;
    if (!ALLOW_PAGE.allowed) return <PlatformNotAllowed permission={PERMISSIONS.WM_BARCODES_CREATE} />;

    return (
        <>
            <PlatformHead
                title='Новый баркод'
                description="Добавление нового штрихкода в словарь. При создании поставки код автоматически определит товарную позицию."
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе'
                }}
            />
            <PlatformFormBody>
                <PlatformFormSection title='Штрихкод' description='Код производителя товара. Чаще всего представлен в формате EAN-13 и представлен только цифрами.'>
                    <PlatformFormInput
                        placeholder="4601234567890"
                        value={formData.barcode}
                        onChange={handleBarcodeChange}
                        disabled={isLoading}
                    />
                </PlatformFormSection>

                <PlatformFormSection title='Производитель (опционально)'>
                    <PlatformFormInput
                        placeholder="Например: Bosch"
                        value={formData.maker}
                        onChange={handleMakerChange}
                        disabled={isLoading}
                    />
                </PlatformFormSection>

                <PlatformFormSection title='Товарная позиция (опционально)'>
                    {selectedUnit ? (
                        <div className={styles.selectedUnit}>
                            <div className={styles.tip}>Выбранная позиция</div>
                            <div className={styles.tip}>
                                Товар <Link href={`/platform/${companyId}/wm/catalog/units/${selectedUnit.id}`}>#{shortenId(selectedUnit.id)}</Link>
                            </div>
                            <div className={styles.name}>{selectedUnit.name}</div>    
                            <div className={styles.info}>
                                <div className={styles.line}>
                                    <span>Метод учёта партий</span>: {selectedUnit.tracked_type}
                                </div>
                                <div className={styles.line}>
                                    <span>Тип учёта</span>: {selectedUnit.inventory_type === 'tracked' ? 'Складской' : 'Без учёта'}
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
                            <div className={styles.actions}>
                                <Button
                                    children='Убрать'
                                    variant='accent'
                                    onClick={handleRemoveUnit}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyParent}>
                            Позиция не выбрана — код будет работать как словарная запись без авто-привязки
                        </div>
                    )}
                    <ChooseUnitBlock onSelectUnit={handleUnitSelect} />
                </PlatformFormSection>

                
                <section>
                    <Button
                        variant="accent"
                        onClick={handleSubmit}
                        disabled={!isFormValid() || isLoading}
                    >
                        {isLoading ? 'Создание...' : 'Создать баркод'}
                    </Button>
                </section>
            </PlatformFormBody>
        </>
    );
}
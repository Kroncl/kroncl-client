'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import { DealBlock } from "../block/block";
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormTextarea, PlatformFormUnify } from "@/app/platform/components/lib/form";
import Button from "@/assets/ui-kit/button/button";
import { PositionCard } from "./components/position-card/card";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { usePermission } from "@/apps/permissions/hooks";
import { useState, useEffect, useRef } from "react";
import { DealPosition } from "@/apps/company/modules/dm/types";
import { useDm } from "@/apps/company/modules";
import { useParams } from "next/navigation";
import { useMessage } from "@/app/platform/components/lib/message/provider";
import { storageMediaModule } from "@/apps/company/modules/storage/media/api";
import { CompanyApi } from "@/apps/company/api";
import { saveAs } from "file-saver";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { docsModule } from "@/apps/company/modules/docs/api";
import { IS_PRODUCTION } from "@/config/env.config";

export interface InvoiceBlockProps {
    className?: string;
    dealId: string;
    positions: DealPosition[];
    totalAmount: number;
    comment?: string | null;
}

export function InvoiceBlock({
    className,
    dealId,
    positions: initialPositions,
    totalAmount,
    comment
}: InvoiceBlockProps) {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    const storageMedia = storageMediaModule(companyApi);
    const docs = docsModule(companyApi);
    
    const ALLOW_PAGE = usePermission(PERMISSIONS.DM_DEALS_INVOICE);
    const ALLOW_SETTINGS = usePermission(PERMISSIONS.DOCS_SETTINGS);
    const dmModule = useDm();
    const { showMessage } = useMessage();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoadingSettings, setIsLoadingSettings] = useState(false);
    
    // Drag and drop state
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const dragOverItem = useRef<number | null>(null);
    
    // Форма
    const [displayId, setDisplayId] = useState<string>("");
    const [legalName, setLegalName] = useState<string>("");
    const [inn, setInn] = useState<string>("");
    const [ogrn, setOgrn] = useState<string>("");
    const [bankName, setBankName] = useState<string>("");
    const [warrantyTerms, setWarrantyTerms] = useState<string>("");
    const [additionalTerms, setAdditionalTerms] = useState<string>("");

    // Позиции (можно редактировать перед генерацией)
    const [positions, setPositions] = useState<Array<{
        name: string;
        quantity: number;
        price: number;
    }>>([]);

    // Загружаем настройки документов если есть разрешение
    useEffect(() => {
        const loadDocsSettings = async () => {
            if (!ALLOW_SETTINGS.allowed) return;
            
            setIsLoadingSettings(true);
            try {
                const response = await docs.getSettings();
                if (response.status && response.data) {
                    const settings = response.data;
                    
                    // Подставляем дефолтные значения из настроек
                    if (settings.legal_name) setLegalName(settings.legal_name);
                    if (settings.inn) setInn(settings.inn);
                    if (settings.ogrn) setOgrn(settings.ogrn);
                    if (settings.bank_name) setBankName(settings.bank_name);
                    if (settings.warranty_terms) setWarrantyTerms(settings.warranty_terms);
                    if (settings.additional_terms) setAdditionalTerms(settings.additional_terms);
                }
            } catch (error) {
                console.error('Error loading docs settings:', error);
                // Не показываем ошибку пользователю, просто грузим без дефолтов
            } finally {
                setIsLoadingSettings(false);
            }
        };

        loadDocsSettings();
    }, [ALLOW_SETTINGS.allowed]);

    // Загружаем позиции из сделки при монтировании и устанавливаем дефолтный ID
    useEffect(() => {
        const mappedPositions = initialPositions.map(p => ({
            name: p.name,
            quantity: p.quantity,
            price: p.price
        }));
        setPositions(mappedPositions);
        
        // Устанавливаем дефолтный ID (первые 5 символов UUID сделки)
        const defaultDisplayId = dealId.substring(0, 5).toUpperCase();
        setDisplayId(defaultDisplayId);
    }, [initialPositions, dealId]);

    const handleAddPosition = () => {
        setPositions(prev => [
            ...prev,
            { name: "", quantity: 1, price: 0 }
        ]);
    };

    const handleUpdatePosition = (index: number, field: keyof typeof positions[0], value: string | number) => {
        const updated = [...positions];
        updated[index] = {
            ...updated[index],
            [field]: field === 'name' ? value : Number(value)
        };
        setPositions(updated);
    };

    const handleRemovePosition = (index: number) => {
        setPositions(prev => prev.filter((_, i) => i !== index));
    };

    // Drag and drop handlers
    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    const handleDragEnter = (index: number) => {
        dragOverItem.current = index;
    };

    const handleDragEnd = () => {
        if (draggedItem === null || dragOverItem.current === null) {
            resetDragState();
            return;
        }

        if (draggedItem === dragOverItem.current) {
            resetDragState();
            return;
        }

        // Перемещаем элемент
        const newPositions = [...positions];
        const [draggedPosition] = newPositions.splice(draggedItem, 1);
        newPositions.splice(dragOverItem.current, 0, draggedPosition);
        
        setPositions(newPositions);
        resetDragState();
    };

    const resetDragState = () => {
        setDraggedItem(null);
        dragOverItem.current = null;
    };

    const calculateTotal = () => {
        return positions.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    };

    const handleGenerate = async () => {
        // Валидация
        if (positions.length === 0) {
            showMessage({ label: 'Добавьте хотя бы одну позицию', variant: 'error' });
            return;
        }

        const invalidPositions = positions.filter(p => !p.name || p.quantity <= 0 || p.price < 0);
        if (invalidPositions.length > 0) {
            showMessage({ label: 'Заполните корректно все позиции', variant: 'error' });
            return;
        }

        if (!displayId.trim()) {
            showMessage({ label: 'Укажите ID накладной для отображения', variant: 'error' });
            return;
        }

        setIsGenerating(true);
        try {
            const invoicePositions = positions.map(p => ({
                name: p.name,
                quantity: p.quantity,
                price: p.price
            }));

            const response = await dmModule.generateInvoice(dealId, {
                deal_id: dealId,
                legal_name: legalName || null,
                inn: inn || null,
                ogrn: ogrn || null,
                bank_name: bankName || null,
                warranty_terms: warrantyTerms || null,
                additional_terms: additionalTerms || null,
                positions: invoicePositions,
                total_amount: calculateTotal(),
                comment: comment || null
            });

            if (response.status && response.data) {
                const { download_url, doc } = response.data;
                
                showMessage({
                    label: 'Накладная успешно сгенерирована',
                    variant: 'success'
                });

                if (IS_PRODUCTION) {
                    // В проде — открываем в новой вкладке
                    window.open(download_url, '_blank');
                } else {
                    // В деве — скачиваем через API
                    try {
                        const blob = await storageMedia.getFile(doc.object_path);
                        const filename = doc.object_path.split('/').pop() || `invoice_${dealId.substring(0, 8)}.pdf`;
                        saveAs(blob, filename);
                    } catch (downloadError) {
                        // Если не получается скачать через API, открываем ссылку
                        console.error('Download failed, opening URL:', downloadError);
                        window.open(download_url, '_blank');
                    }
                }
            } else {
                throw new Error(response.message || 'Ошибка генерации накладной');
            }
        } catch (error: any) {
            showMessage({
                label: error.message || 'Не удалось сгенерировать накладную',
                variant: 'error'
            });
        } finally {
            setIsGenerating(false);
        }
    };

    // Обработчики для полей формы (принимают строку напрямую)
    const handleDisplayIdChange = (value: string) => setDisplayId(value);
    const handleLegalNameChange = (value: string) => setLegalName(value);
    const handleInnChange = (value: string) => setInn(value);
    const handleOgrnChange = (value: string) => setOgrn(value);
    const handleBankNameChange = (value: string) => setBankName(value);
    const handleWarrantyTermsChange = (value: string) => setWarrantyTerms(value);
    const handleAdditionalTermsChange = (value: string) => setAdditionalTerms(value);

    if (!ALLOW_PAGE) return (
        <PlatformNotAllowed permission={PERMISSIONS.DM_DEALS_INVOICE} />
    );

    // Показываем индикатор загрузки настроек
    if (isLoadingSettings) {
        return (
            <DealBlock className={className}>
                <div className={styles.loading}>
                    Загрузка настроек документов...
                </div>
            </DealBlock>
        );
    }

    return (
        <DealBlock
            actions={[
                {
                    children: isGenerating ? 'Генерация (до 2 минут)...' : 'Сгенерировать',
                    variant: 'accent',
                    onClick: handleGenerate,
                    disabled: isGenerating || positions.length === 0
                }
            ]}
            className={className}
        >
            <div className={clsx(styles.container)}>
                <div className={styles.info}>
                    <PlatformFormBody className={styles.form}>
                        <PlatformFormSection
                            className={clsx(styles.section)}
                            title='Состав сделки'
                            description='Наименование | Количество | Цена за единицу. Можно менять порядок перетаскиванием.'
                        >
                            <div className={styles.structure}>
                                <div className={styles.positions}>
                                    {positions.map((position, index) => (
                                        <div
                                            key={index}
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragEnter={() => handleDragEnter(index)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={clsx(
                                                styles.dragItem,
                                                draggedItem === index && styles.dragging
                                            )}
                                        >
                                            <PositionCard
                                                className={styles.item}
                                                name={position.name}
                                                quantity={position.quantity}
                                                price={position.price}
                                                onUpdate={(field, value) => handleUpdatePosition(index, field, value)}
                                                onRemove={() => handleRemovePosition(index)}
                                                dragHandle
                                            />
                                        </div>
                                    ))}
                                    {positions.length === 0 && (
                                        <div className={styles.empty}>
                                            Нет позиций. Добавьте хотя бы одну.
                                        </div>
                                    )}
                                </div>
                                <div className={styles.actions}>
                                    <Button
                                        children='Добавить позицию'
                                        fullWidth
                                        variant='accent'
                                        className={styles.action}
                                        onClick={handleAddPosition}
                                    />
                                </div>
                            </div>
                            {positions.length > 0 && (
                                <div className={styles.totalPreview}>
                                    Итого: {calculateTotal().toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
                                </div>
                            )}
                        </PlatformFormSection>

                        <PlatformFormSection
                            title='ID накладной для отображения'
                            description='Будет отображаться в заголовке документа'
                        >
                            <PlatformFormInput
                                placeholder='ID документа для отображения'
                                value={displayId}
                                onChange={handleDisplayIdChange}
                            />
                        </PlatformFormSection>

                        <PlatformFormSection 
                            className={styles.section}
                            title='Реквизиты' 
                            description={ALLOW_SETTINGS.allowed 
                                ? 'Шаблонные данные накладной (подставлены из настроек документов)'
                                : 'Шаблонные данные накладной (будут подставлены в документ)'
                            }
                        >
                            <PlatformFormUnify>
                                <PlatformFormInput 
                                    placeholder="Юридическое наименование"
                                    value={legalName}
                                    onChange={handleLegalNameChange}
                                />
                                <PlatformFormInput 
                                    placeholder="ИНН"
                                    value={inn}
                                    onChange={handleInnChange}
                                />
                            </PlatformFormUnify>
                            <PlatformFormInput
                                placeholder="ОГРН/ОГРНИП"
                                value={ogrn}
                                onChange={handleOgrnChange}
                            />
                            <PlatformFormInput
                                placeholder="Банк-регистратор"
                                value={bankName}
                                onChange={handleBankNameChange}
                            />
                        </PlatformFormSection>

                        <PlatformFormSection 
                            className={styles.section}
                            title='Условия гарантии' 
                            description='Опциональный блок документа'
                        >
                            <PlatformFormTextarea
                                placeholder="Например: Гарантия 12 месяцев с момента передачи товара..."
                                value={warrantyTerms}
                                onChange={handleWarrantyTermsChange}
                                rows={4}
                            />
                        </PlatformFormSection>

                        <PlatformFormSection 
                            className={styles.section}
                            title='Дополнительные условия' 
                            description='Любые дополнительные условия продажи'
                        >
                            <PlatformFormTextarea
                                placeholder="Дополнительные условия..."
                                value={additionalTerms}
                                onChange={handleAdditionalTermsChange}
                                rows={4}
                            />
                        </PlatformFormSection>
                    </PlatformFormBody>
                </div>
                <div className={styles.preview}>
                    {/* Здесь можно добавить превью PDF если нужно */}
                </div>
            </div>
        </DealBlock>
    );
}
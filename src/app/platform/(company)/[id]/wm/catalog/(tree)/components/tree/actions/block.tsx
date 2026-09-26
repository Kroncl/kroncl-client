'use client';

import clsx from "clsx";
import { useState } from 'react';
import styles from './block.module.scss';
import Button from "@/assets/ui-kit/button/button";
import {
    PlatformFormBody,
    PlatformFormSection,
} from "@/app/platform/components/lib/form";
import { CatalogTreeItemActionsProps, CreateMode } from './_types';
import { useCategoryForm } from './_useCategoryForm';
import { useUnitForm } from './_useUnitForm';
import { useCreate } from './_useCreate';
import { useToggleStatus } from './_useToggleStatus';
import { buildCategorySteps, buildUnitSteps } from './_forms';
import Edit from "@/assets/ui-kit/icons/edit";
import { useParams } from "next/navigation";
import { ModalTooltip } from "@/app/components/tooltip/tooltip";

export function CatalogTreeItemActions({
    className,
    onCreated,
    onStatusUpdated,
    ...props
}: CatalogTreeItemActionsProps) {
    const params = useParams();
    const companyId = params.id as string;

    const isRoot = props.type === 'root';
    const isCategory = props.type === 'category';
    const label = isRoot ? 'каталогом' : isCategory ? 'категорией' : 'позицией';

    const [mode, setMode] = useState<CreateMode>('none');

    const parentCategoryId = isRoot
        ? null
        : isCategory
            ? props.category.id
            : props.unit.category_id;

    const categoryForm = useCategoryForm();
    const unitForm = useUnitForm();

    const { isLoading, createCategory, createUnit } = useCreate({
        parentCategoryId,
        onCreated,
    });

    const status = useToggleStatus(
        isRoot
            ? null
            : isCategory
                ? {
                    type: 'category',
                    category: props.category,
                    onUpdated: (next) => onStatusUpdated?.(props.category.id, next),
                }
                : {
                    type: 'unit',
                    unit: props.unit,
                    onUpdated: (next) => onStatusUpdated?.(props.unit.id, next),
                }
    );

    // ============================================
    // STEPS
    // ============================================
    const categorySteps = buildCategorySteps(categoryForm.data, {
        setName: categoryForm.setName,
        setComment: categoryForm.setComment,
        disabled: isLoading,
    });

    const unitSteps = buildUnitSteps(
        unitForm.data,
        unitForm.unitOptions,
        unitForm.patch,
        isLoading,
    );
    const visibleUnitSteps = unitSteps.filter(s => !s.skip);

    const steps = mode === 'category' ? categorySteps : visibleUnitSteps;
    const step = mode === 'category' ? categoryForm.step : unitForm.step;
    const setStep = mode === 'category' ? categoryForm.setStep : unitForm.setStep;
    const current = steps[step];
    const isLast = step === steps.length - 1;
    const canProceed = current?.canNext ?? false;

    // ============================================
    // HANDLERS
    // ============================================
    function resetAll() {
        categoryForm.reset();
        unitForm.reset();
        setMode('none');
    }

    async function handleNext() {
        if (!canProceed || isLoading) return;

        if (!isLast) {
            setStep(s => s + 1);
            return;
        }

        const ok = mode === 'category'
            ? await createCategory(categoryForm.data)
            : await createUnit(unitForm.data);

        if (ok) resetAll();
    }

    return (
        <div className={clsx(styles.container, className)}>
            {!isCategory && !isRoot && (
                <div className={styles.unitPreview}>
                    <div className={styles.line}>
                        <span className={styles.accent}>Тип:</span> {props.unit.type === 'service' ? 'Услуга' : 'Товар'}
                    </div>
                    <div className={styles.line}>
                        <span className={styles.accent}>Комментарий:</span> {props.unit.comment ? props.unit.comment : '-'}
                    </div>
                    {props.unit.type === 'product' && (
                        <div className={styles.line}>
                            <span className={styles.accent}>Остатки отслеживаются?:</span> {props.unit.inventory_type === 'tracked' ? 'Да' : 'Нет'}
                        </div>
                    )}
                    {props.unit.tracking_detail && (
                        <div className={styles.line}>
                            <span className={styles.accent}>Тип учёта:</span> {props.unit.tracking_detail === 'batch' ? 'Партийный' : 'Поштучный'}
                        </div>
                    )}
                    <span className={styles.inter} />
                    {props.unit.purchase_price && (
                        <div className={styles.line}>
                            <span className={styles.accent}>Закупочная цена (базовая):</span> {props.unit.purchase_price.toLocaleString('ru-RU')} &#8381;
                        </div>
                    )}
                    <div className={styles.line}>
                        <span className={styles.accent}>
                            {props.unit.type === 'service' ? 'Стоимость' : 'Цена продажи'}{' '}
                            <ModalTooltip content='Можно переопределить по факту совершения сделки/отгрузки'>
                                <span className={styles.underline}>базовая</span>
                            </ModalTooltip>:
                        </span>{' '}
                        {props.unit.sale_price.toLocaleString('ru-RU')} &#8381;
                    </div>
                </div>
            )}

            {isRoot && mode === 'none' && (
                <Button
                    children='Создать в корне'
                    className={styles.action}
                    variant='contrast'
                    onClick={() => setMode('category')}
                />
            )}

            {!isRoot && (
                <>
                    <div className={styles.split}>
                        <Button
                            children={status.isActive ? 'Деактивировать' : 'Активировать'}
                            className={clsx(styles.full, styles.action)}
                            variant='glass'
                            onClick={status.toggle}
                            disabled={status.isLoading}
                        />
                        <Button
                            as='link'
                            href={
                                isCategory
                                    ? `/platform/${companyId}/wm/catalog/categories/${props.category.id}/edit`
                                    : `/platform/${companyId}/wm/catalog/units/${props.unit.id}/edit`
                            }
                            variant="glass"
                            className={styles.action}
                            icon={<Edit />}
                        />
                    </div>
                    {(isCategory && mode !== 'choose' && mode !== 'unit') && (
                        <Button
                            children='Добавить'
                            className={styles.action}
                            variant='contrast'
                            onClick={() => setMode('choose')}
                        />
                    )}
                </>
            )}

            {!isRoot && mode === 'choose' && (
                <div className={styles.split}>
                    <Button
                        children='Подкатегорию'
                        variant='contrast'
                        className={styles.action}
                        onClick={() => setMode('category')}
                    />
                    <Button
                        children='Товар/услугу'
                        variant='accent'
                        className={styles.action}
                        onClick={() => setMode('unit')}
                    />
                </div>
            )}

            {(mode === 'category' || mode === 'unit') && current && (
                <PlatformFormBody className={styles.form}>
                    <PlatformFormSection title={current.title}>
                        {current.content}
                    </PlatformFormSection>

                    <section className={styles.acts}>
                        {step > 0 && (
                            <Button
                                children='Назад'
                                variant='light'
                                className={styles.action}
                                onClick={() => setStep(s => s - 1)}
                                disabled={isLoading}
                            />
                        )}
                        <Button
                            children={
                                isLast
                                    ? (mode === 'category' ? 'Создать категорию' : 'Создать позицию')
                                    : 'Далее'
                            }
                            variant='contrast'
                            className={styles.action}
                            onClick={handleNext}
                            disabled={!canProceed || isLoading}
                        />
                    </section>
                </PlatformFormBody>
            )}

            <div className={styles.tip}>Действия с {label}</div>
        </div>
    )
}
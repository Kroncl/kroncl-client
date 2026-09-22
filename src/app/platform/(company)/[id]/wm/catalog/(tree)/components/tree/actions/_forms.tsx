'use client';

import {
    PlatformFormInput,
    PlatformFormTextarea,
    PlatformFormVariants,
} from '@/app/platform/components/lib/form';
import { CategoryFormData, UnitFormData } from './_types';
import { _units } from '../../../../units/new/_units';

// ============================================
// CATEGORY STEPS
// ============================================

export type CategoryStep = {
    title: string;
    content: React.ReactNode;
    canNext: boolean;
};

export function buildCategorySteps(
    data: CategoryFormData,
    handlers: {
        setName: (v: string) => void;
        setComment: (v: string) => void;
        disabled: boolean;
    },
): CategoryStep[] {
    return [
        {
            title: 'Название категории',
            content: (
                <PlatformFormInput
                    placeholder=""
                    value={data.name}
                    onChange={handlers.setName}
                    disabled={handlers.disabled}
                />
            ),
            canNext: data.name.trim().length > 0,
        },
        {
            title: 'Описание',
            content: (
                <PlatformFormTextarea
                    placeholder=""
                    value={data.comment}
                    onChange={handlers.setComment}
                    disabled={handlers.disabled}
                />
            ),
            canNext: true,
        },
    ];
}

// ============================================
// UNIT STEPS
// ============================================

export type UnitStep = {
    title: string;
    content: React.ReactNode;
    canNext: boolean;
    skip?: boolean;
};

export function buildUnitSteps(
    data: UnitFormData,
    unitOptions: { value: string; label: string }[],
    patch: (partial: Partial<UnitFormData>) => void,
    disabled: boolean,
): UnitStep[] {
    return [
        {
            title: 'Название позиции',
            content: (
                <PlatformFormInput
                    placeholder=""
                    value={data.name}
                    onChange={(v) => patch({ name: v })}
                    disabled={disabled}
                />
            ),
            canNext: data.name.trim().length > 0,
        },
        {
            title: 'Тип',
            content: (
                <PlatformFormVariants
                    options={[
                        { value: 'product', label: 'Товар' },
                        { value: 'service', label: 'Услуга' },
                    ]}
                    value={data.type}
                    onChange={(v) => patch({
                        type: v as UnitFormData['type'],
                        unit: v === 'service' ? 'pcs' : data.unit,
                        ...(v === 'service' ? {
                            inventory_type: 'untracked',
                            tracking_detail: undefined,
                            tracked_type: undefined,
                            purchase_price: '',
                        } : {}),
                    })}
                    disabled={disabled}
                />
            ),
            canNext: true,
        },
        {
            title: 'Тип учёта',
            content: (
                <PlatformFormVariants
                    options={[
                        { value: 'tracked', label: 'Складской учёт' },
                        { value: 'untracked', label: 'Без учёта' },
                    ]}
                    value={data.inventory_type}
                    onChange={(v) => patch({
                        inventory_type: v as UnitFormData['inventory_type'],
                        ...(v === 'untracked' ? {
                            tracked_type: undefined,
                            purchase_price: '',
                            tracking_detail: undefined,
                        } : {
                            tracking_detail: 'batch',
                            tracked_type: 'fifo',
                        }),
                    })}
                    disabled={disabled}
                />
            ),
            canNext: true,
            skip: data.type === 'service',
        },
        {
            title: 'Детализация учёта',
            content: (
                <PlatformFormVariants
                    options={[
                        { value: 'batch', label: 'Партионный учёт' },
                        { value: 'serial', label: 'Поштучный учёт' },
                    ]}
                    value={data.tracking_detail || 'batch'}
                    onChange={(v) => patch({
                        tracking_detail: v as UnitFormData['tracking_detail'],
                        ...(v === 'serial' ? {
                            tracked_type: undefined,
                            unit: 'pcs',
                        } : {
                            tracked_type: 'fifo',
                        }),
                    })}
                    disabled={disabled}
                />
            ),
            canNext: !!data.tracking_detail,
            skip: data.type === 'service' || data.inventory_type !== 'tracked',
        },
        {
            title: 'Метод учёта партий',
            content: (
                <PlatformFormVariants
                    options={[
                        { value: 'fifo', label: 'FIFO' },
                        { value: 'lifo', label: 'LIFO' },
                    ]}
                    value={data.tracked_type || 'fifo'}
                    onChange={(v) => patch({ tracked_type: v as UnitFormData['tracked_type'] })}
                    disabled={disabled}
                />
            ),
            canNext: true,
            skip: data.type === 'service'
                || data.inventory_type !== 'tracked'
                || data.tracking_detail !== 'batch',
        },
        {
            title: 'Единица измерения',
            content: (
                <PlatformFormVariants
                    options={unitOptions}
                    value={data.unit}
                    onChange={(v) => patch({ unit: v })}
                    disabled={
                        disabled
                        || data.type === 'service'
                        || data.tracking_detail === 'serial'
                    }
                />
            ),
            canNext: data.unit.trim().length > 0,
        },
        {
            title: data.type === 'service' ? 'Цена оказания услуги (₽)' : 'Цена продажи (₽)',
            content: (
                <PlatformFormInput
                    placeholder="0.00"
                    value={data.sale_price}
                    onChange={(v) => patch({ sale_price: v.replace(/[^\d.]/g, '') })}
                    disabled={disabled}
                />
            ),
            canNext: (() => {
                const n = parseFloat(data.sale_price);
                return !isNaN(n) && n >= 0 && data.sale_price.trim().length > 0;
            })(),
        },
        {
            title: 'Цена закупки (₽)',
            content: (
                <PlatformFormInput
                    placeholder="0.00"
                    value={data.purchase_price}
                    onChange={(v) => patch({ purchase_price: v.replace(/[^\d.]/g, '') })}
                    disabled={disabled}
                />
            ),
            canNext: (() => {
                const n = parseFloat(data.purchase_price);
                return !isNaN(n) && n >= 0 && data.purchase_price.trim().length > 0;
            })(),
            skip: data.type === 'service' || data.inventory_type !== 'tracked',
        },
        {
            title: 'Комментарий',
            content: (
                <PlatformFormTextarea
                    value={data.comment}
                    onChange={(v) => patch({ comment: v })}
                    disabled={disabled}
                />
            ),
            canNext: true,
        },
    ];
}
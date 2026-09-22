'use client';

import { useState } from 'react';
import { useWm } from '@/apps/company/modules';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { CategoryFormData, UnitFormData } from './_types';

type UseCreateArgs = {
    isCategory: boolean;
    parentCategoryId: string;
    onCreated: () => void;
};

export function useCreate({ isCategory, parentCategoryId, onCreated }: UseCreateArgs) {
    const wmModule = useWm();
    const { showMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);

    async function createCategory(data: CategoryFormData) {
        if (!isCategory) return false;

        setIsLoading(true);
        try {
            const response = await wmModule.createCategory({
                name: data.name.trim(),
                comment: data.comment.trim() || null,
                parent_id: parentCategoryId,
            });

            if (response.status) {
                showMessage({ label: 'Категория успешно создана', variant: 'success' });
                onCreated();
                return true;
            }
            throw new Error(response.message || 'Ошибка создания категории');
        } catch (error: any) {
            showMessage({
                label: error?.message || 'Не удалось создать категорию',
                variant: 'error',
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    async function createUnit(data: UnitFormData) {
        if (!isCategory) return false;

        setIsLoading(true);
        try {
            const request: any = {
                name: data.name.trim(),
                comment: data.comment.trim() || undefined,
                type: data.type,
                inventory_type: data.inventory_type,
                unit: data.unit.trim(),
                sale_price: parseFloat(data.sale_price),
                currency: 'RUB',
                category_id: parentCategoryId,
                status: 'active',
            };

            if (data.inventory_type === 'tracked') {
                request.tracking_detail = data.tracking_detail;
                request.purchase_price = parseFloat(data.purchase_price);

                if (data.tracking_detail === 'batch') {
                    request.tracked_type = data.tracked_type;
                }
            }

            const response = await wmModule.createUnit(request);

            if (response.status) {
                showMessage({ label: 'Позиция успешно создана', variant: 'success' });
                onCreated();
                return true;
            }
            throw new Error(response.message || 'Ошибка создания позиции');
        } catch (error: any) {
            showMessage({
                label: error?.message || 'Не удалось создать позицию',
                variant: 'error',
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, createCategory, createUnit };
}
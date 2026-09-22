'use client';

import { useState } from 'react';
import { useWm } from '@/apps/company/modules';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';

type UseToggleStatusArgs =
    | { type: 'category'; category: CatalogCategory; onUpdated: () => void }
    | { type: 'unit'; unit: CatalogUnit; onUpdated: () => void };

export function useToggleStatus(args: UseToggleStatusArgs) {
    const wmModule = useWm();
    const { showMessage } = useMessage();

    const isCategory = args.type === 'category';
    const initialStatus = isCategory ? args.category.status : args.unit.status;

    const [status, setStatus] = useState(initialStatus);
    const [isLoading, setIsLoading] = useState(false);

    const isActive = status === 'active';

    async function toggle() {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = isCategory
                ? (isActive
                    ? await wmModule.deactivateCategory(args.category.id)
                    : await wmModule.activateCategory(args.category.id))
                : (isActive
                    ? await wmModule.deactivateUnit(args.unit.id)
                    : await wmModule.activateUnit(args.unit.id));

            if (response.status) {
                setStatus(isActive ? 'inactive' : 'active');
                showMessage({
                    label: isActive
                        ? `${isCategory ? 'Категория' : 'Позиция'} деактивирована`
                        : `${isCategory ? 'Категория' : 'Позиция'} активирована`,
                    variant: 'success',
                });
                args.onUpdated();
            } else {
                throw new Error(response.message || 'Ошибка обновления статуса');
            }
        } catch (error: any) {
            showMessage({
                label: error?.message || 'Не удалось обновить статус',
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return { isActive, isLoading, toggle };
}
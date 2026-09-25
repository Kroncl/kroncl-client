'use client';

import { useState } from 'react';
import { useWm } from '@/apps/company/modules';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';

type StatusValue = 'active' | 'inactive';

type UseToggleStatusArgs =
    | { type: 'category'; category: CatalogCategory; onUpdated: (status: StatusValue) => void }
    | { type: 'unit'; unit: CatalogUnit; onUpdated: (status: StatusValue) => void }
    | null;

export function useToggleStatus(args: UseToggleStatusArgs) {
    const wmModule = useWm();
    const { showMessage } = useMessage();

    const isRoot = args === null;
    const initialStatus: StatusValue | null = isRoot
        ? null
        : args.type === 'category'
            ? args.category.status
            : args.unit.status;

    const [status, setStatus] = useState<StatusValue | null>(initialStatus);
    const [isLoading, setIsLoading] = useState(false);

    const isActive = status === 'active';

    async function toggle() {
        if (isRoot || isLoading || !args) return;

        setIsLoading(true);
        try {
            const response = args.type === 'category'
                ? (isActive
                    ? await wmModule.deactivateCategory(args.category.id)
                    : await wmModule.activateCategory(args.category.id))
                : (isActive
                    ? await wmModule.deactivateUnit(args.unit.id)
                    : await wmModule.activateUnit(args.unit.id));

            if (response.status) {
                const next: StatusValue = isActive ? 'inactive' : 'active';
                setStatus(next);
                showMessage({
                    label: isActive
                        ? `${args.type === 'category' ? 'Категория' : 'Позиция'} деактивирована`
                        : `${args.type === 'category' ? 'Категория' : 'Позиция'} активирована`,
                    variant: 'success',
                });
                args.onUpdated(next);
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
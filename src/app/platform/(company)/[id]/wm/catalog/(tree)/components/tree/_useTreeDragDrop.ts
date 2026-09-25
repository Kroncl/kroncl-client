'use client';

import { useState } from 'react';
import { useWm } from '@/apps/company/modules';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { DragPayload } from './_types';

type UseTreeDragDropArgs = {
    reload: (id: string) => Promise<void>;
    reloadRoots: () => Promise<void>;
};

export function useTreeDragDrop({ reload, reloadRoots }: UseTreeDragDropArgs) {
    const wmModule = useWm();
    const { showMessage } = useMessage();

    const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
    const [dropTargetId, setDropTargetId] = useState<string | null>(null);

    async function isDescendantOf(candidateId: string, ancestorId: string): Promise<boolean> {
        let current: string | null = candidateId;
        while (current) {
            if (current === ancestorId) return true;
            try {
                const res = await wmModule.getCategory(current);
                if (!res.status || !res.data) break;
                current = res.data.parent_id;
            } catch {
                break;
            }
        }
        return false;
    }

    async function handleDrop(targetId: string) {
        if (!dragPayload) return;
        if (dragPayload.id === targetId) {
            setDragPayload(null);
            setDropTargetId(null);
            return;
        }

        // валидация цикла
        if (dragPayload.kind === 'category') {
            const isCycle = await isDescendantOf(targetId, dragPayload.id);
            if (isCycle) {
                showMessage({
                    label: 'Нельзя переместить категорию в своего потомка',
                    variant: 'error',
                });
                setDragPayload(null);
                setDropTargetId(null);
                return;
            }
        }

        try {
            const response = dragPayload.kind === 'category'
                ? await wmModule.updateCategory(dragPayload.id, { parent_id: targetId })
                : await wmModule.updateUnit(dragPayload.id, { category_id: targetId });

            if (response.status) {
                showMessage({ label: 'Перемещено', variant: 'success' });

                await reload(targetId);

                const oldParentId = dragPayload.kind === 'category'
                    ? dragPayload.parentId
                    : dragPayload.categoryId;

                if (oldParentId) {
                    if (oldParentId !== targetId) {
                        await reload(oldParentId);
                    }
                } else {
                    await reloadRoots();
                }
            } else {
                throw new Error(response.message || 'Ошибка перемещения');
            }
        } catch (err: any) {
            showMessage({
                label: err?.message || 'Не удалось переместить',
                variant: 'error',
            });
        } finally {
            setDragPayload(null);
            setDropTargetId(null);
        }
    }

    return {
        dragPayload, setDragPayload,
        dropTargetId, setDropTargetId,
        handleDrop,
    };
}
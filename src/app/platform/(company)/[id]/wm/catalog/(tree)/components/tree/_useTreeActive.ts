'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useWm } from '@/apps/company/modules';

export function useTreeActive() {
    const wmModule = useWm();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // начальное значение читаем один раз при монтировании
    const activeFromUrl = searchParams.get('category');

    const [activeId, setActiveIdState] = useState<string | null>(activeFromUrl);
    const [initialActivePath, setInitialActivePath] = useState<string[]>([]);

    // НЕ синхронизируем activeId из URL при изменениях
    // (URL меняется только через наш setActiveId, а он уже обновляет state)

    useEffect(() => {
        if (!activeFromUrl) {
            setInitialActivePath([]);
            return;
        }

        let cancelled = false;

        async function buildPath() {
            const path: string[] = [];
            let currentId: string | null = activeFromUrl;

            while (currentId) {
                path.unshift(currentId);
                try {
                    const res = await wmModule.getCategory(currentId);
                    if (!res.status || !res.data) break;
                    currentId = res.data.parent_id;
                } catch {
                    break;
                }
            }

            if (!cancelled) setInitialActivePath(path);
        }

        buildPath();
        return () => { cancelled = true; };
    }, [activeFromUrl]);

    function setActiveId(id: string | null, persist: boolean = true) {
        setActiveIdState(id);

        if (!persist) return;

        const params = new URLSearchParams(window.location.search);
        if (id) params.set('category', id);
        else params.delete('category');

        const url = `${pathname}?${params.toString()}`;
        window.history.replaceState(null, '', url);
    }

    return { activeId, setActiveId, initialActivePath };
}
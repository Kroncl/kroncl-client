'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useWm } from '@/apps/company/modules';

export function useTreeActive() {
    const wmModule = useWm();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const activeFromUrl = searchParams.get('category');

    const [activeId, setActiveIdState] = useState<string | null>(activeFromUrl);
    const [initialActivePath, setInitialActivePath] = useState<string[]>([]);

    useEffect(() => {
        setActiveIdState(activeFromUrl);
    }, [activeFromUrl]);

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

        const params = new URLSearchParams(searchParams.toString());
        if (id) params.set('category', id);
        else params.delete('category');

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return { activeId, setActiveId, initialActivePath };
}
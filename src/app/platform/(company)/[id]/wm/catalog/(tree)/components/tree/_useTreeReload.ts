'use client';

import { useRef } from 'react';

export function useTreeReload() {
    const reloadMapRef = useRef<Map<string, () => Promise<void>>>(new Map());

    function registerReload(id: string, fn: () => Promise<void>) {
        reloadMapRef.current.set(id, fn);
    }

    function unregisterReload(id: string) {
        reloadMapRef.current.delete(id);
    }

    async function reload(id: string) {
        const fn = reloadMapRef.current.get(id);
        if (fn) await fn();
    }

    return { registerReload, unregisterReload, reload };
}
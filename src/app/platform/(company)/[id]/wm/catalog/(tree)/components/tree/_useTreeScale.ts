'use client';

import { useEffect, useState } from 'react';
import { TreeScale } from './_types';

const SCALE_KEY = 'kroncl.catalog.tree.scale';
const VALID: TreeScale[] = [75, 90, 100, 125];

export function useTreeScale() {
    const [scale, setScale] = useState<TreeScale>(100);

    useEffect(() => {
        const saved = Number(localStorage.getItem(SCALE_KEY));
        if (VALID.includes(saved as TreeScale)) {
            setScale(saved as TreeScale);
        }
    }, []);

    function updateScale(next: TreeScale) {
        setScale(next);
        localStorage.setItem(SCALE_KEY, String(next));
    }

    return { scale, updateScale };
}
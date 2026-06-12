'use client';

import React, { useState } from 'react';
import styles from './block.module.scss';
import clsx from 'clsx';

export interface MDXStatusesBlockProps {
    className?: string;
    codes: Code[];
}

export interface Code {
    code: number;
    children?: React.ReactNode;
}

function getCodeVariant(code: number): 'success' | 'error' | 'neutral' {
    if (code >= 200 && code < 300) return 'success';
    if (code >= 400 && code < 600) return 'error';
    return 'neutral';
}

export function MDXStatusesBlock({
    className,
    codes
}: MDXStatusesBlockProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeCode = codes[activeIndex];

    if (!codes || codes.length === 0) return null;

    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.codes}>
                {codes.map((code, index) => {
                    const variant = getCodeVariant(code.code);
                    return (
                        <div
                            key={index}
                            className={clsx(
                                styles.code,
                                styles[variant],
                                index === activeIndex && styles.active
                            )}
                            onClick={() => setActiveIndex(index)}
                        >
                            {code.code}
                        </div>
                    );
                })}
            </div>
            <div className={styles.body}>
                {activeCode?.children}
            </div>
        </div>
    );
}